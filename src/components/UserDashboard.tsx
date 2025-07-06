
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
  Truck
} from "lucide-react";

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const recentSubmissions = [
    {
      id: 1,
      date: "2024-01-15",
      items: ["iPhone 12", "Dell Laptop"],
      status: "completed",
      pickupDate: "2024-01-20"
    },
    {
      id: 2,
      date: "2024-01-10",
      items: ["Samsung TV", "iPad Air"],
      status: "processing",
      pickupDate: "2024-01-25"
    },
    {
      id: 3,
      date: "2024-01-05",
      items: ["Old Desktop"],
      status: "scheduled",
      pickupDate: "2024-01-30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {user.name}!
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogout}>
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
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                +4 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO2 Saved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145 kg</div>
              <p className="text-xs text-muted-foreground">
                Environmental impact
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Next: Jan 25, 2024
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                Recycling rewards
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Pickup</TabsTrigger>
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
                  <div className="space-y-4">
                    {recentSubmissions.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(submission.status)}
                          <div>
                            <p className="font-medium">{submission.items.join(', ')}</p>
                            <p className="text-sm text-gray-500">
                              Submitted: {submission.date}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full eco-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit E-Waste
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Pickup
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
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <Card key={submission.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(submission.status)}>
                                {submission.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                #{submission.id.toString().padStart(4, '0')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{submission.items.join(', ')}</p>
                              <p className="text-sm text-gray-500">
                                Submitted: {submission.date}
                              </p>
                              {submission.pickupDate && (
                                <p className="text-sm text-gray-500">
                                  Pickup: {submission.pickupDate}
                                </p>
                              )}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Pickup</CardTitle>
                <CardDescription>Book a convenient time for e-waste collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Pickup Scheduling
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Feature coming soon! For now, please submit your e-waste items and we'll contact you.
                  </p>
                  <Button className="eco-gradient">
                    Submit E-Waste Request
                  </Button>
                </div>
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
                      <span>145 kg</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Materials Recovered</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Energy Saved</span>
                      <span>234 kWh</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recycling Goals</CardTitle>
                  <CardDescription>Your annual sustainability targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">23/50</div>
                    <p className="text-sm text-gray-600">Items recycled this year</p>
                    <Progress value={46} className="mt-2" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span>Next milestone: 30 items</span>
                      <Badge variant="secondary">7 to go</Badge>
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
