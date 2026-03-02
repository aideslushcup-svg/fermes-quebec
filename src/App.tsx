import { useState, useMemo } from 'react'
import { farms, ALL_REGIONS } from '@/data/farms'
import { waterSources } from '@/data/waterSources'
import { Filters, MapPoint } from '@/types'
import Header from '@/components/Header'
import FilterBar from '@/components/FilterBar'
import MapView from '@/components/MapView'
import DetailPanel from '@/components/DetailPanel'

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    bio: false,
    region: '',
    search: '',
  })

  const filteredFarms = useMemo(() => {
    if (filters.type === 'water') return []
    return farms.filter((farm) => {
      if (filters.bio && !farm.certified_bio) return false
      if (filters.region && farm.region !== filters.region) return false
      if (
        filters.search &&
        !farm.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !farm.products.some((p) => p.toLowerCase().includes(filters.search.toLowerCase()))
      )
        return false
      return true
    })
  }, [filters])

  const filteredWaterSources = useMemo(() => {
    if (filters.type === 'farm') return []
    return waterSources.filter((source) => {
      if (filters.region && source.region !== filters.region) return false
      if (
        filters.search &&
        !source.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      return true
    })
  }, [filters])

  const handleSelect = (point: MapPoint | null) => {
    setSelectedPoint(point)
  }

  const totalVisible = filteredFarms.length + filteredWaterSources.length

  return (
    <div className="flex flex-col h-screen bg-snow-white">
      <Header
        farmCount={farms.length}
        waterCount={waterSources.length}
        visibleCount={totalVisible}
      />
      <FilterBar
        filters={filters}
        onChange={setFilters}
        regions={ALL_REGIONS}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <MapView
            farms={filteredFarms}
            waterSources={filteredWaterSources}
            selectedId={selectedPoint?.id ?? null}
            onSelect={handleSelect}
          />
        </div>
        {selectedPoint && (
          <DetailPanel
            key={selectedPoint.id}
            point={selectedPoint}
            onClose={() => setSelectedPoint(null)}
          />
        )}
      </div>
    </div>
  )
}
