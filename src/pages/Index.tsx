import { Search, MapPin, Filter, User, Menu, X, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import MapView from '@/components/MapView';
import { mockProperties } from '@/data/mockProperties';
import { FilterState } from '@/types/property';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "all",
    amenities: []
  });

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

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
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
      <section className="bg-gradient-to-br from-[#1277e1] to-[#0f5bb8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Home
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Discover amazing properties in your favorite neighborhoods
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter city, neighborhood, or ZIP"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1277e1] focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1277e1] focus:border-transparent text-gray-900">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button className="w-full bg-[#1277e1] text-white px-6 py-3 rounded-lg hover:bg-[#0f5bb8] transition-colors flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
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
              {mockProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
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
