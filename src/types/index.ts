export interface Farm {
  id: string
  type: 'farm'
  name: string
  region: string
  lat: number
  lng: number
  products: string[]
  certified_bio: boolean
  story: string
  owner?: string
  founded: number
  address: string
  phone?: string
  website?: string
  schedule?: string
  userAdded?: boolean
}

export interface WaterSource {
  id: string
  type: 'water'
  name: string
  region: string
  lat: number
  lng: number
  description: string
  access: string
  tested: boolean
  flow_rate?: string
}

export type MapPoint = Farm | WaterSource

export function isFarm(point: MapPoint): point is Farm {
  return point.type === 'farm'
}

export interface Filters {
  type: 'all' | 'farm' | 'water'
  bio: boolean
  region: string
  search: string
  radius: number | null // km — null = no limit
}

export interface UserPosition {
  lat: number
  lng: number
}
