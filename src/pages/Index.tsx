import { useState, useEffect } from "react";
import { Search, MapPin, Filter, Grid, Map, Home, Building2, House, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import MapView from "@/components/MapView";
import { mockProperties } from "@/data/mockProperties";
import { Property, FilterState } from "@/types/property";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "all",
    amenities: []
  });

  useEffect(() => {
    // Check for existing user session
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-[#1277e1]">PropertyQuest</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Buy
                </a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  Rent
                </a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors flex items-center">
                  <House className="w-4 h-4 mr-1" />
                  Sell
                </a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Mortgage</a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Find Agents</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-[#1277e1]">
                Manage Rentals
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-[#1277e1]">
                Advertise
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-[#1277e1]">
                Help
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{user.email?.split('@')[0] || 'User'}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/favorites')}>
                      Favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="default" 
                  className="bg-[#1277e1] hover:bg-[#0d6bc2]"
                  onClick={() => navigate('/signin')}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1277e1] to-[#0d6bc2] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Home
            </h2>
            {user && (
              <p className="text-xl opacity-90">
                Welcome back, {user.email?.split('@')[0]}!
              </p>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter an address, neighborhood, city, or ZIP code"
                  className="pl-12 pr-4 py-4 text-gray-900 border-0 focus:ring-0 text-lg"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button className="m-2 px-8 py-4 bg-[#1277e1] hover:bg-[#0d6bc2] text-white rounded-md">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                {filteredProperties.length} properties found
              </span>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 border-gray-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#1277e1]">
                Sort: Recommended
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden border">
            <MapView properties={filteredProperties} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;