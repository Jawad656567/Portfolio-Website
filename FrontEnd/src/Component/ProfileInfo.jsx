import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

const UserProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  // Theme classes
  const cardBg = isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const textBody = isDark ? "text-gray-300" : "text-gray-700";
  const iconBg = isDark ? "bg-white" : "bg-black";
  const iconColor = isDark ? "text-black" : "text-white";
  const skillText = isDark ? "text-white" : "text-black";

  const shimmer = isDark
    ? "animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
    : "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";

  const defaultProfile = {
    name: "Jawad Ali",
    semester: "CS · 6th Semester",
    bio: "CS Student 🎓 | Front-End Developer 💻",
    description: "Currently learning and improving Front-End development skills 🚀",
    location: "Swabi Pakistan",
    education: "Computer Science · 6th Semester",
    university: "University of Swabi",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/ProfileInfo`
        );
        setProfile(res.data);
      } catch (err) {
        setProfile(defaultProfile);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className={`relative overflow-hidden max-w-7xl mx-auto ${cardBg} shadow-lg transition-colors duration-500`}>
        
        {/* ✅ Dotted Background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center px-6 pb-6 pt-4 space-y-4 md:space-y-0 md:space-x-6 mt-16 md:mt-24">
          <div className="flex-1 space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <div className={`h-6 w-36 ${shimmer}`} />
              <div className={`h-5 w-24 ${shimmer}`} />
            </div>
            <div className={`h-4 w-2/3 ${shimmer}`} />
            <div className={`h-4 w-1/2 ${shimmer}`} />
            <div className={`h-4 w-1/2 ${shimmer}`} />
            <div className={`h-4 w-1/2 ${shimmer}`} />
            <div className={`h-3 w-1/4 ${shimmer}`} />
            <div className="space-y-2 pt-1">
              <div className={`h-3 w-1/3 ${shimmer}`} />
              <div className={`h-3 w-1/4 ${shimmer}`} />
            </div>
            <div className={`h-3 w-20 ${shimmer}`} />
          </div>

          <div className="hidden md:flex flex-col space-y-4 pr-16 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${shimmer}`} />
                <div className={`h-4 w-36 ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={`relative overflow-hidden max-w-7xl mx-auto ${cardBg} shadow-lg shadow-purple-500/20 transition-colors duration-500`}>
      
      {/* ✅ Dotted Background Animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="flex flex-col md:ml-5 ml-0 md:flex-row items-start md:items-center px-6 pb-6 pt-4 space-y-4 md:space-y-0 md:space-x-6 relative">
        <div className="lg:pt-24 pt-12 flex-1">
          <h2 className={`text-2xl font-bold ${textPrimary}`}>
            {profile.name}{" "}
            <span className={`${textSecondary} text-lg`}>
              {profile.semester}
            </span>
          </h2>

          <p className={`${textBody} mt-1`}>{profile.bio}</p>
          <p className={`${textBody} mt-1`}>{profile.description}</p>

          <div className={`flex items-center ${textSecondary} text-sm mt-2 space-x-2`}>
            <span>📍 {profile.location}</span>
          </div>

          <div className={`flex flex-col space-y-1 ${textBody} text-sm mt-3`}>
            <span>{profile.education}</span>
            <span>{profile.university}</span>
          </div>

          <div className="mt-3">
            <Link
              to="/contact"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Contact info
            </Link>
          </div>
        </div>

        {/* Right Side – Skill Highlights */}
        <div className="hidden md:flex flex-col space-y-4 pt-18 pr-50">
          {[
            {
              label: "Front-End Development",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                />
              ),
            },
            {
              label: "React & Tailwind CSS",
              icon: null,
              isReact: true,
            },
            {
              label: "Continuous Learning",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              ),
            },
          ].map((skill, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                {skill.isReact ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className={`h-5 w-5 ${iconColor}`}>
                    <circle cx="125" cy="125" r="20" fill="currentColor" />
                    <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" />
                    <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(60 125 125)" />
                    <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(120 125 125)" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {skill.icon}
                  </svg>
                )}
              </div>
              <span className={`font-medium ${skillText} text-sm transition-colors duration-300`}>
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className={`w-full h-[1px] ${isDark ? "bg-gray-700" : "bg-gray-300"} mt-2`} />
    </div>
  );
};

export default UserProfileCard;