import { useState, useEffect } from "react";
import axios from "axios";

const defaultData = {
  role: "Web Development Intern",
  company: "Tech Creator Software House",
  duration: "May 2025 – Present · Mardan, Pakistan",
  responsibilities: [
    "Developed and optimized frontend components using React and Tailwind CSS",
    "Managed source code and collaboration using Git & GitHub",
    "Deployed live projects using Vercel and Render platforms",
    "Improved UI responsiveness and performance across different screen sizes",
  ],
};

export default function WorkExperience() {
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/experience`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log("API error, using default data");
      });
  }, []);

  const visibleResponsibilities = showAll
    ? data.responsibilities
    : data.responsibilities.slice(0, 2);

  return (
    <>
      <div className="w-full border-t border-gray-300 -mt-27 lg:-mt-6"></div>

      <div className="bg-white w-full">
        <div className="max-w-6xl px-3 py-4">
          <div className="py-2">

            <h2 className="text-[25px] pl-4 font-black text-gray-700 mb-3">
              Work Experience
            </h2>

            <div className="pl-4">

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-md bg-gray-100 border flex items-center justify-center">
                  💼
                </div>

                <div>
                  <h3 className="text-[15px] font-bold">{data.role}</h3>
                  <p className="text-[14px] text-gray-700">{data.company}</p>
                  <p className="text-[13px] text-gray-500">{data.duration}</p>
                </div>
              </div>

              <div className="text-gray-800 text-[15px]">
                {visibleResponsibilities.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 mt-[6px] rounded-full"></span>
                    <span>{item}</span>
                  </div>
                ))}

                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-2 text-blue-700 text-sm"
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