import { useState } from 'react'
import { X, MapPin, Leaf, Package, User, Phone, Globe, FileText } from 'lucide-react'
import { Farm } from '@/types'

interface AddFarmFormProps {
  onSubmit: (farm: Farm) => void
  onClose: () => void
  regions: string[]
}

export default function AddFarmForm({ onSubmit, onClose, regions }: AddFarmFormProps) {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [products, setProducts] = useState('')
  const [bio, setBio] = useState(false)
  const [owner, setOwner] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [story, setStory] = useState('')

  const canSubmit = name.trim() && region && address.trim() && lat && lng && products.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    const farm: Farm = {
      id: `user-${Date.now()}`,
      type: 'farm',
      name: name.trim(),
      region,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      address: address.trim(),
      products: products.split(',').map((p) => p.trim()).filter(Boolean),
      certified_bio: bio,
      founded: new Date().getFullYear(),
      story: story.trim() || "Une ferme ajoutée par la communauté.",
      owner: owner.trim() || undefined,
      phone: phone.trim() || undefined,
      website: website.trim() || undefined,
      userAdded: true,
    }

    onSubmit(farm)
  }

  const handleUseMyPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude.toFixed(6))
          setLng(pos.coords.longitude.toFixed(6))
        },
        () => alert("Impossible d'obtenir votre position.")
      )
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-color bg-gradient-to-r from-forest-green to-meadow-green">
          <div>
            <h2 className="text-white font-bold text-lg">Ajouter une ferme</h2>
            <p className="text-white/70 text-xs">Partagez votre découverte avec la communauté</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <Leaf size={12} /> Nom de la ferme *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ferme des Érables"
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
              required
            />
          </div>

          {/* Region */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <MapPin size={12} /> Région *
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green cursor-pointer"
              required
            >
              <option value="">Choisir une région</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
              <option value="__new">+ Autre région</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <MapPin size={12} /> Adresse *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 rang de la Rivière, Saint-Hyacinthe"
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
              required
            />
          </div>

          {/* Coordinates */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              Coordonnées GPS *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                className="flex-1 text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
                required
              />
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                className="flex-1 text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
                required
              />
              <button
                type="button"
                onClick={handleUseMyPosition}
                className="flex-shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-text-dark px-3 py-2.5 rounded-xl transition-colors"
                title="Utiliser ma position"
              >
                📍
              </button>
            </div>
          </div>

          {/* Products */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <Package size={12} /> Produits * (séparés par virgule)
            </label>
            <input
              type="text"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              placeholder="légumes, miel, œufs"
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
              required
            />
          </div>

          {/* Bio toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${bio ? 'bg-forest-green' : 'bg-gray-300'}`}
              onClick={() => setBio(!bio)}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${bio ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-text-dark">Certifié biologique</span>
          </label>

          {/* Owner */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <User size={12} /> Propriétaire
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Nom du propriétaire"
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
            />
          </div>

          {/* Phone + Website */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                <Phone size={12} /> Téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="819-555-1234"
                className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                <Globe size={12} /> Site web
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="www.maferme.com"
                className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green"
              />
            </div>
          </div>

          {/* Story */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              <FileText size={12} /> Description / histoire
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Parlez-nous de cette ferme..."
              rows={3}
              className="w-full text-sm border border-border-color rounded-xl px-3 py-2.5 focus:outline-none focus:border-meadow-green resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-color bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-text-secondary hover:text-text-dark px-4 py-2 rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit as any}
            disabled={!canSubmit}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all duration-150
                       bg-gradient-to-r from-forest-green to-meadow-green hover:opacity-90 active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            Ajouter la ferme
          </button>
        </div>
      </div>
    </div>
  )
}
