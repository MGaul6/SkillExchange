import { 
  type User, 
  type InsertUser, 
  type UserSkill,
  type InsertUserSkill,
  type LearningInterest,
  type InsertLearningInterest,
  type UserProfile,
  type InsertUserProfile,
  type SkillRequest,
  type InsertSkillRequest,
  type LearningSession,
  type InsertLearningSession,
  type SessionFeedback,
  type InsertSessionFeedback
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  updateUserProfile(userId: number, profile: InsertUserProfile): Promise<UserProfile>;
  
  // Skills operations
  addUserSkill(skill: InsertUserSkill): Promise<UserSkill>;
  getUserSkills(userId: number): Promise<UserSkill[]>;
  
  // Learning interests operations
  addLearningInterest(interest: InsertLearningInterest): Promise<LearningInterest>;
  getLearningInterests(userId: number): Promise<LearningInterest[]>;
  
  // Skill requests operations
  createSkillRequest(request: InsertSkillRequest): Promise<SkillRequest>;
  getUserSkillRequests(userId: number): Promise<SkillRequest[]>;
  updateSkillRequestStatus(id: number, status: string): Promise<SkillRequest>;
  
  // Learning sessions operations
  createLearningSession(session: InsertLearningSession): Promise<LearningSession>;
  getUserLearningSessions(userId: number): Promise<LearningSession[]>;
  
  // Feedback operations
  createSessionFeedback(feedback: InsertSessionFeedback): Promise<SessionFeedback>;
  getUserReceivedFeedback(userId: number): Promise<SessionFeedback[]>;
  
  // Match suggestions
  getSuggestedMatches(userId: number): Promise<any[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userSkills: Map<number, UserSkill>;
  private learningInterests: Map<number, LearningInterest>;
  private userProfiles: Map<number, UserProfile>;
  private skillRequests: Map<number, SkillRequest>;
  private learningSessions: Map<number, LearningSession>;
  private sessionFeedback: Map<number, SessionFeedback>;
  
  private currentUserId: number;
  private currentSkillId: number;
  private currentInterestId: number;
  private currentProfileId: number;
  private currentRequestId: number;
  private currentSessionId: number;
  private currentFeedbackId: number;

  constructor() {
    this.users = new Map();
    this.userSkills = new Map();
    this.learningInterests = new Map();
    this.userProfiles = new Map();
    this.skillRequests = new Map();
    this.learningSessions = new Map();
    this.sessionFeedback = new Map();
    
    this.currentUserId = 1;
    this.currentSkillId = 1;
    this.currentInterestId = 1;
    this.currentProfileId = 1;
    this.currentRequestId = 1;
    this.currentSessionId = 1;
    this.currentFeedbackId = 1;
    
    // Add some demo data
    this.setupDemoData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...userData, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async updateUserProfile(userId: number, profileData: InsertUserProfile): Promise<UserProfile> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if profile already exists
    let profile = Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId
    );

    if (profile) {
      // Update existing profile
      profile = { ...profile, ...profileData };
      this.userProfiles.set(profile.id, profile);
    } else {
      // Create new profile
      const id = this.currentProfileId++;
      const now = new Date();
      profile = { ...profileData, id, userId, createdAt: now };
      this.userProfiles.set(id, profile);
    }

    return profile;
  }

  // Skills operations
  async addUserSkill(skillData: InsertUserSkill): Promise<UserSkill> {
    const id = this.currentSkillId++;
    const now = new Date();
    const skill: UserSkill = { ...skillData, id, createdAt: now };
    this.userSkills.set(id, skill);
    return skill;
  }

  async getUserSkills(userId: number): Promise<UserSkill[]> {
    return Array.from(this.userSkills.values()).filter(
      (skill) => skill.userId === userId
    );
  }

  // Learning interests operations
  async addLearningInterest(interestData: InsertLearningInterest): Promise<LearningInterest> {
    const id = this.currentInterestId++;
    const now = new Date();
    const interest: LearningInterest = { ...interestData, id, createdAt: now };
    this.learningInterests.set(id, interest);
    return interest;
  }

  async getLearningInterests(userId: number): Promise<LearningInterest[]> {
    return Array.from(this.learningInterests.values()).filter(
      (interest) => interest.userId === userId
    );
  }

  // Skill requests operations
  async createSkillRequest(requestData: InsertSkillRequest): Promise<SkillRequest> {
    const id = this.currentRequestId++;
    const now = new Date();
    const request: SkillRequest = { ...requestData, id, createdAt: now };
    this.skillRequests.set(id, request);
    return request;
  }

  async getUserSkillRequests(userId: number): Promise<SkillRequest[]> {
    return Array.from(this.skillRequests.values()).filter(
      (request) => request.fromUserId === userId || request.toUserId === userId
    );
  }

  async updateSkillRequestStatus(id: number, status: string): Promise<SkillRequest> {
    const request = this.skillRequests.get(id);
    if (!request) {
      throw new Error("Skill request not found");
    }
    
    const updatedRequest = { ...request, status };
    this.skillRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  // Learning sessions operations
  async createLearningSession(sessionData: InsertLearningSession): Promise<LearningSession> {
    const id = this.currentSessionId++;
    const now = new Date();
    const session: LearningSession = { ...sessionData, id, createdAt: now };
    this.learningSessions.set(id, session);
    return session;
  }

  async getUserLearningSessions(userId: number): Promise<LearningSession[]> {
    return Array.from(this.learningSessions.values()).filter(
      (session) => session.teacherId === userId || session.learnerId === userId
    );
  }

  // Feedback operations
  async createSessionFeedback(feedbackData: InsertSessionFeedback): Promise<SessionFeedback> {
    const id = this.currentFeedbackId++;
    const now = new Date();
    const feedback: SessionFeedback = { ...feedbackData, id, createdAt: now };
    this.sessionFeedback.set(id, feedback);
    return feedback;
  }

  async getUserReceivedFeedback(userId: number): Promise<SessionFeedback[]> {
    return Array.from(this.sessionFeedback.values()).filter(
      (feedback) => feedback.toUserId === userId
    );
  }

  // Match suggestions - this is a simplified version for demo purposes
  async getSuggestedMatches(userId: number): Promise<any[]> {
    // In a real implementation, this would use an algorithm to match users based on skills and interests
    // For now, just return some other users
    const currentUser = await this.getUser(userId);
    if (!currentUser) {
      return [];
    }
    
    // Get user's skills and interests
    const userSkills = await this.getUserSkills(userId);
    const userInterests = await this.getLearningInterests(userId);
    
    // Get all other users
    const otherUsers = Array.from(this.users.values()).filter(
      (user) => user.id !== userId
    );
    
    // Simple matching algorithm - just return other users with calculated match percentages
    const matches = await Promise.all(
      otherUsers.map(async (otherUser) => {
        const otherUserSkills = await this.getUserSkills(otherUser.id);
        const otherUserInterests = await this.getLearningInterests(otherUser.id);
        
        // Calculate a match score
        let matchScore = 0;
        
        // Check if other user teaches skills the current user wants to learn
        for (const interest of userInterests) {
          if (otherUserSkills.some(skill => skill.name.toLowerCase() === interest.name.toLowerCase())) {
            matchScore += 25;
          }
        }
        
        // Check if current user teaches skills the other user wants to learn
        for (const skill of userSkills) {
          if (otherUserInterests.some(interest => interest.name.toLowerCase() === skill.name.toLowerCase())) {
            matchScore += 25;
          }
        }
        
        // Add some randomness for demo
        matchScore += Math.floor(Math.random() * 50);
        if (matchScore > 100) matchScore = 100;
        
        return {
          id: otherUser.id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          username: otherUser.username,
          email: otherUser.email,
          matchPercentage: matchScore,
          teachingSkills: otherUserSkills,
          learningInterests: otherUserInterests,
          profilePicture: otherUser.profilePicture,
        };
      })
    );
    
    // Sort by match percentage
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  // Setup demo data for testing
  private setupDemoData() {
    // Add some demo users
    const user1: User = {
      id: this.currentUserId++,
      username: "sarahj",
      email: "sarah@example.com",
      password: "password123",
      firstName: "Sarah",
      lastName: "Johnson",
      profilePicture: "",
      location: "New York, USA",
      timezone: "UTC-5:00 (Eastern Time)",
      bio: "Language enthusiast and web developer",
      createdAt: new Date(),
    };
    this.users.set(user1.id, user1);
    
    const user2: User = {
      id: this.currentUserId++,
      username: "michaelt",
      email: "michael@example.com",
      password: "password123",
      firstName: "Michael",
      lastName: "Torres",
      profilePicture: "",
      location: "Los Angeles, USA",
      timezone: "UTC-8:00 (Pacific Time)",
      bio: "Guitar player and coding enthusiast",
      createdAt: new Date(),
    };
    this.users.set(user2.id, user2);
    
    // Add some skills
    this.addUserSkill({
      userId: user1.id,
      name: "French",
      level: "Advanced",
    });
    
    this.addUserSkill({
      userId: user2.id,
      name: "Guitar",
      level: "Intermediate",
    });
    
    // Add some learning interests
    this.addLearningInterest({
      userId: user1.id,
      name: "Web Development",
      level: "Beginner",
    });
    
    this.addLearningInterest({
      userId: user2.id,
      name: "Python",
      level: "Beginner",
    });
  }
}

export const storage = new MemStorage();
