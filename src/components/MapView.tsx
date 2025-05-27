import { useState } from "react";
import { Bed, Bath, Square, ZoomIn, ZoomOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Property } from "@/types/property";

interface MapViewProps {
  properties: Property[];
}

const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [zoom, setZoom] = useState(12);

  // Simulated map view with property markers
  return (
    <div className="relative h-[calc(100vh-200px)] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Mapbox Token Input */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-lg">
          <Input
            type="password"
            placeholder="Enter Mapbox token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-64"
          />
        </Card>
      </div>

      {/* Property Markers */}
      {properties.map((property) => (
        <div
          key={property.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          onClick={() => setSelectedProperty(property)}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              $
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-600"></div>
          </div>
        </div>
      ))}

      {/* Property Details Popup */}
      {selectedProperty && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ width: "300px" }}
        >
          <Card className="bg-white shadow-xl">
            <div className="relative">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                onClick={() => setSelectedProperty(null)}
              >
                ×
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{selectedProperty.address}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Bed className="w-4 h-4" />
                  <span>{selectedProperty.bedrooms} bd</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="w-4 h-4" />
                  <span>{selectedProperty.bathrooms} ba</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="w-4 h-4" />
                  <span>{selectedProperty.sqft} sqft</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
          onClick={() => setZoom(Math.min(zoom + 1, 20))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
          onClick={() => setZoom(Math.max(zoom - 1, 1))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MapView;
