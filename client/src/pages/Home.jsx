import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Users,
  Mail,
  CheckSquare,
  BarChart,
  Shield,
  Zap,
  Github,
  Menu,
  X,
} from "lucide-react";
import { MdOutlineAddTask } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MdOutlineAddTask className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              TaskHub
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Features
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <a
            href="#home"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#features"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={closeMenu}
          >
            Features
          </a>
          <a
            href="#services"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={closeMenu}
          >
            Services
          </a>
          <a
            href="#about"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={closeMenu}
          >
            About
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="pt-20 bg-gradient-to-b from-indigo-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              <span className="relative whitespace-nowrap text-blue-600">
                <span className="relative">Manage Tasks </span>
              </span>
              with Efficiency and Ease
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Transform your workflow with our intuitive task management
              platform. Stay organized, collaborate seamlessly, and achieve more
              together.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => navigate("/log-in")}
              >
                Get Started
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="order-first md:order-last">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 rounded-lg transform rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80"
                alt="Task Management"
                className="relative rounded-lg shadow-xl w-full transform transition hover:-translate-y-1 hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <CheckSquare className="h-8 w-8 text-indigo-600" />,
      title: "Task Organization",
      description:
        "Organize tasks with custom labels, priorities, and due dates",
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with real-time updates and sharing",
    },
    {
      icon: <BarChart className="h-8 w-8 text-indigo-600" />,
      title: "Progress Tracking",
      description: "Monitor project progress with visual analytics and reports",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure Platform",
      description: "Enterprise-grade security to protect your data",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Features for Your Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Zap className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">
              Personal Task Management
            </h3>
            <p className="text-gray-600">
              Perfect for individuals looking to organize their daily tasks and
              boost productivity.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
            <p className="text-gray-600">
              Comprehensive tools for teams to work together efficiently on
              projects.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <BarChart className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Enterprise Solutions</h3>
            <p className="text-gray-600">
              Scalable solutions for large organizations with advanced security
              features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our Project
            </h2>
            <p className="text-gray-600 mb-6">
              TaskFlow was born from the need for a more intuitive and efficient
              way to manage tasks and collaborate with team members. Our
              platform combines powerful features with simplicity, making task
              management accessible to everyone.
            </p>
            <p className="text-gray-600 mb-6">
              We're committed to continuous improvement and innovation, always
              listening to our users' feedback to create the best possible task
              management experience.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Get in Touch
        </h2>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">TaskHub</span>
            </div>
            <p className="mt-4 text-gray-400">
              Making task management simple and efficient for teams of all
              sizes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@taskhub.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
