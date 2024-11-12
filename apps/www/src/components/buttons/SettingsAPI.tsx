"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@dingify/ui/components/card'
import React from 'react'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@dingify/ui/components/button";
import { Input } from "@dingify/ui/components/input";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dingify/ui/components/tooltip";
import { toast } from "sonner";
import { AddApiKeyButton } from './AddApiKeyButton';
import { getUserData } from '@/actions/get-user-details';
import { CheckIcon, CopyIcon, EyeIcon } from 'lucide-react';
import { EyeSlashIcon } from '@heroicons/react/20/solid';
const SettingsAPI = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
          try {
            const data = await getUserData();
            setApiKey(data.apiKey as string);
          } catch (error) {
            console.error("Failed to fetch user data", error);
          }
        }
    
        fetchUserData();
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          setHasCopied(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, [hasCopied]);

      const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(apiKey);
        setHasCopied(true);
        toast.success("API key has been copied to clipboard.");
      };

      const handleApiKeyUpdate = (newApiKey) => {
        setApiKey(newApiKey);
      };
  return (
    <>
    <Card>
        <CardHeader>
          <CardTitle>
            API Key
          </CardTitle>
          <CardDescription>
              Generate  your API key.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="relative w-[60%] my-6">
                <Input
                  id="apiKey"
                  readOnly
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                />
                <Button
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowKey(!showKey);
                  }}
                >
                  {showKey ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle API key visibility</span>
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      variant="ghost"
                      onClick={handleCopy}
                    >
                      {hasCopied ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy API key</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy API key</TooltipContent>
                </Tooltip>
              </div>
                <AddApiKeyButton />              
        </CardContent>
    
      </Card>
    </>
  )
}

export default SettingsAPI