
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "house" | "condo" | "townhouse" | "apartment";
  status: "for-sale" | "for-rent" | "sold" | "pending";
  images: string[];
  description: string;
  amenities: string[];
  yearBuilt: number;
  lotSize?: number;
  garage?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  listedDate: string;
  virtualTour?: string;
}

export interface FilterState {
  priceRange: [number, number];
  bedrooms: number;
  bathrooms: number;
  propertyType: "all" | "house" | "condo" | "townhouse" | "apartment";
  amenities: string[];
}
