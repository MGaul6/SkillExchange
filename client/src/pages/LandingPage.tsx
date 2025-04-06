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
              <Button size="lg" className="px-8 py-3 bg-primary-600 hover:bg-primary-700">
                Join Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-primary-700 border-primary-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="h-auto w-full max-w-md rounded-lg shadow-xl overflow-hidden">
            <svg 
              className="w-full h-64 bg-gray-100 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <rect width="100%" height="100%" fill="#f3f4f6" />
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle"
                fontSize="20"
                fill="#9ca3af"
              >
                Diverse people collaborating
              </text>
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
      
      {/* Testimonials */}
      <div className="mt-24 pb-12">
        <h2 className="mb-12">Join our growing community</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          
          <TestimonialCard 
            name="Emma L."
            rating={5}
            testimonial="I was looking for someone to teach me digital marketing while offering yoga instruction. Found the perfect match within days!"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
