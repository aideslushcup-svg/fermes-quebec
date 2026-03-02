import { X, MapPin, Phone, Globe, Clock, Leaf, Droplets, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react'
import { MapPoint, isFarm } from '@/types'

interface DetailPanelProps {
  point: MapPoint
  onClose: () => void
}

const PRODUCT_COLORS: Record<string, string> = {
  légumes: 'bg-green-100 text-green-700',
  "sirop d'érable": 'bg-amber-100 text-amber-700',
  œufs: 'bg-yellow-100 text-yellow-700',
  'petits fruits': 'bg-pink-100 text-pink-700',
  bleuets: 'bg-purple-100 text-purple-700',
  framboises: 'bg-red-100 text-red-700',
  cassis: 'bg-purple-200 text-purple-800',
  fromage: 'bg-orange-100 text-orange-700',
  'fromage artisanal': 'bg-orange-100 text-orange-700',
  'lait cru': 'bg-blue-100 text-blue-700',
  yaourt: 'bg-sky-100 text-sky-700',
  viande: 'bg-red-100 text-red-700',
  'viande de bison': 'bg-red-200 text-red-800',
  agneau: 'bg-orange-100 text-orange-600',
  laine: 'bg-gray-100 text-gray-600',
  miel: 'bg-yellow-100 text-yellow-700',
  'miel bio': 'bg-yellow-100 text-yellow-700',
  pommes: 'bg-red-100 text-red-600',
  'cidre de glace': 'bg-amber-100 text-amber-700',
  'cidre de pomme': 'bg-amber-100 text-amber-700',
  tisanes: 'bg-teal-100 text-teal-700',
  'herbes médicinales': 'bg-emerald-100 text-emerald-700',
  'herbes fraîches': 'bg-emerald-100 text-emerald-700',
  tomates: 'bg-red-100 text-red-700',
  concombres: 'bg-green-100 text-green-700',
}

function getProductColor(product: string) {
  return PRODUCT_COLORS[product] ?? 'bg-gray-100 text-gray-600'
}

export default function DetailPanel({ point, onClose }: DetailPanelProps) {
  const isFarmPoint = isFarm(point)

  const headerBg = isFarmPoint
    ? 'linear-gradient(135deg, #2d6a4f, #40916c)'
    : 'linear-gradient(135deg, #003087, #1a6fa8)'

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

        {/* Colored header */}
        <div className="flex-shrink-0 relative" style={{ background: headerBg }}>
          <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-4 sm:pb-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="text-xl sm:text-2xl">{isFarmPoint ? '🌱' : '💧'}</span>
                <span className="text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  {isFarmPoint ? 'Ferme locale' : "Source d'eau naturelle"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg p-1.5
                           transition-colors flex-shrink-0"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="text-white font-bold text-base sm:text-lg leading-snug">{point.name}</h2>

            <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
              <MapPin size={12} className="text-white/60 flex-shrink-0" />
              <span className="text-white/70 text-xs sm:text-sm">{point.region}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-3">
              {isFarmPoint && point.certified_bio && (
                <span className="bg-white/20 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                                 border border-white/30 flex items-center gap-1">
                  <Leaf size={11} />
                  Certifié BIO
                </span>
              )}
              {!isFarmPoint && point.tested && (
                <span className="bg-white/20 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                                 border border-white/30 flex items-center gap-1">
                  <CheckCircle size={11} />
                  Eau testée
                </span>
              )}
              {!isFarmPoint && !point.tested && (
                <span className="bg-white/10 text-white/70 text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                                 border border-white/20 flex items-center gap-1">
                  <AlertCircle size={11} />
                  Non testée
                </span>
              )}
              {isFarmPoint && (
                <span className="bg-white/10 text-white/70 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                                 border border-white/20">
                  Fondée en {point.founded}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4 space-y-4 sm:space-y-5">

          {/* FARM: Products */}
          {isFarmPoint && (
            <section>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Produits
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {point.products.map((p) => (
                  <span
                    key={p}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${getProductColor(p)}`}
                  >
                    {p}
                  </span>
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
