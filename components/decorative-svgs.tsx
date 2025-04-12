"use client"

import { motion } from "framer-motion"

// Star SVG with animation
export const StarIcon = ({ className, size = 24, fill = "#9333EA", delay = 0 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
    }}
  >
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill={fill} />
  </motion.svg>
)

// Circle SVG with animation
export const CircleIcon = ({ className, size = 24, fill = "#9333EA", delay = 0 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
    }}
  >
    <circle cx="12" cy="12" r="12" fill={fill} />
  </motion.svg>
)

// Dots Pattern SVG
export const DotsPattern = ({ className, color = "#9333EA", opacity = 0.3, delay = 0 }) => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{
      opacity: [opacity, opacity + 0.2, opacity],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
    }}
  >
    <circle cx="4" cy="4" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="4" cy="24" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="4" cy="44" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="4" cy="64" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="24" cy="4" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="24" cy="24" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="24" cy="44" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="24" cy="64" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="44" cy="4" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="44" cy="24" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="44" cy="44" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="44" cy="64" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="64" cy="4" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="64" cy="24" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="64" cy="44" r="4" fill={color} fillOpacity={opacity} />
    <circle cx="64" cy="64" r="4" fill={color} fillOpacity={opacity} />
  </motion.svg>
)

// Wave SVG
export const WavePattern = ({ className, color = "#9333EA", opacity = 0.1, delay = 0 }) => (
  <motion.svg
    width="100%"
    height="120"
    viewBox="0 0 1440 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: delay }}
  >
    <path
      d="M0 40L48 50C96 60 192 80 288 86.7C384 93.3 480 86.7 576 73.3C672 60 768 40 864 33.3C960 26.7 1056 33.3 1152 46.7C1248 60 1344 80 1392 90L1440 100V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V40Z"
      fill={color}
      fillOpacity={opacity}
    />
  </motion.svg>
)

// Hexagon Grid
export const HexagonGrid = ({ className, color = "#9333EA", opacity = 0.1, delay = 0 }) => (
  <motion.svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ opacity: 0, rotate: -5 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 1, delay: delay }}
  >
    <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill={color} fillOpacity={opacity} />
    <path d="M150 0L193.3 25V75L150 100L106.7 75V25L150 0Z" fill={color} fillOpacity={opacity} />
    <path d="M50 100L93.3 125V175L50 200L6.7 175V125L50 100Z" fill={color} fillOpacity={opacity} />
    <path d="M150 100L193.3 125V175L150 200L106.7 175V125L150 100Z" fill={color} fillOpacity={opacity} />
  </motion.svg>
)

// Blob SVG
export const BlobShape = ({ className, color = "#9333EA", opacity = 0.1, delay = 0 }) => (
  <motion.svg
    width="300"
    height="300"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{
      scale: [1, 1.05, 1],
      rotate: [0, 3, 0],
    }}
    transition={{
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
    }}
  >
    <path
      d="M226.5 92.5C249.5 123.5 258 166 240 199.5C222 233 177.5 257.5 135 264.5C92.5 271.5 52 261 27 230.5C2 200 -7.5 149.5 10.5 110.5C28.5 71.5 74 44 119.5 37C165 30 210.5 43.5 226.5 92.5Z"
      fill={color}
      fillOpacity={opacity}
    />
  </motion.svg>
)

// Triangle Pattern
export const TrianglePattern = ({ className, color = "#9333EA", opacity = 0.1, delay = 0 }) => (
  <motion.svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 60,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
      delay: delay,
    }}
  >
    <path d="M100 0L200 173.2H0L100 0Z" fill={color} fillOpacity={opacity} />
    <path d="M100 50L150 136.6H50L100 50Z" fill={color} fillOpacity={opacity + 0.1} />
    <path d="M100 100L125 143.3H75L100 100Z" fill={color} fillOpacity={opacity + 0.2} />
  </motion.svg>
)

// Curved Lines
export const CurvedLines = ({ className, color = "#9333EA", opacity = 0.1, delay = 0 }) => (
  <motion.svg
    width="400"
    height="200"
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: delay }}
  >
    <path d="M0 50C100 0 300 0 400 50" stroke={color} strokeWidth="2" strokeOpacity={opacity + 0.2} />
    <path d="M0 100C100 50 300 50 400 100" stroke={color} strokeWidth="2" strokeOpacity={opacity + 0.15} />
    <path d="M0 150C100 100 300 100 400 150" stroke={color} strokeWidth="2" strokeOpacity={opacity + 0.1} />
    <path d="M0 200C100 150 300 150 400 200" stroke={color} strokeWidth="2" strokeOpacity={opacity + 0.05} />
  </motion.svg>
)
