import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export function NavLinks({ links }) {
  let [hoveredIndex, setHoveredIndex] = useState(null)

  return links?.map((link, index) => (
    <Link
      key={link.label}
      href={link.url}
      className="text-accent-500 hover:text-siteBackground relative -mx-3 -my-2 rounded-lg px-4 py-3 font-sans text-sm  font-bold uppercase transition-colors delay-150 hover:delay-[0ms]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="bg-accent-500 absolute inset-0 rounded-full"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{link.label}</span>
    </Link>
  ))
}
