import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  strokeWidth={2}
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Accessibility Scanner
              </span>
            </Link>
          </div>

          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                key="home"
                to="/home"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-400 hover:bg-gray-100"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
