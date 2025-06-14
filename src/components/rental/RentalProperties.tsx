
import { MoreHorizontal, Edit, Eye, Trash2, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const mockProperties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    address: '123 Main St, Downtown',
    rent: 2800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: 'occupied',
    tenant: 'John Smith',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Suburban Family Home',
    address: '456 Oak Ave, Suburbs',
    rent: 3500,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2100,
    status: 'vacant',
    tenant: null,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Luxury Condo',
    address: '789 High St, Uptown',
    rent: 4200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    status: 'occupied',
    tenant: 'Sarah Johnson',
    image: '/placeholder.svg'
  }
];

const RentalProperties = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-green-100 text-green-800';
      case 'vacant':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Property
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
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
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.sqft} sqft
                  </div>
                </div>

                {property.tenant && (
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      <span className="font-medium">Tenant:</span> {property.tenant}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentalProperties;
