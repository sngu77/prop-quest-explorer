import { supabase } from './supabase';

export interface Property {
  id?: string;
  user_id?: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  rent: number;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  property_type: string;
  description: string;
  amenities: string;
  year_built?: string;
  lease_term?: string;
  security_deposit?: number;
  pet_policy?: string;
  smoking_policy?: string;
  available_date?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RentalApplication {
  id?: string;
  property_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  income: number;
  credit_score: number;
  status: 'pending' | 'approved' | 'rejected';
  applied_date?: string;
  created_at?: string;
}

// Property CRUD operations
export const propertyService = {
  // Get all properties for the current user
  async getProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return data || [];
  },

  // Get a single property by ID
  async getProperty(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      throw error;
    }

    return data;
  },

  // Add a new property
  async addProperty(property: Omit<Property, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Property> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([{
        ...property,
        user_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding property:', error);
      throw error;
    }

    return data;
  },

  // Update a property
  async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating property:', error);
      throw error;
    }

    return data;
  },

  // Delete a property
  async deleteProperty(id: string): Promise<void> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },

  // Get property statistics
  async getPropertyStats(): Promise<{
    totalProperties: number;
    totalRent: number;
    averageRent: number;
    occupiedProperties: number;
  }> {
    const properties = await this.getProperties();
    
    const totalProperties = properties.length;
    const totalRent = properties.reduce((sum, prop) => sum + prop.rent, 0);
    const averageRent = totalProperties > 0 ? totalRent / totalProperties : 0;
    const occupiedProperties = Math.floor(totalProperties * 0.8); // Mock data

    return {
      totalProperties,
      totalRent,
      averageRent,
      occupiedProperties
    };
  }
};

// Rental Application CRUD operations
export const applicationService = {
  // Get applications for user's properties
  async getApplications(): Promise<RentalApplication[]> {
    const { data, error } = await supabase
      .from('rental_applications')
      .select(`
        *,
        properties (
          title,
          address
        )
      `)
      .order('applied_date', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }

    return data || [];
  },

  // Submit a rental application
  async submitApplication(application: Omit<RentalApplication, 'id' | 'created_at'>): Promise<RentalApplication> {
    const { data, error } = await supabase
      .from('rental_applications')
      .insert([application])
      .select()
      .single();

    if (error) {
      console.error('Error submitting application:', error);
      throw error;
    }

    return data;
  },

  // Update application status
  async updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<RentalApplication> {
    const { data, error } = await supabase
      .from('rental_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating application status:', error);
      throw error;
    }

    return data;
  }
};

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to property changes
  subscribeToProperties(callback: (payload: any) => void) {
    return supabase
      .channel('properties')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'properties' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to application changes
  subscribeToApplications(callback: (payload: any) => void) {
    return supabase
      .channel('rental_applications')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'rental_applications' }, 
        callback
      )
      .subscribe();
  }
};