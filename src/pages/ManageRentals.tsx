import { ArrowLeft, Plus, Building2, Users, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import RentalApplications from '@/components/rental/RentalApplications';
import RentalIncome from '@/components/rental/RentalIncome';

interface UserProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rent: number;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  type: string;
  description: string;
  amenities: string;
  dateAdded: string;
}

const ManageRentals = () => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [userProperties, setUserProperties] = useState<UserProperty[]>([]);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    type: '',
    description: '',
    amenities: ''
  });

  const handleAddProperty = () => {
    setIsAddPropertyOpen(true);
  };

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!propertyForm.title || !propertyForm.address || !propertyForm.rent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Title, Address, Rent)",
        variant: "destructive"
      });
      return;
    }

    // Create new property object
    const newProperty: UserProperty = {
      id: Date.now().toString(),
      title: propertyForm.title,
      address: propertyForm.address,
      city: propertyForm.city,
      state: propertyForm.state,
      zipCode: propertyForm.zipCode,
      rent: parseFloat(propertyForm.rent),
      bedrooms: propertyForm.bedrooms,
      bathrooms: propertyForm.bathrooms,
      sqft: propertyForm.sqft,
      type: propertyForm.type,
      description: propertyForm.description,
      amenities: propertyForm.amenities,
      dateAdded: new Date().toISOString()
    };

    // Add to properties list
    setUserProperties(prev => [...prev, newProperty]);
    
    toast({
      title: "Success",
      description: "Property added successfully!"
    });

    // Reset form and close dialog
    setPropertyForm({
      title: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      rent: '',
      bedrooms: '',
      bathrooms: '',
      sqft: '',
      type: '',
      description: '',
      amenities: ''
    });
    setIsAddPropertyOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setPropertyForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteProperty = (id: string) => {
    setUserProperties(prev => prev.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed from your portfolio."
    });
  };

  // Custom Properties Component
  const UserPropertiesComponent = () => (
    <div className="space-y-6">
      {userProperties.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
            <p className="text-gray-600 mb-4">Start building your rental portfolio by adding your first property.</p>
            <Button 
              onClick={handleAddProperty}
              className="bg-[#1277e1] hover:bg-[#0f5bb8] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      {property.address}
                      {property.city && `, ${property.city}`}
                      {property.state && `, ${property.state}`}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1277e1]">
                      ${property.rent.toLocaleString()}/mo
                    </span>
                    {property.type && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                        {property.type}
                      </span>
                    )}
                  </div>
                  
                  {(property.bedrooms || property.bathrooms || property.sqft) && (
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <span>{property.bedrooms} bed</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center">
                          <span>{property.bathrooms} bath</span>
                        </div>
                      )}
                      {property.sqft && (
                        <div className="flex items-center">
                          <span>{property.sqft} sqft</span>
                        </div>
                      )}
                    </div>
                  )}

                  {property.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {property.description}
                    </p>
                  )}

                  {property.amenities && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Amenities:</span> {property.amenities}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Added: {new Date(property.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#1277e1] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Return to Home
              </Link>
              <h1 className="text-2xl font-bold text-[#1277e1]">Manage Rentals</h1>
            </div>
            
            <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={handleAddProperty}
                  className="bg-[#1277e1] hover:bg-[#0f5bb8] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Property</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add a new rental property to your portfolio.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmitProperty} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="title">Property Title *</Label>
                      <Input
                        id="title"
                        value={propertyForm.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Modern Downtown Apartment"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={propertyForm.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={propertyForm.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={propertyForm.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={propertyForm.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="ZIP Code"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rent">Monthly Rent *</Label>
                      <Input
                        id="rent"
                        type="number"
                        value={propertyForm.rent}
                        onChange={(e) => handleInputChange('rent', e.target.value)}
                        placeholder="2500"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={propertyForm.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select value={propertyForm.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                          <SelectItem value="4">4+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input
                        id="sqft"
                        type="number"
                        value={propertyForm.sqft}
                        onChange={(e) => handleInputChange('sqft', e.target.value)}
                        placeholder="1200"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Property Type</Label>
                      <Select value={propertyForm.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={propertyForm.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the property features, location benefits, etc."
                        rows={3}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="amenities">Amenities</Label>
                      <Input
                        id="amenities"
                        value={propertyForm.amenities}
                        onChange={(e) => handleInputChange('amenities', e.target.value)}
                        placeholder="Pool, Gym, Parking, etc. (comma separated)"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddPropertyOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#1277e1] hover:bg-[#0f5bb8]">
                      Add Property
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProperties.length}</div>
              <p className="text-xs text-muted-foreground">Your rental portfolio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Occupied units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${userProperties.reduce((total, property) => total + property.rent, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">From your properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Require review</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <UserPropertiesComponent />
          </TabsContent>

          <TabsContent value="applications">
            <RentalApplications />
          </TabsContent>

          <TabsContent value="income">
            <RentalIncome />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ManageRentals;