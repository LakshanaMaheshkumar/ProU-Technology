import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if user is saved in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Simulated signup (can be connected to JSON or API later)
  const signUp = async (email: string, password: string) => {
    const newUser = { id: Date.now().toString(), email };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    alert("Signup successful!");
  };

  // Simulated signin (checks email only for now)
  const signIn = async (email: string, password: string) => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.email === email) {
        setUser(userData);
        alert("Login successful!");
      } else {
        alert("Invalid credentials!");
      }
    } else {
      alert("No account found. Please sign up first.");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
