import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
