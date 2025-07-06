
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle, 
  Smartphone, 
  Monitor, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  Leaf,
  ShieldCheck,
  Clock
} from "lucide-react";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import EWasteForm from "@/components/EWasteForm";
import RecyclingCenters from "@/components/RecyclingCenters";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView(userData.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  const renderContent = () => {
    switch (currentView) {
      case "login":
        return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView("home")} />;
      case "submit":
        return <EWasteForm onBack={() => setCurrentView("home")} />;
      case "centers":
        return <RecyclingCenters onBack={() => setCurrentView("home")} />;
      case "dashboard":
        return <UserDashboard user={user} onLogout={handleLogout} />;
      case "admin":
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Recycle className="h-8 w-8 text-green-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">EcoTrack</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setCurrentView("centers")}
                      className="text-gray-700 hover:text-green-600"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Centers
                    </Button>
                    <Button onClick={() => setCurrentView("login")}>
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-100 rounded-full leaf-animation">
                      <Leaf className="h-16 w-16 text-green-600" />
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Sustainable E-Waste
                    <span className="text-green-600 block">Management</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Transform your electronic waste into a positive environmental impact. 
                    Schedule pickups, track recycling, and contribute to a greener future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="eco-gradient text-white hover:opacity-90"
                      onClick={() => setCurrentView("submit")}
                    >
                      <Smartphone className="h-5 w-5 mr-2" />
                      Submit E-Waste
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => setCurrentView("centers")}
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Find Centers
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2,847</div>
                    <div className="text-gray-600">Devices Recycled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
                    <div className="text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">45</div>
                    <div className="text-gray-600">Partner Centers</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                  <p className="text-xl text-gray-600">Simple steps to make a difference</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Smartphone className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>Submit Your E-Waste</CardTitle>
                      <CardDescription>
                        Register your electronic items with categories and quantities
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>Schedule Pickup</CardTitle>
                      <CardDescription>
                        Book convenient pickup times that work with your schedule
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>Track Impact</CardTitle>
                      <CardDescription>
                        Monitor your recycling progress and environmental contribution
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Accepted E-Waste Categories</h2>
                  <p className="text-xl text-gray-600">We handle all types of electronic waste</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Smartphone, name: "Mobile Devices", count: "847 recycled" },
                    { icon: Monitor, name: "Computers", count: "623 recycled" },
                    { icon: Users, name: "Appliances", count: "456 recycled" },
                    { icon: ShieldCheck, name: "Batteries", count: "1,234 recycled" }
                  ].map((category, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <category.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <Badge variant="secondary">{category.count}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-6">
                    <Recycle className="h-8 w-8 text-green-400" />
                    <span className="ml-2 text-xl font-bold">EcoTrack</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Making electronic waste management simple and sustainable
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        );
    }
  };

  return renderContent();
};

export default Index;
