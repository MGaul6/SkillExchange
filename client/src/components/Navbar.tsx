import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { getUserFromStorage, isLoggedIn } from "@/lib/storage";

const Navbar = () => {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("skillswap_user");
    localStorage.removeItem("skillswap_token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary-600 font-bold text-xl cursor-pointer">
                  Skill<span className="text-secondary-500">Swap</span>
                </span>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {userLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="link" className="text-primary-600 hover:text-primary-700">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="link" className="text-primary-600 hover:text-primary-700">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? "" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {userLoggedIn ? (
            <>
              <Link href="/dashboard">
                <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                  Dashboard
                </a>
              </Link>
              <a 
                href="#" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-gray-100">
                  Join Now
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
