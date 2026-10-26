/* eslint-disable */
const fs = require('fs');
const path = require('path');

const existingProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const newProducts = [
  {
    id: "bn-prod-017",
    slug: "bamboo-salad-bowl-servers",
    name: "Large Bamboo Salad Bowl with Matching Servers",
    category: "eco-dining-kitchenware",
    subcategory: "Dinnerware",
    price: 1899,
    shortDescription: "Hand-turned generous salad presentation bowl crafted from solid bamboo rings, with ergonomic tossed salad servers.",
    longDescription: "The Large Bamboo Salad Bowl with Matching Servers brings organic elegance to family dining tables, outdoor barbecues, and dinner parties. Hand-turned from coiled layers of cross-cut Moso bamboo, this generous thirty-centimeter bowl features smooth sloped sides designed for tossing seasonal greens, roasted vegetable medleys, and fresh pasta salads without spilling ingredients onto countertops. The matched serving tongs are ergonomically contoured with thumb indentations for balanced, single-handed lifting. Finished with food-grade pure walnut and mineral oils, the non-porous surface resists vinegar salad dressings and citrus stains while protecting against residual garlic odors. Because bamboo fibers possess natural antibacterial properties and non-reactive characteristics, delicate salad greens stay crisp longer. Moso bamboo regenerates from parent root networks without annual replanting, making this artisan bowl set a long-lasting, carbon-sequestering alternative to petroleum plastic bowls.",
    features: [
      "Generous 30 cm diameter bowl accommodates salads for 6 to 8 diners",
      "Pair of matched 28 cm serving spoons with ergonomic curved handles",
      "Finished with cold-pressed botanical oils safe for direct food contact",
      "Naturally non-porous grain prevents acidic dressing absorption and odor",
      "Lightweight yet structurally sturdy with non-chipping smooth rim"
    ],
    materials: "Hand-Turned Mature Moso Bamboo, Food-Grade Botanical Walnut Oil",
    dimensions: "Bowl: 30 cm Diameter x 11 cm Height; Servers: 28 cm Length",
    useCase: "Tossing garden salads, presenting pasta medleys, fruit displays, and dinner parties",
    colorOptions: ["Natural Amber Bamboo", "Dual-Tone Caramel Rim"],
    tags: ["salad bowl", "dinnerware", "servers", "entertaining", "eco dining & kitchenware"],
    images: [
      {
        "url": "/images/products/bamboo-salad-bowl.svg",
        "alt": "Large Bamboo Salad Bowl with matching tossed salad servers on kitchen counter"
      }
    ],
    inStock: true,
    sku: "BN-DIN-001",
    primaryKeyword: "Bamboo Salad Bowl",
    secondaryKeywords: ["wooden salad bowl with servers", "eco friendly salad bowl set", "large bamboo serving bowl"],
    metaTitle: "Large Bamboo Salad Bowl with Servers",
    metaDescription: "Toss and serve fresh greens with our Large Bamboo Salad Bowl with Servers. 30 cm handcrafted bowl with ergonomic tongs and food-grade botanical seal.",
    relatedSlugs: [
      "bamboo-cutting-board-juice-groove",
      "bamboo-bento-lunch-box",
      "bamboo-cheese-board-knife-set"
    ]
  },
  {
    "id": "bn-prod-018",
    "slug": "bamboo-bento-lunch-box",
    "name": "Multi-Tier Bamboo Bento Lunch Box with Silicone Seal",
    "category": "eco-dining-kitchenware",
    "subcategory": "Kitchen Storage",
    "price": 1499,
    "shortDescription": "Dual-compartment zero-waste meal prep box featuring airtight silicone gaskets, divider inserts, and bamboo lid.",
    "longDescription": "The Multi-Tier Bamboo Bento Lunch Box with Silicone Seal is a sophisticated zero-waste dining solution tailored for office professionals, students, and mindful meal preppers. Built with two stackable food-grade bamboo fiber trays and a solid bamboo top cutting lid, this bento container incorporates leak-resistant food-safe silicone perimeter gaskets and a wide woven elastic security strap. Removable internal bamboo dividers allow you to segregate steamed rice, crisp vegetables, and sliced fruits without mixing distinct food flavors during transit. Designed for daily commuters carrying balanced lunches, the lid reverses into a handy mini prep board for slicing lemons or cheeses at your office desk. Unlike single-use plastic meal prep containers that warp, crack, and leach micro-plastics when contacting warm foods, bamboo offers clean, non-toxic insulation that preserves meal freshness naturally throughout busy days.",
    "features": [
      "Dual stackable tiers provide generous 1200 ml total meal capacity",
      "Leak-resistant food-grade silicone seals prevent sauce leaks in bags",
      "Solid bamboo top lid doubles as an on-the-go mini chopping board",
      "Adjustable internal food divider for customized meal segregation",
      "Heavy-duty woven elastic closure band keeps tiers securely fastened"
    ],
    "materials": "Bamboo Fiber Composite Tiers, Solid Bamboo Top Lid, Food-Safe Silicone Gasket",
    "dimensions": "19 cm (L) x 12 cm (W) x 10.5 cm (H); Capacity: 1200 ml",
    "useCase": "Office lunch breaks, university meals, outdoor picnics, and zero-waste commuting",
    "colorOptions": ["Natural Bamboo Wood with Sand Tiers"],
    "tags": ["bento box", "lunch box", "meal prep", "zero waste lunch", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-bento-box.svg",
        "alt": "Multi-Tier Bamboo Bento Lunch Box with stackable compartments and elastic strap"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-002",
    "primaryKeyword": "Bamboo Bento Lunch Box",
    "secondaryKeywords": ["eco friendly bento box", "wooden lunch box for office", "leak resistant bamboo lunch container"],
    "metaTitle": "Bamboo Bento Lunch Box with Lid",
    "metaDescription": "Carry balanced meals anywhere with the Bamboo Bento Lunch Box. Stackable dual tiers, airtight silicone seals, and solid bamboo cutting lid.",
    "relatedSlugs": [
      "bamboo-cutlery-travel-kit",
      "reusable-bamboo-straws-8-pack",
      "bamboo-salad-bowl-servers"
    ]
  },
  {
    "id": "bn-prod-019",
    "slug": "bamboo-mortar-and-pestle",
    "name": "Solid Bamboo Spice Mortar and Pestle",
    "category": "eco-dining-kitchenware",
    "subcategory": "Cookware",
    "price": 849,
    "shortDescription": "Heavy-duty culinary grinding bowl and pestle milled from dense cross-grain bamboo for spices, herbs, and pastes.",
    "longDescription": "The Solid Bamboo Spice Mortar and Pestle is an indispensable culinary grinding tool engineered to crush peppercorns, grind aromatic curry pastes, and emulsify fresh garlic pesto with authentic rustic flavor. Carved from a dense, compressed block of mature Moso bamboo, this mortar features a gently textured concave interior that holds whole spices in place without allowing seeds to bounce across countertops during pounding. The accompanying pestle offers a thick, palm-conforming grip that maximizes downward kinetic leverage with minimal wrist strain. Ideal for home chefs, Ayurvedic spice blenders, and traditional sauce makers, the natural wood surface will not chip or shed microscopic stone grit into your fresh spice blends like rough granite mortars often do. Conditioned with organic linseed oil, the wood resists absorbing pungent essential oils from minced garlic or ginger. Bamboo rapid growth cycle makes this durable culinary pestle an eco-friendly kitchen staple.",
    "features": [
      "Deep 8 cm bowl cavity prevents spices and pastes from spilling over",
      "Ergonomically contoured pestle provides powerful crushing leverage",
      "Dense grain bamboo will not crack or chip grit into culinary blends",
      "Non-porous surface washes clean easily without lingering odors",
      "Lightweight alternative to cumbersome 5-kilogram granite mortars"
    ],
    "materials": "Dense Compressed Moso Bamboo, Organic Cold-Pressed Linseed Oil",
    "dimensions": "Mortar: 11 cm (Diameter) x 9 cm (Height); Pestle: 14 cm (Length)",
    "useCase": "Grinding whole peppercorns, crushing cumin, garlic paste preparation, and pesto",
    "colorOptions": ["Natural Bamboo"],
    "tags": ["mortar and pestle", "spice grinder", "cookware", "culinary tools", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-mortar-pestle.svg",
        "alt": "Solid Bamboo Spice Mortar and Pestle with fresh herbs and crushed peppercorns"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-003",
    "primaryKeyword": "Bamboo Mortar and Pestle",
    "secondaryKeywords": ["wooden spice grinder bowl", "bamboo garlic crusher pestle", "culinary herb mortar set"],
    "metaTitle": "Bamboo Spice Mortar and Pestle",
    "metaDescription": "Crush spices, garlic, and fresh herbs effortlessly with our Solid Bamboo Mortar and Pestle. Lightweight, non-chipping, and conditioned with organic oil.",
    "relatedSlugs": [
      "bamboo-cutting-board-juice-groove",
      "bamboo-spice-rack-carousel",
      "bamboo-salad-bowl-servers"
    ]
  },
  {
    "id": "bn-prod-020",
    "slug": "bamboo-bread-box-cutting-lid",
    "name": "Roll-Top Bamboo Bread Box with Grooved Cutting Lid",
    "category": "eco-dining-kitchenware",
    "subcategory": "Kitchen Storage",
    "price": 2699,
    "shortDescription": "Countertop bakery storage chest with smooth sliding roll-top door and flat crumb-catching grooved top shelf.",
    "longDescription": "The Roll-Top Bamboo Bread Box with Grooved Cutting Lid provides optimal artisanal bakery storage while organizing kitchen countertops with clean Scandinavian style. Engineered from solid bamboo panels with an ultra-smooth sliding tambour roll-top door, this chest accommodates two full loaves of sourdough bread alongside morning bagels and muffins. The flat upper deck functions as an integrated bread slicing board, precision-milled with crumb-catching linear channels that prevent toasted bread crumbs from scattering onto kitchen tiles. The natural micro-porous structure of bamboo regulates internal humidity passively: it permits sufficient airflow to prevent mold spores while retaining enough moisture to keep artisan bread crusts crisp and interiors pleasantly soft for days longer than plastic bags. Designed for avid home sourdough bakers and busy family kitchens, choosing this bamboo bread bin eliminates petroleum storage plastic and enhances kitchen aesthetic warmth.",
    "features": [
      "Spacious internal chamber holds two large artisan sourdough loaves",
      "Gliding roll-top tambour door opens smoothly without front clearance issues",
      "Flat top shelf doubles as a bread board with routed crumb grooves",
      "Natural humidity-regulating airflow keeps crusts crispy and centers soft",
      "Durable bamboo frame supports jars and spice shakers on top deck"
    ],
    "materials": "100% Solid Moso Bamboo Panels, Food-Grade Protective Botanical Seal",
    "dimensions": "40 cm (W) x 27 cm (D) x 18 cm (H)",
    "useCase": "Storing sourdough bread, sandwich loaves, morning pastries, and kitchen tidy",
    "colorOptions": ["Natural Bamboo Wood"],
    "tags": ["bread box", "bakery storage", "countertop chest", "kitchen storage", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-bread-box.svg",
        "alt": "Roll-Top Bamboo Bread Box with grooved cutting lid and sliding tambour door"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-004",
    "primaryKeyword": "Bamboo Bread Box",
    "secondaryKeywords": ["wooden bread storage bin", "roll top bread box with cutting lid", "countertop sourdough bread keeper"],
    "metaTitle": "Bamboo Bread Box with Cutting Lid",
    "metaDescription": "Keep artisan bread fresh longer with our Roll-Top Bamboo Bread Box with Grooved Cutting Lid. Micro-ventilated storage holds two loaves with crumb grooves.",
    "relatedSlugs": [
      "bamboo-cutting-board-juice-groove",
      "bamboo-tea-box-chest",
      "bamboo-storage-box-with-lid"
    ]
  },
  {
    "id": "bn-prod-021",
    "slug": "bamboo-cheese-board-knife-set",
    "name": "Slide-Out Bamboo Cheese Board with 4 Stainless Knives",
    "category": "eco-dining-kitchenware",
    "subcategory": "Dinnerware",
    "price": 2299,
    "shortDescription": "Entertaining charcuterie board featuring hidden slide-out cutlery drawer containing 4 specialty cheese knives.",
    "longDescription": "The Slide-Out Bamboo Cheese Board with 4 Stainless Knives is an entertainer centerpiece designed for tasting parties, wine evenings, and holiday charcuterie spreads. Precision-crafted from thick Moso bamboo, this board incorporates a seamless perimeter cracker well that holds water biscuits, roasted almonds, and green olives in orderly rows around central cheese wedges. A concealed magnetic slide-out drawer tucked beneath the cutting deck reveals four artisan cheese knives: a flat chisel knife for aged cheddar, a heart knife for parmesan chunks, a serving fork, and a narrow plane for soft brie. Finished with food-grade clear mineral oil, the non-porous bamboo resists cheese oils and acidic wine splashes without warping. Made for weekend dinner hosts and charcuterie enthusiasts, this compact dual-purpose board delivers sophisticated presentation without requiring separate knife storage blocks. Bamboo matures without deforestation, making this entertaining board an ecologically mindful gift choice.",
    "features": [
      "Concealed magnetic slide-out cutlery drawer stores 4 knives securely",
      "Includes 4 stainless steel cheese knives with matching bamboo handles",
      "Perimeter recessed groove keeps crackers, grapes, and nuts neatly arranged",
      "Knife-friendly bamboo surface resists deep scratches and dulling blades",
      "Generous 34 cm square layout serves 6 to 10 party guests with ease"
    ],
    "materials": "Solid Cross-Laminated Bamboo, Food-Grade Stainless Steel Blades, Magnetic Drawer",
    "dimensions": "34 cm (L) x 34 cm (W) x 4 cm (H)",
    "useCase": "Wine and cheese tasting, holiday charcuterie, appetizer serving, and hosting",
    "colorOptions": ["Natural Amber Bamboo"],
    "tags": ["cheese board", "charcuterie board", "cheese knife set", "entertaining", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-cheese-board.svg",
        "alt": "Slide-Out Bamboo Cheese Board with 4 stainless knives in hidden cutlery drawer"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-005",
    "primaryKeyword": "Bamboo Cheese Board",
    "secondaryKeywords": ["charcuterie board with cheese knives", "wooden cheese platter with drawer", "bamboo appetizer board"],
    "metaTitle": "Bamboo Cheese Board with Knife Set",
    "metaDescription": "Host memorable gatherings with our Slide-Out Bamboo Cheese Board with 4 Knives. Features hidden cutlery drawer, perimeter cracker groove, and organic bamboo.",
    "relatedSlugs": [
      "bamboo-serving-tray-with-handles",
      "bamboo-salad-bowl-servers",
      "bamboo-cutting-board-juice-groove"
    ]
  },
  {
    "id": "bn-prod-022",
    "slug": "bamboo-spice-rack-carousel",
    "name": "Rotating Two-Tier Bamboo Spice Carousel",
    "category": "eco-dining-kitchenware",
    "subcategory": "Kitchen Storage",
    "price": 1599,
    "shortDescription": "360-degree rotating lazy susan spice organizer with raised lip shelves accommodating up to 16 standard spice jars.",
    "longDescription": "The Rotating Two-Tier Bamboo Spice Carousel brings effortless access and clean vertical organization to cluttered pantry cabinets and cooking stations. Built with twin circular bamboo tiers connected by a solid turned central pillar, this turntable incorporates stainless steel ball bearings in the base that ensure whisper-quiet, 360-degree spinning action with a gentle finger flick. High raised protective outer rims on both tiers prevent glass spice jars, olive oil bottles, and seasoning grinders from tipping off when the rack is rotated rapidly during high-heat cooking. Designed for enthusiastic home cooks, compact apartment kitchenettes, and dining room condiments, its 26-centimeter footprint doubles usable shelf space by utilizing vertical height. Bamboo is naturally resistant to steam vapor and moisture compared to cheap metal wire racks that develop unsightly rust in warm kitchens. Harvesting mature bamboo stems supports sustainable forestry while offering a warm natural aesthetic.",
    "features": [
      "360-degree smooth rotational turntable mounted on steel ball bearings",
      "Two vertical tiers store up to 16 standard seasoning and spice containers",
      "Raised 2.5 cm security rims prevent glass bottles from sliding off",
      "Water-repellent botanical sealant prevents staining from turmeric or paprika",
      "Compact 26 cm circular base fits inside standard upper kitchen cabinets"
    ],
    "materials": "Solid Moso Bamboo Tiers, Stainless Steel Ball Bearing Turntable Base",
    "dimensions": "26 cm Diameter x 20 cm Height; Clearance between tiers: 14 cm",
    "useCase": "Pantry spice organization, countertop oil carousel, and dining condiment table",
    "colorOptions": ["Natural Bamboo"],
    "tags": ["spice rack", "lazy susan", "turntable", "pantry organizer", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-spice-rack.svg",
        "alt": "Rotating Two-Tier Bamboo Spice Carousel with spice jars on two levels"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-006",
    "primaryKeyword": "Bamboo Spice Carousel",
    "secondaryKeywords": ["rotating wooden spice rack", "lazy susan spice organizer bamboo", "two tier pantry turntable"],
    "metaTitle": "Bamboo Spice Rack Carousel",
    "metaDescription": "Organize seasonings with the Rotating Two-Tier Bamboo Spice Carousel. 360-degree steel bearing turn, raised bottle rims, and natural bamboo construction.",
    "relatedSlugs": [
      "bamboo-storage-box-with-lid",
      "bamboo-mortar-and-pestle",
      "bamboo-bread-box-cutting-lid"
    ]
  },
  {
    "id": "bn-prod-023",
    "slug": "bamboo-tea-box-chest",
    "name": "8-Compartment Bamboo Tea Bag Chest with Clear Glass Lid",
    "category": "eco-dining-kitchenware",
    "subcategory": "Kitchen Storage",
    "price": 1349,
    "shortDescription": "Elegant tea organizer chest featuring eight divided storage slots and shatter-resistant clear glass presentation window.",
    "longDescription": "The 8-Compartment Bamboo Tea Bag Chest with Clear Glass Lid turns tea selection into an inviting, tranquil ritual for tea aficionados and hospitality hosts. Crafted with precision dovetail joints from honey-toned bamboo boards, this organizer features eight equally proportioned compartments that hold over one hundred standing herbal, green, and black tea sachets in orderly rows. The framed transparent glass top lid lets you and your guests browse tea flavors at a glance without lifting the cover, shielding aromatic tea blends from ambient moisture and dust between morning cups. Built for office breakrooms, breakfast buffets, and kitchen tea stations, the brass-finished quadrant hinges hold the lid upright at a convenient ninety-degree angle for easy bag retrieval. Because bamboo naturally resists aroma cross-contamination, floral chamomile and robust Earl Grey retain their distinct essential flavors. Choosing renewable bamboo celebrates mindful craftsmanship while minimizing synthetic plastic kitchen clutter.",
    "features": [
      "Eight divided compartments hold over 100 standing tea bag sachets",
      "Transparent framed glass lid displays tea assortments clearly at a glance",
      "Quadrant brass hinges hold the lid securely open at 90 degrees",
      "Magnetic lid latch keeps contents dust-free and preserves tea freshness",
      "Silk-smooth sanded bamboo finish coordinates beautifully on countertops"
    ],
    "materials": "Mature Moso Bamboo Frame, Tempered Transparent Glass, Brass-Plated Hinges",
    "dimensions": "31 cm (L) x 19 cm (W) x 9.5 cm (H)",
    "useCase": "Organizing tea sachets, sugar packets, craft jewelry, and coffee pods",
    "colorOptions": ["Natural Honey Bamboo"],
    "tags": ["tea box", "tea organizer", "glass lid chest", "kitchen storage", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-tea-box.svg",
        "alt": "8-Compartment Bamboo Tea Bag Chest with clear glass lid showing tea sachets"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-007",
    "primaryKeyword": "Bamboo Tea Chest",
    "secondaryKeywords": ["wooden tea bag organizer box", "bamboo tea storage chest with glass lid", "8 compartment tea box"],
    "metaTitle": "Bamboo Tea Bag Chest with Glass Lid",
    "metaDescription": "Organize herbal teas with our 8-Compartment Bamboo Tea Bag Chest with Clear Glass Lid. Holds 100+ sachets, brass hinges, and airtight magnetic latch.",
    "relatedSlugs": [
      "bamboo-storage-box-with-lid",
      "bamboo-serving-tray-with-handles",
      "bamboo-bread-box-cutting-lid"
    ]
  },
  {
    "id": "bn-prod-024",
    "slug": "bamboo-dinner-plate-set",
    "name": "Handcrafted Bamboo Fiber Dinner Plates (Set of 4)",
    "category": "eco-dining-kitchenware",
    "subcategory": "Dinnerware",
    "price": 1499,
    "shortDescription": "Sleek matte-finish 25cm dinner plates made from compressed organic bamboo fibers, non-toxic and lightweight.",
    "longDescription": "The Handcrafted Bamboo Fiber Dinner Plates Set of 4 combines understated organic modernism with everyday drop-resistant durability for family meal tables and outdoor gatherings. Molded under high pressure from pulverized Moso bamboo fibers blended with natural plant-starch binders, these twenty-five-centimeter plates feature a low-profile matte satin finish and gently curved lip that keeps rich sauces and curries contained. Completely free of melamine, phthalates, and synthetic chemical coatings, these plates remain safe for both piping hot dinners and cool salads. Designed for active households, patio dining, and camping enthusiasts who appreciate lightweight flatware that will not chip like porcelain if accidentally dropped. Their stackable nested profile maximizes kitchen cabinet storage space in compact apartments. Bamboo fibers are renewable agricultural co-products, reducing landfill dependence and supporting a circular dining lifestyle that eliminates petroleum-based plastic party plates for good.",
    "features": [
      "Set of 4 full-sized 25 cm dinner plates suitable for everyday meals",
      "Shatter-resistant composition withstands accidental countertop drops",
      "Free of melamine, petroleum plastics, BPA, and heavy chemical toxins",
      "Stackable nested silhouette saves significant kitchen cabinet space",
      "Matte organic texture provides slip-resistant handling during service"
    ],
    "materials": "Compressed Organic Bamboo Fibers, Plant-Based Starch Binders",
    "dimensions": "25 cm Diameter x 2 cm Height per plate; Weight: 180 g each",
    "useCase": "Daily family dinners, outdoor patio dining, summer barbecues, and camper vans",
    "colorOptions": ["Natural Bamboo Sand", "Muted Sage Olive"],
    "tags": ["dinner plates", "tableware", "bamboo plates", "dinnerware", "eco dining & kitchenware"],
    "images": [
      {
        "url": "/images/products/bamboo-dinner-plates.svg",
        "alt": "Handcrafted Bamboo Fiber Dinner Plates set of 4 stacked neatly on linen napkin"
      }
    ],
    "inStock": true,
    "sku": "BN-DIN-008",
    "primaryKeyword": "Bamboo Dinner Plates",
    "secondaryKeywords": ["shatterproof eco dinnerware", "bamboo fiber plates set of 4", "plastic free dinner plates"],
    "metaTitle": "Bamboo Dinner Plates Set of 4",
    "metaDescription": "Dine sustainably with our Handcrafted Bamboo Fiber Dinner Plates Set of 4. 25 cm drop-resistant plates free of melamine, BPA, and synthetic chemicals.",
    "relatedSlugs": [
      "bamboo-salad-bowl-servers",
      "bamboo-cutlery-travel-kit",
      "bamboo-serving-tray-with-handles"
    ]
  },
  {
    "id": "bn-prod-025",
    "slug": "bamboo-ultrasonic-diffuser",
    "name": "Ultrasonic Bamboo Essential Oil Diffuser (300ml)",
    "category": "bamboo-wellness-decor",
    "subcategory": "Aromatherapy",
    "price": 2799,
    "shortDescription": "Whisper-quiet ultrasonic cool mist aromatherapy diffuser encased in natural carved solid bamboo with warm ambient glow.",
    "longDescription": "The Ultrasonic Bamboo Essential Oil Diffuser unites botanical holistic wellness with warm minimalist craftsmanship, turning bedrooms and living spaces into soothing aromatic sanctuaries. Enclosed inside a cylindrical body turned from solid Moso bamboo, this diffuser houses an ultrasonic transducer vibrating at 2.4 megahertz that aerosolizes water and pure essential oils into microscopic cool mist without heating or degrading fragile therapeutic plant molecules. A 300-milliliter reservoir delivers up to ten hours of continuous whisper-quiet misting, accompanied by an optional warm amber ring of light that fosters calm circadian rhythm regulation before sleep. Designed for home meditation studios, bedtime relaxation, and dry air relief, the unit features smart auto-shutoff sensors that disconnect power immediately when the water level is depleted. Bamboo dielectric properties provide natural thermal insulation, avoiding the hollow plastic vibrations common in conventional consumer diffusers while adding grounding organic warmth to bedside tables.",
    "features": [
      "Solid turned natural Moso bamboo housing with warm amber nightlight",
      "300 ml capacity provides up to 10 hours of continuous cool aromatherapy mist",
      "Ultrasonic 2.4 MHz transducer preserves therapeutic botanical properties",
      "Automatic shutoff protection prevents dry burning when water runs low",
      "Ultra-quiet 20 dB operation ideal for bedside nightstands and nursery rooms"
    ],
    "materials": "Solid Turned Moso Bamboo Shell, BPA-Free Medical Reservoir, Ceramic Ultrasonic Disc",
    "dimensions": "14 cm (Diameter) x 16 cm (Height); Capacity: 300 ml",
    "useCase": "Bedside aromatherapy, meditation room humidification, yoga studios, and stress relief",
    "colorOptions": ["Natural Bamboo with Amber Glow"],
    "tags": ["oil diffuser", "aromatherapy", "wellness", "humidifier", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-diffuser.svg",
        "alt": "Ultrasonic Bamboo Essential Oil Diffuser with subtle cool mist rising"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-001",
    "primaryKeyword": "Bamboo Essential Oil Diffuser",
    "secondaryKeywords": ["ultrasonic wooden aromatherapy diffuser", "bamboo cool mist humidifier", "natural oil diffuser 300ml"],
    "metaTitle": "Bamboo Essential Oil Diffuser 300ml",
    "metaDescription": "Relax with the Ultrasonic Bamboo Essential Oil Diffuser. Hand-carved solid bamboo body, 10-hour cool mist, auto-shutoff, and soothing amber nightlight.",
    "relatedSlugs": [
      "activated-bamboo-charcoal-bags",
      "bamboo-meditation-bench",
      "bamboo-bedside-table-lamp"
    ]
  },
  {
    "id": "bn-prod-026",
    "slug": "bamboo-passive-sound-amplifier",
    "name": "Passive Bamboo Acoustic Smartphone Speaker Dock",
    "category": "bamboo-wellness-decor",
    "subcategory": "Acoustic & Audio",
    "price": 899,
    "shortDescription": "Zero-electricity natural sound amplifier using hollow resonant bamboo acoustics to boost phone speaker volume naturally.",
    "longDescription": "The Passive Bamboo Acoustic Smartphone Speaker Dock harnesses natural sound physics to amplify mobile phone audio without batteries, power cables, or Bluetooth pairing. Cut from a wide-diameter, seasoned bamboo culm, this acoustic amplifier features a precision-routed top docking slot that accommodates modern smartphones in vertical or horizontal orientation. Sound waves exiting your smartphone bottom speaker enter the hollow bamboo resonant cylinder, expanding within the natural acoustic chamber to produce a twelve to fifteen decibel volume boost with rich mid-range warmth and clear vocal resonance. Perfect for bedside morning podcasts, kitchen recipe playback, desk conference calls, and outdoor camping, it functions as both an unpowered speaker and a stable charging stand. Because it requires zero electrical components, it eliminates electronic e-waste completely. Hand-finished with organic botanical oil, the distinctive bamboo growth nodes make every amplifier a one-of-a-kind sculptural desk companion.",
    "features": [
      "Zero electricity required: relies completely on natural physical acoustic resonance",
      "Boosts mobile speaker volume by 12 to 15 dB with warm analog tone",
      "Accommodates smartphones with screens up to 6.7 inches with slim cases",
      "Double functions as an upright phone stand for hands-free video calls",
      "Compact and portable for travel, outdoor patios, picnics, and bedside tables"
    ],
    "materials": "Naturally Hollow Cured Moso Bamboo Cane, Protective Botanical Oil",
    "dimensions": "22 cm (Length) x 8 cm (Diameter); Phone slot width: 8.8 cm x 1.4 cm",
    "useCase": "Listening to acoustic music, listening to podcasts, desk phone stand, and travel audio",
    "colorOptions": ["Natural Bamboo Wood"],
    "tags": ["sound amplifier", "phone speaker", "acoustic dock", "zero electricity", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-sound-amplifier.svg",
        "alt": "Passive Bamboo Acoustic Smartphone Speaker Dock holding smartphone playing music"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-002",
    "primaryKeyword": "Bamboo Sound Amplifier",
    "secondaryKeywords": ["passive wooden phone speaker", "acoustic bamboo smartphone dock", "unpowered wooden sound booster"],
    "metaTitle": "Passive Bamboo Acoustic Speaker Dock",
    "metaDescription": "Amplify mobile audio with our Passive Bamboo Acoustic Smartphone Speaker Dock. Zero electricity, 15 dB natural volume boost, and hands-free phone stand.",
    "relatedSlugs": [
      "bamboo-wireless-charging-pad",
      "bamboo-ultrasonic-diffuser",
      "bamboo-desk-organizer-caddy"
    ]
  },
  {
    "id": "bn-prod-027",
    "slug": "bamboo-meditation-bench",
    "name": "Ergonomic Folding Bamboo Meditation Seiza Bench",
    "category": "bamboo-wellness-decor",
    "subcategory": "Home Accent",
    "price": 2499,
    "shortDescription": "Gently angled kneeling bench that aligns the spine and takes pressure off knees during mindfulness meditation.",
    "longDescription": "The Ergonomic Folding Bamboo Meditation Seiza Bench is a supportive posture aid crafted for mindfulness meditators, yoga practitioners, and contemplation spaces. Hand-shaped from cross-ply structural bamboo, this kneeling bench incorporates a five-degree forward seat incline that naturally tilts the pelvis forward, establishing the spine neutral lordotic curvature without muscle strain. By elevating hips above your feet, the bench transfers body weight away from ankle joints and knee cartilage, completely eliminating the numb legs and tingling pins-and-needles sensation that interrupt deep sitting practices. Heavy-duty magnetic brass folding hinges allow the legs to collapse inward flat against the seat, transforming the bench into a portable three-centimeter profile that slides easily into included cotton tote bags for retreats. Sourced from mature Moso groves on rotational harvests, this solid bench provides reliable forty-kilogram weight support while introducing peaceful botanical energy into mindful practice rooms.",
    "features": [
      "Ergonomic 5-degree forward slope aligns spine and relieves lower back tension",
      "Removes body weight from knee and ankle joints to prevent leg numbness",
      "Folding leg mechanism with hidden magnetic locks collapses flat to 3 cm",
      "Solid cross-laminated bamboo supports meditating bodies up to 140 kg",
      "Silk-touch sanded surface with beveled edges safe for sensitive skin"
    ],
    "materials": "Cross-Ply Moso Bamboo, Solid Brass Folding Hinges, Magnetic Closures",
    "dimensions": "44 cm (L) x 18 cm (W) x 16 cm (Rear Height) / 14 cm (Front Height)",
    "useCase": "Mindfulness meditation, breathwork sessions, tea ceremonies, and kneeling prayer",
    "colorOptions": ["Natural Bamboo Wood"],
    "tags": ["meditation bench", "seiza bench", "yoga accessories", "wellness", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-meditation-bench.svg",
        "alt": "Ergonomic Folding Bamboo Meditation Seiza Bench open on natural jute yoga mat"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-003",
    "primaryKeyword": "Bamboo Meditation Bench",
    "secondaryKeywords": ["folding seiza kneeling bench", "ergonomic wooden meditation stool", "portable bamboo yoga bench"],
    "metaTitle": "Bamboo Meditation Seiza Bench",
    "metaDescription": "Enhance mindfulness with our Ergonomic Folding Bamboo Meditation Bench. 5-degree incline relieves knee and spinal pressure, with magnetic folding legs.",
    "relatedSlugs": [
      "bamboo-ultrasonic-diffuser",
      "activated-bamboo-charcoal-bags",
      "bamboo-slatted-bath-floor-mat"
    ]
  },
  {
    "id": "bn-prod-028",
    "slug": "activated-bamboo-charcoal-bags",
    "name": "Activated Bamboo Charcoal Air Purifying Bags (4-Pack)",
    "category": "bamboo-wellness-decor",
    "subcategory": "Aromatherapy",
    "price": 699,
    "shortDescription": "Chemical-free linen pouches filled with high-surface-area activated bamboo charcoal that absorbs odors and moisture.",
    "longDescription": "The Activated Bamboo Charcoal Air Purifying Bags 4-Pack provides a completely natural, fragrance-free air filtration solution for bedrooms, closets, shoe cabinets, and newly painted rooms. Each breathable natural linen sachet contains two hundred grams of pure Moso bamboo charcoal kilned at high temperatures exceeding eight hundred degrees Celsius. This specialized pyrolysis process activates millions of microscopic pores that capture volatile organic compounds (VOCs), trapped humidity, pet dander odors, and airborne mold spores through natural van der Waals adsorption. Unlike aerosol sprays and synthetic air fresheners that mask smells by releasing toxic synthetic fragrances and phthalates, bamboo charcoal permanently neutralizes odors at a molecular level. Every month, place the pouches outdoors under direct sunlight for two hours to UV-recharge the carbon matrix for up to two years of continuous air purification. Once retired, the charcoal is an excellent organic soil conditioning mulch.",
    "features": [
      "Set of 4 porous natural linen sachets containing 200 g activated charcoal each",
      "High-temperature kilned Moso charcoal with massive micro-porous surface area",
      "Permanently absorbs pet odors, closet dampness, smoke, and chemical VOCs",
      "Solar rechargeable: place in outdoor sunlight once monthly to reset",
      "100% fragrance-free, chemical-free, pet-safe, and biodegradable at end of life"
    ],
    "materials": "100% Activated Moso Bamboo Charcoal, Breathable Organic Linen Fabric, Copper Eyelet",
    "dimensions": "15 cm x 17 cm per bag; Weight: 200 g each (800 g total pack)",
    "useCase": "Closet moisture control, shoe deodorizing, refrigerator odors, and car interior purification",
    "colorOptions": ["Natural Charcoal Gray Linen"],
    "tags": ["charcoal bags", "air purifier", "odor absorber", "natural deodorizer", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-charcoal-bags.svg",
        "alt": "Activated Bamboo Charcoal Air Purifying Bags 4-pack in breathable linen pouches"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-004",
    "primaryKeyword": "Bamboo Charcoal Air Bags",
    "secondaryKeywords": ["activated charcoal odor absorber", "natural air purifying bags 4 pack", "reusable linen charcoal freshener"],
    "metaTitle": "Bamboo Charcoal Air Purifying Bags",
    "metaDescription": "Purify indoor air naturally with our Activated Bamboo Charcoal Bags 4-Pack. Chemical-free odor and moisture absorption in rechargeable linen pouches.",
    "relatedSlugs": [
      "bamboo-ultrasonic-diffuser",
      "bamboo-bathroom-organizer-caddy",
      "bamboo-laundry-basket-hamper"
    ]
  },
  {
    "id": "bn-prod-029",
    "slug": "bamboo-bedside-table-lamp",
    "name": "Minimalist Slatted Bamboo Ambient Bedside Lamp",
    "category": "bamboo-wellness-decor",
    "subcategory": "Home Accent",
    "price": 2199,
    "shortDescription": "Geometric slatted bamboo wood lantern casting calming linear shadow patterns, with warm dimmable LED bulb.",
    "longDescription": "The Minimalist Slatted Bamboo Ambient Bedside Lamp infuses nightstands and living room shelves with gentle, glare-free illumination inspired by Japanese lanterns. Fabricated from precision-spaced steamed bamboo battens surrounding an internal frosted linen diffuser shade, this light fixture projects calming linear shadows and a warm 2700K color spectrum that encourages melatonin production before bedtime. The sturdy square base is milled from solid bamboo with an integrated inline rotary dimming switch, allowing you to transition smoothly from bright evening reading illumination to a soft nightlight glow. Engineered for bedside study corners and modern living rooms, its compact footprint preserves space for books and water carafes. Bamboo requires ninety percent less energy to shape into lighting fixtures than die-cast aluminum or injection-molded acrylic. Hand-oiled to celebrate natural grain nodes, this lamp delivers soothing architectural warmth that transforms your bedroom into an organic retreat.",
    "features": [
      "Slatted exterior battens cast therapeutic geometric shadow patterns",
      "Internal frosted linen cylinder diffuses light softly to eliminate eye glare",
      "Includes energy-efficient dimmable 6W warm LED filament bulb (2700K)",
      "Smooth inline rotary dimmer switch on 1.8 m fabric braided power cable",
      "Solid bamboo pedestal base features anti-scratch felt bottom pads"
    ],
    "materials": "Solid Moso Bamboo Battens, Natural Linen Diffuser, Braided Fabric Cord",
    "dimensions": "15 cm (W) x 15 cm (D) x 28 cm (H)",
    "useCase": "Bedside reading lamp, living room ambient light, meditation altar, and desk lantern",
    "colorOptions": ["Natural Honey Bamboo with Cream Linen"],
    "tags": ["bedside lamp", "table lamp", "bamboo lighting", "home decor", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-table-lamp.svg",
        "alt": "Minimalist Slatted Bamboo Ambient Bedside Lamp glowing with warm golden light"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-005",
    "primaryKeyword": "Bamboo Bedside Lamp",
    "secondaryKeywords": ["slatted wooden table lamp", "minimalist ambient bamboo light", "japanese lantern nightstand lamp"],
    "metaTitle": "Minimalist Bamboo Bedside Table Lamp",
    "metaDescription": "Create soothing evening ambiance with our Minimalist Slatted Bamboo Bedside Lamp. Dimmable warm LED illumination, frosted linen shade, and solid bamboo frame.",
    "relatedSlugs": [
      "bamboo-ultrasonic-diffuser",
      "bamboo-minimalist-wall-clock",
      "bamboo-passive-sound-amplifier"
    ]
  },
  {
    "id": "bn-prod-030",
    "slug": "bamboo-wall-hanging-planter",
    "name": "Dual Hanging Bamboo Planter with Glass Hydro Vases",
    "category": "bamboo-wellness-decor",
    "subcategory": "Home Accent",
    "price": 999,
    "shortDescription": "Wall-mounted botanical propagation station with two removable borosilicate glass test tubes in bamboo frame.",
    "longDescription": "The Dual Hanging Bamboo Planter with Glass Hydro Vases brings refreshing vertical greenery and biophilic living art to blank apartment walls, study nooks, and kitchen backsplashes. Shaped from a polished plank of solid Moso bamboo suspended by natural jute twine, this hanging station cradles two laboratory-grade borosilicate glass cylinders engineered for hydroponic plant rooting. It allows you to propagate pothos cuttings, monsteras, and fragrant fresh herbs in clean water without messy potting soil. Designed for urban apartment dwellers seeking botanical connection in compact footprints, the glass test tubes lift out effortlessly for weekly water refreshes. Watching green root networks expand through clear glass provides a grounding daily micro-mindfulness ritual. The bamboo plaque is treated with moisture-repellent botanical wax to withstand indoor humidity and water droplets without staining. By choosing renewable bamboo wall accents, you introduce living oxygen and calm organic design into everyday indoor routines.",
    "features": [
      "Solid bamboo plaque holds 2 removable clear borosilicate propagation tubes",
      "Ideal for propagating pothos, philodendron, herbs, and cut garden blossoms",
      "Pre-strung with durable natural twisted jute hanging cord and brass nail",
      "Compact vertical profile fits narrow hallway pillars and study desk walls",
      "Treated with water-resistant botanical wax safe against water splashes"
    ],
    "materials": "Solid Moso Bamboo Backer, Borosilicate Annealed Glass Tubes, Natural Jute Twine",
    "dimensions": "Plaque: 20 cm (W) x 14 cm (H) x 3.5 cm (D); Tubes: 15 cm x 2.5 cm Diameter",
    "useCase": "Hydroponic plant propagation, live floral display, bathroom green wall, and office decor",
    "colorOptions": ["Natural Bamboo Wood"],
    "tags": ["wall planter", "propagation station", "hydroponic vases", "home decor", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-wall-planter.svg",
        "alt": "Dual Hanging Bamboo Planter with glass hydro vases holding green vine cuttings"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-006",
    "primaryKeyword": "Bamboo Wall Planter",
    "secondaryKeywords": ["hydroponic propagation station bamboo", "hanging plant test tube vase", "wooden indoor wall planter"],
    "metaTitle": "Hanging Bamboo Wall Planter & Vases",
    "metaDescription": "Grow indoor plants with the Dual Hanging Bamboo Planter with Glass Hydro Vases. Includes 2 borosilicate propagation tubes and natural jute cord.",
    "relatedSlugs": [
      "bamboo-bedside-table-lamp",
      "bamboo-minimalist-wall-clock",
      "bamboo-passive-sound-amplifier"
    ]
  },
  {
    "id": "bn-prod-031",
    "slug": "bamboo-minimalist-wall-clock",
    "name": "Silent Quartz Bamboo Wood Wall Clock (30cm)",
    "category": "bamboo-wellness-decor",
    "subcategory": "Home Accent",
    "price": 1699,
    "shortDescription": "Non-ticking modern wall clock with carved linear hour markers and matte white aluminum hands in solid bamboo.",
    "longDescription": "The Silent Quartz Bamboo Wood Wall Clock (30cm) delivers tranquil, noise-free timekeeping for quiet study rooms, bedrooms, and minimalist home offices. Carved from a continuous disc of solid cross-laminated Moso bamboo, this timepiece showcases natural wood grain striations across its face, accented by subtle debossed linear hour indices that catch directional light gracefully without distracting numbers. Inside, a high-precision continuous-sweep quartz movement operates without any audible ticking sound, ensuring undisturbed focus during deep work sessions and peaceful nighttime sleep. Contrasting matte white aluminum hour and minute hands provide crisp legibility from across the room. Made for Scandinavian interior designs and wellness studios, its smooth beveled rim creates a floating shadow profile against walls. Sourced through cyclical forest thinning that leaves underground bamboo root systems thriving, this wall clock celebrates natural time with authentic sustainable materials.",
    "features": [
      "100% silent continuous-sweep quartz mechanism: zero audible ticking noise",
      "Debossed linear hour markers carved directly into solid bamboo wood face",
      "Contrasting matte white aluminum hands ensure clear distance readability",
      "Generous 30 cm diameter profile serves as an eye-catching wall focal point",
      "Battery-operated with single AA cell providing over 12 months of runtime"
    ],
    "materials": "Solid Cross-Laminated Moso Bamboo Disc, Precision Quartz Movement, Aluminum Hands",
    "dimensions": "30 cm (Diameter) x 2.8 cm (Depth); Weight: 720 g",
    "useCase": "Home office timekeeping, quiet bedroom decor, living room wall accent, and study rooms",
    "colorOptions": ["Natural Bamboo with White Hands"],
    "tags": ["wall clock", "silent clock", "wooden clock", "home decor", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-wall-clock.svg",
        "alt": "Silent Quartz Bamboo Wood Wall Clock with debossed markers on natural grain face"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-007",
    "primaryKeyword": "Bamboo Wall Clock",
    "secondaryKeywords": ["silent wooden wall clock 30cm", "non ticking bamboo clock", "minimalist wooden timekeeper"],
    "metaTitle": "Silent Bamboo Wood Wall Clock 30cm",
    "metaDescription": "Keep time peacefully with our Silent Quartz Bamboo Wood Wall Clock. 30 cm non-ticking continuous sweep movement with carved minimalist hour indices.",
    "relatedSlugs": [
      "bamboo-bedside-table-lamp",
      "bamboo-wall-hanging-planter",
      "bamboo-desk-organizer-caddy"
    ]
  },
  {
    "id": "bn-prod-032",
    "slug": "bamboo-slatted-bath-floor-mat",
    "name": "Water-Resistant Slatted Bamboo Spa Floor Mat",
    "category": "bamboo-wellness-decor",
    "subcategory": "Home Accent",
    "price": 1799,
    "shortDescription": "Raised ventilated bamboo floor duckboard featuring non-skid rubber feet for bathroom, sauna, and patio exits.",
    "longDescription": "The Water-Resistant Slatted Bamboo Spa Floor Mat transforms bathroom exits and outdoor patio showers into an authentic luxury spa sanctuary. Constructed from thick carbonized bamboo slats anchored to heavy-duty crossbeams, this elevated duckboard lifts your feet three centimeters above wet bathroom tiles, allowing water to drain away freely between slats rather than pooling in soggy fabric mats. The slatted surface accelerates ambient air circulation, enabling the mat to dry naturally in minutes without developing mildew, damp mustiness, or mold. Fitted with twelve non-skid silicone base pads, it anchors securely onto wet ceramic tiles without slipping or sliding. Designed for high-humidity bathrooms, poolside patios, hot tub decks, and meditation corners, its warm honey finish stays comfortable underfoot in every season. Sourced from certified mature bamboo stands, this water-tolerant bath mat replaces smelly microfiber rugs with naturally renewable, long-lasting botanical craftsmanship.",
    "features": [
      "Elevated slatted design allows water to drain rapidly for instant air drying",
      "Twelve heavy-duty non-slip silicone pads prevent sliding on wet tile floors",
      "Carbonized bamboo battens resist moisture warping and mildew stains",
      "Supports over 130 kg without flexing or creaking under stepping pressure",
      "Eliminates soggy, bacteria-trapping fabric bath mats from your home"
    ],
    "materials": "Steam-Carbonized Solid Bamboo Slats, Non-Skid Medical-Grade Silicone Pads",
    "dimensions": "60 cm (L) x 40 cm (W) x 3.2 cm (H); Weight: 1.8 kg",
    "useCase": "Bathroom shower exit, sauna floor mat, hot tub deck, outdoor patio, and spa retreat",
    "colorOptions": ["Natural Carbonized Amber"],
    "tags": ["bath mat", "spa floor mat", "duckboard", "bathroom accessories", "bamboo wellness & living decor"],
    "images": [
      {
        "url": "/images/products/bamboo-bath-mat.svg",
        "alt": "Water-Resistant Slatted Bamboo Spa Floor Mat beside a white ceramic shower"
      }
    ],
    "inStock": true,
    "sku": "BN-WEL-008",
    "primaryKeyword": "Bamboo Floor Mat",
    "secondaryKeywords": ["slatted bamboo bath mat", "wooden spa floor duckboard", "water resistant bathroom mat"],
    "metaTitle": "Bamboo Slatted Spa Floor Mat",
    "metaDescription": "Step onto natural luxury with our Water-Resistant Slatted Bamboo Spa Floor Mat. Elevated duckboard drains rapidly with non-slip silicone feet for wet floors.",
    "relatedSlugs": [
      "bamboo-bathroom-organizer-caddy",
      "bamboo-laundry-basket-hamper",
      "bamboo-meditation-bench"
    ]
  }
];

const allProducts = [...existingProducts, ...newProducts];
fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(allProducts, null, 2), 'utf8');
console.log(`Successfully updated products.json! Total products now: ${allProducts.length}`);
