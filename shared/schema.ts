import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
  location: text("location"),
  timezone: text("timezone"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User skills table - skills a user can teach
export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced, Expert
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User learning interests - skills a user wants to learn
export const learningInterests = pgTable("learning_interests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User profiles table - additional profile information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  learningModes: text("learning_modes").array(), // video-calls, chat-based, pre-recorded
  availability: jsonb("availability"), // JSON representation of availability grid
  learningGoals: text("learning_goals"),
  learningIntensity: text("learning_intensity"), // casual, regular, intensive
  teachingStyles: text("teaching_styles").array(), // structured, project-based, mentorship
  motivation: text("motivation"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Skill exchange requests table
export const skillRequests = pgTable("skill_requests", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").references(() => users.id).notNull(),
  toUserId: integer("to_user_id").references(() => users.id).notNull(),
  teachSkillId: integer("teach_skill_id").references(() => userSkills.id),
  learnSkillId: integer("learn_skill_id").references(() => learningInterests.id),
  status: text("status").notNull(), // pending, accepted, rejected, cancelled
  proposedSchedule: timestamp("proposed_schedule"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Learning sessions table
export const learningSessions = pgTable("learning_sessions", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").references(() => skillRequests.id),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  learnerId: integer("learner_id").references(() => users.id).notNull(),
  scheduledStart: timestamp("scheduled_start").notNull(),
  scheduledEnd: timestamp("scheduled_end").notNull(),
  status: text("status").notNull(), // scheduled, completed, cancelled
  meetingLink: text("meeting_link"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Feedback and ratings table
export const sessionFeedback = pgTable("session_feedback", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => learningSessions.id).notNull(),
  fromUserId: integer("from_user_id").references(() => users.id).notNull(),
  toUserId: integer("to_user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertUserSkillSchema = createInsertSchema(userSkills).omit({
  id: true,
  createdAt: true,
});

export const insertLearningInterestSchema = createInsertSchema(learningInterests).omit({
  id: true,
  createdAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertSkillRequestSchema = createInsertSchema(skillRequests).omit({
  id: true,
  createdAt: true,
});

export const insertLearningSessionSchema = createInsertSchema(learningSessions).omit({
  id: true,
  createdAt: true,
});

export const insertSessionFeedbackSchema = createInsertSchema(sessionFeedback).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;

export type LearningInterest = typeof learningInterests.$inferSelect;
export type InsertLearningInterest = z.infer<typeof insertLearningInterestSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type SkillRequest = typeof skillRequests.$inferSelect;
export type InsertSkillRequest = z.infer<typeof insertSkillRequestSchema>;

export type LearningSession = typeof learningSessions.$inferSelect;
export type InsertLearningSession = z.infer<typeof insertLearningSessionSchema>;

export type SessionFeedback = typeof sessionFeedback.$inferSelect;
export type InsertSessionFeedback = z.infer<typeof insertSessionFeedbackSchema>;
