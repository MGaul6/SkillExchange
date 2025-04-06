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
            <Link href="/#about">
              <Button variant="link" className="text-primary-600 hover:text-primary-700">
                About
              </Button>
            </Link>
            
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
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg">
                    Sign Up
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
          <div 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => {
              navigate("/#about");
              setMobileMenuOpen(false);
            }}
          >
            About
          </div>
          
          {userLoggedIn ? (
            <>
              <div 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                Dashboard
              </div>
              <div 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </div>
              <div 
                className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-gray-100"
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
