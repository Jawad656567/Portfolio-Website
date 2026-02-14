// FeaturedProjects.jsx
import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Todo App",
    description: "A React-based Todo app with add, delete, and complete functionality.",
    image: "/images/todo.png",
    link: "https://github.com/Jawad656567/todo-react-app",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "My personal portfolio website showcasing my projects and skills.",
    image: "/images/portfolio.png",
    link: "https://jawad-portfolio.com",
  },
  {
    id: 3,
    title: "Weather App",
    description: "A weather forecasting app built with React and OpenWeather API.",
    image: "/images/weather.png",
    link: "https://github.com/Jawad656567/weather-app",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="mb-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Header */}
          <div className="flex items-center p-4">
            <img
              src="/images/profile.jpg" // Profile pic
              alt="Jawad Ali"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">Jawad Ali</h3>
              <p className="text-gray-500 text-sm">Web Developer • 2w</p>
            </div>
          </div>

          {/* Project Image */}
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </a>

          {/* Project Description */}
          <div className="p-4">
            <h4 className="font-semibold">{project.title}</h4>
            <p className="text-gray-700 text-sm mt-1">{project.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between p-4 border-t text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaHeart /> <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaComment /> <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaShare /> <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {/* Show All Posts Button */}
      <div className="text-center mt-4">
        <button className="px-6 py-2 border rounded-full hover:bg-gray-100 transition">
          Show All Posts
        </button>
      </div>
    </section>
  );
};

export default FeaturedProjects;
