"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MicIcon } from "lucide-react";

interface VoiceInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ label, value, onChange }) => {
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Please use Google Chrome Browser");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col">
      <div className="p-1">
        <Label htmlFor="terms">{label}</Label>
      </div>
      <div className="flex space-x-3">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Nhập ${label.toLowerCase()} hoặc dùng giọng nói`}
        />
        <Button type="button" onClick={handleVoiceInput} variant={"default"}>
          <MicIcon />
        </Button>
      </div>
    </div>
  );
};

export default VoiceInput;
