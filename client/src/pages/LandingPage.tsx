import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import { UserPlus, Handshake, Brain } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <h1>
            Share skills, <span className="text-primary-600">grow together</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            SkillSwap connects people who want to learn with those who can teach. 
            Exchange your expertise, expand your knowledge, and build meaningful connections.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105">
                Sign Up
              </Button>
            </Link>
            <Link href="#about">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-primary-700 border-primary-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="h-auto w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
            <svg 
              className="w-full h-64"
              viewBox="0 0 500 350" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background elements */}
              <circle cx="250" cy="175" r="150" fill="#f9fafb" />
              <path d="M100,320 Q250,220 400,320" stroke="#e1e1e8" strokeWidth="2" fill="none" />
              <path d="M80,300 Q250,200 420,300" stroke="#e1e1e8" strokeWidth="2" fill="none" />
              
              {/* First person */}
              <circle cx="180" cy="170" r="40" fill="#6366f1" opacity="0.9" />
              <circle cx="180" cy="140" r="20" fill="#818cf8" />
              <rect x="160" y="170" width="40" height="80" rx="10" fill="#6366f1" />
              <rect x="160" y="250" width="15" height="40" rx="5" fill="#6366f1" />
              <rect x="185" y="250" width="15" height="40" rx="5" fill="#6366f1" />
              <rect x="145" y="180" width="15" height="40" rx="5" fill="#6366f1" />
              <rect x="200" y="180" width="15" height="40" rx="5" fill="#6366f1" />
              
              {/* Second person */}
              <circle cx="320" cy="170" r="40" fill="#ec4899" opacity="0.9" />
              <circle cx="320" cy="140" r="20" fill="#f472b6" />
              <rect x="300" y="170" width="40" height="80" rx="10" fill="#ec4899" />
              <rect x="300" y="250" width="15" height="40" rx="5" fill="#ec4899" />
              <rect x="325" y="250" width="15" height="40" rx="5" fill="#ec4899" />
              <rect x="285" y="180" width="15" height="40" rx="5" fill="#ec4899" />
              <rect x="340" y="180" width="15" height="40" rx="5" fill="#ec4899" />
              
              {/* Connection between people */}
              <path d="M220,170 Q250,140 280,170" stroke="#4f46e5" strokeWidth="3" strokeDasharray="5,5" />
              <path d="M220,190 Q250,220 280,190" stroke="#be185d" strokeWidth="3" strokeDasharray="5,5" />
              
              {/* Stars/Sparks */}
              <circle cx="250" cy="120" r="5" fill="#f59e0b" />
              <circle cx="230" cy="140" r="3" fill="#f59e0b" />
              <circle cx="270" cy="140" r="3" fill="#f59e0b" />
              <circle cx="200" cy="100" r="4" fill="#f59e0b" />
              <circle cx="300" cy="100" r="4" fill="#f59e0b" />
              
              {/* Text bubbles */}
              <rect x="150" y="80" width="60" height="30" rx="15" fill="white" stroke="#d1d5db" />
              <rect x="290" y="80" width="60" height="30" rx="15" fill="white" stroke="#d1d5db" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="mt-24">
        <h2 className="text-center mb-12">How SkillSwap works</h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <FeatureCard 
            icon={<UserPlus className="h-6 w-6" />}
            title="Create your profile"
            description="Share the skills you can teach and what you want to learn. Our AI helps match you with perfect partners."
            color="primary"
          />
          
          <FeatureCard 
            icon={<Handshake className="h-6 w-6" />}
            title="Match & connect"
            description="Browse potential skill partners, send exchange requests, and schedule your first session."
            color="secondary"
          />
          
          <FeatureCard 
            icon={<Brain className="h-6 w-6" />}
            title="Learn & teach"
            description="Exchange knowledge through video sessions, rate each other, and build your learning network."
            color="accent"
          />
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="mt-24 pb-12">
        <h2 className="mb-6">About SkillSwap</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-700 mb-6">
              SkillSwap was founded with a simple idea: everyone has something to teach and something to learn. Our platform connects individuals with complementary skills, enabling them to exchange knowledge in a collaborative and supportive environment.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you're looking to learn a new language, improve your coding skills, or master an instrument, SkillSwap helps you find the perfect teaching partner who is interested in what you have to offer in return.
            </p>
            <p className="text-lg text-gray-700">
              Join our community today and be part of a growing network of lifelong learners and skilled teachers from around the world.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-600 mb-6">What Our Users Say</h3>
            <div className="space-y-6">
              <TestimonialCard 
                name="Sarah J."
                rating={5}
                testimonial="I taught Spanish while learning web development. The platform made it easy to find the right partner and schedule our sessions."
              />
              
              <TestimonialCard 
                name="Michael T."
                rating={4.5}
                testimonial="As a musician, I've connected with a graphic designer who needed piano lessons. Now I have an amazing website and they're playing Bach!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
