import { Testimonial } from '@/types'

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  )
}

const hoverStyles = {
  'violet-500': 'hover:border-violet-500/30 hover:shadow-violet-500/10',
  'cyan-500': 'hover:border-cyan-500/30 hover:shadow-cyan-500/10',
  'purple-500': 'hover:border-purple-500/30 hover:shadow-purple-500/10',
  'emerald-500': 'hover:border-emerald-500/30 hover:shadow-emerald-500/10',
  'orange-500': 'hover:border-orange-500/30 hover:shadow-orange-500/10',
  'indigo-500': 'hover:border-indigo-500/30 hover:shadow-indigo-500/10'
}

export function TestimonialCard({
  initial,
  name,
  title,
  company,
  content,
  avatarGradient,
  borderHoverColor
}: Testimonial) {
  const hoverClass = hoverStyles[borderHoverColor as keyof typeof hoverStyles] || hoverStyles['violet-500']
  
  return (
    <div className={`group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 ${hoverClass} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${avatarGradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          {initial}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-slate-400">
            {title}, {company}
          </p>
        </div>
      </div>
      <StarRating />
      <p className="text-slate-300 leading-relaxed mb-4">
        &ldquo;{content}&rdquo;
      </p>
      <div className="text-xs text-slate-500 uppercase tracking-wider">
        Verified Customer
      </div>
    </div>
  )
}
