import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Stepper, Step } from "@/components/ui/stepper";
import { getUserFromStorage, updateUserProfile } from "@/lib/storage";
import { Check } from "lucide-react";
import AvailabilitySchedule from "@/components/AvailabilitySchedule";

interface SkillItem {
  name: string;
  level: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  location: string;
  timezone: string;
  bio: string;
  skillsToTeach: SkillItem[];
  skillsToLearn: SkillItem[];
  learningModes: string[];
  availability: boolean[][];
  learningGoals: string;
  learningIntensity: string;
  teachingStyles: string[];
  motivation: string;
}

const ProfileSetup = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    location: "",
    timezone: "UTC-8:00 (Pacific Time)",
    bio: "",
    skillsToTeach: [{ name: "", level: "Beginner" }],
    skillsToLearn: [{ name: "", level: "Beginner" }],
    learningModes: [],
    availability: Array(3).fill(Array(7).fill(false)),
    learningGoals: "",
    learningIntensity: "regular",
    teachingStyles: [],
    motivation: "",
  });
  
  useEffect(() => {
    const user = getUserFromStorage();
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login or register first",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    const currentValues = profileData[name as keyof ProfileData] as string[];
    
    if (checked) {
      setProfileData({
        ...profileData,
        [name]: [...currentValues, value],
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: currentValues.filter(item => item !== value),
      });
    }
  };

  const handleSkillNameChange = (index: number, value: string, type: 'teach' | 'learn') => {
    const key = type === 'teach' ? 'skillsToTeach' : 'skillsToLearn';
    const skills = [...profileData[key as keyof ProfileData]] as SkillItem[];
    skills[index].name = value;
    
    setProfileData({
      ...profileData,
      [key]: skills,
    });
  };

  const handleSkillLevelChange = (index: number, value: string, type: 'teach' | 'learn') => {
    const key = type === 'teach' ? 'skillsToTeach' : 'skillsToLearn';
    const skills = [...profileData[key as keyof ProfileData]] as SkillItem[];
    skills[index].level = value;
    
    setProfileData({
      ...profileData,
      [key]: skills,
    });
  };

  const addSkill = (type: 'teach' | 'learn') => {
    const key = type === 'teach' ? 'skillsToTeach' : 'skillsToLearn';
    const skills = [...profileData[key as keyof ProfileData]] as SkillItem[];
    skills.push({ name: "", level: "Beginner" });
    
    setProfileData({
      ...profileData,
      [key]: skills,
    });
  };

  const handleAvailabilityChange = (timeslot: number, day: number, value: boolean) => {
    const newAvailability = [...profileData.availability];
    
    // Create a new row array to avoid mutation
    const newRow = [...newAvailability[timeslot]];
    newRow[day] = value;
    
    // Create a new 2D array with the updated row
    newAvailability[timeslot] = newRow;
    
    setProfileData({
      ...profileData,
      availability: newAvailability,
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    // Save profile data
    updateUserProfile(profileData);
    
    toast({
      title: "Profile setup complete!",
      description: "Redirecting to your dashboard...",
    });
    
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">Tell us about yourself so we can match you with the right skill partners.</p>
            
            {/* Progress steps */}
            <div className="mb-8">
              <Stepper currentStep={currentStep} totalSteps={4}>
                <Step stepNumber={1} title="Basic Info" />
                <Step stepNumber={2} title="Skills & Preferences" />
                <Step stepNumber={3} title="Learning Goals" />
                <Step stepNumber={4} title="Complete" />
              </Stepper>
            </div>
            
            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Profile Picture</Label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <Button variant="outline" size="sm" className="ml-5">
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select 
                        value={profileData.timezone} 
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8:00 (Pacific Time)">UTC-8:00 (Pacific Time)</SelectItem>
                          <SelectItem value="UTC-5:00 (Eastern Time)">UTC-5:00 (Eastern Time)</SelectItem>
                          <SelectItem value="UTC+0:00 (GMT)">UTC+0:00 (GMT)</SelectItem>
                          <SelectItem value="UTC+1:00 (Central European Time)">UTC+1:00 (Central European Time)</SelectItem>
                          <SelectItem value="UTC+8:00 (China Standard Time)">UTC+8:00 (China Standard Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={handleInputChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Skills & Preferences */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills & Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Skills You Can Teach</Label>
                    {profileData.skillsToTeach.map((skill, index) => (
                      <div key={`teach-${index}`} className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-2">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <Input
                              type="text"
                              placeholder="Skill name (e.g., Web Development)"
                              value={skill.name}
                              onChange={(e) => handleSkillNameChange(index, e.target.value, 'teach')}
                            />
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <Select 
                              value={skill.level} 
                              onValueChange={(value) => handleSkillLevelChange(index, value, 'teach')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => addSkill('teach')}
                    >
                      + Add another skill
                    </Button>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Skills You Want to Learn</Label>
                    {profileData.skillsToLearn.map((skill, index) => (
                      <div key={`learn-${index}`} className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-2">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <Input
                              type="text"
                              placeholder="Skill name (e.g., French)"
                              value={skill.name}
                              onChange={(e) => handleSkillNameChange(index, e.target.value, 'learn')}
                            />
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <Select 
                              value={skill.level} 
                              onValueChange={(value) => handleSkillLevelChange(index, value, 'learn')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => addSkill('learn')}
                    >
                      + Add another skill
                    </Button>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Preferred Learning Mode</Label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="video-calls" 
                          checked={profileData.learningModes.includes("video-calls")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("learningModes", "video-calls", checked as boolean)
                          }
                        />
                        <Label htmlFor="video-calls" className="ml-2">Video calls</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="chat-based" 
                          checked={profileData.learningModes.includes("chat-based")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("learningModes", "chat-based", checked as boolean)
                          }
                        />
                        <Label htmlFor="chat-based" className="ml-2">Chat-based sessions</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="pre-recorded" 
                          checked={profileData.learningModes.includes("pre-recorded")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("learningModes", "pre-recorded", checked as boolean)
                          }
                        />
                        <Label htmlFor="pre-recorded" className="ml-2">Pre-recorded lessons</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Availability Schedule</Label>
                    <AvailabilitySchedule 
                      availability={profileData.availability}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Learning Goals */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Goals</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="learningGoals">Define your learning goals</Label>
                    <Textarea
                      id="learningGoals"
                      name="learningGoals"
                      rows={3}
                      placeholder="What do you want to achieve? (e.g., Learn Python for Data Science within 3 months)"
                      value={profileData.learningGoals}
                      onChange={handleInputChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">Be specific about what you want to learn and your timeline.</p>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Learning intensity</Label>
                    <RadioGroup 
                      value={profileData.learningIntensity} 
                      onValueChange={(value) => handleSelectChange("learningIntensity", value)}
                    >
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="casual" id="casual" />
                        <Label htmlFor="casual">Casual (1-2 hours per week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular">Regular (3-5 hours per week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intensive" id="intensive" />
                        <Label htmlFor="intensive">Intensive (6+ hours per week)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Teaching style preferences</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="structured" 
                          checked={profileData.teachingStyles.includes("structured")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("teachingStyles", "structured", checked as boolean)
                          }
                        />
                        <Label htmlFor="structured" className="ml-2">Structured curriculum</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="project-based" 
                          checked={profileData.teachingStyles.includes("project-based")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("teachingStyles", "project-based", checked as boolean)
                          }
                        />
                        <Label htmlFor="project-based" className="ml-2">Project-based learning</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="mentorship" 
                          checked={profileData.teachingStyles.includes("mentorship")}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("teachingStyles", "mentorship", checked as boolean)
                          }
                        />
                        <Label htmlFor="mentorship" className="ml-2">Casual mentorship</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="motivation">What motivated you to join SkillSwap?</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      rows={2}
                      value={profileData.motivation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Complete */}
            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary-50 text-secondary-500 mb-6">
                  <Check className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Setup Complete!</h3>
                <p className="text-gray-600 mb-8">You're all set to start exchanging skills and learning new things.</p>
                <Button 
                  size="lg"
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700"
                  onClick={handleComplete}
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentStep < 3 && (
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className={currentStep === 0 ? "invisible" : ""}
                >
                  Previous
                </Button>
                <div></div>
                <Button 
                  onClick={nextStep}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
