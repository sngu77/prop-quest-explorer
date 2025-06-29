import { useState, useEffect } from 'react';
import { Send, MessageCircle, Phone, Mail, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'landlord' | 'tenant';
  content: string;
  timestamp: string;
  type: 'message' | 'maintenance' | 'payment' | 'general';
  read: boolean;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  avatar?: string;
  lastActive: string;
}

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    property: 'Modern Downtown Apartment',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastActive: '2024-01-29T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 987-6543',
    property: 'Luxury Condo',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b2a8cd?w=100&h=100&fit=crop&crop=face',
    lastActive: '2024-01-29T09:15:00Z'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: 'tenant',
      content: 'Hi! The kitchen faucet is leaking. Could you please send someone to fix it?',
      timestamp: '2024-01-29T09:00:00Z',
      type: 'maintenance',
      read: true
    },
    {
      id: '2',
      sender: 'landlord',
      content: 'Thanks for letting me know. I\'ll send a plumber tomorrow morning between 9-11 AM.',
      timestamp: '2024-01-29T09:30:00Z',
      type: 'maintenance',
      read: true
    },
    {
      id: '3',
      sender: 'tenant',
      content: 'Perfect, thank you! I\'ll be home during that time.',
      timestamp: '2024-01-29T10:30:00Z',
      type: 'maintenance',
      read: false
    }
  ],
  '2': [
    {
      id: '4',
      sender: 'tenant',
      content: 'Hello! Just wanted to confirm that rent payment for February has been sent.',
      timestamp: '2024-01-29T08:00:00Z',
      type: 'payment',
      read: true
    },
    {
      id: '5',
      sender: 'landlord',
      content: 'Received, thank you! Payment confirmed for February.',
      timestamp: '2024-01-29T09:15:00Z',
      type: 'payment',
      read: true
    }
  ]
};

const TenantCommunication = () => {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(mockTenants[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'message' | 'maintenance' | 'payment' | 'general'>('message');

  useEffect(() => {
    if (selectedTenant) {
      setMessages(mockMessages[selectedTenant.id] || []);
    }
  }, [selectedTenant]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTenant) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'landlord',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: messageType,
      read: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedTenant.name}`
    });
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Tenant List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Tenants
          </CardTitle>
          <CardDescription>Select a tenant to start messaging</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {mockTenants.map((tenant) => (
              <div
                key={tenant.id}
                onClick={() => setSelectedTenant(tenant)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                  selectedTenant?.id === tenant.id 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback>
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{tenant.name}</p>
                    <p className="text-sm text-gray-500 truncate">{tenant.property}</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Last active: {formatTime(tenant.lastActive)}
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {mockMessages[tenant.id]?.some(m => !m.read && m.sender === 'tenant') && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2 flex flex-col">
        {selectedTenant ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedTenant.avatar} alt={selectedTenant.name} />
                    <AvatarFallback>
                      {selectedTenant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedTenant.name}</CardTitle>
                    <CardDescription>{selectedTenant.property}</CardDescription>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'landlord' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'landlord'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getMessageTypeColor(message.type)}`}
                      >
                        {message.type}
                      </Badge>
                      <span className="text-xs opacity-75">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2 mb-3">
                <Select value={messageType} onValueChange={(value: any) => setMessageType(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="message">General</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a tenant to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default TenantCommunication;