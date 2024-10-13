"use client"; 

import React, { useState } from 'react';
import { callOllama } from '@/actions/create-event';
import { createEvent } from '@/actions/create-event';

const Page = () => {
  const [inputValue, setInputValue] = useState('');
  const [resValue, setResValue] = useState('');
  const [loading, setLoading] = useState(false); 

    const eventData = {
      channel: "llama3.1",
      name: "New",
      user_id: "user1",
      icon: "🤩",
      notify: true,
      tags: {
        content:"" ,
        res:""
      }
    };

  const handleGenerate = async () => {
    console.log('Input value:', inputValue);
    console.log("Calling Ollama ");

    eventData.tags.content=inputValue;
    setLoading(true);

    const res = await callOllama(inputValue);
    eventData.tags.res=res;
    console.log("Generated response: ", res);
    setResValue(res);
    setInputValue('');
    setLoading(false);
    
    createEvent(eventData);
  };

  return (
    <>
      <h1 className='text-3xl'>Chat</h1>
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
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {loading ? (
        <div className="mt-4 text-gray-500">Loading...</div>
      ) : (
        <div className={resValue==""?"": "bg-gray-900 p-6 mt-8 rounded-md text-white"}>
            {resValue}
            </div>
      )}
    </>
  );
};

export default Page;
