const breakpoints = [576, 768, 992, 1200, 1400, 2200]

export const maxq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

export const minq = breakpoints.map(bp => `@media (min-width: ${bp}px)`)