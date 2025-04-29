import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function FoundryBuilder() {
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [products, setProducts] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [style, setStyle] = useState("");

  const steps = [
    {
      question: "What would you like to call your business?",
      input: businessName,
      setInput: setBusinessName,
    },
    {
      question: "What type of business is it (Store, Service, Brand)?",
      input: businessType,
      setInput: setBusinessType,
    },
    {
      question: "What do you sell, offer, or create?",
      input: products,
      setInput: setProducts,
    },
    {
      question: "What kind of website do you want (Landing Page, Full Site, Store, Blog)?",
      input: websiteType,
      setInput: setWebsiteType,
    },
    {
      question: "What style do you prefer (Clean, Modern, Luxury, Playful)?",
      input: style,
      setInput: setStyle,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Left Chat Panel */}
      <div className="w-1/3 p-6 border-r border-gray-300 dark:border-gray-700 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">FoundryBot</h2>
        <p className="mb-6">I'll help you start building your business in just a few questions. Let's go!</p>
        <div className="flex flex-col space-y-4">
          <p className="font-semibold">{steps[step].question}</p>
          <Input
            value={steps[step].input}
            onChange={(e) => steps[step].setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
      {/* Right Live Preview Panel */}
      <div className="w-2/3 p-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to {businessName || "Your Business"}</h1>
          <p className="text-lg mb-4">
            We help turn your {businessType || "business"} into a real, working business—
            from branding to launch. No coding. No stress.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Here's how we can help you personally:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Create a name and logo that suits your {businessType || "business"}</li>
            <li>Design and launch a {websiteType || "website"}</li>
            <li>Get hosting and a domain—or use your own</li>
            <li>Build automated marketing campaigns for your {products || "products or services"}</li>
            <li>Track your growth with a personal dashboard</li>
          </ul>
          <Button className="text-lg px-6 py-3">Let's Build Your Business</Button>
        </div>
      </div>
    </div>
  );
}
