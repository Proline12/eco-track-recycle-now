
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface EWasteFormProps {
  onBack: () => void;
}

interface EWasteItem {
  id: string;
  category: string;
  type: string;
  quantity: number;
  condition: string;
  description: string;
}

const EWasteForm = ({ onBack }: EWasteFormProps) => {
  const [items, setItems] = useState<EWasteItem[]>([{
    id: '1',
    category: '',
    type: '',
    quantity: 1,
    condition: '',
    description: ''
  }]);
  
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [pickupDate, setPickupDate] = useState<Date>();
  const [preferredTime, setPreferredTime] = useState('');

  const categories = [
    { value: 'mobile', label: 'Mobile Devices' },
    { value: 'computer', label: 'Computers & Laptops' },
    { value: 'tv', label: 'Televisions' },
    { value: 'appliance', label: 'Home Appliances' },
    { value: 'battery', label: 'Batteries' },
    { value: 'other', label: 'Other Electronics' }
  ];

  const conditions = [
    { value: 'working', label: 'Working' },
    { value: 'non-working', label: 'Non-Working' },
    { value: 'damaged', label: 'Damaged' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const timeSlots = [
    { value: 'morning', label: '9:00 AM - 12:00 PM' },
    { value: 'afternoon', label: '12:00 PM - 5:00 PM' },
    { value: 'evening', label: '5:00 PM - 8:00 PM' }
  ];

  const addItem = () => {
    const newItem: EWasteItem = {
      id: Date.now().toString(),
      category: '',
      type: '',
      quantity: 1,
      condition: '',
      description: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof EWasteItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast.error("Please fill in all contact information");
      return;
    }
    
    const hasValidItems = items.some(item => item.category && item.type);
    if (!hasValidItems) {
      toast.error("Please add at least one e-waste item");
      return;
    }

    // Simulate submission
    console.log('Submitting e-waste request:', {
      items,
      contactInfo,
      pickupDate,
      preferredTime
    });
    
    toast.success("E-Waste submission successful! We'll contact you soon.");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Submit E-Waste Request</CardTitle>
            <CardDescription>
              Help us process your electronic waste efficiently by providing detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Pickup Address</Label>
                    <Textarea
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>
              </div>

              {/* E-Waste Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">E-Waste Items</h3>
                  <Button type="button" onClick={addItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {items.map((item, index) => (
                  <Card key={item.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={item.category} onValueChange={(value) => updateItem(item.id, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Device Type</Label>
                        <Input
                          placeholder="e.g., iPhone 12, Dell Laptop"
                          value={item.type}
                          onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                            className="w-20"
                          />
                          {items.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Condition</Label>
                        <Select value={item.condition} onValueChange={(value) => updateItem(item.id, 'condition', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map(cond => (
                              <SelectItem key={cond.value} value={cond.value}>
                                {cond.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description (Optional)</Label>
                        <Input
                          placeholder="Additional details about the item"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pickup Scheduling */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pickup Scheduling (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pickupDate ? format(pickupDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={pickupDate}
                          onSelect={setPickupDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <Select value={preferredTime} onValueChange={setPreferredTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="eco-gradient">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EWasteForm;
