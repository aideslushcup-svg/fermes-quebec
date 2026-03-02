import { useState } from 'react'
import { Search, Leaf, Droplets, LayoutGrid, Filter, SlidersHorizontal, X } from 'lucide-react'
import { Filters } from '@/types'

interface FilterBarProps {
  filters: Filters
  onChange: (f: Filters) => void
  regions: string[]
}

type TypeOption = { value: Filters['type']; label: string; shortLabel: string; icon: React.ReactNode }

const TYPE_OPTIONS: TypeOption[] = [
  { value: 'all', label: 'Tous', shortLabel: 'Tous', icon: <LayoutGrid size={14} /> },
  { value: 'farm', label: 'Fermes', shortLabel: 'Fermes', icon: <Leaf size={14} /> },
  { value: 'water', label: "Sources d'eau", shortLabel: 'Eau', icon: <Droplets size={14} /> },
]

export default function FilterBar({ filters, onChange, regions }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const hasActiveFilters = filters.bio || filters.region || filters.search

  return (
    <div className="flex-shrink-0 bg-white border-b border-border-color shadow-sm">
      {/* Main row — always visible */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5">

        {/* Type toggles */}
        <div className="flex items-center bg-gray-100 rounded-xl p-0.5 sm:p-1 gap-0.5">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => set({ type: opt.value })}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                filters.type === opt.value
                  ? opt.value === 'water'
                    ? 'bg-river-blue text-white shadow-sm'
                    : 'bg-forest-green text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-dark hover:bg-white/70'
              }`}
            >
              {opt.icon}
              <span className="hidden sm:inline">{opt.label}</span>
              <span className="sm:hidden">{opt.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Bio toggle — always visible */}
        {filters.type !== 'water' && (
          <button
            onClick={() => set({ bio: !filters.bio })}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-150 ${
              filters.bio
                ? 'bg-light-green border-meadow-green text-forest-green'
                : 'bg-white border-border-color text-text-secondary hover:border-meadow-green hover:text-forest-green'
            }`}
          >
            <span className="text-sm sm:text-base">🌿</span>
            <span className="hidden sm:inline">Certifié bio</span>
            <span className="sm:hidden">Bio</span>
          </button>
        )}

        {/* Desktop: region + search inline */}
        <div className="hidden sm:flex items-center gap-3 flex-1">
          <div className="h-6 w-px bg-border-color" />

          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-text-muted flex-shrink-0" />
            <select
              value={filters.region}
              onChange={(e) => set({ region: e.target.value })}
              className="text-sm text-text-dark bg-white border border-border-color rounded-xl px-3 py-1.5
                         focus:outline-none focus:border-meadow-green cursor-pointer"
            >
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 border border-border-color rounded-xl px-3 py-1.5
                          focus-within:border-meadow-green focus-within:bg-white transition-all flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Chercher par nom ou produit..."
              value={filters.search}
              onChange={(e) => set({ search: e.target.value })}
              className="flex-1 bg-transparent text-sm text-text-dark placeholder-text-muted focus:outline-none"
            />
            {filters.search && (
              <button onClick={() => set({ search: '' })} className="text-text-muted hover:text-text-dark text-xs">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile: toggle extra filters button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`sm:hidden ml-auto flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            mobileOpen || hasActiveFilters
              ? 'bg-forest-green/10 border-forest-green/30 text-forest-green'
              : 'bg-white border-border-color text-text-secondary'
          }`}
        >
          <SlidersHorizontal size={14} />
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-forest-green" />
          )}
        </button>
      </div>

      {/* Mobile expanded row */}
      {mobileOpen && (
        <div className="sm:hidden flex flex-col gap-2 px-3 pb-2.5 border-t border-border-color pt-2">
          {/* Region */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-text-muted flex-shrink-0" />
            <select
              value={filters.region}
              onChange={(e) => set({ region: e.target.value })}
              className="flex-1 text-sm text-text-dark bg-white border border-border-color rounded-xl px-3 py-2
                         focus:outline-none focus:border-meadow-green"
            >
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-border-color rounded-xl px-3 py-2
                          focus-within:border-meadow-green focus-within:bg-white transition-all">
            <Search size={14} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Chercher..."
              value={filters.search}
              onChange={(e) => set({ search: e.target.value })}
              className="flex-1 bg-transparent text-sm text-text-dark placeholder-text-muted focus:outline-none"
            />
            {filters.search && (
              <button onClick={() => set({ search: '' })} className="text-text-muted hover:text-text-dark">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
