import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#b5d6b2] via-[#f2ebd9] to-[#2e4e2c] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show Dashboard if logged in, otherwise show Auth (Login/Signup)
  return user ? <Dashboard /> : <Auth />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
