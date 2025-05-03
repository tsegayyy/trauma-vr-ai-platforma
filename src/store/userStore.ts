import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    privacy: 'public' | 'private' | 'friends';
  };
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock implementation - would connect to backend auth service
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock login - would call actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          joinDate: new Date(),
          preferences: {
            notifications: true,
            darkMode: false,
            privacy: 'public'
          }
        };
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock registration - would call actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: (Math.random() * 1000).toFixed(0),
        name,
        email,
        joinDate: new Date(),
        preferences: {
          notifications: true,
          darkMode: false,
          privacy: 'public'
        }
      };
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null
    }));
  }
}));