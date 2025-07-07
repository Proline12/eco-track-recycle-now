
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
import { useEWasteSubmissions } from "@/hooks/useEWasteSubmissions";
import type { Database } from "@/integrations/supabase/types";

interface EWasteFormProps {
  onBack: () => void;
}

interface EWasteItem {
  id: string;
  category: Database['public']['Enums']['device_category'] | '';
  device_name: string;
  brand: string;
  model: string;
  quantity: number;
  condition: Database['public']['Enums']['device_condition'] | '';
  description: string;
}

const EWasteForm = ({ onBack }: EWasteFormProps) => {
  const { createSubmission } = useEWasteSubmissions();
  const [items, setItems] = useState<EWasteItem[]>([{
    id: '1',
    category: '',
    device_name: '',
    brand: '',
    model: '',
    quantity: 1,
    condition: '',
    description: ''
  }]);
  
  const [contactInfo, setContactInfo] = useState({
    pickup_address: '',
    pickup_city: '',
    pickup_postal_code: ''
  });
  
  const [pickupDate, setPickupDate] = useState<Date>();
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'desktops', label: 'Desktops' },
    { value: 'monitors', label: 'Monitors' },
    { value: 'televisions', label: 'Televisions' },
    { value: 'gaming_consoles', label: 'Gaming Consoles' },
    { value: 'printers', label: 'Printers' },
    { value: 'cameras', label: 'Cameras' },
    { value: 'audio_equipment', label: 'Audio Equipment' },
    { value: 'kitchen_appliances', label: 'Kitchen Appliances' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'cables_accessories', label: 'Cables & Accessories' },
    { value: 'other', label: 'Other' }
  ] as const;

  const conditions = [
    { value: 'working', label: 'Working' },
    { value: 'partially_working', label: 'Partially Working' },
    { value: 'not_working', label: 'Not Working' },
    { value: 'damaged', label: 'Damaged' }
  ] as const;

  const addItem = () => {
    const newItem: EWasteItem = {
      id: Date.now().toString(),
      category: '',
      device_name: '',
      brand: '',
      model: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Validate items
      const validItems = items.filter(item => 
        item.category && item.device_name && item.condition
      );
      
      if (validItems.length === 0) {
        toast.error("Please add at least one valid e-waste item");
        return;
      }

      // Submit each item as a separate submission
      const submissions = validItems.map(item => ({
        category: item.category as Database['public']['Enums']['device_category'],
        device_name: item.device_name,
        brand: item.brand || null,
        model: item.model || null,
        condition: item.condition as Database['public']['Enums']['device_condition'],
        quantity: item.quantity,
        description: item.description || null,
        pickup_address: contactInfo.pickup_address || null,
        pickup_city: contactInfo.pickup_city || null,
        pickup_postal_code: contactInfo.pickup_postal_code || null,
        preferred_pickup_date: pickupDate ? format(pickupDate, 'yyyy-MM-dd') : null
      }));

      // Submit all items
      for (const submission of submissions) {
        const { error } = await createSubmission(submission);
        if (error) {
          throw new Error(error);
        }
      }
      
      toast.success("E-Waste submissions created successfully!");
      onBack();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to submit e-waste request");
    } finally {
      setSubmitting(false);
    }
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
          Back to Dashboard
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
              {/* Pickup Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pickup Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Pickup Address</Label>
                    <Textarea
                      id="address"
                      value={contactInfo.pickup_address}
                      onChange={(e) => setContactInfo({...contactInfo, pickup_address: e.target.value})}
                      placeholder="Enter your complete address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={contactInfo.pickup_city}
                      onChange={(e) => setContactInfo({...contactInfo, pickup_city: e.target.value})}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input
                      id="postal"
                      value={contactInfo.pickup_postal_code}
                      onChange={(e) => setContactInfo({...contactInfo, pickup_postal_code: e.target.value})}
                      placeholder="Enter postal code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Pickup Date</Label>
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
                        <Label>Category *</Label>
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
                        <Label>Device Name *</Label>
                        <Input
                          placeholder="e.g., iPhone 12, Dell Laptop"
                          value={item.device_name}
                          onChange={(e) => updateItem(item.id, 'device_name', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Brand</Label>
                        <Input
                          placeholder="e.g., Apple, Dell"
                          value={item.brand}
                          onChange={(e) => updateItem(item.id, 'brand', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Model</Label>
                        <Input
                          placeholder="e.g., iPhone 12 Pro, XPS 13"
                          value={item.model}
                          onChange={(e) => updateItem(item.id, 'model', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Condition *</Label>
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
                      
                      <div className="space-y-2 md:col-span-3">
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

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="eco-gradient" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Request'}
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
