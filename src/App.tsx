import { useState, useMemo, useEffect, useCallback } from 'react'
import { farms as staticFarms, ALL_REGIONS } from '@/data/farms'
import { waterSources } from '@/data/waterSources'
import { Filters, MapPoint, Farm, UserPosition } from '@/types'
import { distanceKm, getUserPosition } from '@/utils/geo'
import Header from '@/components/Header'
import FilterBar from '@/components/FilterBar'
import MapView from '@/components/MapView'
import DetailPanel from '@/components/DetailPanel'
import AddFarmForm from '@/components/AddFarmForm'

const USER_FARMS_KEY = 'fermes-quebec-user-farms'

function loadUserFarms(): Farm[] {
  try {
    const raw = localStorage.getItem(USER_FARMS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null)
  const [locating, setLocating] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [userFarms, setUserFarms] = useState<Farm[]>(loadUserFarms)

  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    bio: false,
    region: '',
    search: '',
    radius: null,
  })

  // All farms = static + user-added
  const allFarms = useMemo(() => [...staticFarms, ...userFarms], [userFarms])
  const allRegions = useMemo(
    () => [...new Set(allFarms.map((f) => f.region))].sort(),
    [allFarms],
  )

  // Persist user farms
  useEffect(() => {
    localStorage.setItem(USER_FARMS_KEY, JSON.stringify(userFarms))
  }, [userFarms])

  // Geolocation
  const handleLocate = useCallback(async () => {
    setLocating(true)
    try {
      const pos = await getUserPosition()
      setUserPosition(pos)
      if (!filters.radius) {
        setFilters((f) => ({ ...f, radius: 50 }))
      }
    } catch (err) {
      alert("Impossible d'obtenir votre position. Vérifiez les permissions de localisation.")
    } finally {
      setLocating(false)
    }
  }, [filters.radius])

  // Filter farms
  const filteredFarms = useMemo(() => {
    if (filters.type === 'water') return []
    return allFarms.filter((farm) => {
      if (filters.bio && !farm.certified_bio) return false
      if (filters.region && farm.region !== filters.region) return false
      if (
        filters.search &&
        !farm.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !farm.products.some((p) => p.toLowerCase().includes(filters.search.toLowerCase()))
      )
        return false
      if (filters.radius && userPosition) {
        const d = distanceKm(userPosition.lat, userPosition.lng, farm.lat, farm.lng)
        if (d > filters.radius) return false
      }
      return true
    })
  }, [filters, allFarms, userPosition])

  // Filter water sources
  const filteredWaterSources = useMemo(() => {
    if (filters.type === 'farm') return []
    return waterSources.filter((source) => {
      if (filters.region && source.region !== filters.region) return false
      if (
        filters.search &&
        !source.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      if (filters.radius && userPosition) {
        const d = distanceKm(userPosition.lat, userPosition.lng, source.lat, source.lng)
        if (d > filters.radius) return false
      }
      return true
    })
  }, [filters, userPosition])

  const handleSelect = (point: MapPoint | null) => setSelectedPoint(point)

  const handleAddFarm = (farm: Farm) => {
    setUserFarms((prev) => [...prev, farm])
    setShowAddForm(false)
  }

  const handleProductClick = (product: string) => {
    setFilters((f) => ({ ...f, search: product, type: 'farm' }))
    setSelectedPoint(null)
  }

  const totalVisible = filteredFarms.length + filteredWaterSources.length

  return (
    <div className="flex flex-col h-screen bg-snow-white">
      <Header
        farmCount={allFarms.length}
        waterCount={waterSources.length}
        visibleCount={totalVisible}
        onAddFarm={() => setShowAddForm(true)}
      />
      <FilterBar
        filters={filters}
        onChange={setFilters}
        regions={allRegions}
        userPosition={userPosition}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative">
          <MapView
            farms={filteredFarms}
            waterSources={filteredWaterSources}
            selectedId={selectedPoint?.id ?? null}
            onSelect={handleSelect}
            userPosition={userPosition}
            radius={filters.radius}
            onLocate={handleLocate}
            locating={locating}
          />
        </div>
        {selectedPoint && (
          <DetailPanel
            key={selectedPoint.id}
            point={selectedPoint}
            onClose={() => setSelectedPoint(null)}
            userPosition={userPosition}
            onProductClick={handleProductClick}
          />
        )}
      </div>

      {/* Add farm modal */}
      {showAddForm && (
        <AddFarmForm
          onSubmit={handleAddFarm}
          onClose={() => setShowAddForm(false)}
          regions={allRegions}
        />
      )}
    </div>
  )
}
