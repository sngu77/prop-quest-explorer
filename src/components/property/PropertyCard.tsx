import { useState } from 'react';
import { MoreHorizontal, Edit, Eye, Trash2, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Property } from '@/lib/database';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyCard = ({ property, onEdit, onDelete }: PropertyCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const formatAmenities = (amenities: string) => {
    if (!amenities) return [];
    return amenities.split(', ').filter(Boolean);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {property.address}
                  {property.city && `, ${property.city}`}
                  {property.state && `, ${property.state}`}
                </span>
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => setShowDetails(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(property)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Property
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#1277e1]">
                ${property.rent.toLocaleString()}/mo
              </span>
              <div className="flex items-center space-x-2">
                {property.property_type && (
                  <Badge variant="outline" className="capitalize">
                    {property.property_type}
                  </Badge>
                )}
                <Badge className={getStatusColor('available')}>
                  Available
                </Badge>
              </div>
            </div>
            
            {(property.bedrooms || property.bathrooms || property.sqft) && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                )}
                {property.sqft && (
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
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

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Added: {property.created_at ? new Date(property.created_at).toLocaleDateString() : 'Unknown'}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="text-[#1277e1] hover:text-[#0f5bb8] h-auto p-0 text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{property.title}</DialogTitle>
            <DialogDescription>
              Complete property information and details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="font-semibold mb-3">Property Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 capitalize">{property.property_type || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="ml-2 font-semibold text-[#1277e1]">${property.rent.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="ml-2">{property.bedrooms || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="ml-2">{property.bathrooms || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Square Feet:</span>
                  <span className="ml-2">{property.sqft || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Year Built:</span>
                  <span className="ml-2">{property.year_built || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-semibold mb-3">Address</h3>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  <p>{property.address}</p>
                  {(property.city || property.state || property.zip_code) && (
                    <p className="text-gray-600">
                      {[property.city, property.state, property.zip_code].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(
                    [property.address, property.city, property.state, property.zip_code].filter(Boolean).join(', '),
                    'Address'
                  )}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && (
              <div>
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {formatAmenities(property.amenities).map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {(property.contact_email || property.contact_phone) && (
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {property.contact_email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{property.contact_email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(property.contact_email!, 'Email')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {property.contact_phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{property.contact_phone}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(property.contact_phone!, 'Phone')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rental Terms */}
            <div>
              <h3 className="font-semibold mb-3">Rental Terms</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="ml-2">{property.security_deposit ? `$${property.security_deposit.toLocaleString()}` : 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Lease Term:</span>
                  <span className="ml-2 capitalize">{property.lease_term || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pet Policy:</span>
                  <span className="ml-2 capitalize">{property.pet_policy?.replace('-', ' ') || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Smoking:</span>
                  <span className="ml-2 capitalize">{property.smoking_policy?.replace('-', ' ') || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{property.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(property.id!);
                setShowDeleteDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PropertyCard;