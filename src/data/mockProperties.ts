
import { Property } from "@/types/property";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Home",
    address: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: "house",
    status: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ],
    description: "Stunning modern home with panoramic city views, gourmet kitchen, and spacious outdoor entertaining area.",
    amenities: ["Pool", "Garage", "Garden", "Air Conditioning", "Fireplace"],
    yearBuilt: 2018,
    lotSize: 8500,
    garage: 2,
    coordinates: { lat: 37.7749, lng: -122.4194 },
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@propertyhub.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b5b2a8cd?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Downtown Luxury Condo",
    address: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "condo",
    status: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    description: "Sleek downtown condo with floor-to-ceiling windows and premium finishes throughout.",
    amenities: ["Gym", "Concierge", "Rooftop Deck", "Air Conditioning"],
    yearBuilt: 2020,
    coordinates: { lat: 37.7849, lng: -122.4094 },
    agent: {
      name: "Michael Chen",
      phone: "(555) 987-6543",
      email: "michael@propertyhub.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-20"
  },
  {
    id: "3",
    title: "Charming Victorian Townhouse",
    address: "789 Lombard Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94133",
    price: 1680000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    type: "townhouse",
    status: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop"
    ],
    description: "Beautiful Victorian townhouse with original details, updated kitchen, and private garden.",
    amenities: ["Garden", "Fireplace", "Hardwood Floors", "Updated Kitchen"],
    yearBuilt: 1895,
    coordinates: { lat: 37.8019, lng: -122.4194 },
    agent: {
      name: "Emily Rodriguez",
      phone: "(555) 456-7890",
      email: "emily@propertyhub.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-10"
  },
  {
    id: "4",
    title: "Luxury Penthouse Suite",
    address: "321 Pine Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94108",
    price: 2200000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2500,
    type: "condo",
    status: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515263487990-61b07816b6d6?w=800&h=600&fit=crop"
    ],
    description: "Spectacular penthouse with 360-degree city views, private terrace, and luxury finishes.",
    amenities: ["Pool", "Gym", "Concierge", "Private Terrace", "Wine Cellar"],
    yearBuilt: 2019,
    coordinates: { lat: 37.7919, lng: -122.4094 },
    agent: {
      name: "David Kim",
      phone: "(555) 234-5678",
      email: "david@propertyhub.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-18"
  },
  {
    id: "5",
    title: "Cozy Family Home",
    address: "654 Valencia Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94110",
    price: 980000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: "house",
    status: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop"
    ],
    description: "Perfect family home in vibrant Mission District with renovated kitchen and sunny backyard.",
    amenities: ["Garden", "Updated Kitchen", "Hardwood Floors", "Garage"],
    yearBuilt: 1925,
    garage: 1,
    coordinates: { lat: 37.7599, lng: -122.4194 },
    agent: {
      name: "Lisa Wang",
      phone: "(555) 345-6789",
      email: "lisa@propertyhub.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-12"
  },
  {
    id: "6",
    title: "Modern Studio Apartment",
    address: "987 Mission Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    type: "apartment",
    status: "for-rent",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ],
    description: "Stylish studio apartment with modern amenities and great location near public transit.",
    amenities: ["Gym", "Laundry", "Air Conditioning", "Pet Friendly"],
    yearBuilt: 2021,
    coordinates: { lat: 37.7749, lng: -122.4194 },
    agent: {
      name: "Alex Thompson",
      phone: "(555) 567-8901",
      email: "alex@propertyhub.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    listedDate: "2024-01-22"
  }
];
