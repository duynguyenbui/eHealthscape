import { ExaminationFormVoice } from "@/components/examination-form-voice";
import React from "react";

const TestPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:gap-48 gap-5 lg:flex-row-reverse">
        <ExaminationFormVoice />
      </div>
    </div>
  );
};

export default TestPage;
