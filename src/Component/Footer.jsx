const navLinks = ["Home", "About", "Activities", "Education", "Experience", "Contact"];

export default function LinkedInFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 pt-10 pb-5">
      <div className="mx-auto px-6" style={{ maxWidth: 1128 }}>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">

          {/* Profile Pic */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black shadow-lg bg-gray-100 flex items-center justify-center group">
  
  <img
    src="/logoo.jpeg"
    alt="Profile"
    className="w-full h-full mt-2 object-cover scale-240"
  />

</div>

          </div>

          {/* Nav Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Navigation</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 relative group"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-4" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} <span className="text-blue-600 font-semibold">JWD Coding</span>. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}