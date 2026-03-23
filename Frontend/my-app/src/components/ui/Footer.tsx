const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            🌍 AI Travel Planner
          </h2>
          <p className="text-sm">
            Plan smarter, travel better. Powered by AI to craft your perfect journey.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-white">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-2">Contact</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: vaibhavning@gmail.com</li>
            <li>
              GitHub: 
              <a
                href="https://github.com/vaibhav666-glitch"
                target="_blank"
                className="hover:text-white ml-1"
              >
                github.com/ai-travel
              </a>
            </li>
            <li>
              Instagram: 
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-white ml-1"
              >
                @heaven_travels
              </a>
            </li>
            <li>Address: Somewhere beyond clouds ☁️✨</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-700">
        © 2026 AI Travel Planner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;