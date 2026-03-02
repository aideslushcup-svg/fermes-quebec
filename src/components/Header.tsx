import { Plus } from 'lucide-react'

interface HeaderProps {
  farmCount: number
  waterCount: number
  visibleCount: number
  onAddFarm: () => void
}

export default function Header({ farmCount, waterCount, visibleCount, onAddFarm }: HeaderProps) {
  return (
    <header
      className="flex-shrink-0 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #003087 0%, #1a5c3a 60%, #2d6a4f 100%)',
      }}
    >
      {/* Decorative maple leaf background */}
      <div
        className="absolute inset-0 opacity-5 text-white select-none pointer-events-none hidden sm:flex"
        style={{
          fontSize: '200px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '20px',
          lineHeight: 1,
        }}
      >
        🍁
      </div>

      <div className="relative z-10 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between gap-2">
        {/* Left: branding */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-2xl sm:text-3xl flex-shrink-0">🍁</span>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-base sm:text-xl leading-tight tracking-tight truncate">
              Ressources du Québec
            </h1>
            <p className="text-white/70 text-[10px] sm:text-xs font-normal hidden xs:block">
              Fermes locales · Sources d'eau pure
            </p>
          </div>
        </div>

        {/* Right: counters + add button */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-center border border-white/20">
            <div className="text-white font-bold text-sm sm:text-lg leading-none">{farmCount}</div>
            <div className="text-white/70 text-[9px] sm:text-xs">fermes</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-center border border-white/20">
            <div className="text-white font-bold text-sm sm:text-lg leading-none">{waterCount}</div>
            <div className="text-white/70 text-[9px] sm:text-xs">sources</div>
          </div>
          {visibleCount < farmCount + waterCount && (
            <div className="bg-autumn-gold/80 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-center">
              <div className="text-white font-bold text-sm sm:text-lg leading-none">{visibleCount}</div>
              <div className="text-white/80 text-[9px] sm:text-xs">affichés</div>
            </div>
          )}

          {/* Add farm button */}
          <button
            onClick={onAddFarm}
            className="ml-1 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/30
                       text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl
                       transition-all duration-150 active:scale-95"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Ajouter une ferme</span>
            <span className="sm:hidden">Ajouter</span>
          </button>

          {/* Prototype badge — hidden on small screens */}
          <div className="ml-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1 hidden lg:block">
            <span className="text-white/50 text-xs font-medium">Prototype · Données fictives</span>
          </div>
        </div>
      </div>
    </header>
  )
}
