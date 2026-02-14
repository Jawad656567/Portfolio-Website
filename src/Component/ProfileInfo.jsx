const UserProfileCard = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

      {/* Info Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center px-6 pb-6 pt-4 space-y-4 md:space-y-0 md:space-x-6">

        {/* Center: Name & Info */}
        <div className="lg:pt-24 pt-12 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Jawad Ali <span className="text-gray-500 text-lg">CS · 5th Semester</span>
          </h2>
          <p className="text-gray-700 mt-1">
            CS Student 🎓 | Front-End Developer 💻
          </p>
          <p className="text-gray-700 mt-1">
            Currently learning and improving Front-End development skills 🚀
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mt-2 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Swabi, Khyber Pakhtunkhwa, Pakistan</span>
          </div>

          {/* Education */}
          <div className="flex flex-col space-y-1 text-gray-700 text-sm mt-3">
            <span>Computer Science · 5th Semester</span>
            <span>University of Swabi</span>
          </div>

          {/* Contact info */}
          <div className="mt-3">
            <a href="#" className="text-blue-600 font-medium hover:underline text-sm">
              Contact info
            </a>
          </div>
        </div>

        {/* RIGHT SIDE – SKILL HIGHLIGHTS (PC ONLY) */}
        <div className="hidden md:flex flex-col space-y-4 pt-18 pr-50">

          {/* Frontend Development */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
            </div>
            <span className="font-medium text-black text-sm">
              Front-End Development
            </span>
          </div>

        <div className="flex items-center space-x-3">
  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className="h-5 w-5 text-white">
      <circle cx="125" cy="125" r="20" fill="currentColor" />
      <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10"/>
      <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(60 125 125)"/>
      <ellipse cx="125" cy="125" rx="100" ry="50" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(120 125 125)"/>
    </svg>
  </div>
  <span className="font-medium text-black text-sm">
    React & Tailwind CSS
  </span>
</div>


          {/* Continuous Learning */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <span className="font-medium text-black text-sm">
              Continuous Learning
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
