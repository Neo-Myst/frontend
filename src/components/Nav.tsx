import "../css/Nav.css";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full absolute flex items-center justify-between px-6 py-4 shadow-md bg-blue-1000">
      <div className="text-4xl font-bold text-white">
        Machine <span className="text-blue-500">Learning</span>
      </div>

      <div className="flex items-center space-x-10">
        <a
          href="#"
          className="text-white hover:text-white transition duration-300"
        >
          Log In
        </a>

        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Nav;
