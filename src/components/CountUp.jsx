import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Renders a metric string and counts its numeral up on first scroll into view.
 * Prefix/suffix are preserved ("$1B" counts 0→1, "50M+" counts 0→50).
 * Strings holding more than one numeral ("18/36") render static — counting
 * two numbers at once reads as noise rather than as a reveal.
 */
export default function CountUp({ value, duration = 1100, delay = 0, className = '' }) {
  const raw = String(value)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  const numerals = raw.match(/\d+(?:\.\d+)?/g) || []
  const animatable = !reduceMotion && numerals.length === 1
  const target = animatable ? parseFloat(numerals[0]) : null
  const decimals = animatable ? (numerals[0].split('.')[1] || '').length : 0

  const [current, setCurrent] = useState(animatable ? 0 : null)

  useEffect(() => {
    if (!animatable || !inView) return

    let frame
    let startedAt
    const tick = (now) => {
      if (startedAt === undefined) startedAt = now
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [animatable, inView, target, duration, delay])

  const text =
    animatable && current !== null
      ? raw.replace(numerals[0], current.toFixed(decimals))
      : raw

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </span>
  )
}
