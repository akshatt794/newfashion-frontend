// src/components/Header.tsx

import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#fde9e9]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4 px-8 relative">
        {/* LEFT NAV LINKS */}
        <nav className="flex items-center gap-7 flex-1 min-w-fit">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/login" className="hover:underline">Sign in</Link>
          <Link to="/register" className="hover:underline">Sign up</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </nav>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Link
            to="/"
            className="text-4xl font-light tracking-wide"
            style={{ letterSpacing: "0.12em" }}
          >
            SAKSHI KHETTERPAL
          </Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-7 flex-1 justify-end min-w-fit">
          {/* Social Icons */}
          <a
            href="https://instagram.com/YOUR_PROFILE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://facebook.com/YOUR_PROFILE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600 transition"
          >
            <FaFacebookF className="text-2xl" />
          </a>
          <a
            href="https://twitter.com/YOUR_PROFILE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-sky-400 transition"
          >
            <FaTwitter className="text-2xl" />
          </a>

          {/* User action icons */}
          <Link to="/search" aria-label="Search">
            <HiOutlineMagnifyingGlass className="text-2xl" />
          </Link>
          <Link to="/login" aria-label="Login">
            <HiOutlineUser className="text-2xl" />
          </Link>
          <Link to="/cart" aria-label="Cart">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
