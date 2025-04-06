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
  type InsertSessionFeedback,
  users,
  userSkills,
  learningInterests,
  userProfiles,
  skillRequests,
  learningSessions,
  sessionFeedback
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or } from "drizzle-orm";

// Interface for all storage operations
export interface IStorage {
  // Health check
  healthCheck(): Promise<boolean>;
  
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

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      // Simple query to check if the database is connected
      const result = await db.execute('SELECT 1 as result');
      return true;
    } catch (error) {
      console.error("Database health check failed:", error);
      throw new Error("Database connection failed");
    }
  }
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
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
    // First check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if profile already exists
    const [existingProfile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));

    if (existingProfile) {
      // Update existing profile
      const [updatedProfile] = await db
        .update(userProfiles)
        .set({
          ...profileData,
          userId // Keep userId the same as it should not change
        })
        .where(eq(userProfiles.id, existingProfile.id))
        .returning();
      return updatedProfile;
    } else {
      // Create new profile
      const [newProfile] = await db
        .insert(userProfiles)
        .values({
          ...profileData,
          userId
        })
        .returning();
      return newProfile;
    }
  }

  // Skills operations
  async addUserSkill(skillData: InsertUserSkill): Promise<UserSkill> {
    const [skill] = await db.insert(userSkills).values(skillData).returning();
    return skill;
  }

  async getUserSkills(userId: number): Promise<UserSkill[]> {
    return db.select().from(userSkills).where(eq(userSkills.userId, userId));
  }

  // Learning interests operations
  async addLearningInterest(interestData: InsertLearningInterest): Promise<LearningInterest> {
    const [interest] = await db.insert(learningInterests).values(interestData).returning();
    return interest;
  }

  async getLearningInterests(userId: number): Promise<LearningInterest[]> {
    return db.select().from(learningInterests).where(eq(learningInterests.userId, userId));
  }

  // Skill requests operations
  async createSkillRequest(requestData: InsertSkillRequest): Promise<SkillRequest> {
    const [request] = await db.insert(skillRequests).values(requestData).returning();
    return request;
  }

  async getUserSkillRequests(userId: number): Promise<SkillRequest[]> {
    return db
      .select()
      .from(skillRequests)
      .where(
        or(
          eq(skillRequests.fromUserId, userId),
          eq(skillRequests.toUserId, userId)
        )
      );
  }

  async updateSkillRequestStatus(id: number, status: string): Promise<SkillRequest> {
    const [updatedRequest] = await db
      .update(skillRequests)
      .set({ status })
      .where(eq(skillRequests.id, id))
      .returning();
    
    if (!updatedRequest) {
      throw new Error("Skill request not found");
    }
    
    return updatedRequest;
  }

  // Learning sessions operations
  async createLearningSession(sessionData: InsertLearningSession): Promise<LearningSession> {
    const [session] = await db.insert(learningSessions).values(sessionData).returning();
    return session;
  }

  async getUserLearningSessions(userId: number): Promise<LearningSession[]> {
    return db
      .select()
      .from(learningSessions)
      .where(
        or(
          eq(learningSessions.teacherId, userId),
          eq(learningSessions.learnerId, userId)
        )
      );
  }

  // Feedback operations
  async createSessionFeedback(feedbackData: InsertSessionFeedback): Promise<SessionFeedback> {
    const [feedback] = await db.insert(sessionFeedback).values(feedbackData).returning();
    return feedback;
  }

  async getUserReceivedFeedback(userId: number): Promise<SessionFeedback[]> {
    return db
      .select()
      .from(sessionFeedback)
      .where(eq(sessionFeedback.toUserId, userId));
  }

  // Match suggestions
  async getSuggestedMatches(userId: number): Promise<any[]> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }

    // Get user's skills and interests
    const userTeachingSkills = await this.getUserSkills(userId);
    const userLearningInterests = await this.getLearningInterests(userId);

    // Get all users and filter out the current user
    const allUsers = await db
      .select()
      .from(users);
    
    const otherUsers = userId !== undefined
      ? allUsers.filter(user => user.id !== userId)
      : allUsers;

    // Get all skills and interests for all users
    const allSkills = await db.select().from(userSkills);
    const allInterests = await db.select().from(learningInterests);

    // Match users based on skills and interests
    const matches = await Promise.all(
      otherUsers.map(async (otherUser) => {
        // Filter skills and interests for this user
        const otherUserSkills = allSkills.filter(
          (skill) => skill.userId === otherUser.id
        );
        const otherUserInterests = allInterests.filter(
          (interest) => interest.userId === otherUser.id
        );

        // Calculate match score
        let matchScore = 0;

        // Check if other user teaches skills the current user wants to learn
        for (const interest of userLearningInterests) {
          if (otherUserSkills.some((skill) => skill.name.toLowerCase() === interest.name.toLowerCase())) {
            matchScore += 25;
          }
        }

        // Check if current user teaches skills the other user wants to learn
        for (const skill of userTeachingSkills) {
          if (otherUserInterests.some((interest) => interest.name.toLowerCase() === skill.name.toLowerCase())) {
            matchScore += 25;
          }
        }

        // Add some randomness for variety
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

    // Sort by match percentage (highest first)
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
}

// Initialize and export the storage instance
export const storage = new DatabaseStorage();
