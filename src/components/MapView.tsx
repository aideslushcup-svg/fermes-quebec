import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Farm, WaterSource, MapPoint } from '@/types'

// ── Custom marker icons ─────────────────────────────────────────

function createFarmIcon(isBio: boolean, isSelected: boolean) {
  const baseClass = isBio ? 'marker-farm-bio' : 'marker-farm'
  const selectedClass = isSelected ? 'marker-selected' : ''
  return L.divIcon({
    html: `<div class="map-marker ${baseClass} ${selectedClass}">🌱</div>`,
    iconSize: [42, 54],
    iconAnchor: [21, 54],
    popupAnchor: [0, -54],
    className: '',
  })
}

function createWaterIcon(isTested: boolean, isSelected: boolean) {
  const baseClass = isTested ? 'marker-water-tested' : 'marker-water'
  const selectedClass = isSelected ? 'marker-selected' : ''
  return L.divIcon({
    html: `<div class="map-marker ${baseClass} ${selectedClass}">💧</div>`,
    iconSize: [42, 54],
    iconAnchor: [21, 54],
    popupAnchor: [0, -54],
    className: '',
  })
}

// ── Map size invalidator (handles panel open/close) ─────────────

function MapResizer({ panelOpen }: { panelOpen: boolean }) {
  const map = useMap()
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300)
    return () => clearTimeout(timer)
  }, [panelOpen, map])
  return null
}

// ── Main component ──────────────────────────────────────────────

interface MapViewProps {
  farms: Farm[]
  waterSources: WaterSource[]
  selectedId: string | null
  onSelect: (point: MapPoint | null) => void
}

export default function MapView({ farms, waterSources, selectedId, onSelect }: MapViewProps) {
  return (
    <MapContainer
      center={[47.5, -72]}
      zoom={6}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      maxZoom={18}
      minZoom={5}
    >
      <MapResizer panelOpen={selectedId !== null} />

      {/* CartoDB Voyager — beau fond de carte naturel */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />

      {/* Farm markers */}
      {farms.map((farm) => (
        <Marker
          key={farm.id}
          position={[farm.lat, farm.lng]}
          icon={createFarmIcon(farm.certified_bio, selectedId === farm.id)}
          eventHandlers={{
            click: () => onSelect(farm),
          }}
        >
          <Tooltip direction="top" offset={[0, -52]} opacity={0.95}>
            <div className="font-medium text-xs">
              {farm.certified_bio && <span className="text-forest-green">🌿 BIO · </span>}
              {farm.name}
            </div>
            <div className="text-gray-400 text-xs">{farm.region}</div>
          </Tooltip>
        </Marker>
      ))}

      {/* Water source markers */}
      {waterSources.map((source) => (
        <Marker
          key={source.id}
          position={[source.lat, source.lng]}
          icon={createWaterIcon(source.tested, selectedId === source.id)}
          eventHandlers={{
            click: () => onSelect(source),
          }}
        >
          <Tooltip direction="top" offset={[0, -52]} opacity={0.95}>
            <div className="font-medium text-xs">
              {source.tested && <span className="text-river-blue">✓ Testée · </span>}
              {source.name}
            </div>
            <div className="text-gray-400 text-xs">{source.region}</div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
