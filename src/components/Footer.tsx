
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#fde9e9] pt-12 pb-8 px-4">
      {/* Brand logo/name and social icons */}
      <div className="flex flex-col items-center gap-6">
        {/* Brand name or logo */}
        <span className="font-serif text-4xl tracking-wide font-semibold text-neutral-800 mb-2">
          SAKSHI KHETTERPAL
        </span>
        {/* Socials */}
        <div className="flex gap-5">
          <a href="#" aria-label="Instagram" className="text-neutral-800 text-2xl hover:opacity-70">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook" className="text-neutral-800 text-2xl hover:opacity-70">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Pinterest" className="text-neutral-800 text-2xl hover:opacity-70">
            <FaPinterestP />
          </a>
          <a href="#" aria-label="YouTube" className="text-neutral-800 text-2xl hover:opacity-70">
            <FaYoutube />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-neutral-800 text-2xl hover:opacity-70">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      
      {/* Divider */}
      <div className="my-10 border-t border-neutral-400/30 w-full max-w-2xl mx-auto" />

      {/* Quick links */}
      <div className="flex flex-wrap justify-center gap-8 mb-6 text-neutral-800 text-lg font-light">
        <a href="#" className="hover:underline">Shop</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">Privacy</a>
      </div>

      {/* Copyright */}
      <p className="text-center text-neutral-500 text-sm font-light">
        &copy; {new Date().getFullYear()} SAKSHI KHETTERPAL. All rights reserved.
      </p>
    </footer>
  );
}
