import React from "react"

export function BackgroundPattern({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Layer 1: Complex multiplier grid */}
      <div className="absolute inset-0 multiplier-pattern pointer-events-none z-0" />
      {/* Layer 2: Gradient mesh orbs */}
      <div className="absolute inset-0 gradient-orbs pointer-events-none z-0" />
      {/* Layer 3: Noise grain */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 opacity-30" />
      {/* Layer 4: Soft edge fade */}
      <div className="absolute inset-0 edge-fade pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
