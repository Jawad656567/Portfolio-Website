import { useState } from "react";

const responsibilities = [
  "Developed and optimized frontend components using React and Tailwind CSS",
  "Managed source code and collaboration using Git & GitHub",
  "Deployed live projects using Vercel and Render platforms",
  "Improved UI responsiveness and performance across different screen sizes",
];

const tags = ["React", "Tailwind CSS", "Git", "GitHub", "Vercel", "Render"];

export default function WorkExperience() {
  const [showAll, setShowAll] = useState(false);

  const visibleResponsibilities = showAll ? responsibilities : responsibilities.slice(0, 2);

  return (
    <>
      <div className="w-full border-t border-gray-300 -mt-27 lg:-mt-6"></div>

      <div className="bg-white w-full">
        <div className="max-w-6xl px-3 py-4">
          <div className="py-2">

            {/* Section Heading */}
            <h2 className="text-[25px] pl-4 font-black text-gray-700 mb-3">Work Experience</h2>

            <div className="pl-4">

              {/* Company Info Row */}
              <div className="flex items-start gap-4 mb-4">
                {/* Logo Placeholder */}
                <div className="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💼</span>
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Web Development Intern</h3>
                  <p className="text-[14px] text-gray-700">Tech Creator Software House</p>
                  <p className="text-[13px] text-gray-500">May 2025 – Present · Mardan, Pakistan</p>
                  <span className="inline-flex items-center gap-1.5 mt-1.5 text-[12px] text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-0.5 font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Currently Active
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="text-gray-800 text-[15px] leading-relaxed">
                <div className="space-y-2">
                  {visibleResponsibilities.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-2 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:underline transition px-2 py-1 rounded"
                >
                  {showAll ? "...See Less" : "...See More"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
       <div className="w-full border-t border-gray-300"></div>
    </>
  );
}