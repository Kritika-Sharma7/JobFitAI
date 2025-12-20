// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Roadmap", "Changelog"],
    Resources: ["Blog", "Documentation", "Guides", "API"],
    Company: ["About", "Careers", "Contact", "Privacy"],
    Social: ["Twitter", "LinkedIn", "GitHub", "Discord"],
  };

  return (
    <footer className="relative bg-slate-900 border-t border-white/5 mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <span className="font-black text-lg text-white">JobFit AI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered career intelligence for job seekers
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-bold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2025 JobFit AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <span
                  key={item}
                  className="text-sm text-gray-600 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
