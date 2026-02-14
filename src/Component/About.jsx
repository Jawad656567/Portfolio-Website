import React, { useState } from 'react';

export default function LinkedInAbout() {
  const [showFullText, setShowFullText] = useState(false);
  
  const aboutText = `Gold Medalist in Geology with 1+ year of hands-on experience in geotechnical site investigations, material testing, rock classification, and mining exploration. Currently working as a Geological Engineer at CGGC – Dasu Hydropower World bank funded Project, contributing to large-scale hydropower infrastructure development.

Skilled in geological mapping, core logging, laboratory testing, and preparing detailed technical reports. Proficient in using tools like ArcGIS, AutoCAD, and RocData for data analysis and visualization.

Passionate about applying geological expertise to solve real-world engineering challenges and contributing to sustainable infrastructure projects. Eager to expand my knowledge in hydrogeology, environmental geology, and advanced geotechnical engineering.`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Full screen top line */}
      <div className="w-full border-t border-gray-300"></div>
      
      <div className="max-w-6xl p-3">
        
        {/* About Section */}
        <div className="bg-white">
          <div className="py-4">
           <h2 className="text-[25px] font-black text-gray-700 mb-4 pl-3">About</h2>

            <div className="relative">
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                {showFullText ? aboutText : (
                  <>
                    <span className="inline-flex items-start">
                      <span className="mr-2">🎓</span>
                      <span>
                        Gold Medalist in Geology with 1+ year of hands-on experience in geotechnical site investigations, material testing, rock classification, and mining exploration. Currently working as a Geological Engineer at CGGC – Dasu Hydropower World bank funded Project, contributing to large-scale hydropower infrastructure development.
                      </span>
                    </span>
                    <br />
                    <span className="text-gray-500">...</span>
                  </>
                )}
              </p>
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="mt-2 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:underline transition px-2 py-1 rounded"
              >
                {showFullText ? '...see less' : '...see more'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}