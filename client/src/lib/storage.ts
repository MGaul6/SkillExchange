// This file handles client-side storage for the SkillSwap application
// In a real application, this would be replaced with API calls

// User types
interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  profile?: UserProfile;
}

interface UserProfile {
  [key: string]: any;
}

// Store user data in localStorage
export function storeUser(user: User): void {
  localStorage.setItem('skillswap_user', JSON.stringify(user));
}

// Get user data from localStorage
export function getUserFromStorage(): User | null {
  const userData = localStorage.getItem('skillswap_user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!getUserFromStorage();
}

// Register a new user
export function registerUser(email: string, password: string): User {
  // In a real app, this would be an API call
  const user: User = {
    id: Date.now(),
    email,
  };
  
  // Store auth token (simulated)
  localStorage.setItem('skillswap_token', `token_${Date.now()}`);
  
  // Store user
  storeUser(user);
  
  return user;
}

// Login user
export function loginUser(email: string, password: string): User {
  // In a real app, this would be an API call to validate credentials
  // This is just a simulation
  
  // Check if email exists in localStorage (for demo purposes)
  const existingUser = getUserFromStorage();
  if (existingUser && existingUser.email === email) {
    // Store auth token (simulated)
    localStorage.setItem('skillswap_token', `token_${Date.now()}`);
    return existingUser;
  }
  
  // If no existing user or email doesn't match, create a new one for demo purposes
  const user: User = {
    id: Date.now(),
    email,
  };
  
  // Store auth token (simulated)
  localStorage.setItem('skillswap_token', `token_${Date.now()}`);
  
  // Store user
  storeUser(user);
  
  return user;
}

// Update user profile
export function updateUserProfile(profileData: UserProfile): User {
  const user = getUserFromStorage();
  if (!user) {
    throw new Error('User not found');
  }
  
  // Update first and last name at the user level
  if (profileData.firstName) {
    user.firstName = profileData.firstName;
  }
  
  if (profileData.lastName) {
    user.lastName = profileData.lastName;
  }
  
  // Add all profile data
  user.profile = {
    ...user.profile,
    ...profileData,
  };
  
  // Store updated user
  storeUser(user);
  
  return user;
}

// Get skills to teach for current user
export function getSkillsToTeach(): any[] {
  const user = getUserFromStorage();
  if (!user || !user.profile) return [];
  
  return user.profile.skillsToTeach || [];
}

// Get skills to learn for current user
export function getSkillsToLearn(): any[] {
  const user = getUserFromStorage();
  if (!user || !user.profile) return [];
  
  return user.profile.skillsToLearn || [];
}

// Log out user
export function logoutUser(): void {
  localStorage.removeItem('skillswap_user');
  localStorage.removeItem('skillswap_token');
}
