
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm TG FixIt Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const responses = {
    'how to report': 'To report an issue: 1) Go to Report a Problem, 2) Select your location, 3) Choose problem category, 4) Add description and photos, 5) Submit!',
    'track report': 'You can track your reports in the Report History section. Click on any report to see its progress timeline.',
    'reward points': 'You earn reward points for each report submitted and additional points when issues are resolved. Points can be redeemed for various rewards.',
    'contact support': 'For urgent issues, contact GHMC at 040-21111111 or email support@tgfixit.gov.in',
    'app features': 'TG FixIt allows you to report civic issues, track their progress, earn rewards, and help make Telangana better for everyone.',
    'account': 'You can manage your account settings by clicking the Settings icon in the top right corner of the home screen.',
    'privacy': 'Your data is secure and used only for improving civic services. We follow strict privacy guidelines.',
    'feedback': 'We value your feedback! You can rate resolved issues and provide comments to help us improve our services.'
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);

    // Find appropriate response
    const lowercaseInput = inputMessage.toLowerCase();
    let response = "I'm here to help with TG FixIt related questions. You can ask about reporting issues, tracking reports, reward points, or app features.";
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 shadow-lg z-50"
      >
        <MessageCircle size={24} />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">TG FixIt Assistant</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl text-sm ${
                message.sender === 'user'
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-10 w-10 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
