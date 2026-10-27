import React from "react";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaLinkedin,
  FaYoutube,
  FaGamepad,
  FaUserFriends,
  FaTrophy,
  FaQuestionCircle,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

const GamingFooter = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState({ loading: false, message: "", type: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, message: "", type: "" });
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: "Subscribed successfully!", type: "success" });
        setEmail("");
      } else {
        setStatus({ loading: false, message: data.message || "Subscription failed.", type: "error" });
      }
    } catch (error) {
      setStatus({ loading: false, message: "Network error. Try again later.", type: "error" });
    }
  };

  return (
    <footer className="bg-black text-gray-300 font-sans">
      {/* Main Footer Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <FaGamepad className="text-3xl text-purple-500" />
              <h2 className="text-2xl font-bold text-white">
                <span className="text-purple-500">FOXZOID</span>GAME
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for competitive gaming. Join millions of
              players worldwide and experience next-level gaming.
            </p>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                {
                  icon: FaYoutube,
                  label: "YouTube",
                  href: "https://www.youtube.com/@foxzoidgamestudio",
                },
                {
                  icon: FaInstagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/foxzoidgame/",
                },
                {
                  icon: FaFacebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/people/Foxzoid-Game-Studio/61584172028778/",
                },
                {
                  icon: FaLinkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/foxzoid-games-studio-7251613a7/",
                },
                {
                  icon: FaEnvelope,
                  label: "Email",
                  href: "mailto:foxzoidgamestudio@gmail.com",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-purple-600 p-2 rounded-lg transition duration-300 transform hover:scale-110"
                    aria-label={item.label}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-purple-900 inline-block">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                {
                  to: "/games",
                  text: "Games Library",
                  icon: <FaGamepad className="inline mr-2 text-purple-400" />,
                },
                {
                  to: "/about",
                  text: "About",
                  icon: <FaTrophy className="inline mr-2 text-yellow-400" />,
                },
                {
                  to: "/blog",
                  text: "Blog",
                  icon: <FaUserFriends className="inline mr-2 text-blue-400" />,
                },
                {
                  to: "/contact",
                  text: "Support",
                  icon: (
                    <FaQuestionCircle className="inline mr-2 text-green-400" />
                  ),
                },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="hover:text-white hover:translate-x-2 transition duration-300 flex items-center justify-center md:justify-start"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-purple-900 inline-block">
              Stay Updated
            </h3>

            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Get the latest news on game releases, tournaments, and exclusive
              offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-900"
              />
              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-purple-900/30 disabled:opacity-50"
              >
                {status.loading ? "Subscribing..." : "Subscribe"}
              </button>
              {status.message && (
                <p className={`text-sm mt-2 ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Foxzoid Game Studio. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="#"
                className="text-gray-400 hover:text-white text-sm transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white text-sm transition duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GamingFooter;
