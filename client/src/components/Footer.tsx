import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link href="#">
              <a className="text-base text-gray-500 hover:text-gray-900">About</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#">
              <a className="text-base text-gray-500 hover:text-gray-900">How It Works</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#">
              <a className="text-base text-gray-500 hover:text-gray-900">Privacy</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#">
              <a className="text-base text-gray-500 hover:text-gray-900">Terms</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#">
              <a className="text-base text-gray-500 hover:text-gray-900">Contact</a>
            </Link>
          </div>
        </nav>
        
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} SkillSwap, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
