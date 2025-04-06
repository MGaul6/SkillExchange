import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserSkillSchema, 
  insertLearningInterestSchema,
  insertUserProfileSchema,
  insertSkillRequestSchema,
  insertLearningSessionSchema,
  insertSessionFeedbackSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users API
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.put("/api/users/:id/profile", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const profileData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.updateUserProfile(id, profileData);
      res.json({ profile });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to update profile" });
      }
    }
  });

  // Skills API
  app.post("/api/users/:id/skills", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const skillData = insertUserSkillSchema.parse({
        ...req.body,
        userId
      });
      const skill = await storage.addUserSkill(skillData);
      res.status(201).json({ skill });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to add skill" });
      }
    }
  });

  app.get("/api/users/:id/skills", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const skills = await storage.getUserSkills(userId);
      res.json({ skills });
    } catch (error) {
      res.status(500).json({ error: "Failed to get skills" });
    }
  });

  // Learning Interests API
  app.post("/api/users/:id/learning-interests", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const interestData = insertLearningInterestSchema.parse({
        ...req.body,
        userId
      });
      const interest = await storage.addLearningInterest(interestData);
      res.status(201).json({ interest });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to add learning interest" });
      }
    }
  });

  app.get("/api/users/:id/learning-interests", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const interests = await storage.getLearningInterests(userId);
      res.json({ interests });
    } catch (error) {
      res.status(500).json({ error: "Failed to get learning interests" });
    }
  });

  // Skill Requests API
  app.post("/api/skill-requests", async (req, res) => {
    try {
      const requestData = insertSkillRequestSchema.parse(req.body);
      const request = await storage.createSkillRequest(requestData);
      res.status(201).json({ request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to create skill request" });
      }
    }
  });

  app.get("/api/users/:id/skill-requests", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const requests = await storage.getUserSkillRequests(userId);
      res.json({ requests });
    } catch (error) {
      res.status(500).json({ error: "Failed to get skill requests" });
    }
  });

  app.put("/api/skill-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!["accepted", "rejected", "cancelled"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      const request = await storage.updateSkillRequestStatus(id, status);
      res.json({ request });
    } catch (error) {
      res.status(500).json({ error: "Failed to update request status" });
    }
  });

  // Learning Sessions API
  app.post("/api/learning-sessions", async (req, res) => {
    try {
      const sessionData = insertLearningSessionSchema.parse(req.body);
      const session = await storage.createLearningSession(sessionData);
      res.status(201).json({ session });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to create learning session" });
      }
    }
  });

  app.get("/api/users/:id/learning-sessions", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const sessions = await storage.getUserLearningSessions(userId);
      res.json({ sessions });
    } catch (error) {
      res.status(500).json({ error: "Failed to get learning sessions" });
    }
  });

  // Feedback API
  app.post("/api/session-feedback", async (req, res) => {
    try {
      const feedbackData = insertSessionFeedbackSchema.parse(req.body);
      const feedback = await storage.createSessionFeedback(feedbackData);
      res.status(201).json({ feedback });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to create feedback" });
      }
    }
  });

  app.get("/api/users/:id/received-feedback", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const feedback = await storage.getUserReceivedFeedback(userId);
      res.json({ feedback });
    } catch (error) {
      res.status(500).json({ error: "Failed to get feedback" });
    }
  });

  // Match suggestions API
  app.get("/api/users/:id/matches", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const matches = await storage.getSuggestedMatches(userId);
      res.json({ matches });
    } catch (error) {
      res.status(500).json({ error: "Failed to get matches" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
