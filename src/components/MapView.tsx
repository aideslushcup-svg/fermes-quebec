import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, Circle, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { Crosshair, Loader2 } from 'lucide-react'
import { Farm, WaterSource, MapPoint, UserPosition } from '@/types'

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

const userIcon = L.divIcon({
  html: `<div class="map-marker marker-user">📍</div>`,
  iconSize: [42, 54],
  iconAnchor: [21, 54],
  className: '',
})

// ── Custom cluster icon ─────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createClusterIcon(cluster: any) {
  const count = cluster.getChildCount()
  const size = count < 10 ? 'small' : count < 30 ? 'medium' : 'large'
  return L.divIcon({
    html: `<div class="cluster-icon cluster-${size}">${count}</div>`,
    className: '',
    iconSize: [44, 44],
  })
}

// ── Map utilities ───────────────────────────────────────────────

function MapResizer({ panelOpen }: { panelOpen: boolean }) {
  const map = useMap()
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300)
    return () => clearTimeout(timer)
  }, [panelOpen, map])
  return null
}

function FlyToUser({ position }: { position: UserPosition }) {
  const map = useMap()
  useEffect(() => {
    // Keep current zoom or use 8 max — don't zoom in too much
    const currentZoom = map.getZoom()
    const targetZoom = Math.min(Math.max(currentZoom, 7), 8)
    map.flyTo([position.lat, position.lng], targetZoom, { duration: 1.5 })
  }, [position, map])
  return null
}

// ── Main component ──────────────────────────────────────────────

interface MapViewProps {
  farms: Farm[]
  waterSources: WaterSource[]
  selectedId: string | null
  onSelect: (point: MapPoint | null) => void
  userPosition: UserPosition | null
  radius: number | null
  onLocate: () => void
  locating: boolean
}

export default function MapView({
  farms,
  waterSources,
  selectedId,
  onSelect,
  userPosition,
  radius,
  onLocate,
  locating,
}: MapViewProps) {
  return (
    <>
      <MapContainer
        center={[47.5, -72]}
        zoom={6}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        maxZoom={18}
        minZoom={5}
      >
        <MapResizer panelOpen={selectedId !== null} />
        {userPosition && <FlyToUser position={userPosition} />}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Radius circle */}
        {userPosition && radius && (
          <Circle
            center={[userPosition.lat, userPosition.lng]}
            radius={radius * 1000}
            pathOptions={{
              color: '#003087',
              weight: 2,
              opacity: 0.4,
              fillColor: '#003087',
              fillOpacity: 0.06,
              dashArray: '8 4',
            }}
          />
        )}

        {/* User position marker */}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Tooltip direction="top" offset={[0, -52]} permanent>
              <span className="font-semibold text-xs">Vous êtes ici</span>
            </Tooltip>
          </Marker>
        )}

        {/* Clustered markers */}
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={40}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          iconCreateFunction={createClusterIcon}
        >
          {farms.map((farm) => (
            <Marker
              key={farm.id}
              position={[farm.lat, farm.lng]}
              icon={createFarmIcon(farm.certified_bio, selectedId === farm.id)}
              eventHandlers={{ click: () => onSelect(farm) }}
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

          {waterSources.map((source) => (
            <Marker
              key={source.id}
              position={[source.lat, source.lng]}
              icon={createWaterIcon(source.tested, selectedId === source.id)}
              eventHandlers={{ click: () => onSelect(source) }}
            >
              <Tooltip direction="top" offset={[0, -52]} opacity={0.95}>
                <div className="font-medium text-xs">
                  {source.tested && <span className="text-river-blue">✓ </span>}
                  {source.name}
                </div>
                <div className="text-gray-400 text-xs">{source.region}</div>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Locate me button — floating over map */}
      <button
        onClick={onLocate}
        disabled={locating}
        className={`absolute bottom-5 left-3 z-[1000] flex items-center gap-2 px-4 py-2.5 rounded-xl
                    font-medium text-sm shadow-lg border transition-all
                    ${
                      userPosition
                        ? 'bg-quebec-blue text-white border-quebec-blue hover:bg-quebec-blue/90'
                        : 'bg-white text-text-dark border-border-color hover:border-quebec-blue hover:text-quebec-blue'
                    }
                    ${locating ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
                    `}
      >
        {locating ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Crosshair size={16} />
        )}
        <span className="hidden sm:inline">
          {userPosition ? 'Recentrer' : 'Me localiser'}
        </span>
      </button>
    </>
  )
}
