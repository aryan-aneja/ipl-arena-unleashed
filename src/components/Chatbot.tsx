
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatbotResponses } from '@/lib/data';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hello! I'm the IPL Arena assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessageId = Date.now();
    const userMessage = { id: userMessageId, text: inputValue, isBot: false };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Generate response after a short delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage = { id: userMessageId + 1, text: response, isBot: true };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Check for keyword matches in predefined responses
    for (const item of chatbotResponses) {
      for (const keyword of item.keywords) {
        if (lowerInput.includes(keyword.toLowerCase())) {
          return item.response;
        }
      }
    }
    
    // Default response if no keywords match
    return "I'm not sure I understand. Can you try asking about tickets, teams, matches, or payment options?";
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 shadow-lg flex items-center justify-center ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-ipl-blue hover:bg-ipl-blue/90'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200 fadeIn">
          {/* Chat Header */}
          <div className="bg-ipl-blue text-white px-4 py-3 flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-ipl-blue font-bold">IPL</span>
            </div>
            <div>
              <p className="font-semibold">IPL Arena Assistant</p>
              <p className="text-xs opacity-75">Ask about tickets, teams, or matches</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-3 max-w-[85%] ${
                  message.isBot ? 'mr-auto' : 'ml-auto'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-white border border-gray-200'
                      : 'bg-ipl-blue text-white'
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-xs mt-1 text-gray-500 ${
                    message.isBot ? 'text-left' : 'text-right'
                  }`}
                >
                  {message.isBot ? 'Assistant' : 'You'}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ipl-blue"
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <Button 
                onClick={handleSendMessage}
                className="rounded-l-none bg-ipl-blue hover:bg-ipl-blue/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
