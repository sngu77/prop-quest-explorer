
import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface MapViewProps {
  properties: Property[];
}

const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display the interactive map, please enter your Mapbox public token. 
              You can get one at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleTokenSubmit} className="w-full">
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Simulated map view with property markers
  return (
    <div className="relative h-full bg-gray-200 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="text-gray-400">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Property Markers */}
      {properties.map((property, index) => (
        <div
          key={property.id}
          className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${20 + (index % 5) * 15}%`,
            top: `${20 + Math.floor(index / 5) * 20}%`,
          }}
          onClick={() => setSelectedProperty(property)}
        >
          <div className="relative">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:bg-blue-700 transition-colors">
              ${property.status === "for-rent" ? `${property.price}/mo` : `${Math.round(property.price / 1000)}k`}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <MapPin className="w-6 h-6 text-blue-600 fill-current" />
            </div>
          </div>
        </div>
      ))}

      {/* Property Details Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Card className="shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{selectedProperty.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {selectedProperty.address}, {selectedProperty.city}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{selectedProperty.bedrooms} bed</span>
                      <span>{selectedProperty.bathrooms} bath</span>
                      <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
                    </div>
                    <p className="font-bold text-lg text-blue-600 mt-2">
                      ${selectedProperty.price.toLocaleString()}
                      {selectedProperty.status === "for-rent" && "/mo"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProperty(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button variant="outline" size="sm" className="bg-white">
          +
        </Button>
        <Button variant="outline" size="sm" className="bg-white">
          -
        </Button>
      </div>
    </div>
  );
};

export default MapView;
