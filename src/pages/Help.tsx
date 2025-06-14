
import { ArrowLeft, Search, Home, Building2, House, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#1277e1] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Return to Home
              </Link>
              <h1 className="text-2xl font-bold text-[#1277e1]">PropertyQuest Help</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h2>
          <p className="text-xl text-gray-600">Find answers to common questions and get support</p>
        </div>

        {/* FAQ Section */}
        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-[#1277e1]" />
                How to Search for Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Search</h4>
                <p className="text-gray-600">Use the search bar on the homepage to enter an address, neighborhood, city, or ZIP code. Click the search button to find properties in that area.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Using Filters</h4>
                <p className="text-gray-600">Click the "Filters" button to narrow down your search by price range, number of bedrooms and bathrooms, property type, and amenities.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Map View</h4>
                <p className="text-gray-600">Switch to map view to see properties visually on a map and explore different neighborhoods.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-[#1277e1]" />
                Buying Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Getting Started</h4>
                <p className="text-gray-600">Create an account to save your favorite properties and get personalized recommendations. Use our mortgage calculator to estimate your monthly payments.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contacting Agents</h4>
                <p className="text-gray-600">Each property listing includes contact information for the listing agent. You can schedule viewings and ask questions directly.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Making an Offer</h4>
                <p className="text-gray-600">Work with a real estate agent to prepare and submit competitive offers. They'll guide you through the negotiation process.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-[#1277e1]" />
                Renting Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Finding Rentals</h4>
                <p className="text-gray-600">Use the "Rent" section to browse available rental properties. Filter by your budget, desired move-in date, and required amenities.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Application Process</h4>
                <p className="text-gray-600">Most rental applications require proof of income, credit check, and references. Have these documents ready to speed up the process.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Lease Terms</h4>
                <p className="text-gray-600">Carefully review lease terms including rent amount, security deposit, pet policies, and maintenance responsibilities before signing.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <House className="h-5 w-5 mr-2 text-[#1277e1]" />
                Selling Your Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Property Valuation</h4>
                <p className="text-gray-600">Get a free property valuation to understand your home's market value. This helps you set a competitive listing price.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Listing Your Property</h4>
                <p className="text-gray-600">Work with our partner agents to create compelling listings with professional photos and detailed descriptions.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Managing Showings</h4>
                <p className="text-gray-600">Coordinate property showings and open houses to attract potential buyers. Keep your property clean and well-staged.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg border p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to assist you with any questions</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-[#1277e1] mb-3" />
              <h4 className="font-semibold mb-2">Phone Support</h4>
              <p className="text-gray-600 text-sm mb-3">Mon-Fri, 9AM-6PM EST</p>
              <Button variant="outline" className="text-[#1277e1] border-[#1277e1] hover:bg-[#1277e1] hover:text-white">
                Call (555) 123-4567
              </Button>
            </div>
            
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-[#1277e1] mb-3" />
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
              <Button variant="outline" className="text-[#1277e1] border-[#1277e1] hover:bg-[#1277e1] hover:text-white">
                Email Us
              </Button>
            </div>
            
            <div className="flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-[#1277e1] mb-3" />
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-3">Available 24/7</p>
              <Button variant="outline" className="text-[#1277e1] border-[#1277e1] hover:bg-[#1277e1] hover:text-white">
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
