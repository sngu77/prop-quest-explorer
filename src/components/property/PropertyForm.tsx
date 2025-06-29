import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const AMENITIES_LIST = [
  'Pool', 'Gym', 'Parking', 'Laundry', 'Air Conditioning', 'Heating',
  'Dishwasher', 'Microwave', 'Refrigerator', 'Washer/Dryer', 'Balcony',
  'Patio', 'Garden', 'Fireplace', 'Hardwood Floors', 'Carpet',
  'Pet Friendly', 'Furnished', 'Unfurnished', 'Storage', 'Elevator',
  'Doorman', 'Security', 'Internet', 'Cable TV', 'Utilities Included'
];

const PropertyForm = ({ initialData, onSubmit, onCancel, isEditing = false }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zip_code: initialData?.zip_code || '',
    rent: initialData?.rent?.toString() || '',
    bedrooms: initialData?.bedrooms || '',
    bathrooms: initialData?.bathrooms || '',
    sqft: initialData?.sqft || '',
    property_type: initialData?.property_type || '',
    description: initialData?.description || '',
    amenities: initialData?.amenities ? initialData.amenities.split(', ') : [],
    year_built: initialData?.year_built || '',
    lease_term: initialData?.lease_term || '',
    security_deposit: initialData?.security_deposit?.toString() || '',
    pet_policy: initialData?.pet_policy || '',
    smoking_policy: initialData?.smoking_policy || 'no-smoking',
    available_date: initialData?.available_date || '',
    contact_email: initialData?.contact_email || '',
    contact_phone: initialData?.contact_phone || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Property title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.rent || parseFloat(formData.rent) <= 0) newErrors.rent = 'Valid rent amount is required';
    if (!formData.property_type) newErrors.property_type = 'Property type is required';

    // Email validation
    if (formData.contact_email && !/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Valid email address is required';
    }

    // Phone validation (basic)
    if (formData.contact_phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.contact_phone)) {
      newErrors.contact_phone = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        rent: parseFloat(formData.rent),
        security_deposit: formData.security_deposit ? parseFloat(formData.security_deposit) : 0,
        amenities: formData.amenities.join(', ')
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Essential details about your property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Modern Downtown Apartment"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="property_type">Property Type *</Label>
            <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
              <SelectTrigger className={errors.property_type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
              </SelectContent>
            </Select>
            {errors.property_type && <p className="text-sm text-red-500 mt-1">{errors.property_type}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the property features, location benefits, nearby amenities..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location
          </CardTitle>
          <CardDescription>Property address and location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Main Street"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="zip_code">ZIP Code</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => handleInputChange('zip_code', e.target.value)}
                placeholder="12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Size, layout, and physical characteristics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5+">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                  <SelectItem value="4+">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                value={formData.sqft}
                onChange={(e) => handleInputChange('sqft', e.target.value)}
                placeholder="1200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year_built">Year Built</Label>
              <Input
                id="year_built"
                type="number"
                value={formData.year_built}
                onChange={(e) => handleInputChange('year_built', e.target.value)}
                placeholder="2020"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="available_date">Available Date</Label>
              <Input
                id="available_date"
                type="date"
                value={formData.available_date}
                onChange={(e) => handleInputChange('available_date', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rental Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Terms</CardTitle>
          <CardDescription>Pricing and lease information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rent">Monthly Rent *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="rent"
                  type="number"
                  value={formData.rent}
                  onChange={(e) => handleInputChange('rent', e.target.value)}
                  placeholder="2500"
                  className={`pl-8 ${errors.rent ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.rent && <p className="text-sm text-red-500 mt-1">{errors.rent}</p>}
            </div>

            <div>
              <Label htmlFor="security_deposit">Security Deposit</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="security_deposit"
                  type="number"
                  value={formData.security_deposit}
                  onChange={(e) => handleInputChange('security_deposit', e.target.value)}
                  placeholder="2500"
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lease_term">Lease Term</Label>
              <Select value={formData.lease_term} onValueChange={(value) => handleInputChange('lease_term', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lease term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="12-months">12 Months</SelectItem>
                  <SelectItem value="18-months">18 Months</SelectItem>
                  <SelectItem value="24-months">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="pet_policy">Pet Policy</Label>
              <Select value={formData.pet_policy} onValueChange={(value) => handleInputChange('pet_policy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pet policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-pets">No Pets</SelectItem>
                  <SelectItem value="cats-only">Cats Only</SelectItem>
                  <SelectItem value="dogs-only">Dogs Only</SelectItem>
                  <SelectItem value="cats-and-dogs">Cats and Dogs</SelectItem>
                  <SelectItem value="all-pets">All Pets Welcome</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="smoking_policy">Smoking Policy</Label>
            <Select value={formData.smoking_policy} onValueChange={(value) => handleInputChange('smoking_policy', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select smoking policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-smoking">No Smoking</SelectItem>
                <SelectItem value="smoking-allowed">Smoking Allowed</SelectItem>
                <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <CardDescription>Select all amenities available at this property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {AMENITIES_LIST.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
          
          {formData.amenities.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Selected Amenities:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                    {amenity}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleAmenityToggle(amenity)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How potential tenants can reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="landlord@example.com"
                className={errors.contact_email ? 'border-red-500' : ''}
              />
              {errors.contact_email && <p className="text-sm text-red-500 mt-1">{errors.contact_email}</p>}
            </div>

            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="(555) 123-4567"
                className={errors.contact_phone ? 'border-red-500' : ''}
              />
              {errors.contact_phone && <p className="text-sm text-red-500 mt-1">{errors.contact_phone}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-[#1277e1] hover:bg-[#0f5bb8]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Property' : 'Add Property')}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;