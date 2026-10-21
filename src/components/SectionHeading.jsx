import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

export default function SectionHeading({ index, label, title }) {
  return (
    <FadeIn className="mb-14">
      {label && (
        <p className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          {index && (
            <>
              <span className="text-[#1C1C1E]/30 tabular-nums">{index}</span>
              <span aria-hidden="true" className="text-[#1C1C1E]/20">/</span>
            </>
          )}
          <span className="text-[#A07640]">{label}</span>
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C1C1E] leading-tight">
        {title}
      </h2>
      <motion.div
        className="mt-4 h-[2px] bg-[#A07640] origin-left"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </FadeIn>
  )
}
