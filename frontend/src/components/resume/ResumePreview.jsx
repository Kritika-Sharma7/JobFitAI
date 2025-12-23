const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  let previewText = "";

  // Case 1: resume is pasted text
  if (typeof resume === "string") {
    previewText = resume.trim();
  }

  // Case 2: resume object with text (legacy / future)
  else if (resume?.text && typeof resume.text === "string") {
    previewText = resume.text.trim();
  }

  // Case 3: resume is a File (PDF upload)
  else if (
    typeof File !== "undefined" &&
    resume instanceof File
  ) {
    previewText = `PDF uploaded: ${resume.name}`;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-white mb-2">
        Resume Preview
      </h4>

      <div className="text-xs text-gray-400 max-h-48 overflow-y-auto whitespace-pre-wrap">
        {previewText || "No preview available"}
      </div>
    </div>
  );
};

export default ResumePreview;
