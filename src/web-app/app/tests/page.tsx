import RecordSpeech from "@/components/recognition";
import { LucideVoicemail, Voicemail } from "lucide-react";
import React from "react";

const TestPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:gap-48 gap-5 lg:flex-row-reverse">
        <RecordSpeech />
      </div>
    </div>
  );
};

export default TestPage;
