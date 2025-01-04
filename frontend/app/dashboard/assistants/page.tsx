'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AssistantDashboard() {
  const [step, setStep] = useState(1); // Step control
  const [formData, setFormData] = useState({
    name: '',
    firstMessage: '',
    systemPrompt: '',
    endCallMessage: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleInputChange = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const vapi_token = process.env.VAPI_TOKEN
  const createAssistant = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/assistants', { // Use your actual backend API URL
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${vapi_token}`,
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData),
      });
      console.log('Vapi Response Status:', response.status);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create assistant');
      }
  
      const data = await response.json();
      alert('Assistant created successfully!');
      setStep(1); // Reset step
      setFormData({ name: '', firstMessage: '', systemPrompt: '', endCallMessage: '' }); // Reset form
    } catch (error:any) {
      console.error('Error creating assistant:', error.message);
      alert('Failed to create assistant: ' + error.message);
    }
  };
  
  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-gray-950/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-500">Assistant Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 m-2">Create Assistant</Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white max-w-lg mx-auto">
              <DialogHeader>
                <DialogTitle>Create New Assistant</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Follow the steps to configure your assistant.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {step === 1 && (
                  <div className="grid gap-4">
                    <span>Step {step}</span>
                    <Label htmlFor="name">Assistant Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter assistant name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:ring-teal-500"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-4">
                    <span>Step {step}</span>
                    <Label htmlFor="first-message">First Message</Label>
                    <Input
                      id="first-message"
                      placeholder="Hello! How can I assist you today?"
                      value={formData.firstMessage}
                      onChange={(e) => handleInputChange('firstMessage', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:ring-teal-500"
                    />
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Enter the system instructions for the assistant..."
                      value={formData.systemPrompt}
                      onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
                      className="min-h-[150px] bg-gray-800 border-gray-700 focus:ring-teal-500"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-4">
                    <span>Step {step}</span>
                    <Label htmlFor="end-call-message">End Call Message</Label>
                    <Input
                      id="end-call-message"
                      placeholder="Thank you for contacting us. Have a great day!"
                      value={formData.endCallMessage}
                      onChange={(e) => handleInputChange('endCallMessage', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:ring-teal-500"
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    className="border-gray-700"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  {step < 3 ? (
                    <Button
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={createAssistant}
                    >
                      Create
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </div>
  );
}
