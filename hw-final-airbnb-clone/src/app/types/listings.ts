export interface Listing {
  id: number
  title: string
  location: string
  price: number
  rating: number
  images: string[]
  guests: number
  bedrooms: number
  beds: number
  bathrooms: number
  description: string
  host: {
    name: string
    avatar: string
    isSuperhost: boolean
  }
  amenities: string[]
  isGuestFavorite?: boolean
  category: string
}

export interface FavoriteListing extends Omit<Listing, 'description' | 'host' | 'amenities'> {
  addedAt: Date
}