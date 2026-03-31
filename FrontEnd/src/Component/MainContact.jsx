// FindMeOnline.jsx
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/Jawad656567" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/jawad-ali-201640379" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/jawad37221?igsh=Yzlld214bmJncnRi" },
  { icon: <FaTwitter />, url: "https://x.com/JawadAl24229081" },
];

const FindMeOnline = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white text-black">
      <h2 className="text-3xl font-bold mb-6">Find Me Online</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition-colors text-xl"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FindMeOnline;