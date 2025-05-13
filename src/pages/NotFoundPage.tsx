<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, StopCircle, Bot, User } from 'lucide-react';
import Button from '../components/common/Button';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface RasaResponse {
  recipient_id: string;
  text: string;
  custom?: any;
}

const RASA_SERVER_URL = 'http://localhost:5005'; // Replace with your Rasa server URL

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! I'm your AI therapy assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date()
  }]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to send message to Rasa server
  const sendToRasa = async (message: string, isVoice: boolean = false) => {
    try {
      const response = await fetch(`${RASA_SERVER_URL}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'user',
          message: message,
          metadata: {
            input_type: isVoice ? 'voice' : 'text'
          }
        }),
      });

      const rasaResponses: RasaResponse[] = await response.json();
      
      // Handle Rasa responses
      for (const rasaResponse of rasaResponses) {
        setMessages(prev => [...prev, {
          text: rasaResponse.text,
          isUser: false,
          timestamp: new Date()
        }]);

        // Handle any custom actions or responses
        if (rasaResponse.custom) {
          handleCustomResponse(rasaResponse.custom);
        }
      }
    } catch (error) {
      console.error('Error communicating with Rasa:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble connecting to the server. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  };

  // Handle custom responses from Rasa (e.g., suggested actions, images, etc.)
  const handleCustomResponse = (custom: any) => {
    // Implement custom response handling based on your Rasa actions
    console.log('Custom response:', custom);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsProcessing(true);

    // Send message to Rasa
    await sendToRasa(inputText);
    setIsProcessing(false);
  };

  // Convert speech to text using browser's API
  const convertSpeechToText = async (audioBlob: Blob): Promise<string> => {
    try {
      // First, try to use Rasa's ASR if available
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      try {
        const response = await fetch(`${RASA_SERVER_URL}/speech-to-text`, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          return result.text;
        }
      } catch (error) {
        console.warn('Rasa ASR not available, falling back to Web Speech API');
      }

      // Fallback to Web Speech API
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const audioContext = new AudioContext();
            await audioContext.decodeAudioData(reader.result as ArrayBuffer);
            
            // Here you would typically convert the audioBuffer to text
            // For now, we'll return a placeholder
            resolve("Speech recognition is being processed");
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(audioBlob);
      });
    } catch (error) {
      console.error('Error converting speech to text:', error);
      return 'Error converting speech to text. Please try again.';
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const transcribedText = await convertSpeechToText(audioBlob);
        
        setMessages(prev => [...prev, {
          text: transcribedText,
          isUser: true,
          timestamp: new Date()
        }]);

        // Send transcribed text to Rasa
        setIsProcessing(true);
        await sendToRasa(transcribedText, true);
        setIsProcessing(false);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-surface-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Bot className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-surface-900">AI Therapy Assistant</h1>
              <p className="text-sm text-surface-500">Your safe space for healing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-[calc(80vh-4rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser ? 'bg-primary-100' : 'bg-surface-100'
                }`}>
                  {message.isUser ? (
                    <User className="w-5 h-5 text-primary-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-surface-600" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[70%] ${message.isUser ? 'ml-auto' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      message.isUser
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface-100 text-surface-800'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                  </div>
                  <div className={`text-xs mt-1 ${message.isUser ? 'text-right text-surface-400' : 'text-surface-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Typing Indicator */}
            {isProcessing && (
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-surface-600" />
                </div>
                <div className="bg-surface-100 rounded-full px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-surface-200 p-4 bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-lg bg-surface-50 border border-surface-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  disabled={isProcessing}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isRecording ? 'primary' : 'outline'}
                  onClick={isRecording ? stopRecording : startRecording}
                  icon={isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  className={`rounded-lg ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  {isRecording ? 'Stop' : 'Voice'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isProcessing}
                  icon={<Send className="w-5 h-5" />}
                  className="rounded-lg"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 text-primary-500">
          <svg
            className="w-24 h-24 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-surface-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 mb-4">Page Not Found</h2>
        <p className="text-surface-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            to="/"
            variant="primary"
            icon={<Home size={18} />}
          >
            Go to Home
          </Button>
          <Button
            as="button"
            onClick={() => window.history.back()}
            variant="outline"
            icon={<ArrowLeft size={18} />}
          >
            Go Back
          </Button>
>>>>>>> d66a9436bca9eb6c45863bfe08f0ba5cedba6ee5
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AIChatPage;
=======
export default NotFoundPage;
>>>>>>> d66a9436bca9eb6c45863bfe08f0ba5cedba6ee5
