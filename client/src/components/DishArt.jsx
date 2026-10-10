// Placeholder illustrations for dishes, drawn as SVG in the site's colours.
// If a dish has a real photo (item.image), the photo is shown instead.

const C = {
  paper: '#efe4cf',
  ink: '#1f1a17',
  oak: '#d9a85f',
  oakDark: '#a8703a',
  lantern: '#d3292b',
  leaf: '#6aa57a',
  rice: '#fffaf0',
  nori: '#2b2a28',
  salmon: '#f08a5d',
  gold: '#e0a63e',
}

// ---- the drawings (each fits a 120 x 120 box) ----

const Bowl = ({ fill = C.rice }) => (
  <>
    <ellipse cx="60" cy="102" rx="36" ry="5" fill={C.ink} opacity=".08" />
    <path d="M22 62h76a38 38 0 0 1-76 0z" fill={C.oakDark} />
    <path d="M26 62q34-36 68 0z" fill={fill} />
    <circle cx="50" cy="52" r="6" fill={C.rice} stroke={C.oak} strokeWidth="1.5" />
    <circle cx="50" cy="52" r="2.5" fill={C.gold} />
    <circle cx="72" cy="50" r="4" fill={C.leaf} />
    <circle cx="64" cy="44" r="3" fill={C.salmon} />
    <rect x="20" y="59" width="80" height="6" rx="3" fill={C.lantern} />
    <path d="M48 34q-6-8 0-14M62 32q-6-8 0-14M76 34q-6-8 0-14" stroke={C.ink} opacity=".25" fill="none" strokeWidth="3" strokeLinecap="round" />
  </>
)

const Roll = ({ cx, cy, fill }) => (
  <g>
    <circle cx={cx} cy={cy} r="19" fill={C.nori} />
    <circle cx={cx} cy={cy} r="15" fill={C.rice} />
    <circle cx={cx} cy={cy} r="7" fill={fill} />
  </g>
)
const Maki = () => (
  <>
    <ellipse cx="60" cy="104" rx="44" ry="5" fill={C.ink} opacity=".08" />
    <Roll cx={38} cy={76} fill={C.salmon} />
    <Roll cx={82} cy={76} fill={C.leaf} />
    <Roll cx={60} cy={42} fill={C.gold} />
  </>
)

const Nigiri = () => (
  <>
    <ellipse cx="60" cy="96" rx="46" ry="8" fill={C.paper} stroke={C.oak} strokeWidth="2" />
    <rect x="24" y="62" width="72" height="28" rx="14" fill={C.rice} stroke={C.oak} strokeWidth="1.5" />
    <path d="M18 64q42-30 84 0q-42 12-84 0z" fill={C.salmon} />
    <path d="M40 54l8 6M58 50l8 8M76 54l6 6" stroke={C.rice} strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
  </>
)

const Dumpling = () => (
  <>
    <ellipse cx="60" cy="98" rx="46" ry="8" fill={C.paper} stroke={C.oak} strokeWidth="2" />
    <path d="M18 80q42-50 84 0q-42 14-84 0z" fill="#f3d9a4" stroke={C.oakDark} strokeWidth="2" />
    <path d="M34 58l4 8M46 50l3 9M58 47l1 10M70 50l-1 9M82 58l-3 8" stroke={C.oakDark} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M30 92q22-22 44 0q-22 7-44 0z" fill="#f3d9a4" stroke={C.oakDark} strokeWidth="2" />
  </>
)

const Temaki = () => (
  <>
    <polygon points="28,40 92,40 60,106" fill={C.nori} />
    <polygon points="34,40 86,40 60,92" fill={C.rice} opacity=".9" />
    <ellipse cx="46" cy="36" rx="12" ry="8" fill={C.salmon} />
    <ellipse cx="68" cy="32" rx="11" ry="8" fill={C.leaf} />
    <ellipse cx="82" cy="40" rx="8" ry="6" fill={C.gold} />
    <circle cx="58" cy="26" r="4" fill={C.lantern} />
  </>
)

const Cutlet = () => (
  <>
    <ellipse cx="60" cy="98" rx="46" ry="8" fill={C.paper} stroke={C.oak} strokeWidth="2" />
    <rect x="24" y="42" width="72" height="44" rx="16" fill="#d99a3d" />
    <rect x="30" y="48" width="60" height="32" rx="12" fill="#ebbd62" />
    <path d="M46 50v28M60 50v28M74 50v28" stroke="#d99a3d" strokeWidth="2.5" />
    <g fill="#c78428">
      <circle cx="40" cy="58" r="2" /><circle cx="54" cy="70" r="2" /><circle cx="68" cy="56" r="2" />
      <circle cx="80" cy="68" r="2" /><circle cx="38" cy="72" r="2" />
    </g>
    <path d="M86 88a16 16 0 0 1 16-16z" fill="#f2d54a" />
  </>
)

const Skewers = () => (
  <>
    {[34, 58, 82].map((y) => (
      <g key={y}>
        <line x1="14" y1={y} x2="106" y2={y} stroke={C.oakDark} strokeWidth="3" strokeLinecap="round" />
        {[30, 50, 70, 90].map((x, i) => (
          <rect key={x} x={x - 9} y={y - 9} width="18" height="18" rx="6" fill={i === 2 ? C.leaf : '#8a4b2a'} />
        ))}
        <circle cx="31" cy={y - 3} r="2.5" fill="#fff" opacity=".35" />
      </g>
    ))}
  </>
)

const Steamer = () => (
  <>
    <circle cx="60" cy="60" r="46" fill={C.oak} />
    <circle cx="60" cy="60" r="38" fill="#f3e3bd" />
    <circle cx="60" cy="60" r="38" fill="none" stroke={C.oakDark} strokeWidth="2" strokeDasharray="3 5" />
    {[[44, 50], [76, 50], [60, 76]].map(([x, y]) => (
      <g key={x + '-' + y}>
        <ellipse cx={x} cy={y} rx="14" ry="10" fill={C.rice} stroke={C.oak} strokeWidth="2" />
        <path d={`M${x - 6} ${y - 4}l2 5M${x} ${y - 6}v6M${x + 6} ${y - 4}l-2 5`} stroke={C.oak} strokeWidth="2" strokeLinecap="round" />
      </g>
    ))}
  </>
)

const Drink = () => (
  <>
    <polygon points="34,34 86,34 80,102 40,102" fill="#cfe9ef" opacity=".7" stroke="#8fb9c4" strokeWidth="3" />
    <polygon points="37,52 83,52 79,100 41,100" fill="#f3a33a" opacity=".85" />
    <rect x="46" y="60" width="14" height="14" rx="3" fill="#fff" opacity=".45" />
    <rect x="64" y="72" width="12" height="12" rx="3" fill="#fff" opacity=".45" />
    <line x1="68" y1="12" x2="60" y2="80" stroke={C.lantern} strokeWidth="5" strokeLinecap="round" />
  </>
)

const Beer = () => (
  <>
    <rect x="30" y="42" width="48" height="58" rx="7" fill="#f0b43c" stroke="#e8e4dc" strokeWidth="3" />
    <path d="M44 52v40M58 52v40" stroke="#fff" strokeWidth="3" opacity=".25" />
    <path d="M78 54h10a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H78" fill="none" stroke="#e8e4dc" strokeWidth="6" />
    <g fill="#fff">
      <circle cx="38" cy="40" r="9" /><circle cx="52" cy="35" r="11" /><circle cx="67" cy="40" r="10" /><circle cx="76" cy="44" r="6" />
    </g>
  </>
)

const Wine = ({ fill = '#8e2a46' }) => (
  <>
    <path d="M40 16h40q3 44-20 48-23-4-20-48z" fill="#e6f1f4" opacity=".7" stroke="#8fb9c4" strokeWidth="3" />
    <path d="M42 36h36q-1 24-18 28-17-4-18-28z" fill={fill} />
    <line x1="60" y1="64" x2="60" y2="98" stroke="#8fb9c4" strokeWidth="4" />
    <ellipse cx="60" cy="102" rx="20" ry="5" fill="#cfe9ef" stroke="#8fb9c4" strokeWidth="3" />
  </>
)

const Sake = () => (
  <>
    <path d="M52 16h16v16q18 8 18 32v30q0 8-8 8H42q-8 0-8-8V64q0-24 18-32z" fill="#e3edf1" stroke="#8fb9c4" strokeWidth="3" />
    <rect x="46" y="56" width="28" height="26" rx="3" fill={C.lantern} />
    <circle cx="60" cy="69" r="6" fill={C.rice} />
    <rect x="50" y="10" width="20" height="8" rx="3" fill={C.oakDark} />
  </>
)

const Bottle = ({ fill = '#6aa57a' }) => (
  <>
    <path d="M52 10h16v22q16 8 16 30v38q0 6-6 6H42q-6 0-6-6V62q0-22 16-30z" fill={fill} />
    <rect x="42" y="58" width="36" height="30" rx="3" fill={C.rice} />
    <rect x="48" y="66" width="24" height="4" rx="2" fill={fill} />
    <rect x="48" y="75" width="16" height="4" rx="2" fill={fill} opacity=".6" />
    <rect x="52" y="6" width="16" height="8" rx="3" fill={C.ink} opacity=".7" />
  </>
)

// ---- dedicated drawings for specific dishes ----

const Plate = ({ y = 98 }) => (
  <>
    <ellipse cx="60" cy={y + 4} rx="50" ry="9" fill={C.ink} opacity=".07" />
    <ellipse cx="60" cy={y} rx="50" ry="10" fill="#fff" stroke={C.oak} strokeWidth="2" />
  </>
)

const Omurice = () => (
  <>
    <Plate y={90} />
    <ellipse cx="60" cy="82" rx="42" ry="10" fill="#c0762a" />
    <path d="M26 82q34-56 68 0q-34 12-68 0z" fill="#f2c94c" />
    <path d="M36 70q8-18 24-22" stroke="#fbe38a" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".8" />
    <path d="M40 66l6-7 6 7 6-7 6 7 6-7 6 7" stroke={C.lantern} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="80" y="70" width="22" height="9" rx="4" fill="#d99a3d" transform="rotate(-18 91 74)" />
    <rect x="76" y="79" width="22" height="9" rx="4" fill="#e8b95c" transform="rotate(8 87 83)" />
    <circle cx="26" cy="86" r="2.5" fill={C.leaf} /><circle cx="34" cy="92" r="2.5" fill={C.leaf} /><circle cx="48" cy="93" r="2.5" fill="#f08a3d" />
  </>
)

const DimSumPlatter = () => (
  <>
    <rect x="12" y="24" width="96" height="72" rx="14" fill={C.oak} />
    <rect x="18" y="30" width="84" height="60" rx="10" fill="#f3e3bd" />
    {/* har gow */}
    <path d="M24 54q14-24 28 0q-14 6-28 0z" fill="#fdeeee" stroke="#e1aa9f" strokeWidth="2" />
    <path d="M32 44l2 6M38 41v8M44 44l-2 6" stroke="#e1aa9f" strokeWidth="2" strokeLinecap="round" />
    {/* spring rolls */}
    <rect x="62" y="38" width="32" height="10" rx="5" fill={C.gold} transform="rotate(-14 78 43)" />
    <rect x="64" y="52" width="32" height="10" rx="5" fill="#e8b95c" transform="rotate(-14 80 57)" />
    {/* gyoza */}
    <path d="M24 82q14-22 28 0q-14 6-28 0z" fill="#f3d9a4" stroke={C.oakDark} strokeWidth="2" />
    <path d="M32 72l2 6M38 69v8M44 72l-2 6" stroke={C.oakDark} strokeWidth="2" strokeLinecap="round" />
    {/* ebi furai */}
    <ellipse cx="76" cy="78" rx="14" ry="8" fill="#d99a3d" transform="rotate(-10 76 78)" />
    <path d="M88 74l10-4-2 10z" fill={C.salmon} />
  </>
)

const BeefBowl = () => (
  <>
    <ellipse cx="60" cy="102" rx="36" ry="5" fill={C.ink} opacity=".08" />
    <path d="M22 62h76a38 38 0 0 1-76 0z" fill={C.oakDark} />
    <path d="M26 62q34-30 68 0z" fill={C.rice} />
    <g fill="#8a3b2a">
      <ellipse cx="44" cy="52" rx="13" ry="5" transform="rotate(-14 44 52)" />
      <ellipse cx="62" cy="46" rx="14" ry="5" transform="rotate(4 62 46)" />
      <ellipse cx="78" cy="52" rx="12" ry="5" transform="rotate(16 78 52)" />
    </g>
    <path d="M40 44q6-4 10 0M66 40q6-3 10 1" stroke="#f0e2a4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <g fill={C.leaf}><circle cx="52" cy="40" r="2.5" /><circle cx="70" cy="38" r="2.5" /><circle cx="60" cy="50" r="2.5" /></g>
    <g fill="#fff"><circle cx="48" cy="48" r="1.4" /><circle cx="74" cy="46" r="1.4" /><circle cx="62" cy="42" r="1.4" /></g>
    <rect x="20" y="59" width="80" height="6" rx="3" fill={C.lantern} />
  </>
)

const Prawn = ({ x = 0, y = 0, s = 1, body = '#e0993a', band = '#b8741f' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M26 72Q28 36 62 38Q88 40 88 64" stroke={body} strokeWidth="15" strokeLinecap="round" fill="none" />
    <path d="M26 72Q28 36 62 38Q88 40 88 64" stroke={band} strokeWidth="15" fill="none" strokeDasharray="2 9" />
    <path d="M88 64l8 10-4-14 12 4z" fill={C.salmon} />
    <circle cx="30" cy="66" r="2" fill={C.ink} />
  </g>
)
const Prawns = () => (
  <>
    <Plate y={96} />
    <Prawn x={-4} y={4} />
    <Prawn x={12} y={20} s={0.82} body="#e8a649" />
    <g fill="none" stroke={C.lantern} strokeWidth="2.5"><circle cx="36" cy="88" r="4" /><circle cx="86" cy="84" r="4" /></g>
    <g fill={C.leaf}><rect x="52" y="86" width="9" height="3" rx="1.5" /><rect x="66" y="90" width="9" height="3" rx="1.5" transform="rotate(20 70 91)" /></g>
    <g fill="#fff" opacity=".85"><circle cx="50" cy="44" r="1.3" /><circle cx="68" cy="46" r="1.3" /><circle cx="58" cy="56" r="1.3" /><circle cx="78" cy="58" r="1.3" /></g>
  </>
)

const DragonRoll = ({ top = '#6aa57a' }) => (
  <>
    <Plate y={98} />
    <rect x="12" y="30" width="96" height="34" rx="17" fill={top} />
    <path d="M30 32v30M48 32v30M66 32v30M84 32v30" stroke={C.nori} strokeWidth="2" opacity=".35" />
    <path d="M18 40l8-6 8 6 8-6 8 6 8-6 8 6 8-6 8 6 8-6" stroke="#6b3a1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <g fill={C.lantern}>{[24, 40, 56, 72, 88].map((x) => <circle key={x} cx={x} cy="55" r="3" />)}</g>
    {[34, 60, 86].map((x) => (
      <g key={x}>
        <circle cx={x} cy="84" r="13" fill={C.nori} />
        <circle cx={x} cy="84" r="10" fill={C.rice} />
        <circle cx={x} cy="84" r="4.5" fill={C.salmon} />
        <path d={`M${x - 12} 78q12-14 24 0`} stroke={top} strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    ))}
  </>
)

const Bibimbap = () => (
  <>
    <ellipse cx="60" cy="108" rx="40" ry="4" fill={C.ink} opacity=".08" />
    <circle cx="60" cy="60" r="48" fill="#3a3532" />
    <circle cx="60" cy="60" r="40" fill="#fff3dc" />
    <path d="M60 60L60 26A34 34 0 0 1 92.3 49.5Z" fill="#f08a3d" />
    <path d="M60 60L92.3 49.5A34 34 0 0 1 80 87.5Z" fill="#4f8b57" />
    <path d="M60 60L80 87.5A34 34 0 0 1 40 87.5Z" fill="#8a5a3a" />
    <path d="M60 60L40 87.5A34 34 0 0 1 27.7 49.5Z" fill="#efe1b0" />
    <path d="M60 60L27.7 49.5A34 34 0 0 1 60 26Z" fill="#c98b4a" />
    <ellipse cx="60" cy="60" rx="15" ry="13" fill="#fff" />
    <circle cx="60" cy="60" r="6.5" fill={C.gold} />
  </>
)

const SpringRolls = () => (
  <>
    <Plate y={96} />
    <rect x="18" y="52" width="62" height="16" rx="8" fill={C.gold} transform="rotate(-16 49 60)" />
    <rect x="22" y="66" width="62" height="16" rx="8" fill="#e8b95c" transform="rotate(-6 53 74)" />
    <ellipse cx="22" cy="62" rx="3" ry="6.5" fill="#f3d9a4" transform="rotate(-16 22 62)" />
    <circle cx="94" cy="76" r="12" fill="#fff" stroke={C.oak} strokeWidth="2" />
    <circle cx="94" cy="76" r="8" fill="#e5532d" />
  </>
)

const Tamagoyaki = () => (
  <>
    <Plate y={96} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={20 + i * 28} y="46" width="24" height="40" rx="6" fill="#f2c94c" />
        <rect x={24 + i * 28} y="52" width="16" height="28" rx="4" fill="#f9e08a" />
        <path d={`M${27 + i * 28} 62q5-4 10 0M${27 + i * 28} 70q5-4 10 0`} stroke="#e0a63e" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    ))}
  </>
)

const Pod = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x="-24" y="-9" width="48" height="18" rx="9" fill="#5f9e4f" />
    <g fill="#8fcf7a"><circle cx="-12" cy="0" r="5.5" /><circle cx="0" cy="0" r="5.5" /><circle cx="12" cy="0" r="5.5" /></g>
  </g>
)
const Edamame = () => (
  <>
    <Plate y={96} />
    <Pod x={42} y={62} r={-22} />
    <Pod x={78} y={58} r={18} />
    <Pod x={58} y={80} r={-4} />
    <g fill="#fff" opacity=".8"><circle cx="30" cy="84" r="1.6" /><circle cx="90" cy="82" r="1.6" /><circle cx="66" cy="68" r="1.6" /></g>
  </>
)

const BeefRoll = () => (
  <>
    <Plate y={96} />
    {[[34, 72], [60, 58], [86, 72]].map(([x, y]) => (
      <g key={x}>
        <circle cx={x} cy={y} r="16" fill="#8a3b2a" />
        <circle cx={x} cy={y} r="11" fill="#c98b6a" />
        <circle cx={x} cy={y} r="5" fill="#f0e2a4" />
      </g>
    ))}
    <g fill={C.leaf}><circle cx="46" cy="86" r="2.5" /><circle cx="74" cy="86" r="2.5" /><circle cx="60" cy="80" r="2.5" /></g>
  </>
)

const SalmonStirFry = () => (
  <>
    <Plate y={96} />
    <g fill="#f08a5d" stroke="#d9683a" strokeWidth="2">
      <rect x="24" y="56" width="26" height="20" rx="6" transform="rotate(-8 37 66)" />
      <rect x="54" y="50" width="26" height="20" rx="6" transform="rotate(10 67 60)" />
      <rect x="40" y="72" width="26" height="18" rx="6" transform="rotate(4 53 81)" />
      <rect x="72" y="70" width="24" height="18" rx="6" transform="rotate(-12 84 79)" />
    </g>
    <g fill={C.lantern}><rect x="30" y="44" width="16" height="5" rx="2.5" /><rect x="76" y="62" width="16" height="5" rx="2.5" transform="rotate(30 84 64)" /></g>
    <g fill={C.leaf}><circle cx="52" cy="46" r="3" /><circle cx="92" cy="54" r="3" /><circle cx="30" cy="84" r="3" /></g>
  </>
)

// ---- choosing the right drawing for a dish ----

function pick(item) {
  const name = item.name.toLowerCase()
  const byCategory = {
    starters: <Dumpling />,
    maki: <Maki />,
    temaki: <Temaki />,
    nigiri: <Nigiri />,
    mains: <Bowl />,
    others: <Cutlet />,
    skewers: <Skewers />,
    dimsum: <Steamer />,
    'soft-drinks': <Drink />,
    beers: <Beer />,
    wines: <Wine />,
    'plum-wine': <Bottle fill="#7a3b6e" />,
    sake: <Sake />,
    whiskey: <Bottle fill="#b8742a" />,
    soju: <Bottle fill="#6aa57a" />,
  }
  // Dedicated drawings for specific dishes come first.
  if (/omurice/.test(name)) return <Omurice />
  if (name === 'dim sum platter') return <DimSumPlatter />
  if (name === 'japanese beef rice bowl') return <BeefBowl />
  if (/bibimbap/.test(name)) return <Bibimbap />
  if (item.category === 'maki' && /dragon/.test(name)) {
    return <DragonRoll top={/purple/.test(name) ? '#8a4aa0' : /golden/.test(name) ? '#e0a63e' : '#6aa57a'} />
  }
  if (item.category === 'others' && /prawn|ebi/.test(name)) return <Prawns />
  if (/spring roll/.test(name)) return <SpringRolls />
  if (/gyoza|dumpling/.test(name)) return <Dumpling />
  if (item.category === 'starters') {
    if (/tamagoyaki/.test(name)) return <Tamagoyaki />
    if (/edamame/.test(name)) return <Edamame />
    if (/beef roll/.test(name)) return <BeefRoll />
    if (/stir-fried salmon/.test(name)) return <SalmonStirFry />
    if (/king prawn roll/.test(name)) return <Prawns />
    if (/fried milk/.test(name)) return <Cutlet />
  }

  // Name-based exceptions, mostly for starters and the "other dishes" category.
  if (/soup|miso|udon/.test(name)) return <Bowl fill="#b8793a" />
  if (/salad|edamame|kimchi/.test(name)) return <Bowl fill={C.leaf} />
  if (/rice|bowl|bibimbap/.test(name)) return <Bowl />
  if (/tea|water/.test(name) && item.category === 'soft-drinks') return <Drink />
  return byCategory[item.category] ?? <Bowl />
}

export default function DishArt({ item, className = '' }) {
  if (item.image) {
    return <img src={item.image} alt={item.name} loading="lazy" className={`object-cover ${className}`} />
  }
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Illustration of ${item.name}`}
      className={className}
    >
      <rect width="120" height="120" rx="18" fill={C.paper} />
      {pick(item)}
    </svg>
  )
}
