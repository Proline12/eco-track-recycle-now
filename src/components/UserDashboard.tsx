
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Plus, 
  Calendar, 
  Package, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle,
  Truck,
  MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEWasteSubmissions } from "@/hooks/useEWasteSubmissions";
import { useState } from "react";

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const { signOut } = useAuth();
  const { submissions, loading } = useEWasteSubmissions();
  const [currentView, setCurrentView] = useState("overview");

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const completedSubmissions = submissions.filter(s => s.status === 'completed').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const totalItems = submissions.reduce((sum, s) => sum + (s.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {user.user_metadata?.full_name || user.email}!
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentView("submit")}>
                <Plus className="h-4 w-4 mr-2" />
                Submit E-Waste
              </Button>
              <Button variant="outline" onClick={() => setCurrentView("centers")}>
                <MapPin className="h-4 w-4 mr-2" />
                Find Centers
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Items submitted
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Successfully recycled
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Impact</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalItems * 2.5)} kg</div>
              <p className="text-xs text-muted-foreground">
                CO2 emissions prevented
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Your latest e-waste disposal requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <Package className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-pulse" />
                      <p className="text-gray-500">Loading submissions...</p>
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No submissions yet</p>
                      <Button 
                        className="mt-4 eco-gradient" 
                        onClick={() => setCurrentView("submit")}
                      >
                        Submit Your First Item
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.slice(0, 5).map((submission) => (
                        <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(submission.status || 'pending')}
                            <div>
                              <p className="font-medium">{submission.device_name}</p>
                              <p className="text-sm text-gray-500">
                                {submission.brand && `${submission.brand} • `}
                                {new Date(submission.created_at || '').toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(submission.status || 'pending')}>
                            {submission.status || 'pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full eco-gradient"
                    onClick={() => setCurrentView("submit")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit E-Waste
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setCurrentView("centers")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Centers
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Impact Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>Complete history of your e-waste submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <Package className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-gray-500">Loading submissions...</p>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No submissions yet</p>
                    <Button 
                      className="mt-4 eco-gradient" 
                      onClick={() => setCurrentView("submit")}
                    >
                      Submit Your First Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card key={submission.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(submission.status || 'pending')}>
                                  {submission.status || 'pending'}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {submission.category}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{submission.device_name}</p>
                                {submission.brand && (
                                  <p className="text-sm text-gray-500">
                                    {submission.brand} {submission.model && `• ${submission.model}`}
                                  </p>
                                )}
                                <p className="text-sm text-gray-500">
                                  Quantity: {submission.quantity || 1} • 
                                  Condition: {submission.condition} • 
                                  Submitted: {new Date(submission.created_at || '').toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to sustainability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>CO2 Emissions Prevented</span>
                      <span>{Math.round(totalItems * 2.5)} kg</span>
                    </div>
                    <Progress value={Math.min((totalItems * 2.5) / 100 * 100, 100)} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Items Recycled</span>
                      <span>{completedSubmissions}/{totalItems}</span>
                    </div>
                    <Progress value={totalItems > 0 ? (completedSubmissions / totalItems) * 100 : 0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recycling Rate</span>
                      <span>{totalItems > 0 ? Math.round((completedSubmissions / totalItems) * 100) : 0}%</span>
                    </div>
                    <Progress value={totalItems > 0 ? (completedSubmissions / totalItems) * 100 : 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recycling Goals</CardTitle>
                  <CardDescription>Your sustainability targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{totalItems}/50</div>
                    <p className="text-sm text-gray-600">Items recycled this year</p>
                    <Progress value={(totalItems / 50) * 100} className="mt-2" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span>Next milestone: 30 items</span>
                      <Badge variant="secondary">
                        {Math.max(0, 30 - totalItems)} to go
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
