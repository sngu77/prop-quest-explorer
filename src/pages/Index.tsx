
import { Search, MapPin, Filter, User, Menu, X, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import MapView from '@/components/MapView';
import { mockProperties } from '@/data/mockProperties';
import { FilterState } from '@/types/property';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import EmptyState from '@/components/EmptyState';

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "all",
    amenities: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    console.log('Searching for:', { location: searchLocation, propertyType: selectedPropertyType });
    // Here you would implement the actual search logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1277e1]">RentFinder</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Buy</a>
              <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Rent</a>
              <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Sell</a>
              {isAuthenticated && (
                <Link to="/manage-rentals" className="text-gray-700 hover:text-[#1277e1] transition-colors flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  Manage Rentals
                </Link>
              )}
              <Link to="/help" className="text-gray-700 hover:text-[#1277e1] transition-colors">Help</Link>
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-gray-700 hover:text-[#1277e1] transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-[#1277e1] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#1277e1] text-white px-4 py-2 rounded-lg hover:bg-[#0f5bb8] transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-700 hover:text-[#1277e1] transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Buy</a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Rent</a>
                <a href="#" className="text-gray-700 hover:text-[#1277e1] transition-colors">Sell</a>
                {isAuthenticated && (
                  <Link to="/manage-rentals" className="text-gray-700 hover:text-[#1277e1] transition-colors flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    Manage Rentals
                  </Link>
                )}
                <Link to="/help" className="text-gray-700 hover:text-[#1277e1] transition-colors">Help</Link>
                <div className="pt-4 border-t">
                  {isAuthenticated ? (
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="block text-gray-700 hover:text-[#1277e1] transition-colors"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="block text-gray-700 hover:text-[#1277e1] transition-colors mb-2"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block bg-[#1277e1] text-white px-4 py-2 rounded-lg hover:bg-[#0f5bb8] transition-colors text-center"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1277e1] to-[#0f5bb8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Discover amazing properties in your favorite neighborhoods with our advanced search
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                {/* Location Input */}
                <div className="lg:col-span-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter city, neighborhood, or ZIP code"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-[#1277e1] rounded-lg transition-colors"
                    />
                  </div>
                </div>
                
                {/* Property Type Select */}
                <div className="lg:col-span-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Type
                  </label>
                  <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                    <SelectTrigger className="h-14 text-base border-2 border-gray-200 focus:border-[#1277e1] rounded-lg">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Search Button */}
                <div className="lg:col-span-3">
                  <Button 
                    onClick={handleSearch}
                    className="w-full h-14 bg-[#1277e1] hover:bg-[#0f5bb8] text-white font-semibold text-base rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search Properties
                  </Button>
                </div>
              </div>
              
              {/* Quick Filters */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm font-medium text-gray-600">Popular searches:</span>
                  <button className="text-sm text-[#1277e1] hover:text-[#0f5bb8] font-medium transition-colors">
                    Houses under $500K
                  </button>
                  <button className="text-sm text-[#1277e1] hover:text-[#0f5bb8] font-medium transition-colors">
                    3+ Bedrooms
                  </button>
                  <button className="text-sm text-[#1277e1] hover:text-[#0f5bb8] font-medium transition-colors">
                    New Listings
                  </button>
                  <button className="text-sm text-[#1277e1] hover:text-[#0f5bb8] font-medium transition-colors">
                    Pet Friendly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-[#1277e1] text-white border-[#1277e1]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#1277e1]'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showMap 
                  ? 'bg-[#1277e1] text-white border-[#1277e1]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#1277e1]'
              }`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
          
          <div className="text-gray-600">
            Showing {mockProperties.length} properties
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6">
            <PropertyFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        )}

        {/* Content Grid */}
        <div className={`grid gap-8 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Properties List */}
          <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <PropertyCardSkeleton key={idx} />
                ))
              ) : mockProperties.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    onAction={() => {
                      setSearchLocation("");
                      setSelectedPropertyType("all");
                      setFilters({ priceRange: [0, 2000000], bedrooms: 0, bathrooms: 0, propertyType: "all", amenities: [] });
                    }}
                  />
                </div>
              ) : (
                mockProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>

          {/* Map */}
          {showMap && (
            <div className="lg:sticky lg:top-24">
              <MapView properties={mockProperties} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
