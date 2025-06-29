# Property Management App with Supabase

This application now uses Supabase as the database backend for storing and managing rental properties.

## Database Setup Instructions

### Option 1: Use Supabase (Recommended)

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Your Credentials**
   - In your Supabase dashboard, go to Settings > API
   - Copy your Project URL and anon public key

3. **Set Environment Variables**
   - Create a `.env` file in your project root
   - Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Run Database Migration**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase/migrations/create_properties_schema.sql`
   - Run the SQL to create your database tables

### Option 2: Alternative Databases

If you prefer a different database solution:

#### Firebase/Firestore
- Good for real-time features
- Easy Google integration
- NoSQL database

#### PlanetScale
- MySQL-compatible
- Excellent for scaling
- Branching for database schema changes

#### Railway + PostgreSQL
- Simple deployment
- PostgreSQL database
- Good for full-stack apps

## Features

✅ **Property Management**
- Add, edit, delete rental properties
- Store property details (rent, bedrooms, bathrooms, etc.)
- User authentication and data isolation

✅ **Real-time Updates**
- Properties update in real-time across devices
- Automatic data synchronization

✅ **Secure Data**
- Row Level Security (RLS) ensures users only see their own data
- Built-in authentication with Supabase Auth

## Database Schema

### Properties Table
- `id` - Unique identifier
- `user_id` - Links to authenticated user
- `title` - Property name
- `address` - Street address
- `city`, `state`, `zip_code` - Location details
- `rent` - Monthly rent amount
- `bedrooms`, `bathrooms`, `sqft` - Property specs
- `property_type` - apartment, house, condo, townhouse
- `description` - Property description
- `amenities` - Available amenities
- `created_at`, `updated_at` - Timestamps

### Rental Applications Table
- `id` - Unique identifier
- `property_id` - Links to property
- `applicant_name`, `applicant_email`, `applicant_phone` - Contact info
- `income`, `credit_score` - Financial details
- `status` - pending, approved, rejected
- `applied_date` - When application was submitted

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your database (see instructions above)
4. Add environment variables
5. Run the development server: `npm run dev`

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime

## Support

If you need help setting up the database or have questions about the implementation, feel free to ask!