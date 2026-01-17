const pdfParse = require("pdf-parse");

/*
  =====================================================
  ROBUST PDF RESUME PARSER
  =====================================================
  Handles:
  - Multi-column layouts
  - Bullet points preservation
  - Section detection
  - Unicode normalization
  - Whitespace cleanup
  =====================================================
*/

/* =====================================================
   SECTION HEADERS (CASE INSENSITIVE)
   ===================================================== */
const SECTION_PATTERNS = [
  // Experience variations
  /^(work\s*)?experience/i,
  /^employment(\s*history)?/i,
  /^professional\s*experience/i,
  /^career\s*history/i,

  // Education variations
  /^education/i,
  /^academic(\s*background)?/i,
  /^qualifications?/i,

  // Skills variations
  /^(technical\s*)?skills?/i,
  /^competenc(ies|e)/i,
  /^expertise/i,
  /^technologies/i,
  /^tools?\s*(&|and)?\s*technologies/i,

  // Projects variations
  /^projects?/i,
  /^portfolio/i,
  /^personal\s*projects?/i,

  // Certifications
  /^certifications?/i,
  /^licenses?\s*(&|and)?\s*certifications?/i,

  // Summary variations
  /^(professional\s*)?summary/i,
  /^(career\s*)?objective/i,
  /^about(\s*me)?/i,
  /^profile/i,

  // Contact
  /^contact(\s*info(rmation)?)?/i,

  // Achievements
  /^achievements?/i,
  /^awards?(\s*(&|and)\s*honors?)?/i,
  /^accomplishments?/i,

  // Languages
  /^languages?/i,

  // References
  /^references?/i,

  // Interests
  /^interests?/i,
  /^hobbies?/i
];

/* =====================================================
   BULLET POINT PATTERNS
   ===================================================== */
const BULLET_PATTERNS = [
  /^[•●○◦▪▸►→✓✔★☆-]\s*/,
  /^[\d]+[.)]\s*/,
  /^[a-z][.)]\s*/i,
  /^\*\s+/
];

/* =====================================================
   TEXT CLEANING UTILITIES
   ===================================================== */

function normalizeWhitespace(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, "  ")
    .replace(/\u00A0/g, " ") // Non-breaking space
    .replace(/\u2003/g, " ") // Em space
    .replace(/\u2002/g, " ") // En space
    .replace(/\u200B/g, "")  // Zero-width space
    .replace(/ +/g, " ");
}

function normalizeUnicode(text) {
  return text
    // Smart quotes → regular quotes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    // Dashes
    .replace(/[\u2013\u2014]/g, "-")
    // Bullets
    .replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, "•")
    // Ellipsis
    .replace(/\u2026/g, "...");
}

function cleanLine(line) {
  return line
    .trim()
    .replace(/^\s*[-–—]\s*/, "• ") // Normalize leading dashes to bullets
    .replace(/\s+/g, " ");
}

function isSectionHeader(line) {
  const cleaned = line.trim();
  if (cleaned.length > 50) return false; // Too long to be a header
  if (cleaned.length < 2) return false;
  
  return SECTION_PATTERNS.some(pattern => pattern.test(cleaned));
}

function isBulletPoint(line) {
  const trimmed = line.trim();
  return BULLET_PATTERNS.some(pattern => pattern.test(trimmed));
}

function normalizeBullet(line) {
  let cleaned = line.trim();
  
  // Replace various bullet styles with standard bullet
  BULLET_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, "• ");
  });
  
  return cleaned;
}

/* =====================================================
   MAIN PDF TEXT EXTRACTION
   ===================================================== */

async function extractTextFromPDF(buffer) {
  const options = {
    // Custom page renderer for better text extraction
    pagerender: function(pageData) {
      const textContent = pageData.getTextContent();
      
      return textContent.then(function(data) {
        let lastY = null;
        let text = "";
        
        // Sort items by Y position (top to bottom) then X (left to right)
        const items = data.items.sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5]; // Y is inverted
          if (Math.abs(yDiff) > 5) return yDiff;
          return a.transform[4] - b.transform[4]; // X position
        });
        
        for (const item of items) {
          const currentY = Math.round(item.transform[5]);
          
          // New line detection based on Y position change
          if (lastY !== null && Math.abs(currentY - lastY) > 5) {
            text += "\n";
          } else if (lastY !== null) {
            // Same line - add space if needed
            text += " ";
          }
          
          text += item.str;
          lastY = currentY;
        }
        
        return text;
      });
    }
  };
  
  try {
    const data = await pdfParse(buffer, options);
    return processExtractedText(data.text);
  } catch (err) {
    console.error("PDF parse error, falling back to basic extraction:", err.message);
    // Fallback to basic extraction
    const data = await pdfParse(buffer);
    return processExtractedText(data.text);
  }
}

/* =====================================================
   POST-PROCESSING: STRUCTURE PRESERVATION
   ===================================================== */

function processExtractedText(rawText) {
  // Step 1: Normalize characters
  let text = normalizeUnicode(rawText);
  text = normalizeWhitespace(text);
  
  // Step 2: Process line by line
  const lines = text.split("\n");
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = cleanLine(lines[i]);
    
    // Skip empty lines (but preserve paragraph breaks)
    if (!line) {
      if (processedLines.length > 0 && processedLines[processedLines.length - 1] !== "") {
        processedLines.push("");
      }
      continue;
    }
    
    // Detect and format section headers
    if (isSectionHeader(line)) {
      // Add blank line before sections (if not already present)
      if (processedLines.length > 0 && processedLines[processedLines.length - 1] !== "") {
        processedLines.push("");
      }
      processedLines.push(line.toUpperCase());
      continue;
    }
    
    // Normalize bullet points
    if (isBulletPoint(line)) {
      line = normalizeBullet(line);
    }
    
    processedLines.push(line);
  }
  
  // Step 3: Join and clean up excessive blank lines
  let result = processedLines.join("\n");
  result = result.replace(/\n{3,}/g, "\n\n");
  result = result.trim();
  
  return result;
}

/* =====================================================
   STRUCTURED SECTION EXTRACTION (FOR AI ANALYSIS)
   ===================================================== */

function extractSections(text) {
  const sections = {
    contact: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    projects: "",
    certifications: "",
    other: ""
  };
  
  const lines = text.split("\n");
  let currentSection = "other";
  let buffer = [];
  
  const sectionMap = {
    experience: ["experience", "employment", "work", "career"],
    education: ["education", "academic", "qualification"],
    skills: ["skill", "competenc", "expertise", "technologies", "tools"],
    projects: ["project", "portfolio"],
    certifications: ["certification", "license"],
    summary: ["summary", "objective", "about", "profile"],
    contact: ["contact"]
  };
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    
    // Check if this is a section header
    let foundSection = null;
    for (const [section, keywords] of Object.entries(sectionMap)) {
      if (keywords.some(kw => lowerLine.startsWith(kw) || lowerLine.includes(kw))) {
        if (line.length < 40) { // Likely a header
          foundSection = section;
          break;
        }
      }
    }
    
    if (foundSection) {
      // Save previous section
      if (buffer.length > 0) {
        sections[currentSection] += buffer.join("\n") + "\n";
      }
      currentSection = foundSection;
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  
  // Save last section
  if (buffer.length > 0) {
    sections[currentSection] += buffer.join("\n");
  }
  
  // Clean up each section
  Object.keys(sections).forEach(key => {
    sections[key] = sections[key].trim();
  });
  
  return sections;
}

module.exports = { 
  extractTextFromPDF,
  extractSections,
  processExtractedText
};
