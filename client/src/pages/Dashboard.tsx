import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFromStorage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import SkillCard from "@/components/SkillCard";
import RequestCard from "@/components/RequestCard";
import SessionCard from "@/components/SessionCard";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profile?: any;
}

const Dashboard = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  
  // Get user data from storage
  useEffect(() => {
    const userData = getUserFromStorage();
    if (!userData) {
      toast({
        title: "Not logged in",
        description: "Please login or register first",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setUser(userData);
  }, [navigate, toast]);

  // Sample data for the dashboard
  // This would normally come from an API
  const suggestedMatches = [
    {
      id: 1,
      name: "Sarah Johnson",
      matchPercentage: 95,
      teachingSkill: "French",
      teachingLevel: "Advanced",
      learningSkill: "Web Development",
      profileImage: "",
    },
    {
      id: 2,
      name: "Michael Torres",
      matchPercentage: 88,
      teachingSkill: "Guitar",
      teachingLevel: "Intermediate",
      learningSkill: "Python",
      profileImage: "",
    },
    {
      id: 3,
      name: "Priya Sharma",
      matchPercentage: 82,
      teachingSkill: "Digital Marketing",
      teachingLevel: "Expert",
      learningSkill: "Photography",
      profileImage: "",
    },
  ];
  
  const pendingRequests = [
    {
      id: 1,
      type: "incoming",
      user: {
        name: "Chris Wilson",
        skill: "Python",
        profileImage: "",
      },
    },
    {
      id: 2,
      type: "outgoing",
      user: {
        name: "Jamie Park",
        skill: "Japanese",
        profileImage: "",
      },
    },
  ];
  
  const upcomingSessions = [
    {
      id: 1,
      title: "Python Basics with Chris",
      type: "teaching",
      dateTime: "Tomorrow, 3:00 PM",
    },
    {
      id: 2,
      title: "Japanese Conversation with Jamie",
      type: "learning",
      dateTime: "Friday, 6:30 PM",
    },
  ];

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.firstName || user.email.split('@')[0]}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Here's what's happening with your skill exchanges.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Find a Skill Partner
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Suggested Matches */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Suggested Skill Matches</h2>
            <p className="mt-1 text-sm text-gray-600">
              People who might be a good match for skill exchange
            </p>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {suggestedMatches.map((match) => (
                <SkillCard key={match.id} match={match} />
              ))}
            </ul>
            <div className="mt-4">
              <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all matches →
              </a>
            </div>
          </div>
        </div>
        
        {/* Sidebar with Requests and Calendar */}
        <div className="space-y-6">
          {/* Pending Requests */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Pending Requests</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
                <div className="mt-4">
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View all requests →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Sessions */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Sessions</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
                <div className="mt-4">
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View calendar →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
