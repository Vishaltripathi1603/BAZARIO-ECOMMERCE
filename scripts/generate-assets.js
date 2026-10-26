/* eslint-disable */
const fs = require('fs');
const path = require('path');

function createSvgTemplate(title, subtitle, graphicContent, accentColor = '#2D5A27') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" fill="none">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="100%" stop-color="#EDE7DC"/>
    </radialGradient>
    <linearGradient id="bambooGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CEAC"/>
      <stop offset="50%" stop-color="#D4B483"/>
      <stop offset="100%" stop-color="#B28C56"/>
    </linearGradient>
    <linearGradient id="bambooGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D9BA8F"/>
      <stop offset="100%" stop-color="#9C733C"/>
    </linearGradient>
    <linearGradient id="greenAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A7333"/>
      <stop offset="100%" stop-color="#23461E"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#5C4D3C" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bgGrad)" />

  <!-- Subtle Eco Pattern -->
  <g opacity="0.06" stroke="#2D5A27" stroke-width="2">
    <circle cx="100" cy="100" r="80"/>
    <circle cx="700" cy="500" r="120"/>
    <path d="M50 500 Q 200 450 350 520 T 650 480" />
    <path d="M150 80 Q 300 130 450 70 T 750 110" />
  </g>

  <!-- Product Graphic -->
  <g filter="url(#cardShadow)">
    ${graphicContent}
  </g>

  <!-- Clean Bottom Product Label -->
  <rect x="60" y="500" width="680" height="68" rx="14" fill="#FFFFFF" fill-opacity="0.85" stroke="#E2DAC9" stroke-width="1.5"/>
  <circle cx="94" cy="534" r="16" fill="${accentColor}"/>
  <path d="M88 534 L92 538 L100 530" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="124" y="530" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1C1E1B">${title}</text>
  <text x="124" y="548" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#6B6255">${subtitle} • 100% Sustainable Bamboo</text>
  <rect x="620" y="518" width="100" height="32" rx="16" fill="#F0F4EF"/>
  <text x="670" y="539" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#2D5A27">BAMBOONEST</text>
</svg>`;
}

const products = [
  {
    file: 'bamboo-toothbrush-set.svg',
    title: 'Bamboo Toothbrush Set (4-Pack)',
    subtitle: 'Zero-Waste Oral Hygiene',
    accent: '#2D5A27',
    content: `
      <!-- 4 Toothbrushes -->
      <g transform="translate(180, 110)">
        <!-- Toothbrush 1 -->
        <rect x="40" y="80" width="22" height="260" rx="11" fill="url(#bambooGrad1)" transform="rotate(-15 51 210)"/>
        <rect x="42" y="60" width="18" height="40" rx="6" fill="#FFFFFF" opacity="0.9" transform="rotate(-15 51 210)"/>
        <!-- Toothbrush 2 -->
        <rect x="140" y="70" width="22" height="270" rx="11" fill="url(#bambooGrad2)" transform="rotate(-5 151 205)"/>
        <rect x="142" y="50" width="18" height="40" rx="6" fill="#A7D7C5" opacity="0.9" transform="rotate(-5 151 205)"/>
        <!-- Toothbrush 3 -->
        <rect x="240" y="70" width="22" height="270" rx="11" fill="url(#bambooGrad1)" transform="rotate(5 251 205)"/>
        <rect x="242" y="50" width="18" height="40" rx="6" fill="#D4E09B" opacity="0.9" transform="rotate(5 251 205)"/>
        <!-- Toothbrush 4 -->
        <rect x="340" y="80" width="22" height="260" rx="11" fill="url(#bambooGrad2)" transform="rotate(15 351 210)"/>
        <rect x="342" y="60" width="18" height="40" rx="6" fill="#C9D6DF" opacity="0.9" transform="rotate(15 351 210)"/>
      </g>
    `
  },
  {
    file: 'bamboo-cutting-board.svg',
    title: 'Organic Bamboo Cutting Board with Juice Groove',
    subtitle: 'Culinary Prep Station',
    accent: '#8C6239',
    content: `
      <g transform="translate(150, 120)">
        <!-- Board Base -->
        <rect x="0" y="0" width="500" height="320" rx="28" fill="url(#bambooGrad1)" stroke="#8C6239" stroke-width="6"/>
        <!-- Wood grain stripes -->
        <path d="M 0 60 Q 250 50 500 65" stroke="#B89462" stroke-width="3" fill="none" opacity="0.4"/>
        <path d="M 0 140 Q 250 145 500 135" stroke="#B89462" stroke-width="3" fill="none" opacity="0.4"/>
        <path d="M 0 220 Q 250 215 500 225" stroke="#B89462" stroke-width="3" fill="none" opacity="0.4"/>
        <!-- Perimeter Juice Groove -->
        <rect x="24" y="24" width="452" height="272" rx="18" fill="none" stroke="#7A552F" stroke-width="6" opacity="0.6"/>
        <!-- Beveled Corner Hole / Handle -->
        <rect x="420" y="44" width="34" height="70" rx="17" fill="#F5EFE6" stroke="#7A552F" stroke-width="3"/>
      </g>
    `
  },
  {
    file: 'bamboo-cutlery-kit.svg',
    title: 'Portable Bamboo Cutlery Travel Kit',
    subtitle: '6-Piece Commuter Suite',
    accent: '#2D5A27',
    content: `
      <g transform="translate(160, 110)">
        <!-- Fabric pouch base -->
        <rect x="30" y="40" width="420" height="280" rx="20" fill="#5E7052" stroke="#48573E" stroke-width="4"/>
        <path d="M 30 180 L 450 180" stroke="#7A8E6E" stroke-width="3" stroke-dasharray="8 6"/>
        <!-- Fork -->
        <rect x="80" y="70" width="16" height="220" rx="6" fill="url(#bambooGrad1)"/>
        <!-- Spoon -->
        <rect x="150" y="70" width="16" height="220" rx="6" fill="url(#bambooGrad1)"/>
        <ellipse cx="158" cy="75" rx="22" ry="30" fill="url(#bambooGrad2)"/>
        <!-- Knife -->
        <rect x="220" y="70" width="16" height="220" rx="6" fill="url(#bambooGrad1)"/>
        <path d="M 220 70 Q 236 75 236 120 L 220 120 Z" fill="url(#bambooGrad2)"/>
        <!-- Straw & Chopsticks -->
        <rect x="290" y="50" width="12" height="250" rx="6" fill="url(#bambooGrad1)"/>
        <rect x="330" y="50" width="8" height="255" rx="4" fill="url(#bambooGrad2)"/>
        <rect x="350" y="50" width="8" height="255" rx="4" fill="url(#bambooGrad2)"/>
      </g>
    `
  },
  {
    file: 'bamboo-straws.svg',
    title: 'Reusable Bamboo Straws (8-Pack)',
    subtitle: 'All-Natural Drinkware',
    accent: '#2D5A27',
    content: `
      <g transform="translate(200, 100)">
        <!-- Bundle of straws with sisal tie -->
        <rect x="60" y="50" width="18" height="300" rx="9" fill="url(#bambooGrad1)" transform="rotate(-8 69 200)"/>
        <rect x="100" y="40" width="20" height="310" rx="10" fill="url(#bambooGrad2)" transform="rotate(-4 110 195)"/>
        <rect x="140" y="30" width="22" height="320" rx="11" fill="url(#bambooGrad1)"/>
        <rect x="180" y="40" width="19" height="310" rx="9.5" fill="url(#bambooGrad2)" transform="rotate(4 189 195)"/>
        <rect x="220" y="50" width="21" height="300" rx="10.5" fill="url(#bambooGrad1)" transform="rotate(8 230 200)"/>
        <!-- Hemp Tie -->
        <rect x="50" y="180" width="210" height="26" rx="6" fill="#8C6239" stroke="#684728" stroke-width="2"/>
        <circle cx="155" cy="193" r="12" fill="#684728"/>
        <!-- Straw interior rings -->
        <circle cx="69" cy="55" r="5" fill="#5C4223"/>
        <circle cx="110" cy="45" r="6" fill="#5C4223"/>
        <circle cx="151" cy="35" r="7" fill="#5C4223"/>
      </g>
    `
  },
  {
    file: 'bamboo-laundry-hamper.svg',
    title: 'Collapsible Bamboo Laundry Basket Hamper',
    subtitle: 'Breathable Slatted Storage',
    accent: '#8C6239',
    content: `
      <g transform="translate(200, 90)">
        <!-- Basket body -->
        <path d="M 50 340 L 90 60 L 310 60 L 350 340 Z" fill="#E8DEC8" stroke="#8C6239" stroke-width="4"/>
        <!-- Bamboo slats -->
        <rect x="110" y="50" width="14" height="295" rx="4" fill="url(#bambooGrad1)"/>
        <rect x="150" y="50" width="14" height="295" rx="4" fill="url(#bambooGrad2)"/>
        <rect x="190" y="50" width="14" height="295" rx="4" fill="url(#bambooGrad1)"/>
        <rect x="230" y="50" width="14" height="295" rx="4" fill="url(#bambooGrad2)"/>
        <rect x="270" y="50" width="14" height="295" rx="4" fill="url(#bambooGrad1)"/>
        <!-- Linen lid & handle -->
        <rect x="80" y="40" width="240" height="26" rx="10" fill="#FFFBF5" stroke="#8C6239" stroke-width="3"/>
        <path d="M 180 40 Q 200 15 220 40" stroke="#8C6239" stroke-width="5" fill="none"/>
      </g>
    `
  },
  {
    file: 'bamboo-bathroom-caddy.svg',
    title: 'Tiered Bamboo Bathroom Organizer Caddy',
    subtitle: 'Water-Resistant Vanity Rack',
    accent: '#2D5A27',
    content: `
      <g transform="translate(180, 100)">
        <!-- Left & Right frame poles -->
        <rect x="40" y="40" width="22" height="300" rx="8" fill="url(#bambooGrad2)"/>
        <rect x="380" y="40" width="22" height="300" rx="8" fill="url(#bambooGrad2)"/>
        <!-- Top Shelf -->
        <rect x="30" y="110" width="380" height="32" rx="8" fill="url(#bambooGrad1)" stroke="#8C6239" stroke-width="2"/>
        <rect x="80" y="80" width="30" height="30" rx="6" fill="#A7D7C5" opacity="0.8"/>
        <rect x="130" y="70" width="24" height="40" rx="4" fill="#E8CEAC"/>
        <!-- Bottom Shelf -->
        <rect x="30" y="240" width="380" height="32" rx="8" fill="url(#bambooGrad1)" stroke="#8C6239" stroke-width="2"/>
        <rect x="80" y="195" width="60" height="45" rx="8" fill="#FFFBF5" stroke="#CCD5AE" stroke-width="2"/>
        <rect x="180" y="190" width="40" height="50" rx="8" fill="#93B1A6"/>
      </g>
    `
  },
  {
    file: 'bamboo-serving-tray.svg',
    title: 'Handcrafted Bamboo Serving Tray with Handles',
    subtitle: 'Raised Rim Platter',
    accent: '#8C6239',
    content: `
      <g transform="translate(150, 130)">
        <!-- Outer Tray Rim -->
        <rect x="0" y="0" width="500" height="280" rx="20" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="5"/>
        <!-- Inner Tray Bed -->
        <rect x="25" y="25" width="450" height="230" rx="14" fill="#EFE5D3" stroke="#8C6239" stroke-width="2"/>
        <!-- Left handle cutout -->
        <rect x="5" y="110" width="15" height="60" rx="7" fill="#FBF9F5"/>
        <!-- Right handle cutout -->
        <rect x="480" y="110" width="15" height="60" rx="7" fill="#FBF9F5"/>
        <!-- Ceramic cup on tray -->
        <circle cx="160" cy="140" r="45" fill="#FFFFFF" stroke="#CCD5AE" stroke-width="4"/>
        <circle cx="160" cy="140" r="32" fill="#D4A373" opacity="0.6"/>
      </g>
    `
  },
  {
    file: 'bamboo-storage-box.svg',
    title: 'Modular Bamboo Storage Box with Flush Lid',
    subtitle: 'Stackable Modular Chest',
    accent: '#8C6239',
    content: `
      <g transform="translate(200, 110)">
        <!-- Box Base -->
        <rect x="30" y="100" width="340" height="220" rx="16" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Recessed groove -->
        <line x1="30" y1="180" x2="370" y2="180" stroke="#8C6239" stroke-width="3"/>
        <!-- Box Lid -->
        <rect x="20" y="70" width="360" height="36" rx="10" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <!-- Finger pull notch -->
        <ellipse cx="200" cy="88" rx="28" ry="8" fill="#FBF9F5"/>
      </g>
    `
  },
  {
    file: 'bamboo-laptop-stand.svg',
    title: 'Ergonomic Bamboo Laptop Stand Riser',
    subtitle: 'Ventilated Eye-Level Riser',
    accent: '#2D5A27',
    content: `
      <g transform="translate(180, 110)">
        <!-- Stand side frame (cantilever) -->
        <path d="M 60 300 L 380 300 L 320 180 L 140 180 Z" fill="#D4B483" stroke="#8C6239" stroke-width="3"/>
        <!-- Angled platform -->
        <path d="M 60 260 L 380 150 L 370 120 L 50 230 Z" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Front stop lip -->
        <rect x="42" y="220" width="20" height="50" rx="8" fill="url(#bambooGrad2)"/>
        <!-- Cooling vent slots -->
        <line x1="120" y1="215" x2="280" y2="160" stroke="#7A552F" stroke-width="8" stroke-linecap="round"/>
        <line x1="140" y1="235" x2="300" y2="180" stroke="#7A552F" stroke-width="8" stroke-linecap="round"/>
      </g>
    `
  },
  {
    file: 'bamboo-desk-organizer.svg',
    title: 'Multi-Slot Bamboo Desk Organizer Caddy',
    subtitle: 'Tiered Station & Phone Dock',
    accent: '#8C6239',
    content: `
      <g transform="translate(170, 110)">
        <!-- Back tall tray -->
        <rect x="40" y="60" width="380" height="180" rx="12" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <!-- Middle tier -->
        <rect x="40" y="140" width="380" height="120" rx="12" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="3"/>
        <!-- Front compartments -->
        <rect x="40" y="210" width="180" height="90" rx="12" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <rect x="240" y="210" width="180" height="90" rx="12" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="3"/>
        <!-- Smartphone slotted in back -->
        <rect x="60" y="20" width="80" height="130" rx="12" fill="#1C1E1B"/>
        <circle cx="100" cy="140" r="6" fill="#555"/>
        <!-- Pens in slot -->
        <line x1="280" y1="10" x2="280" y2="140" stroke="#2D5A27" stroke-width="8" stroke-linecap="round"/>
        <line x1="310" y1="30" x2="310" y2="140" stroke="#8C6239" stroke-width="8" stroke-linecap="round"/>
      </g>
    `
  },
  {
    file: 'bamboo-monitor-riser.svg',
    title: 'Dual-Slot Bamboo Monitor Riser Stand',
    subtitle: 'Heavy-Duty 35kg Support',
    accent: '#2D5A27',
    content: `
      <g transform="translate(140, 130)">
        <!-- Top Bridge Deck -->
        <rect x="20" y="60" width="480" height="42" rx="10" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Left Leg -->
        <rect x="40" y="102" width="40" height="140" rx="8" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <!-- Right Leg -->
        <rect x="440" y="102" width="40" height="140" rx="8" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <!-- Routed Tablet Slots on deck -->
        <rect x="70" y="70" width="120" height="8" rx="4" fill="#7A552F"/>
        <rect x="210" y="70" width="80" height="8" rx="4" fill="#7A552F"/>
        <!-- Keyboard tucked underneath -->
        <rect x="100" y="195" width="320" height="35" rx="6" fill="#F0ECE1" stroke="#B89462" stroke-width="2"/>
      </g>
    `
  },
  {
    file: 'bamboo-wireless-charger.svg',
    title: 'Fast Qi Bamboo Wireless Charging Pad',
    subtitle: '15W Rapid Inductive Hub',
    accent: '#2D5A27',
    content: `
      <g transform="translate(220, 90)">
        <!-- Outer turned bamboo puck -->
        <circle cx="180" cy="180" r="140" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="6"/>
        <circle cx="180" cy="180" r="115" fill="none" stroke="#B89462" stroke-width="2" stroke-dasharray="4 8"/>
        <!-- Center Qi logo glyph -->
        <circle cx="180" cy="180" r="40" fill="#2D5A27" opacity="0.15"/>
        <path d="M 180 145 C 160 145 145 160 145 180 C 145 200 160 215 180 215 C 200 215 215 200 215 180 C 215 160 200 145 180 145 Z" stroke="#2D5A27" stroke-width="5" fill="none"/>
        <line x1="180" y1="165" x2="180" y2="195" stroke="#2D5A27" stroke-width="5" stroke-linecap="round"/>
        <!-- Amber LED -->
        <circle cx="180" cy="300" r="6" fill="#E67E22"/>
      </g>
    `
  },
  {
    file: 'bamboo-pen-holder.svg',
    title: 'Minimalist Hexagonal Bamboo Pen Holder',
    subtitle: 'Faceted Architect Desk Cup',
    accent: '#8C6239',
    content: `
      <g transform="translate(230, 90)">
        <!-- Hexagonal 3D silhouette -->
        <polygon points="170,40 260,90 260,270 170,320 80,270 80,90" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <polygon points="170,40 260,90 170,140 80,90" fill="#EBD9C0"/>
        <polygon points="80,90 170,140 170,320 80,270" fill="url(#bambooGrad2)"/>
        <!-- Pens sticking out -->
        <line x1="150" y1="8" x2="150" y2="100" stroke="#1C1E1B" stroke-width="8" stroke-linecap="round"/>
        <line x1="180" y1="20" x2="180" y2="100" stroke="#8C6239" stroke-width="7" stroke-linecap="round"/>
        <line x1="200" y1="0" x2="200" y2="100" stroke="#2D5A27" stroke-width="6" stroke-linecap="round"/>
      </g>
    `
  },
  {
    file: 'bamboo-wrist-rest.svg',
    title: 'Contoured Bamboo Keyboard Wrist Rest',
    subtitle: '8-Degree Ergonomic Slope',
    accent: '#8C6239',
    content: `
      <g transform="translate(130, 150)">
        <!-- Ergonomic angled rest block -->
        <polygon points="40,160 500,160 500,80 40,110" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Top beveled surface -->
        <polygon points="40,110 500,80 470,50 10,80" fill="#EAD9C2" stroke="#7A552F" stroke-width="3"/>
        <!-- Wood grain linear streaks -->
        <line x1="60" y1="130" x2="480" y2="105" stroke="#B89462" stroke-width="2"/>
        <line x1="70" y1="145" x2="490" y2="125" stroke="#B89462" stroke-width="2"/>
      </g>
    `
  },
  {
    file: 'bamboo-desk-mat.svg',
    title: 'Natural Textured Bamboo Desk Mat Blotter',
    subtitle: '80x40 cm Rollable Shield',
    accent: '#8C6239',
    content: `
      <g transform="translate(120, 120)">
        <!-- Large Desk Mat Body -->
        <rect x="0" y="30" width="560" height="280" rx="16" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="5"/>
        <!-- Micro-slat texture lines -->
        <g stroke="#B89462" stroke-width="1.5" opacity="0.6">
          <line x1="50" y1="30" x2="50" y2="310"/>
          <line x1="120" y1="30" x2="120" y2="310"/>
          <line x1="190" y1="30" x2="190" y2="310"/>
          <line x1="260" y1="30" x2="260" y2="310"/>
          <line x1="330" y1="30" x2="330" y2="310"/>
          <line x1="400" y1="30" x2="400" y2="310"/>
          <line x1="470" y1="30" x2="470" y2="310"/>
        </g>
        <!-- Sleek Mouse silhouette -->
        <rect x="420" y="130" width="50" height="80" rx="25" fill="#FFFFFF" stroke="#CCD5AE" stroke-width="3"/>
      </g>
    `
  },
  {
    file: 'bamboo-cable-box.svg',
    title: 'Hidden Bamboo Cable Organizer Box',
    subtitle: 'Multi-Port Surge Protector Hider',
    accent: '#8C6239',
    content: `
      <g transform="translate(160, 110)">
        <!-- Box Main Chassis -->
        <rect x="30" y="90" width="420" height="210" rx="16" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Side Cable Pass-Through Slots -->
        <rect x="15" y="160" width="30" height="70" rx="12" fill="#FBF9F5" stroke="#7A552F" stroke-width="3"/>
        <rect x="435" y="160" width="30" height="70" rx="12" fill="#FBF9F5" stroke="#7A552F" stroke-width="3"/>
        <!-- Top Docking Lid -->
        <rect x="20" y="60" width="440" height="35" rx="10" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="3"/>
        <rect x="120" y="70" width="240" height="12" rx="6" fill="#7A552F"/>
      </g>
    `
  }
];

// Write product images
products.forEach(p => {
  const svg = createSvgTemplate(p.title, p.subtitle, p.content, p.accent);
  fs.writeFileSync(path.join(__dirname, '../public/images/products', p.file), svg, 'utf8');
});

// Blog images
const blogImages = [
  {
    file: 'bamboo-vs-plastic.svg',
    title: 'Why Choose Bamboo Over Plastic',
    subtitle: 'Eco-Living & Circular Lifecycles',
    accent: '#2D5A27',
    content: `
      <g transform="translate(180, 110)">
        <!-- Left: Bamboo Cane -->
        <rect x="60" y="40" width="50" height="280" rx="12" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="3"/>
        <line x1="60" y1="120" x2="110" y2="120" stroke="#7A552F" stroke-width="5"/>
        <line x1="60" y1="200" x2="110" y2="200" stroke="#7A552F" stroke-width="5"/>
        <!-- VS badge -->
        <circle cx="220" cy="180" r="36" fill="#2D5A27"/>
        <text x="220" y="190" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">VS</text>
        <!-- Right: Plastic Bottle crossed -->
        <rect x="300" y="80" width="60" height="200" rx="18" fill="#C5D3E8" stroke="#8CA0BA" stroke-width="3"/>
        <rect x="315" y="50" width="30" height="30" rx="4" fill="#3B82F6"/>
      </g>
    `
  },
  {
    file: 'eco-friendly-office.svg',
    title: 'How to Set Up an Eco-Friendly Home Office',
    subtitle: 'Ergonomic Workstation Blueprint',
    accent: '#2D5A27',
    content: `
      <g transform="translate(150, 110)">
        <!-- Desk -->
        <rect x="20" y="240" width="460" height="24" rx="6" fill="#8C6239"/>
        <!-- Bamboo Riser & Monitor -->
        <rect x="120" y="210" width="260" height="30" rx="6" fill="url(#bambooGrad1)"/>
        <rect x="160" y="80" width="180" height="120" rx="8" fill="#1C1E1B"/>
        <rect x="170" y="90" width="160" height="100" rx="4" fill="#6B7280"/>
        <!-- Potted Plant -->
        <ellipse cx="60" cy="225" rx="16" ry="12" fill="#8C6239"/>
        <path d="M 60 215 Q 40 180 60 160 Q 80 180 60 215" fill="#2D5A27"/>
      </g>
    `
  },
  {
    file: 'bamboo-care-guide.svg',
    title: 'How to Care for Bamboo Products',
    subtitle: 'Washing, Oiling & Patina Care',
    accent: '#8C6239',
    content: `
      <g transform="translate(180, 110)">
        <!-- Bamboo Cutting Board being oiled -->
        <rect x="40" y="70" width="360" height="230" rx="18" fill="url(#bambooGrad1)" stroke="#7A552F" stroke-width="4"/>
        <!-- Oil Droplets & Bottle -->
        <ellipse cx="220" cy="180" rx="35" ry="25" fill="#FCD34D" opacity="0.6"/>
        <path d="M 220 120 Q 240 160 220 170 Q 200 160 220 120" fill="#D97706"/>
      </g>
    `
  }
];

blogImages.forEach(b => {
  const svg = createSvgTemplate(b.title, b.subtitle, b.content, b.accent);
  fs.writeFileSync(path.join(__dirname, '../public/images/blog', b.file), svg, 'utf8');
});

// Hero and Category banners
const heroBanners = [
  {
    file: 'hero-banner.svg',
    title: 'BambooNest Sustainable Living Collection',
    subtitle: 'Pure Moso Bamboo for Home & Workstation',
    accent: '#2D5A27',
    content: `
      <g transform="translate(100, 80)">
        <!-- Large Scenic Bamboo Stems & Modern Desk Elements -->
        <rect x="50" y="80" width="160" height="180" rx="16" fill="url(#bambooGrad1)" stroke="#8C6239" stroke-width="3"/>
        <rect x="250" y="40" width="280" height="220" rx="16" fill="url(#bambooGrad2)" stroke="#8C6239" stroke-width="3"/>
        <circle cx="250" cy="150" r="60" fill="#2D5A27" opacity="0.2"/>
      </g>
    `
  },
  {
    file: 'category-bamboo.svg',
    title: 'Sustainable Bamboo Collection',
    subtitle: 'Eco-Friendly Kitchen, Dining & Bathroom Goods',
    accent: '#2D5A27',
    content: `
      <g transform="translate(180, 100)">
        <rect x="40" y="60" width="360" height="220" rx="20" fill="url(#bambooGrad1)" stroke="#8C6239" stroke-width="4"/>
        <circle cx="220" cy="170" r="50" fill="#2D5A27" opacity="0.25"/>
      </g>
    `
  },
  {
    file: 'category-desk.svg',
    title: 'Sustainable Desk Accessories Collection',
    subtitle: 'Ergonomic Bamboo Risers & Workstation Organizers',
    accent: '#8C6239',
    content: `
      <g transform="translate(180, 100)">
        <rect x="40" y="60" width="360" height="220" rx="20" fill="url(#bambooGrad2)" stroke="#7A552F" stroke-width="4"/>
        <rect x="100" y="130" width="240" height="40" rx="8" fill="#FFFBF5"/>
      </g>
    `
  }
];

heroBanners.forEach(h => {
  const svg = createSvgTemplate(h.title, h.subtitle, h.content, h.accent);
  fs.writeFileSync(path.join(__dirname, '../public/images/hero', h.file), svg, 'utf8');
});

console.log('All 22 SVG image assets generated successfully!');
