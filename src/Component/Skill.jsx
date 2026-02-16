import React, { useState, useEffect } from "react";
import { Code2, Palette, Zap, Database, Cloud, Server } from "lucide-react";

function Skills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const skills = [
    { name: "CSS3", percentage: 100, icon: Palette },
    { name: "JavaScript", percentage: 95, icon: Code2 },
    { name: "React", percentage: 90, icon: Zap },
    { name: "Bootstrap", percentage: 85, icon: Palette },
    { name: "Tailwind CSS", percentage: 88, icon: Palette },
    { name: "MongoDB", percentage: 80, icon: Database },
  ];

  const tools = [
    { name: "Vercel", icon: Cloud },
    { name: "Render", icon: Server },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            My <span className="text-gray-500">Skills</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Technologies and tools I use to build modern applications
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-black mb-8 border-b pb-3">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <Icon className="text-white w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-lg text-black">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="font-bold text-gray-700">
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full transition-all duration-1000"
                      style={{
                        width: animate ? `${skill.percentage}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2 className="text-3xl font-semibold text-black mb-8 border-b pb-3">
            Tools & Deployment
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                >
                  <div className="p-4 bg-black rounded-full mb-4">
                    <Icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-black">
                    {tool.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Skills;
