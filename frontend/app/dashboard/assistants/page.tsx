"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { BASE_URL } from "../../utils/constants";
interface Assistant {
  id: string;
  name: string;
  createdAt: string;
  model: {
    model: string;
    messages: Array<{
      role: string;
      content: string;
    }>;
    provider: string;
  };
  firstMessage: string;
  endCallMessage: string;
}
export default function AssistantDashboard() {
  const [step, setStep] = useState(1);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    firstMessage: "",
    systemPrompt: "",
    endCallMessage: "",
  });

  const [isEditable, setIsEditable] = useState(false); // Edit toggle

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const vapi_token = process.env.VAPI_TOKEN; // Token from environment variables

  // Fetch assistant data when the component is mounted
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/assistant/get`);

        if (!response.ok) {
          throw new Error("Failed to fetch assistants");
        }

        const data = await response.json();
        setAssistants(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch assistants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  const toggleEditable = () => setIsEditable((prev) => !prev);
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/assistant/get`);

        if (!response.ok) {
          throw new Error("Failed to fetch assistants");
        }

        const data = await response.json();
        setAssistants(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch assistants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  const createAssistant = async () => {
    try {
      const response = await fetch(`${BASE_URL}/assistant/create`, {
        // Use your actual backend API URL
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('auth_token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstMessage: formData.firstMessage,
          modelProvider: "openai",
          modelName: "gpt-3.5-turbo",
          content: formData.systemPrompt,
          knowledgeBaseUrl: "https://example.com/knowledge-base",
          endCallMessage: formData.endCallMessage,
          messages: [{ role: "user", content: formData.systemPrompt }],
          name: formData.name,
          toolIds: ["e402a911-71a4-4879-90d6-92ec38b9d123"], 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create assistant");
      }

      const data = await response.json();
      alert("Assistant created successfully!");
      setStep(1); // Reset step
      setFormData({
        name: "",
        firstMessage: "",
        systemPrompt: "",
        endCallMessage: "",
      }); // Reset form
    } catch (error: any) {
      console.error("Error creating assistant:", error.message);
      alert("Failed to create assistant: " + error.message);
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/assistant/update`, {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Nzk5MzdjNzcyZWQ5OWM0NTRhZmU4NyIsImlhdCI6MTczNjA2NTI5NiwiZXhwIjoxNzM2MDY4ODk2fQ.OE3aZLvuJ6S_VWbtIyBAfO7xSPLzSXem8g8ny9WwAKs",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      alert("Changes saved successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[#1C1C1C] rounded-md text-white">
      <header className="sticky top-0 z-10  border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-500">
            Assistant Dashboard
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 m-2">
                Create Assistant
              </Button>
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
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("firstMessage", e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 focus:ring-teal-500"
                    />
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Enter the system instructions for the assistant..."
                      value={formData.systemPrompt}
                      onChange={(e) =>
                        handleInputChange("systemPrompt", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("endCallMessage", e.target.value)
                      }
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

      <div className="mt-8 max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => (
          <Card key={assistant.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-teal-500 flex items-center justify-between">
                {assistant.name}
                <span className="text-sm text-gray-400">
                  {new Date(assistant.createdAt).toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Model</Label>
                <p className="text-sm text-gray-400">{assistant.model.model}</p>
              </div>
              <div>
                <Label>Provider</Label>
                <p className="text-sm text-gray-400">
                  {assistant.model.provider}
                </p>
              </div>
              {assistant.firstMessage && (
                <div>
                  <Label>First Message</Label>
                  <p className="text-sm text-gray-400">
                    {assistant.firstMessage}
                  </p>
                </div>
              )}
              {assistant.endCallMessage && (
                <div>
                  <Label>End Call Message</Label>
                  <p className="text-sm text-gray-400">
                    {assistant.endCallMessage}
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                className="w-full mt-4 border-gray-700 hover:bg-gray-800"
              >
                Edit Assistant
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
