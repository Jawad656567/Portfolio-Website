import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ThemeContext } from "../context/themeContext";

/* ─── Keyframes ──────────────────────────────────────────────────── */
const STYLES = `
  @keyframes shimmerMove {
    0%   { background-position: -400% center; }
    100% { background-position:  400% center; }
  }
  @keyframes bannerReveal {
    from { opacity: 0; transform: scale(1.04); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes picSlideUp {
    from { opacity: 0; transform: translateY(24px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes borderFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scanLine {
    0%   { top: 0%;   opacity: 0.6; }
    90%  { top: 100%; opacity: 0.3; }
    100% { top: 100%; opacity: 0;   }
  }

  /* Dark shimmer — very dark grays */
  .shimmer-dark {
    background: linear-gradient(
      90deg,
      #0d0d0d 0%,
      #1a1a1a 20%,
      #2a2a2a 40%,
      #1a1a1a 60%,
      #0d0d0d 80%
    );
    background-size: 400% 100%;
    animation: shimmerMove 2s ease-in-out infinite;
  }

  /* Light shimmer — soft grays */
  .shimmer-light {
    background: linear-gradient(
      90deg,
      #e5e7eb 0%,
      #f3f4f6 20%,
      #ffffff 40%,
      #f3f4f6 60%,
      #e5e7eb 80%
    );
    background-size: 400% 100%;
    animation: shimmerMove 2s ease-in-out infinite;
  }

  .banner-reveal {
    animation: bannerReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .pic-slide-up {
    animation: picSlideUp 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both;
  }

  .banner-border {
    animation: borderFadeIn 0.6s ease 0.5s both;
  }

  /* Scan line effect on banner reveal */
  .scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    pointer-events: none;
    animation: scanLine 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  }

  /* Hover zoom on banner */
  .banner-img {
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .banner-img:hover {
    transform: scale(1.03);
  }

  /* Hover lift on profile pic */
  .pic-hover {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .pic-hover:hover {
    transform: translateY(-4px) scale(1.03);
  }
`;

const ProfileHeader = () => {
  const [profile, setProfile]   = useState({});
  const [loading, setLoading]   = useState(true);
  const [revealed, setRevealed] = useState(false);
  const { theme } = useContext(ThemeContext);

  const isDark     = theme === "dark";
  const wrapperBg  = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const shimmerCls = isDark ? "shimmer-dark" : "shimmer-light";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res  = await axios.get(`${API}/api/profile`);
        const data = res.data || {};
        setProfile({
          bannerUrl:     data.banner     || "banner.jpg",
          profilePicUrl: data.profilePic || "profil.jpeg",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile({
          bannerUrl:     "banner.jpg",
          profilePicUrl: "profil.jpeg",
        });
      } finally {
        setLoading(false);
        /* slight delay so animation plays after shimmer fades */
        setTimeout(() => setRevealed(true), 60);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <div className={`relative w-full z-20 ${wrapperBg} transition-colors duration-300`}>

        {/* ── Banner ──────────────────────────────────────────────── */}
        <div className="w-full aspect-[4/1] lg:h-64 overflow-hidden relative">

          {loading ? (
            <div className={`w-full h-full ${shimmerCls}`} />
          ) : (
            <>
              <img
                src={profile.bannerUrl}
                alt="Banner"
                className={`banner-img w-full h-full object-cover object-top ${revealed ? "banner-reveal" : "opacity-0"}`}
              />

              {/* Scan line — plays once on reveal */}
              {revealed && <div className="scan-line" />}

              {/* Bottom line */}
              <div
                className="banner-border absolute left-0 bottom-0 w-full h-[1px] z-0"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",

                }}
              />
            </>
          )}
        </div>

        {/* ── Profile Pic ─────────────────────────────────────────── */}
        <div className="absolute left-4 sm:left-8 -bottom-16 sm:-bottom-20 lg:left-8 lg:-bottom-24">
          {loading ? (
            <div
              className={`
                w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56
                rounded-full
                border-4
                ${isDark ? "border-white/20" : "border-white/50"}
                ${shimmerCls}
              `}
            />
          ) : (
            <div
              className={`
                pic-hover
                ${revealed ? "pic-slide-up" : "opacity-0"}
                w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56
                rounded-full overflow-hidden
                border-2
                ${isDark ? "border-white/30" : "border-white/80"}
                transition-colors duration-300
              `}
            >
              <img
                src={profile.profilePicUrl}
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default ProfileHeader;