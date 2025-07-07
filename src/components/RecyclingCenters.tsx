
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Phone, Clock, Star, Search } from "lucide-react";
import { useState } from "react";
import { useRecyclingCenters } from "@/hooks/useRecyclingCenters";

interface RecyclingCentersProps {
  onBack: () => void;
}

const RecyclingCenters = ({ onBack }: RecyclingCentersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { centers, loading, error } = useRecyclingCenters();

  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (center.specialties && center.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading recycling centers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading recycling centers: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certified Recycling Centers
          </h1>
          <p className="text-gray-600 mb-6">
            Find trusted e-waste recycling centers near you
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search centers by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-8">
          <CardContent className="p-0 h-64 bg-gradient-to-r from-green-100 to-emerald-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Interactive Map View</p>
              <p className="text-sm text-gray-500">Coming Soon</p>
            </div>
          </CardContent>
        </Card>

        {/* Centers List */}
        <div className="grid gap-6">
          {filteredCenters.map((center) => (
            <Card key={center.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {center.name}
                      {center.certified && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Certified
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {center.address}, {center.city}
                      {center.distance_miles && ` • ${center.distance_miles} miles`}
                    </CardDescription>
                  </div>
                  {center.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{center.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {center.specialties && center.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {center.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    {center.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {center.phone}
                      </div>
                    )}
                    {center.hours && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {center.hours}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                    <Button size="sm" className="eco-gradient">
                      Contact Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCenters.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No centers found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or check back later for new centers.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-900 mb-2">
              What to expect at recycling centers:
            </h3>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Data destruction certificates for secure devices</li>
              <li>• Proper handling of hazardous materials</li>
              <li>• Compliance with environmental regulations</li>
              <li>• Receipt for your recycled items</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecyclingCenters;
