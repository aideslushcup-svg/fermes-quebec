import { X, MapPin, Phone, Globe, Clock, Leaf, Droplets, CheckCircle, AlertCircle, Navigation, ExternalLink } from 'lucide-react'
import { MapPoint, isFarm, UserPosition } from '@/types'
import { distanceKm, formatDistance } from '@/utils/geo'

interface DetailPanelProps {
  point: MapPoint
  onClose: () => void
  userPosition: UserPosition | null
  onProductClick: (product: string) => void
}

const PRODUCT_COLORS: Record<string, string> = {
  légumes: 'bg-green-100 text-green-700 hover:bg-green-200',
  "sirop d'érable": 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  œufs: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  'petits fruits': 'bg-pink-100 text-pink-700 hover:bg-pink-200',
  bleuets: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  framboises: 'bg-red-100 text-red-700 hover:bg-red-200',
  cassis: 'bg-purple-200 text-purple-800 hover:bg-purple-300',
  fromage: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  'fromage artisanal': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  'lait cru': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  yaourt: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
  viande: 'bg-red-100 text-red-700 hover:bg-red-200',
  'viande de bison': 'bg-red-200 text-red-800 hover:bg-red-300',
  agneau: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
  laine: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  miel: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  'miel bio': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  pommes: 'bg-red-100 text-red-600 hover:bg-red-200',
  'cidre de glace': 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  'cidre de pomme': 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  tisanes: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
  'herbes médicinales': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
  'herbes fraîches': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
  tomates: 'bg-red-100 text-red-700 hover:bg-red-200',
  concombres: 'bg-green-100 text-green-700 hover:bg-green-200',
}

function getProductColor(product: string) {
  return PRODUCT_COLORS[product] ?? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}

// Unsplash photo mapping by product type
const FARM_IMAGES: Record<string, string> = {
  légumes: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=200&fit=crop',
  fromage: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=200&fit=crop',
  'fromage artisanal': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=200&fit=crop',
  pommes: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=200&fit=crop',
  miel: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=200&fit=crop',
  'miel bio': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=200&fit=crop',
  viande: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=200&fit=crop',
  'viande de bison': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=200&fit=crop',
  agneau: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&h=200&fit=crop',
  bleuets: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=200&fit=crop',
  framboises: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=200&fit=crop',
  "sirop d'érable": 'https://images.unsplash.com/photo-1589496933738-f5e78bcea7fc?w=400&h=200&fit=crop',
  default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop',
}

const WATER_IMAGE = 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=400&h=200&fit=crop'

function getFarmImage(products: string[]): string {
  for (const p of products) {
    if (FARM_IMAGES[p]) return FARM_IMAGES[p]
  }
  return FARM_IMAGES.default
}

function getGoogleMapsUrl(lat: number, lng: number, name: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`
}

export default function DetailPanel({ point, onClose, userPosition, onProductClick }: DetailPanelProps) {
  const isFarmPoint = isFarm(point)

  const headerBg = isFarmPoint
    ? 'linear-gradient(135deg, #2d6a4f, #40916c)'
    : 'linear-gradient(135deg, #003087, #1a6fa8)'

  const imageUrl = isFarmPoint ? getFarmImage(point.products) : WATER_IMAGE

  const distance = userPosition
    ? distanceKm(userPosition.lat, userPosition.lng, point.lat, point.lng)
    : null

  return (
    <>
      {/* Mobile: bottom sheet overlay */}
      <div
        className="md:hidden fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      <div
        className={`
          panel-enter flex flex-col bg-white shadow-panel overflow-hidden
          fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-2xl
          md:static md:w-[380px] md:flex-shrink-0 md:h-full md:max-h-none md:rounded-none
          md:border-l md:border-border-color
        `}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center py-2 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Photo banner */}
        <div className="flex-shrink-0 relative h-32 sm:h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={point.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: `${headerBg}, transparent`, opacity: 0.4 }} />

          {/* Close button over image */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg p-1.5
                       transition-colors flex-shrink-0 backdrop-blur-sm"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

          {/* Distance badge */}
          {distance !== null && (
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Navigation size={11} />
              {formatDistance(distance)}
            </div>
          )}

          {/* Name overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg">{isFarmPoint ? '🌱' : '💧'}</span>
              <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">
                {isFarmPoint ? 'Ferme locale' : "Source d'eau naturelle"}
              </span>
            </div>
            <h2 className="text-white font-bold text-base sm:text-lg leading-snug">{point.name}</h2>
          </div>
        </div>

        {/* Region + badges bar */}
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-border-color bg-gray-50/50">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin size={12} className="text-text-muted flex-shrink-0" />
            <span className="text-text-secondary text-xs sm:text-sm">{point.region}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {isFarmPoint && point.certified_bio && (
              <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Leaf size={11} />
                Certifié BIO
              </span>
            )}
            {!isFarmPoint && point.tested && (
              <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle size={11} />
                Eau testée
              </span>
            )}
            {!isFarmPoint && !point.tested && (
              <span className="bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertCircle size={11} />
                Non testée
              </span>
            )}
            {isFarmPoint && (
              <span className="bg-gray-100 text-gray-500 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                Fondée en {point.founded}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4 space-y-4 sm:space-y-5">

          {/* "Y aller" navigation button */}
          <a
            href={getGoogleMapsUrl(point.lat, point.lng, point.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm
                       text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: isFarmPoint ? 'linear-gradient(135deg, #2d6a4f, #40916c)' : 'linear-gradient(135deg, #003087, #1a6fa8)' }}
          >
            <Navigation size={16} />
            Y aller
            <ExternalLink size={12} className="opacity-60" />
          </a>

          {/* FARM: Products — clickable */}
          {isFarmPoint && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Produits
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {point.products.map((p) => (
                  <button
                    key={p}
                    onClick={() => onProductClick(p)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${getProductColor(p)}`}
                    title={`Voir toutes les fermes avec "${p}"`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* FARM: Story */}
          {isFarmPoint && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Notre histoire
              </h3>
              <p className="text-text-dark text-sm leading-relaxed">{point.story}</p>
            </section>
          )}

          {/* WATER: Description */}
          {!isFarmPoint && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-text-dark text-sm leading-relaxed">{point.description}</p>
            </section>
          )}

          {/* WATER: Flow rate */}
          {!isFarmPoint && point.flow_rate && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                <Droplets size={12} className="inline mr-1" />
                Débit
              </h3>
              <p className="text-text-dark text-sm bg-sky-blue rounded-xl px-3 py-2">
                {point.flow_rate}
              </p>
            </section>
          )}

          {/* WATER: Access */}
          {!isFarmPoint && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Comment y accéder
              </h3>
              <p className="text-text-dark text-sm leading-relaxed bg-gray-50 rounded-xl px-3 py-2.5">
                {point.access}
              </p>
            </section>
          )}

          {/* Divider */}
          <div className="border-t border-border-color" />

          {/* FARM: Info pratique */}
          {isFarmPoint && (
            <section className="space-y-2.5">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Informations pratiques
              </h3>

              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-text-muted mt-0.5 flex-shrink-0" />
                <span className="text-text-dark text-sm">{point.address}</span>
              </div>

              {point.schedule && (
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="text-text-muted mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark text-sm">{point.schedule}</span>
                </div>
              )}

              {point.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-text-muted flex-shrink-0" />
                  <a
                    href={`tel:${point.phone}`}
                    className="text-river-blue text-sm font-medium hover:underline"
                  >
                    {point.phone}
                  </a>
                </div>
              )}

              {point.website && (
                <div className="flex items-center gap-2.5">
                  <Globe size={15} className="text-text-muted flex-shrink-0" />
                  <span className="text-river-blue text-sm font-medium">{point.website}</span>
                </div>
              )}

              {point.owner && (
                <div className="mt-1 text-text-muted text-xs">
                  Propriétaire · {point.owner}
                </div>
              )}
            </section>
          )}

          {/* Bottom safe area for mobile */}
          <div className="h-4 md:h-0" />
        </div>
      </div>
    </>
  )
}
