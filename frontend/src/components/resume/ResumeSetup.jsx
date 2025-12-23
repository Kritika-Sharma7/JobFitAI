import { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import ProfileSetup from "./ProfileSetup";
import ResumePreview from "./ResumePreview";

export default function ResumeSetup({ onChange }) {
  const [resume, setResume] = useState({
    file: null,
    text: ""
  });

  const [profile, setProfile] = useState({
    experience: "",
    role: "",
    techStack: ""
  });

  // Notify parent whenever something changes
  const notifyParent = (updatedResume, updatedProfile) => {
    if (onChange) {
      onChange({
        resume: updatedResume ?? resume,
        profile: updatedProfile ?? profile
      });
    }
  };

  return (
    <div className="space-y-6">
      <ResumeUpload
        onResumeChange={(data) => {
          setResume(data);
          notifyParent(data, null);
        }}
      />

      <ProfileSetup
        onProfileChange={(data) => {
          setProfile(data);
          notifyParent(null, data);
        }}
      />

      <ResumePreview
        resume={resume}
        profile={profile}
      />
    </div>
  );
}
