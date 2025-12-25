import React, { useState } from "react";

export default function SkillProgress({ skill }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex items-center gap-3 pt-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
        className="w-4 h-4 accent-violet-500"
      />
      <span
        className={`text-sm ${
          completed ? "text-green-400 line-through" : "text-slate-400"
        }`}
      >
        Mark {skill} as completed
      </span>
    </div>
  );
}
