
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState } from "@/types/property";

interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const PropertyFilters = ({ filters, onFiltersChange }: PropertyFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const amenitiesList = [
    "Pool", "Gym", "Garage", "Garden", "Air Conditioning", 
    "Fireplace", "Hardwood Floors", "Updated Kitchen", "Concierge",
    "Rooftop Deck", "Pet Friendly", "Laundry", "Wine Cellar", "Private Terrace"
  ];

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...localFilters, priceRange: [value[0], value[1]] as [number, number] };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBedroomsChange = (value: string) => {
    const bedrooms = value === "any" ? 0 : parseInt(value);
    const newFilters = { ...localFilters, bedrooms };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBathroomsChange = (value: string) => {
    const bathrooms = value === "any" ? 0 : parseInt(value);
    const newFilters = { ...localFilters, bathrooms };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePropertyTypeChange = (value: string) => {
    const newFilters = { ...localFilters, propertyType: value as FilterState["propertyType"] };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...localFilters.amenities, amenity]
      : localFilters.amenities.filter(a => a !== amenity);
    const newFilters = { ...localFilters, amenities: newAmenities };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 2000000],
      bedrooms: 0,
      bathrooms: 0,
      propertyType: "all",
      amenities: []
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="outline" onClick={resetFilters}>
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Price Range</Label>
          <div className="px-2">
            <Slider
              value={localFilters.priceRange}
              onValueChange={handlePriceChange}
              max={2000000}
              min={0}
              step={50000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>${localFilters.priceRange[0].toLocaleString()}</span>
              <span>${localFilters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
          <Select 
            value={localFilters.bedrooms === 0 ? "any" : localFilters.bedrooms.toString()}
            onValueChange={handleBedroomsChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Bathrooms</Label>
          <Select 
            value={localFilters.bathrooms === 0 ? "any" : localFilters.bathrooms.toString()}
            onValueChange={handleBathroomsChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Property Type</Label>
          <Select value={localFilters.propertyType} onValueChange={handlePropertyTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={localFilters.amenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label htmlFor={amenity} className="text-sm text-gray-600 cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
