"use client";

import React, { useEffect, useState } from 'react';
import { callOllama } from '@/actions/create-event';
import { createEvent } from '@/actions/create-event';
import { getUserChannels } from '@/actions/get-channels';

import { toast } from "sonner";

const Page = () => {
  const [inputValue, setInputValue] = useState('');
  const [resValue, setResValue] = useState('');
  const [url, setUrl] = useState('');
  const [providerType, setProviderType] = useState('');
  const [loading, setLoading] = useState(false);

  interface Channel {
    id: string;
    name: string;
    url:string;
    providerType:string;
  }

  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  const fetchUserChannels = async () => {
    try {
      const fetchedChannels = await getUserChannels();
      setChannels(fetchedChannels); 
    } catch (error) {
      console.error("Error fetching user channels:", error);

    }
  };

  useEffect(() => {
    fetchUserChannels(); 
  }, []);

  const handleChannelChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value; // Get the selected value from the event
    setSelectedChannel(selectedName);
    const channel = channels.find((channel) => channel.name === selectedName);
    if (channel) {
      setUrl(channel.url); 
      setProviderType(channel.providerType)

    } else {
      setUrl(""); 
    }

    console.log(`Selected Channel: ${selectedName}, URL: ${channel ? channel.url : 'N/A'}`);
    
  };

  
  const eventData = {
    channel: "llama3.1",
    name: "New",
    user_id: "user1",
    icon: "🤩",
    notify: true,

    tags: {
      content: "",
      reqRes: "",
      url:"",
      providerType:""
    }
  };




  const handleGenerate = async () => {

    if(providerType==""){
      toast.error("Please select Provider.");
    }
    else{
      console.log('Input value:', inputValue);
      console.log("Calling Ollama ");
  
      eventData.tags.content = inputValue;
      eventData.channel = selectedChannel;
      setLoading(true);
  
  
        const result = await callOllama(inputValue,url);
        eventData.tags.reqRes =  JSON.stringify(result);
        eventData.tags.url = url;
        eventData.tags.providerType = providerType;
        console.log("Generated response: ", result?.res);
        setResValue(result?.res.choices[0].message.content);
        setInputValue('');
        setLoading(false);
    
        createEvent(eventData);
  
    }
 



  };




  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl'>Chat</h1>
        <div>
        <select
        id="channels"
        name="channel"
        value={selectedChannel}
        onChange={handleChannelChange}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
      >
        <option value="" disabled>
          Select Provider
        </option>
        {channels.map((channel) => (
          <option key={channel.id} value={channel.name}>
            {channel.name}
          </option>
        ))}
      </select>
        </div>
      </div>

      <div className='mt-4'>
        <input
          type='text'
          className='border border-gray-300 p-2 rounded w-2/3'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Type your message here...'
        />


        <button
          className='ml-2 bg-gray-900 hover:scale-95 transition-all duration-200 text-white p-2 rounded' 
          onClick={handleGenerate}
          disabled={loading }
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {loading ? (
        <div className="mt-4 text-gray-500">Loading...</div>
      ) : (
        <div className={resValue == "" ? "" : "bg-gray-900 p-6 mt-8 rounded-md text-white"}>
          {resValue}
        </div>
      )}
    </>
  );
};

export default Page;
