import { useState } from "react";
import { Heart, Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    if (property.status === "for-rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "for-sale": return "bg-emerald-600";
      case "for-rent": return "bg-blue-600";
      case "sold": return "bg-gray-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200">
      <div className="relative" onClick={handleCardClick}>
        {/* Image Carousel */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.title} at ${property.address}, ${property.city}, ${property.state}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status Badge */}
          <Badge 
            className={`absolute top-3 left-3 text-white ${getStatusColor(property.status)}`}
          >
            {property.status === "for-sale" ? "For Sale" : 
             property.status === "for-rent" ? "For Rent" :
             property.status.toUpperCase()}
          </Badge>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 text-white hover:text-red-500 bg-black/20 hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-4 mb-3 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} bd</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} ba</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center space-x-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{property.address}, {property.city}, {property.state}</span>
          </div>

          {/* Property Type and Listed Date */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <Badge variant="outline" className="border-gray-200">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Listed {new Date(property.listedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyCard;
