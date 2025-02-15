import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  toggleEventInterest: (eventId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const existingUserData = localStorage.getItem(`user_${email}`);
    const interestedEvents = existingUserData 
      ? JSON.parse(existingUserData).interestedEvents 
      : [];

  
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      interestedEvents
    };

    
    localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name,
      interestedEvents: []
    };
    
  
    localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    if (user) {
     
      localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
    }
    setUser(null);
  };

  const toggleEventInterest = (eventId: string) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return prev;
      
      const isInterested = prev.interestedEvents.includes(eventId);
      const updatedEvents = isInterested
        ? prev.interestedEvents.filter(id => id !== eventId)
        : [...prev.interestedEvents, eventId];

      const updatedUser = {
        ...prev,
        interestedEvents: updatedEvents
      };

      localStorage.setItem(`user_${prev.email}`, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, toggleEventInterest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}