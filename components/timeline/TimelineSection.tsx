import { TIMELINE_MILESTONES } from '@/lib/wedding-data'
import { sortMilestones } from '@/lib/utils'
import TimelineItem from './TimelineItem'

export default function TimelineSection() {
  const milestones = sortMilestones(TIMELINE_MILESTONES)

  return (
    <section
      id="timeline"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-800 to-stone-900"
    >
      {/* Section heading */}
      <div className="text-center mb-16">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Perjalanan Cinta
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          Kisah Kita
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical gold connecting line — hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/40 -translate-x-1/2" />

        {/* Timeline items — 2-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={`${milestone.year}-${milestone.title}`}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
              side={index % 2 === 0 ? 'left' : 'right'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
