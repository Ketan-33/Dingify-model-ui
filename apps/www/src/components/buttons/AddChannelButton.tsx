"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createChannel } from "@/actions/create-channel";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import { Textarea } from "@dingify/ui/components/textarea"; // Assuming there's a Textarea component

export function AddChannelButton() {
  const [channelName, setChannelName] = useState("");
  const [providerType, setProviderType] = useState("");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [additionalField, setAdditionalField] = useState(""); // Additional field example
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Move to the next step if there are more steps
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createChannel(channelName, providerType, url, requestBody);

      if (!result.success) {
        throw new Error(result.error || "Failed to add channel");
      }

      toast.success(`Channel "${channelName}" created successfully.`);
      router.push(`/dashboard/channels/${result.channel?.id}`);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Add New Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new provider</DialogTitle>
            <DialogDescription>
              Enter the details for the new provider.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="channelName" className="ml-1">
                    Provider Name
                  </Label>
                  <Input
                    id="channelName"
                    name="channelName"
                    placeholder="Provider Name..."
                    className="col-span-3"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="providerType" className="ml-1">
                    Provider Type
                  </Label>
                  <select
                    id="providerType"
                    name="providerType"
                    value={providerType}
                    onChange={(e) => setProviderType(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="vLLM">vLLM</option>
                    <option value="Bedrock">Bedrock</option>
                    <option value="Anthropic">Anthropic</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 items-center gap-2 ">
                  <Label htmlFor="url" className="ml-1">
                    URL
                  </Label>
                  <Input
                    id="url"
                    name="url"
                    placeholder="http://localhost:11434"
                    className="col-span-3"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </>
            )}


            {/* Step 2: Request Body and Additional Field */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="requestBody" className="ml-1">
                    Request Body
                  </Label>
                  <Textarea
                    id="requestBody"
                    name="requestBody"
                    placeholder={`{
  "model": "llama3.1",
  "messages": [
    {
      "role": "user",
      "content": "Your content here"
    }
  ]
}`
                    }
                    className="col-span-3 h-48"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="additionalField" className="ml-1">
                    Additional Field
                  </Label>
                  <Input
                    id="additionalField"
                    name="additionalField"
                    placeholder="Additional info..."
                    className="col-span-3"
                    value={additionalField}
                    onChange={(e) => setAdditionalField(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                variant="secondary"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : step < 3 ? "Next" : "Save new Provider"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
