
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Bed, Bath, Square, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockProperties } from "@/data/mockProperties";
import { toast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Listings</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (property.status === "for-rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleContactAgent = () => {
    toast({
      title: "Contact Information",
      description: `Email: ${property.agent.email} | Phone: ${property.agent.phone}`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link copied to clipboard!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Listings</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex items-center space-x-2"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                <span>Save</span>
              </Button>
              <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1, 3).map((image, index) => (
              <div key={index} className="h-48 lg:h-60 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${
                  property.status === "for-sale" ? "bg-green-500" :
                  property.status === "for-rent" ? "bg-blue-500" :
                  property.status === "sold" ? "bg-gray-500" : "bg-yellow-500"
                } text-white`}>
                  {property.status.replace("-", " ").toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                {formatPrice(property.price)}
              </div>

              <div className="flex items-center space-x-8 text-lg">
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <Separator />

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{property.type}</span>
                </div>
                {property.lotSize && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Size:</span>
                    <span className="font-medium">{property.lotSize.toLocaleString()} sqft</span>
                  </div>
                )}
                {property.garage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Garage:</span>
                    <span className="font-medium">{property.garage} car(s)</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed Date:</span>
                  <span className="font-medium">{new Date(property.listedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{property.agent.name}</h4>
                    <p className="text-gray-600">Real Estate Agent</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{property.agent.email}</span>
                  </div>
                </div>

                <Button onClick={handleContactAgent} className="w-full mt-4">
                  Contact Agent
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per sqft:</span>
                    <span className="font-medium">${Math.round(property.price / property.sqft)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Days on market:</span>
                    <span className="font-medium">
                      {Math.floor((new Date().getTime() - new Date(property.listedDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Property ID:</span>
                    <span className="font-medium">#{property.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
