
import { useState } from "react";
import { Search, MapPin, Filter, Grid, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import MapView from "@/components/MapView";
import { mockProperties } from "@/data/mockProperties";
import { Property, FilterState } from "@/types/property";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "all",
    amenities: []
  });

  const filteredProperties = mockProperties.filter((property) => {
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesBedrooms = filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
    const matchesBathrooms = filters.bathrooms === 0 || property.bathrooms >= filters.bathrooms;
    const matchesType = filters.propertyType === "all" || property.type === filters.propertyType;
    const matchesAmenities = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => property.amenities.includes(amenity));
    
    return matchesPrice && matchesBedrooms && matchesBathrooms && matchesType && matchesAmenities;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">PropertyHub</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Buy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Rent</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Sell</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Dream Home
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover exceptional properties in prime locations
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by city, neighborhood, or address..."
                    className="pl-12 pr-4 py-4 text-gray-900 border-0 focus:ring-0 text-lg"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button className="m-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredProperties.length} properties found
              </span>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center space-x-1"
              >
                <Grid className="w-4 h-4" />
                <span>Grid</span>
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center space-x-1"
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PropertyFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapView properties={filteredProperties} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
