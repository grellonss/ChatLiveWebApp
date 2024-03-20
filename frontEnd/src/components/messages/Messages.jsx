/* 
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useConversation from '../../zustand/useConversation';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    })
    if (lastMessageRef.current) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedConversation]);

 /*  useEffect(() => {
    // Scroll to bottom when conversation changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }); // Update when selectedConversation changes 

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages; */

import { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {messages,loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  
  useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
      })
  },[messages]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading  && messages.length > 0 && messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message  message={message} />
            </div>
        )) }
        {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start the conversation</p>
        )}
    </div>
  );
}

export default Messages;
 