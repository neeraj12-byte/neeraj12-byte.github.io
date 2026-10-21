import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './SectionHeading'
import FadeIn from './FadeIn'
import CountUp from './CountUp'
import CompanyLogo from '../assets/logos/CompanyLogo'
import { primaryExperience, secondaryExperience } from '../data/experience'

export default function Experience() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  })
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-safe">
        <SectionHeading index="03" label="Experience" title="Where I've built." />

        {/* Primary timeline */}
        <div ref={timelineRef} className="relative space-y-6 sm:space-y-8 mb-20">
          {/* Spine — desktop only. Faint track with a bronze line that draws on scroll. */}
          <div className="hidden md:block absolute left-[5px] top-8 bottom-8 w-px bg-[#1C1C1E]/10">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-[#A07640]"
              style={{ scaleY: spine }}
            />
          </div>

          {primaryExperience.map((job, i) => (
            <FadeIn key={job.id} delay={i * 0.08}>
              <div className="relative pl-0 md:pl-12">
                {/* Node */}
                <motion.span
                  className="hidden md:block absolute left-0 top-8 w-[11px] h-[11px] rounded-full bg-white border-2 z-10"
                  style={{ borderColor: job.accent }}
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />

                <article className="group relative overflow-hidden bg-[#F8F4E8] rounded-[20px] p-6 sm:p-8 ring-1 ring-[#1C1C1E]/5 transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(28,28,30,0.18)]">
                  {/* Brand-tinted wash */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(115% 85% at 100% 0%, ${job.accent}16, transparent 62%)`,
                    }}
                  />
                  {/* Accent edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: `linear-gradient(to bottom, ${job.accent}, ${job.accent}00)` }}
                  />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      {job.logo && <CompanyLogo name={job.logo} size="md" />}
                      <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                        <div className="min-w-0">
                          <h3 className="font-serif text-[26px] sm:text-3xl font-semibold text-[#1C1C1E] leading-tight">
                            {job.company}
                          </h3>
                          {job.team && (
                            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#6B6B6B] mt-1.5">
                              {job.team}
                            </p>
                          )}
                        </div>
                        <div className="sm:text-right sm:flex-shrink-0">
                          <p className="font-sans text-sm text-[#1C1C1E]/70">{job.period}</p>
                          <p className="font-sans text-xs text-[#6B6B6B] mt-0.5">{job.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="font-serif text-lg sm:text-xl text-[#1C1C1E]/85 leading-snug mt-6 max-w-2xl">
                      {job.tagline}
                    </p>

                    {/* Role-progression rail */}
                    {job.arc && <ProgressionRail arc={job.arc} accent={job.accent} />}

                    {/* Metric strip */}
                    <div className="mt-7 pt-7 border-t border-[#1C1C1E]/10 flex flex-wrap gap-x-6 gap-y-7 sm:gap-x-8">
                      {job.metrics.map((m, mi) => (
                        <Metric
                          key={m.label}
                          value={m.value}
                          label={m.label}
                          accent={job.accent}
                          delay={mi * 0.09}
                        />
                      ))}
                    </div>

                    {/* Tags */}
                    {job.tags && (
                      <div className="mt-7 flex flex-wrap gap-2">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-2 bg-white/70 ring-1 ring-[#1C1C1E]/8 rounded-full px-3 py-1.5 font-sans text-[11px] sm:text-xs text-[#1C1C1E]/70"
                          >
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: job.accent }}
                            />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Secondary — condensed */}
        <FadeIn>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#6B6B6B] mb-6">
            Earlier Roles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryExperience.map((job) => (
              <div
                key={job.company}
                className="flex items-start gap-4 border border-[#1C1C1E]/10 rounded-2xl p-5 hover:border-[#1C1C1E]/25 transition-colors"
              >
                {job.logo && <CompanyLogo name={job.logo} size="sm" />}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="font-serif text-lg font-semibold text-[#1C1C1E] leading-tight">
                      {job.company}
                    </p>
                    <p className="font-sans text-xs text-[#6B6B6B]">{job.period}</p>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2.5">
                    <CountUp
                      value={job.metric}
                      className="font-serif text-2xl font-semibold text-[#A07640] leading-none"
                    />
                    <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B]">
                      {job.metricLabel}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed mt-2.5">
                    {job.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Metric({ value, label, accent, delay }) {
  return (
    <div className="basis-[calc(50%-0.75rem)] sm:basis-[calc(50%-1rem)] md:basis-0 md:flex-1 md:min-w-[118px] md:max-w-[260px] relative pt-3.5">
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] rounded-full origin-left"
        style={{ background: accent, width: 26 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <CountUp
        value={value}
        delay={delay}
        className="block font-serif text-[30px] sm:text-4xl font-semibold text-[#1C1C1E] leading-none"
      />
      <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.13em] text-[#6B6B6B] leading-relaxed mt-2.5">
        {label}
      </p>
    </div>
  )
}

function ProgressionRail({ arc, accent }) {
  return (
    <div className="relative mt-8">
      {/* Track */}
      <div
        aria-hidden="true"
        className="absolute top-[5px] left-[5px] h-px bg-[#1C1C1E]/12"
        style={{ right: 'calc(33.333% - 5px)' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-[5px] left-[5px] h-px origin-left"
        style={{ background: accent, right: 'calc(33.333% - 5px)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      <ol className="relative grid grid-cols-3 gap-2">
        {arc.map((step, i) => (
          <li key={step.program} className="flex flex-col items-start">
            <motion.span
              aria-hidden="true"
              className="w-[11px] h-[11px] rounded-full bg-white border-2 flex-shrink-0"
              style={{ borderColor: accent }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="font-sans text-[11px] sm:text-xs font-semibold text-[#1C1C1E] mt-3 leading-tight">
              {step.program}
            </p>
            <p className="font-sans text-[10px] sm:text-[11px] text-[#6B6B6B] mt-1 tabular-nums">
              {step.period}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
