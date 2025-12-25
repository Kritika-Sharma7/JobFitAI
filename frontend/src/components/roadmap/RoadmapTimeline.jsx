import React from "react";
import ProjectCard from "./ProjectCard";

export default function RoadmapTimeline({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">
          Personalized Learning Roadmap
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Tailored roadmap to close skill gaps for {data.targetRole}
        </p>
      </div>

      <div className="relative border-l border-slate-800 pl-6 space-y-10">
        {data.roadmap.map((item, index) => (
          <ProjectCard
            key={item.skill}
            index={index}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}
