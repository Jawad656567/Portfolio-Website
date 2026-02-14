import React, { useState } from 'react';

export default function LinkedInAbout() {
  const [showFullText, setShowFullText] = useState(false);

  const fullTextParagraphs = [
    { icon: '🎓', text: 'I am currently in my 6th semester of a Bachelor\'s degree in Computer Science, with a strong focus on Front-End Development. I have developed solid proficiency in ⚛️ React and have successfully completed multiple practical projects that strengthened my understanding of modern web development practices.' },
    { icon: '💻', text: 'Through these projects, I have gained hands-on experience in building responsive, user-friendly, and well-structured web applications using React and 🎨 Tailwind CSS.' },
    { icon: '🧩', text: 'I am committed to writing clean, maintainable, and scalable code while continuously enhancing my problem-solving abilities. I am passionate about learning emerging technologies and staying aligned with current industry standards.' },
    { icon: '🚀', text: 'My objective is to grow as a professional Front-End Developer and contribute to building impactful, high-quality web applications.' }
  ];

  return (
    <>
     <div className="w-full border-t border-gray-300"></div>
    <div className="bg-white w-full"> {/* poora background white */}
      <div className="max-w-6xl px-3 py-4"> {/* content center with padding */}
        <div className="py-2">
          <h2 className="text-[25px] pl-4 font-black text-gray-700 mb-3">About</h2>

          <div className="relative">
            <div className="text-gray-800 text-[15px] leading-relaxed">
              {showFullText ? (
                <div className="space-y-2">
                  {fullTextParagraphs.map((para, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2 flex-shrink-0">{para.icon}</span>
                      <span>{para.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start">
                  <span className="mr-2 flex-shrink-0">🎓</span>
                  <span>{fullTextParagraphs[0].text}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="mt-1 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:underline transition px-2 py-1 rounded"
            >
              {showFullText ? '...See Less' : '...See More'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
