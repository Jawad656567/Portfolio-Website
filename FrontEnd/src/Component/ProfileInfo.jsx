import { Link } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

/* ─────────────────────────────────────────
   Global keyframes — no purple/blue at all
───────────────────────────────────────── */
const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes glowPulseDark {
    0%, 100% { box-shadow: 0 2px 8px 0 rgba(255,255,255,0); }
    50%       { box-shadow: 0 2px 14px 2px rgba(255,255,255,0.10); }
  }
  @keyframes glowPulseLight {
    0%, 100% { box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06); }
    50%       { box-shadow: 0 2px 18px 2px rgba(0,0,0,0.13); }
  }
  @keyframes floatDot {
    0%   { transform: translateY(0px)    scale(1);    opacity: 0.4; }
    50%  { transform: translateY(-10px)  scale(1.25); opacity: 0.8; }
    100% { transform: translateY(0px)    scale(1);    opacity: 0.4; }
  }
  @keyframes shimmerSweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes borderPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.8; }
  }
  @keyframes badgePop {
    0%   { opacity: 0; transform: scale(0.6) translateY(6px); }
    70%  { transform: scale(1.08) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes lineExpand {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes skillIconSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes softBounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-4px); }
    60%       { transform: translateY(-2px); }
  }

  .profile-card { animation: fadeIn 0.4s ease both; }
  .profile-card.dark-glow  { animation: fadeIn 0.4s ease both, glowPulseDark  4s ease-in-out 1s infinite; }
  .profile-card.light-glow { animation: fadeIn 0.4s ease both, glowPulseLight 4s ease-in-out 1s infinite; }

  .profile-name     { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
  .profile-bio      { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
  .profile-desc     { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.34s both; }
  .profile-location { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
  .profile-edu      { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
  .profile-contact  { animation: badgePop   0.5s cubic-bezier(0.34,1.56,0.64,1) 0.62s both; }

  .skill-item-0 { animation: fadeSlideRight 0.55s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
  .skill-item-1 { animation: fadeSlideRight 0.55s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
  .skill-item-2 { animation: fadeSlideRight 0.55s cubic-bezier(0.22,1,0.36,1) 0.58s both; }

  .skill-icon-wrap { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
  .skill-item:hover .skill-icon-wrap { transform: scale(1.14) rotate(-6deg); }
  .skill-label { transition: letter-spacing 0.3s ease; }
  .skill-item:hover .skill-label { letter-spacing: 0.04em; }

  .react-icon-spin:hover { animation: skillIconSpin 1.2s linear infinite; }

  .contact-link { position: relative; display: inline-block; }
  .contact-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -1px;
    height: 1.5px;
    width: 100%;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .contact-link:hover::after { transform: scaleX(1); }

  .dot-float { animation: floatDot var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }

  .name-shimmer-dark {
    background: linear-gradient(90deg, #fff 25%, rgba(255,255,255,0.45) 50%, #fff 75%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmerSweep 3.5s linear 1s infinite;
  }
  .name-shimmer-light {
    background: linear-gradient(90deg, #111 25%, rgba(0,0,0,0.35) 50%, #111 75%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmerSweep 3.5s linear 1s infinite;
  }

  .location-ping { animation: softBounce 2.2s ease-in-out infinite; display: inline-block; }
`;

/* Floating dots — hidden on mobile, theme colors only */
const FloatingDots = ({ isDark }) => {
  const dots = [
    { top: "14%", left: "4%",  size: 4, dur: "3.1s", delay: "0s"   },
    { top: "60%", left: "2%",  size: 3, dur: "2.5s", delay: "0.7s" },
    { top: "82%", left: "7%",  size: 4, dur: "3.8s", delay: "1.2s" },
    { top: "18%", left: "91%", size: 4, dur: "2.8s", delay: "0.3s" },
    { top: "68%", left: "94%", size: 3, dur: "3.5s", delay: "1.0s" },
    { top: "42%", left: "89%", size: 4, dur: "2.6s", delay: "1.5s" },
  ];
  const color = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className="dot-float pointer-events-none absolute rounded-full hidden sm:block"
          style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            background: color,
            "--dur":   d.dur,
            "--delay": d.delay,
          }}
        />
      ))}
    </>
  );
};

const UserProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const cardRef   = useRef(null);

  const isDark = theme === "dark";

  const cardBg        = isDark ? "bg-gray-950 text-white" : "bg-[#F7F6F2] text-slate-900";
  const textPrimary   = isDark ? "text-white"             : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400"          : "text-gray-500";
  const textBody      = isDark ? "text-gray-300"          : "text-gray-700";
  const iconBg        = isDark ? "bg-white"               : "bg-black";
  const iconColor     = isDark ? "text-black"             : "text-white";
  const skillText     = isDark ? "text-white"             : "text-black";
  const contactColor  = isDark ? "text-gray-300"          : "text-gray-700";
  const accentLine    = isDark ? "bg-white"               : "bg-black";

  const borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";

  const iconHoverShadow = isDark
    ? "group-hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.15)]"
    : "group-hover:shadow-[0_0_10px_2px_rgba(0,0,0,0.15)]";

  const hoverDotColor = isDark ? "group-hover:bg-white" : "group-hover:bg-black";

  const shimmerBar = isDark
    ? "animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
    : "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg) scale(1.004)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ProfileInfo`);
        setProfile(res.data);
      } catch {
        setProfile(defaultProfile);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <style>{STYLES}</style>
        <div className={`relative overflow-hidden max-w-7xl mx-auto ${cardBg} shadow-sm transition-colors duration-500`}>
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
                <div className={`h-6 w-36 ${shimmerBar}`} />
                <div className={`h-5 w-24 ${shimmerBar}`} />
              </div>
              <div className={`h-4 w-2/3 ${shimmerBar}`} />
              <div className={`h-4 w-1/2 ${shimmerBar}`} />
              <div className={`h-4 w-1/2 ${shimmerBar}`} />
              <div className={`h-3 w-1/4 ${shimmerBar}`} />
              <div className="space-y-2 pt-1">
                <div className={`h-3 w-1/3 ${shimmerBar}`} />
                <div className={`h-3 w-1/4 ${shimmerBar}`} />
              </div>
              <div className={`h-3 w-20 ${shimmerBar}`} />
            </div>
            <div className="hidden md:flex flex-col space-y-4 pr-16 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${shimmerBar}`} />
                  <div className={`h-4 w-36 ${shimmerBar}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!profile) return null;

  const skills = [
    {
      label: "Front-End Development",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
    },
    { label: "React & Tailwind CSS", isReact: true },
    {
      label: "Continuous Learning",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z" />,
    },
  ];

  return (
    <>
      <style>{STYLES}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`profile-card ${isDark ? "dark-glow" : "light-glow"} relative overflow-hidden max-w-7xl mx-auto ${cardBg} transition-all duration-300`}
        style={{ willChange: "transform" }}
      >
        {/* Top border line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
            animation: "borderPulse 3s ease-in-out infinite",
          }}
        />

        {/* Dotted grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "#fff" : "#000"} 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radial glow — desktop only, black or white */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full hidden sm:block"
          style={{
            opacity: isDark ? 0.04 : 0.03,
            background: isDark
              ? "radial-gradient(circle, #fff 0%, transparent 70%)"
              : "radial-gradient(circle, #000 0%, transparent 70%)",
            animation: "floatDot 7s ease-in-out infinite",
          }}
        />

        {/* Floating dots — desktop only */}
        <FloatingDots isDark={isDark} />

        {/* Main content */}
        <div className="flex flex-col md:ml-5 ml-0 md:flex-row items-start md:items-center px-6 pb-8 pt-4 space-y-4 md:space-y-0 md:space-x-6 relative">

          <div className="lg:pt-24 pt-12 flex-1">

            <h2 className={`profile-name text-2xl font-bold ${textPrimary}`}>
              <span className={isDark ? "name-shimmer-dark" : "name-shimmer-light"}>
                {profile.name}
              </span>{" "}
              <span className={`${textSecondary} text-lg font-normal`}>
                {profile.semester}
              </span>
            </h2>

            {/* Accent line — white on dark, black on light */}
            <div
              className={`mt-1 mb-2 h-[1.5px] w-0 rounded-full ${accentLine} opacity-25`}
              style={{ animation: "lineExpand 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards" }}
            />

            <p className={`profile-bio  ${textBody} mt-1`}>{profile.bio}</p>
            <p className={`profile-desc ${textBody} mt-1`}>{profile.description}</p>

            <div className={`profile-location flex items-center ${textSecondary} text-sm mt-2 space-x-2`}>
              <span className="location-ping">📍</span>
              <span>{profile.location}</span>
            </div>

            <div className={`profile-edu flex flex-col space-y-1 ${textBody} text-sm mt-3`}>
              <span>{profile.education}</span>
              <span>{profile.university}</span>
            </div>

            <div className="profile-contact mt-4">
              <Link to="/contact" className={`contact-link ${contactColor} font-medium text-sm`}>
                Contact info
              </Link>
            </div>
          </div>

          {/* Right – Skills */}
          <div className="hidden md:flex flex-col space-y-4 pt-18 pr-50">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`skill-item skill-item-${idx} flex items-center space-x-3 group cursor-default`}
              >
                <div
                  className={`skill-icon-wrap w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center ${iconHoverShadow} transition-shadow duration-300`}
                >
                  {skill.isReact ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 250 250"
                      className={`react-icon-spin h-5 w-5 ${iconColor}`}
                    >
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

                <span className={`skill-label font-medium ${skillText} text-sm`}>
                  {skill.label}
                </span>

                {/* Hover dot — black/white only */}
                <span
                  className={`ml-1 w-1.5 h-1.5 rounded-full opacity-0 scale-0 ${hoverDotColor} group-hover:opacity-100 group-hover:scale-100 transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
          }}
        />
      </div>
    </>
  );
};

export default UserProfileCard;