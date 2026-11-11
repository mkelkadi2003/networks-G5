/**
 * Compact vector rendering of the Al-Bassam Schools emblem:
 * navy swoosh ring · folded gold "B" · pencil · ringed planet.
 */
export default function BassamEmblem({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Al-Bassam Schools emblem"
      className={className}
    >
      <circle cx="32" cy="32" r="31" fill="#ffffff" />
      {/* navy swoosh ring */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="#1a2456" strokeWidth="6.5" />
      <circle
        cx="32"
        cy="32"
        r="21.5"
        fill="none"
        stroke="#1a2456"
        strokeWidth="1.6"
        opacity="0.35"
        strokeDasharray="70 55"
        strokeLinecap="round"
        transform="rotate(-35 32 32)"
      />
      {/* gold folded B */}
      <text
        x="35"
        y="43"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="29"
        fontWeight="bold"
        fill="#dcbd85"
        stroke="#1a2456"
        strokeWidth="0.9"
      >
        B
      </text>
      {/* pencil */}
      <g transform="rotate(22 19 30)">
        <rect x="16.5" y="9" width="5" height="29" rx="1.6" fill="#f2a93b" stroke="#c9821e" strokeWidth="0.7" />
        <rect x="16.5" y="7.5" width="5" height="4" rx="1.4" fill="#c0392b" />
        <polygon points="16.5,39.5 21.5,39.5 19,46" fill="#f0d7a8" stroke="#c9821e" strokeWidth="0.5" />
        <polygon points="17.9,44.2 20.1,44.2 19,46" fill="#2b2b3d" />
      </g>
      {/* ringed planet */}
      <g transform="translate(47 15)">
        <circle r="4.6" fill="#3d3f7e" />
        <ellipse rx="7.6" ry="2.8" fill="none" stroke="#c0392b" strokeWidth="1.3" transform="rotate(-22)" />
      </g>
    </svg>
  );
}
