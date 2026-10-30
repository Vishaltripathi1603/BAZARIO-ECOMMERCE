/* eslint-disable */
/**
 * Taxonomy & Product Catalog Generator for Bazario Marketplace
 * Generates:
 * - 26 Top Departments
 * - 180 Sub-Departments
 * - 1,020+ Leaf Categories
 * - 3,000+ Tier B Products + 32 Tier A Flagship Products
 * - Lightweight Search Index
 */

const fs = require('fs');
const path = require('path');

const DEPARTMENTS_DEF = [
  {
    name: "Sustainable Bamboo",
    slug: "sustainable-bamboo",
    isFlagship: true,
    tagline: "100% natural, certified renewable Moso bamboo essentials.",
    iconName: "Leaf",
    themeColor: "#059669",
    bannerImage: "/images/hero/category-bamboo.svg",
    subDepartments: [
      {
        name: "Kitchen & Dining Bamboo",
        slug: "kitchen-dining-bamboo",
        categories: [
          "Bamboo Cutting Boards", "Bamboo Salad Bowls", "Bamboo Cutlery Sets",
          "Bamboo Serving Trays", "Bamboo Spice Racks", "Bamboo Bread Boxes"
        ]
      },
      {
        name: "Zero Waste Bathroom",
        slug: "zero-waste-bathroom",
        categories: [
          "Bamboo Toothbrushes", "Bamboo Bath Mats", "Bamboo Soap Dishes",
          "Bamboo Laundry Baskets", "Bamboo Towel Racks", "Bamboo Cotton Swabs"
        ]
      },
      {
        name: "Living & Ambient Decor",
        slug: "living-ambient-decor",
        categories: [
          "Bamboo Pendant Shades", "Bamboo Table Lamps", "Bamboo Wall Planters",
          "Bamboo Aroma Diffusers", "Bamboo Meditation Benches", "Bamboo Sound Docks"
        ]
      },
      {
        name: "Storage & Home Organization",
        slug: "storage-home-organization",
        categories: [
          "Bamboo Drawer Dividers", "Bamboo Shoe Racks", "Bamboo Storage Crates",
          "Bamboo Tea Chests", "Bamboo Coat Trees", "Bamboo Tiered Shelves"
        ]
      },
      {
        name: "Travel & Reusable Goods",
        slug: "travel-reusable-goods",
        categories: [
          "Bamboo Travel Bento", "Bamboo Reusable Straws", "Bamboo Thermal Flasks",
          "Bamboo Cutlery Pouches", "Bamboo Charcoal Purifiers", "Bamboo Travel Mugs"
        ]
      },
      {
        name: "Eco Gift Sets & Hampers",
        slug: "eco-gift-sets-hampers",
        categories: [
          "Bamboo Kitchen Hampers", "Bamboo Wellness Gift Kits", "Bamboo Executive Gifts",
          "Bamboo Tea Tasting Sets", "Bamboo Zero Waste Bundles", "Bamboo Housewarming Sets"
        ]
      }
    ]
  },
  {
    name: "Sustainable Desk Accessories",
    slug: "sustainable-desk-accessories",
    isFlagship: true,
    tagline: "Ergonomic, renewable wooden accessories for mindful workstations.",
    iconName: "Monitor",
    themeColor: "#0284C7",
    bannerImage: "/images/hero/category-desk.svg",
    subDepartments: [
      {
        name: "Laptop & Monitor Risers",
        slug: "laptop-monitor-risers",
        categories: [
          "Bamboo Laptop Risers", "Dual Monitor Stands", "Adjustable Desktop Risers",
          "Bamboo Tablet Stands", "Ergonomic Monitor Drawers", "Foldable Travel Risers"
        ]
      },
      {
        name: "Desk Organization & Trays",
        slug: "desk-organization-trays",
        categories: [
          "Modular Desk Organizers", "Bamboo Pen Caddies", "Catchall Desk Valets",
          "Bamboo Letter Trays", "Stationery Storage Trays", "Sticky Note Holders"
        ]
      },
      {
        name: "Cable & Power Management",
        slug: "cable-power-management",
        categories: [
          "Bamboo Cable Boxes", "Bamboo Wireless Chargers", "Multi-Device Charging Docks",
          "Desk Cable Clips", "Surge Protector Covers", "Magnetic Cord Organizers"
        ]
      },
      {
        name: "Ergonomic Surface Accessories",
        slug: "ergonomic-surface-accessories",
        categories: [
          "Bamboo Keyboard Rests", "Eco Felt Desk Mats", "Bamboo Mouse Pads",
          "Tilt Keyboard Trays", "Footrest Slanted Risers", "Bamboo Palm Supports"
        ]
      },
      {
        name: "Desk Audio & Acoustics",
        slug: "desk-audio-acoustics",
        categories: [
          "Passive Bamboo Amplifiers", "Headphone Desk Hooks", "Bamboo Speaker Stands",
          "Acoustic Desktop Panels", "Desk Microphone Mounts", "Audio Interface Racks"
        ]
      },
      {
        name: "Workplace Lighting & Ambience",
        slug: "workplace-lighting-ambience",
        categories: [
          "Bamboo LED Desk Lamps", "Monitor Light Bars", "Warm Desk Diffusers",
          "Ambient Desk Orbs", "Bamboo Bookends", "Desktop Plant Caddies"
        ]
      }
    ]
  },
  {
    name: "Electronics",
    slug: "electronics",
    tagline: "Premium audio, wireless gear, streaming devices and smart electronics.",
    iconName: "Headphones",
    themeColor: "#6366F1",
    bannerImage: "/images/hero/category-electronics.svg",
    subDepartments: [
      {
        name: "Audio & Headphones",
        slug: "audio-headphones",
        categories: [
          "True Wireless Earbuds", "Over-Ear Studio Headphones", "Noise Canceling Cans",
          "Neckband Earphones", "Audiophile DAC Amplifiers", "Sports Waterproof Earphones"
        ]
      },
      {
        name: "Speakers & Soundbars",
        slug: "speakers-soundbars",
        categories: [
          "Portable Bluetooth Speakers", "Home Theater Soundbars", "Smart Voice Speakers",
          "Waterproof Party Speakers", "Multiroom Audio Systems", "Subwoofer Enclosures"
        ]
      },
      {
        name: "Wearable Tech",
        slug: "wearable-tech",
        categories: [
          "Fitness Smartwatches", "Activity Tracking Bands", "Heart Rate Monitor Chest Straps",
          "Smart Rings & Sleep Trackers", "Kids GPS Smartwatches", "Hybrid Analog Smartwatches"
        ]
      },
      {
        name: "Home Entertainment",
        slug: "home-entertainment",
        categories: [
          "4K Streaming Media Sticks", "Smart LED Projectors", "Digital Media Converters",
          "Universal Remote Controls", "HDMI Splitters & Matrix", "TV Wall Mounting Brackets"
        ]
      },
      {
        name: "Power & Portable Energy",
        slug: "power-portable-energy",
        categories: [
          "Fast Charging Power Banks", "GaN USB-C Wall Chargers", "Solar Charging Backpacks",
          "Wireless Magnetic Charging Pads", "Universal Travel Adapters", "Rechargeable Lithium Batteries"
        ]
      },
      {
        name: "Smart Security & Sensors",
        slug: "smart-security-sensors",
        categories: [
          "Wireless Video Doorbells", "Indoor Pan Tilt Cameras", "Smart Motion Sensors",
          "Water Leak Detectors", "Window & Door Alarm Sensors", "Smart Keyless Deadbolts"
        ]
      },
      {
        name: "Cables & Connectivity",
        slug: "cables-connectivity",
        categories: [
          "Braided Thunderbolt Cables", "High-Speed HDMI 2.1 Cables", "Optical Audio Toslink Cables",
          "USB-C to DisplayPort Cords", "Heavy-Duty Extension Cords", "Ethernet Cat8 Patch Cables"
        ]
      }
    ]
  },
  {
    name: "Mobiles & Accessories",
    slug: "mobiles-accessories",
    tagline: "Smartphones, protection cases, mounts and essential mobile gadgets.",
    iconName: "Smartphone",
    themeColor: "#EC4899",
    bannerImage: "/images/hero/category-mobiles.svg",
    subDepartments: [
      {
        name: "Phone Cases & Protection",
        slug: "phone-cases-protection",
        categories: [
          "Shockproof Armor Cases", "Slim Liquid Silicone Covers", "Biodegradable Plant Cases",
          "Leather Wallet Folios", "Clear Anti-Yellowing Cases", "Heavy-Duty Bumper Shells"
        ]
      },
      {
        name: "Screen & Lens Protectors",
        slug: "screen-lens-protectors",
        categories: [
          "Tempered Glass Screen Guards", "Matte Anti-Glare Protectors", "Camera Lens Guard Rings",
          "Privacy Filter Screen Shields", "Hydrogel Self-Healing Films", "UV Glue Curved Glass Shields"
        ]
      },
      {
        name: "Mounts, Stands & Grips",
        slug: "mounts-stands-grips",
        categories: [
          "Magnetic Car Vent Mounts", "Desktop Phone Cradle Stands", "Flexible Gooseneck Arm Mounts",
          "Bicycle Handlebar Phone Clamps", "Magnetic Ring Holders", "Foldable Pocket Kickstands"
        ]
      },
      {
        name: "Mobile Photography & Vlogging",
        slug: "mobile-photography-vlogging",
        categories: [
          "Smartphone Gimbal Stabilizers", "Selfie Stick Tripods with Remote", "Clip-On Macro Lens Kits",
          "Mobile LED Ring Lights", "Wireless Lavalier Microphones", "Cold Shoe Smartphone Clamps"
        ]
      },
      {
        name: "Fast Chargers & Car Adapters",
        slug: "fast-chargers-car-adapters",
        categories: [
          "Dual Port Fast Car Chargers", "MagSafe Car Vent Chargers", "Braided Lightning to Type-C Wires",
          "65W Multiport USB-C Hubs", "Retractable Car Charging Cables", "Wireless Car Cup Chargers"
        ]
      },
      {
        name: "Stylus & Gaming Triggers",
        slug: "stylus-gaming-triggers",
        categories: [
          "Universal Capacitive Styluses", "Mobile Gaming Finger Sleeves", "Snap-On Mobile Game Triggers",
          "Active Rechargeable Stylus Pens", "Tablet Palm Rejection Pens", "Ergonomic Mobile Game Grips"
        ]
      }
    ]
  },
  {
    name: "Computers & Laptops",
    slug: "computers-laptops",
    tagline: "High-performance computing, ergonomic peripherals, and storage solutions.",
    iconName: "Laptop",
    themeColor: "#3B82F6",
    bannerImage: "/images/hero/category-computers.svg",
    subDepartments: [
      {
        name: "Keyboards & Typing Gear",
        slug: "keyboards-typing-gear",
        categories: [
          "Hot-Swappable Mechanical Keyboards", "Ergonomic Split Keyboards", "Silent Membrane Office Boards",
          "Wireless Multi-Device Keyboards", "Low-Profile Optical Keyboards", "Numeric Keypads Wireless"
        ]
      },
      {
        name: "Mice & Pointing Devices",
        slug: "mice-pointing-devices",
        categories: [
          "Vertical Ergonomic Mice", "Precision Optical Gaming Mice", "Ergonomic Trackball Mice",
          "Silent Click Office Mice", "Rechargeable Wireless Mice", "Ultra-Light Honeycomb Mice"
        ]
      },
      {
        name: "Laptop Bags & Sleeves",
        slug: "laptop-bags-sleeves",
        categories: [
          "Waterproof Padded Laptop Sleeves", "Executive Leather Briefcases", "Anti-Theft Commuter Backpacks",
          "Shockproof EVA Hard Cases", "Minimalist Felt Laptop Pouches", "Convertible Messenger Bags"
        ]
      },
      {
        name: "External Storage & Drives",
        slug: "external-storage-drives",
        categories: [
          "High-Speed NVMe External SSDs", "Rugged Shockproof Hard Drives", "USB 3.2 Flash Drives Metal",
          "High-Endurance MicroSD Cards", "Multi-Bay RAID Enclosures", "CFexpress Memory Cards"
        ]
      },
      {
        name: "Hubs, Docks & Adapters",
        slug: "hubs-docks-adapters",
        categories: [
          "10-in-1 USB-C Power Delivery Hubs", "Thunderbolt 4 Docking Stations", "Multi-Display Adapter Docks",
          "SD Card Reader Type-C", "Gigabit Ethernet USB Dongles", "VGA and HDMI Travel Docks"
        ]
      },
      {
        name: "Webcams & Conferencing",
        slug: "webcams-conferencing",
        categories: [
          "4K Ultra HD Streaming Webcams", "Webcams with Ring Light Built-In", "Conference Room Speakerphones",
          "USB Podcasting Microphones", "Privacy Shutter Webcams", "Adjustable Desktop Boom Arms"
        ]
      }
    ]
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    tagline: "Culinary cookware, kitchen gadgets, smart appliances and dinnerware.",
    iconName: "Utensils",
    themeColor: "#EA580C",
    bannerImage: "/images/hero/category-kitchen.svg",
    subDepartments: [
      {
        name: "Cookware & Pans",
        slug: "cookware-pans",
        categories: [
          "Tri-Ply Stainless Steel Skillets", "Pre-Seasoned Cast Iron Skillets", "Hard Anodized Nonstick Woks",
          "Enameled Dutch Ovens", "Induction Pressure Cookers", "Ceramic Coating Sauce Pans"
        ]
      },
      {
        name: "Kitchen Knives & Cutlery",
        slug: "kitchen-knives-cutlery",
        categories: [
          "High-Carbon Damascus Chef Knives", "Serrated Bread Knives Stainless", "Japanese Santoku Knives",
          "Stainless Steak Knife Sets", "Kitchen Shears Heavy Duty", "Magnetic Wooden Knife Bars"
        ]
      },
      {
        name: "Coffee & Tea Brewing",
        slug: "coffee-tea-brewing",
        categories: [
          "Stainless French Press Brewers", "Pour-Over Borosilicate Drippers", "Manual Conical Burr Grinders",
          "Cold Brew Glass Pitchers", "Cast Iron Japanese Teapots", "Electric Gooseneck Kettles"
        ]
      },
      {
        name: "Food Storage & Meal Prep",
        slug: "food-storage-meal-prep",
        categories: [
          "Airtight Borosilicate Glass Containers", "Stainless Steel Bento Lunchboxes", "Silicone Reusable Pinch Bags",
          "Vacuum Sealer Roll Machines", "Dry Food Dispenser Canisters", "Produce Keeper Crisp Boxes"
        ]
      },
      {
        name: "Bake Ware & Pastry Tools",
        slug: "bake-ware-pastry-tools",
        categories: [
          "Non-Stick Carbon Steel Muffin Pans", "Adjustable Rolling Pins with Rings", "Silicone Baking Pastry Mats",
          "Springform Cake Tins Round", "Stainless Steel Cooling Racks", "Ceramic Tart and Pie Dishes"
        ]
      },
      {
        name: "Dinnerware & Glassware",
        slug: "dinnerware-glassware",
        categories: [
          "Stoneware Dinner Plate Sets", "Double-Walled Insulated Glass Tumblers", "Handcrafted Ceramic Salad Bowls",
          "Hammered Copper Water Bottles", "Porcelain Cereal Bowl Sets", "Stemless Crystal Wine Goblets"
        ]
      }
    ]
  },
  {
    name: "Furniture & Living",
    slug: "furniture-living",
    tagline: "Ergonomic chairs, desks, storage units and ambient modern living furniture.",
    iconName: "Armchair",
    themeColor: "#854D0E",
    bannerImage: "/images/hero/category-furniture.svg",
    subDepartments: [
      {
        name: "Office Seating & Chairs",
        slug: "office-seating-chairs",
        categories: [
          "Ergonomic Mesh Office Chairs", "High-Back Executive Leather Chairs", "Kneeling Posture Stools",
          "Active Balance Ball Chairs", "Saddle Stool Work Chairs", "Drafting High Stool Chairs"
        ]
      },
      {
        name: "Desks & Workstations",
        slug: "desks-workstations",
        categories: [
          "Dual Motor Electric Standing Desks", "Solid Wood Writing Desks", "Corner L-Shaped Computer Desks",
          "Compact Floating Wall Desks", "Folding Portable Study Tables", "Gaming Desks with Cable Trays"
        ]
      },
      {
        name: "Living Room Storage",
        slug: "living-room-storage",
        categories: [
          "Industrial Open Bookshelves", "Mid-Century Modern TV Consoles", "Floating Wall Display Ledges",
          "Coffee Tables with Storage Lift", "Modular Cube Organizer Units", "Side Accent End Tables"
        ]
      },
      {
        name: "Bedroom Furniture",
        slug: "bedroom-furniture",
        categories: [
          "Solid Wood Nightstand Drawers", "Upholstered Headboard Bedframes", "Multi-Tier Shoe Storage Benches",
          "Foldable Clothes Drying Racks", "Standing Full-Length Dressing Mirrors", "Under-Bed Rolling Storage Drawers"
        ]
      },
      {
        name: "Dining & Bar Furniture",
        slug: "dining-bar-furniture",
        categories: [
          "Extendable Dining Tables", "Mid-Century Dining Chairs Set", "Adjustable Swivel Bar Stools",
          "Compact Breakfast Nook Sets", "Mobile Wooden Kitchen Islands", "Foldaway Dining Tables"
        ]
      },
      {
        name: "Entryway & Hallway",
        slug: "entryway-hallway",
        categories: [
          "Hall Tree Coat & Shoe Benches", "Wall-Mounted Key Organizers", "Narrow Entryway Console Tables",
          "Umbrella Stand Baskets Metal", "Rustic Wooden Wall Hooks", "Shoe Cabinet with Flip Drawers"
        ]
      }
    ]
  },
  {
    name: "Fashion Men",
    slug: "fashion-men",
    tagline: "Comfortable organic apparel, footwear, timepieces and active essentials.",
    iconName: "Shirt",
    themeColor: "#0F766E",
    bannerImage: "/images/hero/category-fashion-men.svg",
    subDepartments: [
      {
        name: "Tops & Shirts",
        slug: "men-tops-shirts",
        categories: [
          "Organic Cotton Crewneck Tees", "Pique Cotton Polo Shirts", "Linen Breathable Button-Downs",
          "Merino Wool Thermal Henleys", "Heavyweight Fleece Pullovers", "Wrinkle-Resistant Oxford Shirts"
        ]
      },
      {
        name: "Pants & Trousers",
        slug: "men-pants-trousers",
        categories: [
          "Stretch Twill Chino Pants", "Water-Repellent Commuter Trousers", "Raw Selvedge Denim Jeans",
          "Relaxed Linen Drawstring Pants", "Tapered Performance Joggers", "Cargo Utility Work Pants"
        ]
      },
      {
        name: "Footwear & Shoes",
        slug: "men-footwear-shoes",
        categories: [
          "Minimalist Leather Sneakers", "Waterproof Trail Running Shoes", "Slip-On Breathable Loafers",
          "Cushioned Recovery Slides", "Classic Goodyear Welt Boots", "Canvas Casual Walking Shoes"
        ]
      },
      {
        name: "Accessories & Wallets",
        slug: "men-accessories-wallets",
        categories: [
          "Slim RFID-Blocking Card Wallets", "Full-Grain Leather Belts", "Polarized Aviator Sunglasses",
          "Stainless Steel Automatic Watches", "Merino Wool Knit Beanies", "Water-Resistant Duffle Bags"
        ]
      },
      {
        name: "Underwear & Loungewear",
        slug: "men-underwear-loungewear",
        categories: [
          "Bamboo Viscose Boxer Briefs", "Modal Soft Sleep Lounge Pants", "Seamless Moisture-Wicking Socks",
          "Organic Cotton Bathrobes", "Compression Base Layer Tights", "Thermal Waffle Knit Pyjamas"
        ]
      },
      {
        name: "Activewear & Gym",
        slug: "men-activewear-gym",
        categories: [
          "Quick-Dry Training Shorts", "Anti-Odor Gym Compression Tees", "Reflective Running Windbreakers",
          "Zip-Up Athletic Track Jackets", "Sweat-Wicking Workout Hoodies", "Weightlifting Fingerless Gloves"
        ]
      }
    ]
  },
  {
    name: "Fashion Women",
    slug: "fashion-women",
    tagline: "Conscious wardrobe essentials, versatile footwear, jewelry and lifestyle bags.",
    iconName: "ShoppingBag",
    themeColor: "#DB2777",
    bannerImage: "/images/hero/category-fashion-women.svg",
    subDepartments: [
      {
        name: "Dresses & Jumpsuits",
        slug: "women-dresses-jumpsuits",
        categories: [
          "Organic Cotton Midi Dresses", "Breathable Linen Wrap Dresses", "Casual Ribbed Tank Dresses",
          "Bohemian Tiered Maxi Gowns", "Wide-Leg Utility Jumpsuits", "Sleeveless Minimalist Shifts"
        ]
      },
      {
        name: "Tops & Blouses",
        slug: "women-tops-blouses",
        categories: [
          "Pima Cotton Essential Tees", "Silk Touch V-Neck Blouses", "Cropped Relaxed Cardigans",
          "Ribbed Knit Turtleneck Sweaters", "Linen Button-Front Tunics", "Square Neck Long-Sleeve Tops"
        ]
      },
      {
        name: "Bottoms & Pants",
        slug: "women-bottoms-pants",
        categories: [
          "High-Rise Wide-Leg Trousers", "Stretch Organic Denim Jeans", "Pleated Ankle-Length Pants",
          "Soft Cotton Lounge Culottes", "Utility Cargo Drawstring Pants", "Flowy Tiered Midi Skirts"
        ]
      },
      {
        name: "Footwear & Sandals",
        slug: "women-footwear-sandals",
        categories: [
          "Orthopedic Arch Support Sandals", "Everyday Low-Top White Sneakers", "Comfort Pointed-Toe Flats",
          "Ankle Strap Block Heels", "Waterproof Slip-On Chelsea Boots", "Cushioned Ergonomic House Slippers"
        ]
      },
      {
        name: "Bags & Totes",
        slug: "women-bags-totes",
        categories: [
          "Organic Canvas Market Totes", "Vegan Leather Crossbody Bags", "Convertible Commuter Backpacks",
          "Minimalist Shoulder Hobo Bags", "Woven Straw Beach Totes", "Compact RFID Travel Purses"
        ]
      },
      {
        name: "Jewelry & Accents",
        slug: "women-jewelry-accents",
        categories: [
          "Recycled Silver Hoop Earrings", "Layered Gold Vermeil Necklaces", "Minimalist Stacking Rings",
          "Freshwater Pearl Drop Pendants", "UV400 Cat-Eye Sunglasses", "Silk Patterned Hair Scarves"
        ]
      }
    ]
  },
  {
    name: "Kids & Baby",
    slug: "kids-baby",
    tagline: "Non-toxic baby care, organic apparel, educational play and nursery gear.",
    iconName: "Baby",
    themeColor: "#F59E0B",
    bannerImage: "/images/hero/category-kids.svg",
    subDepartments: [
      {
        name: "Baby Feeding & Weaning",
        slug: "baby-feeding-weaning",
        categories: [
          "Suction Silicone Baby Bowls", "BPA-Free Silicone Bibs with Catcher", "Ergonomic First Feeding Spoons",
          "Anti-Colic Glass Feeding Bottles", "Stackable Formula Dispensers", "Spill-Proof Sippy Cups"
        ]
      },
      {
        name: "Nursery & Sleep",
        slug: "nursery-sleep",
        categories: [
          "Organic Cotton Swaddle Blankets", "Breathable Crib Mattress Pads", "Adjustable White Noise Machines",
          "Dimmable Nightlight Nursery Lamps", "Soft Muslin Crib Fitted Sheets", "Non-Toxic Wooden Mobile Toys"
        ]
      },
      {
        name: "Baby Apparel & Rompers",
        slug: "baby-apparel-rompers",
        categories: [
          "Bamboo Viscose Zipper Rompers", "Organic Cotton Bodysuit Multi-Packs", "Scratch Mitten Hand Covers",
          "Soft Sole Pre-Walker Booties", "Knitted Baby Cardigan Sweaters", "Sun Protection Bucket Hats"
        ]
      },
      {
        name: "Diapering & Bath Care",
        slug: "diapering-bath-care",
        categories: [
          "Hypoallergenic Water Wipes", "Biodegradable Bamboo Diapers", "Foldable Baby Bath Tubs",
          "Hooded Bamboo Bath Towels", "Waterproof Diaper Changing Mats", "Portable Diaper Caddy Organizers"
        ]
      },
      {
        name: "Montessori & Sensory Toys",
        slug: "montessori-sensory-toys",
        categories: [
          "Wooden Shape Sorter Blocks", "Soft Silicone Teething Rings", "Sensory High-Contrast Board Books",
          "Stacking Rainbow Balance Arches", "Musical Percussion Wooden Rattles", "Tummy Time Inflatable Water Mats"
        ]
      },
      {
        name: "Travel & Stroller Gear",
        slug: "travel-stroller-gear",
        categories: [
          "Lightweight Compact Fold Strollers", "Ergonomic Newborn Baby Carriers", "Insulated Diaper Backpack Bags",
          "Universal Stroller Cup Holders", "Breathable Stroller Sunshades", "Portable Travel High Chairs"
        ]
      }
    ]
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    tagline: "Clean dermatological skincare, organic grooming and wellness cosmetics.",
    iconName: "Sparkles",
    themeColor: "#BE185D",
    bannerImage: "/images/hero/category-beauty.svg",
    subDepartments: [
      {
        name: "Facial Skincare",
        slug: "facial-skincare",
        categories: [
          "Gentle Hydrating Gel Cleansers", "Vitamin C Brightening Serums", "Hyaluronic Acid Plumping Lotions",
          "Broad Spectrum Mineral Sunscreens", "Barrier Repair Ceramide Creams", "Salicylic Acid Clarifying Toners"
        ]
      },
      {
        name: "Haircare & Styling",
        slug: "haircare-styling",
        categories: [
          "Sulfate-Free Botanical Shampoos", "Deep Nourishing Argan Hair Masks", "Scalp Stimulating Rosemary Oils",
          "Wooden Wide-Tooth Detangling Combs", "Ionic Lightweight Hair Dryers", "Heat Protectant Hair Serums"
        ]
      },
      {
        name: "Body Care & Hygiene",
        slug: "body-care-hygiene",
        categories: [
          "Shea Butter Hydrating Body Washes", "Exfoliating Sea Salt Body Scrubs", "Aluminum-Free Natural Deodorants",
          "Dry Body Brushes with Bristles", "Rich Whipped Body Creams", "Handcrafted Cold-Process Soap Bars"
        ]
      },
      {
        name: "Men's Grooming",
        slug: "mens-grooming",
        categories: [
          "Precision Beard Trimmer Kits", "Sandalwood Soothing Beard Oils", "Safety Double-Edge Razors Metal",
          "Pre-Shave Emollient Creams", "Exfoliating Charcoal Face Scrubs", "Matte Texture Clay Hair Pomades"
        ]
      },
      {
        name: "Oral Care Clean",
        slug: "oral-care-clean",
        categories: [
          "Sonic Electric Toothbrushes", "Water Dental Flosser Jet Cleaners", "Fluoride-Free Hydroxyapatite Toothpaste",
          "Biodegradable Dental Floss Picks", "Stainless Steel Tongue Scrapers", "Alcohol-Free Herbal Mouthwashes"
        ]
      },
      {
        name: "Tools & Applicators",
        slug: "tools-applicators",
        categories: [
          "Natural Jade Facial Rollers", "Rose Quartz Gua Sha Sculpting Tools", "Cruelty-Free Makeup Brush Sets",
          "Reusable Bamboo Cotton Rounds", "LED Light Therapy Face Masks", "Thermal Heated Eyelash Curlers"
        ]
      }
    ]
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    tagline: "Vitamins, ergonomic wellness devices, hydration and personal monitoring.",
    iconName: "HeartPulse",
    themeColor: "#10B981",
    bannerImage: "/images/hero/category-health.svg",
    subDepartments: [
      {
        name: "Supplements & Nutrition",
        slug: "supplements-nutrition",
        categories: [
          "Plant-Based Organic Protein Powders", "High-Absorption Magnesium Glycinate", "Omega-3 Algal Oil Softgels",
          "Organic Ashwagandha Root Capsules", "Multivitamin Daily Tablets", "Electrolyte Hydration Drink Mixes"
        ]
      },
      {
        name: "Pain Relief & Recovery",
        slug: "pain-relief-recovery",
        categories: [
          "Deep Tissue Massage Guns", "Microwavable Clay Heating Pads", "Acupressure Mat & Pillow Sets",
          "Gel Compression Ankle Braces", "Ergonomic Lumbar Support Cushions", "Cold Therapy Ice Compression Packs"
        ]
      },
      {
        name: "Health Monitoring Devices",
        slug: "health-monitoring-devices",
        categories: [
          "Digital Upper Arm Blood Pressure Monitors", "Fingertip Pulse Oximeter Trackers", "Contactless Infrared Forehead Thermometers",
          "Smart Bluetooth Body Fat Scales", "Non-Invasive Glucose Loggers", "Portable Ultrasonic Mesh Nebulizers"
        ]
      },
      {
        name: "Sleep & Respiratory Care",
        slug: "sleep-respiratory-care",
        categories: [
          "Cervical Memory Foam Contour Pillows", "Blackout 3D Contoured Eye Masks", "Cool Mist Ultrasonic Humidifiers",
          "HEPA Air Purifiers for Bedrooms", "Weighted Calming Blankets", "Nasal Dilator Sleep Strips"
        ]
      },
      {
        name: "Hydration & Filtration",
        slug: "hydration-filtration",
        categories: [
          "Vacuum Insulated Stainless Steel Bottles", "Alkaline Water Filter Glass Pitchers", "Collapsible Silicone Travel Bottles",
          "Infuser Fruit Pitchers Borosilicate", "Hydration Tracking Gallon Jugs", "UV-C Self-Cleaning Water Bottles"
        ]
      },
      {
        name: "First Aid & Sanitization",
        slug: "first-aid-sanitization",
        categories: [
          "Comprehensive Family First Aid Kits", "Flexible Waterproof Adhesive Bandages", "Antiseptic Tea Tree Spray Solutions",
          "Digital Pill Organizer Reminders", "Emergency Thermal Mylar Blankets", "Medical Grade Nitrile Gloves"
        ]
      }
    ]
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    tagline: "Strength training, yoga gear, recovery equipment and athletic accessories.",
    iconName: "Dumbbell",
    themeColor: "#F97316",
    bannerImage: "/images/hero/category-sports.svg",
    subDepartments: [
      {
        name: "Yoga & Mindful Movement",
        slug: "yoga-mindful-movement",
        categories: [
          "High-Density TPE Eco Yoga Mats", "Cork Yoga Bricks and Blocks", "Cotton Yoga Alignment Straps",
          "Ergonomic Meditation Bolsters", "Microfiber Non-Slip Yoga Towels", "Yoga Wheel Back Stretchers"
        ]
      },
      {
        name: "Home Gym Strength",
        slug: "home-gym-strength",
        categories: [
          "Adjustable Iron Dumbbell Sets", "Heavy-Duty Fabric Resistance Bands", "Cast Iron Kettlebell Weights",
          "Doorway Chin-Up Pull-Up Bars", "Abdominal Roller Exercise Wheels", "Push-Up Stands with Rotating Base"
        ]
      },
      {
        name: "Cardio & Endurance",
        slug: "cardio-endurance",
        categories: [
          "High-Speed Ball Bearing Jump Ropes", "Folding Magnetic Exercise Bikes", "Mini Fitness Aerobic Trampolines",
          "Under-Desk Walking Treadmill Pads", "Aerobic Step Exercise Platforms", "Adjustable Ankle Weight Straps"
        ]
      },
      {
        name: "Hydration & Gym Accessories",
        slug: "hydration-gym-accessories",
        categories: [
          "Stainless Protein Shaker Cups", "Weightlifting Padded Gym Straps", "Chalk Ball Grip Bags",
          "Sports Towels Quick-Dry Microfiber", "Gym Duffle Bags with Shoe Compartment", "Knee Compression Sleeves"
        ]
      },
      {
        name: "Racket Sports & Games",
        slug: "racket-sports-games",
        categories: [
          "Carbon Fiber Badminton Rackets", "Graphite Pickleball Paddle Sets", "Table Tennis Paddle Kits with Balls",
          "Tennis Vibration Dampeners", "Grip Overwrap Replacement Tapes", "Portable Badminton Net Sets"
        ]
      },
      {
        name: "Outdoor Running Gear",
        slug: "outdoor-running-gear",
        categories: [
          "Slim Running Waist Belts", "Hydration Running Vests with Flasks", "LED Armband Safety Running Lights",
          "Anti-Blister Running Socks", "Sweat Headbands Moisture-Wicking", "Sports Sunglasses Polarized"
        ]
      }
    ]
  },
  {
    name: "Outdoors & Travel",
    slug: "outdoors-travel",
    tagline: "Camping gear, rugged backpacks, outdoor illumination and travel tools.",
    iconName: "Compass",
    themeColor: "#047857",
    bannerImage: "/images/hero/category-outdoors.svg",
    subDepartments: [
      {
        name: "Camping & Shelter",
        slug: "camping-shelter",
        categories: [
          "Ultralight 2-Person Backpacking Tents", "Insulated Inflatable Sleeping Pads", "Waterproof Compression Dry Sacks",
          "Parachute Nylon Camping Hammocks", "Compact Down Sleeping Bags", "Trekking Poles Carbon Fiber"
        ]
      },
      {
        name: "Camp Cooking & Water",
        slug: "camp-cooking-water",
        categories: [
          "Ultralight Titanium Camp Cookware", "Backpacking Portable Canister Stoves", "Gravity Water Purifier Straws",
          "Stainless Steel Vacuum Food Jars", "Collapsible Silicone Camp Kettles", "Titanium Spork Utensils"
        ]
      },
      {
        name: "Outdoor Lighting",
        slug: "outdoor-lighting",
        categories: [
          "Rechargeable LED Headlamps", "Solar Collapsible Camping Lanterns", "Tactical High-Lumen Flashlights",
          "Tent Ceiling Fan Lights", "Emergency Crank Solar Radios", "Glow-In-The-Dark Guyline Cords"
        ]
      },
      {
        name: "Travel Luggage & Organizers",
        slug: "travel-luggage-organizers",
        categories: [
          "Compression Packing Cubes Sets", "Hardside Spinner Carry-On Suitcases", "TSA Approved Cable Luggage Locks",
          "Toiletry Hanging Organizer Bags", "RFID Blocking Neck Passport Pouches", "Memory Foam Travel Neck Pillows"
        ]
      },
      {
        name: "Hiking Daypacks & Navigation",
        slug: "hiking-daypacks-navigation",
        categories: [
          "Lightweight 25L Hiking Daypacks", "Waterproof Backpack Rain Covers", "High-Precision Magnetic Compasses",
          "Multi-Functional Pocket Knives", "Emergency Whistle with Thermometer", "Hydration Bladder Water Reservoirs"
        ]
      },
      {
        name: "Outdoor Furniture & Shade",
        slug: "outdoor-furniture-shade",
        categories: [
          "Ultralight Folding Camp Chairs", "Compact Aluminum Camping Tables", "UPF 50+ Portable Sun Shelters",
          "Waterproof Sand-Free Beach Blankets", "Insulated Soft Cooler Tote Bags", "Heavy-Duty Hammock Tree Straps"
        ]
      }
    ]
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    tagline: "Fine writing instruments, notebooks, journals and organizational stationery.",
    iconName: "BookOpen",
    themeColor: "#B45309",
    bannerImage: "/images/hero/category-books.svg",
    subDepartments: [
      {
        name: "Notebooks & Planners",
        slug: "notebooks-planners",
        categories: [
          "Dotted Hardcover Bullet Journals", "Undated Productivity Daily Planners", "Softcover Kraft Pocket Notebooks",
          "Heavyweight Mixed-Media Sketchbooks", "Perforated Legal Writing Pads", "Spiral Bound Meeting Notebooks"
        ]
      },
      {
        name: "Fine Writing Instruments",
        slug: "fine-writing-instruments",
        categories: [
          "Refillable Brass Fountain Pens", "Smooth Micro-Point Gel Pens", "Retractable Rollerball Pens Metal",
          "Calligraphy Chisel Nib Pen Sets", "Architectural Mechanical Drafting Pencils", "Archival Quality Fineliner Drawing Pens"
        ]
      },
      {
        name: "Desk Stationery & Clips",
        slug: "desk-stationery-clips",
        categories: [
          "Solid Brass Binder Clips", "Pastel Aesthetic Highlighters", "Transparent Repositionable Sticky Tabs",
          "Precision Heavy-Duty Paper Trimmers", "Mini Staplers with Rose Gold Staples", "Washi Decorative Tape Multi-Packs"
        ]
      },
      {
        name: "Reading & Book Accessories",
        slug: "reading-book-accessories",
        categories: [
          "Rechargeable Warm Clip-On Book Lights", "Handcrafted Leather Bookmarks", "Ergonomic Bamboo Reading Bookstands",
          "Weighted Page Keepers Metal", "Embossed Personal Book Embossers", "Padded Book Sleeves Pouches"
        ]
      },
      {
        name: "Art Supplies & Lettering",
        slug: "art-supplies-lettering",
        categories: [
          "Artist Grade Watercolor Pans", "Dual Brush Lettering Markers", "Colored Pencils Soft Core",
          "Self-Healing Rotary Cutting Mats", "Synthetic Hair Paintbrush Sets", "Calligraphy Ink Jars Waterproof"
        ]
      },
      {
        name: "Filing & Document Storage",
        slug: "filing-document-storage",
        categories: [
          "Expanding Accordion File Folders", "Kraft Paper Presentation Folders", "Archival Document Storage Boxes",
          "Clear Ring Binder Sheet Protectors", "Desktop Magazine File Holders", "Index Card Cases with Dividers"
        ]
      }
    ]
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    tagline: "Board games, brain puzzles, creative building sets and family entertainment.",
    iconName: "Gamepad2",
    themeColor: "#8B5CF6",
    bannerImage: "/images/hero/category-toys.svg",
    subDepartments: [
      {
        name: "Board Games & Strategy",
        slug: "board-games-strategy",
        categories: [
          "Cooperative Family Board Games", "Classic Wooden Chess and Checkers Sets", "Strategic Resource Trading Board Games",
          "Card Deck Social Party Games", "Tile-Placement Abstract Strategy Games", "Trivia Board Games for Adults"
        ]
      },
      {
        name: "Brain Teasers & Puzzles",
        slug: "brain-teasers-puzzles",
        categories: [
          "1000-Piece Botanical Jigsaw Puzzles", "Cast Metal Mechanical Brain Teasers", "Magnetic Speed Cubes 3x3",
          "Wooden Interlocking Secret Puzzle Boxes", "3D Architectural Wooden Puzzles", "Tangram Pattern Wooden Blocks"
        ]
      },
      {
        name: "Creative Building Sets",
        slug: "creative-building-sets",
        categories: [
          "Magnetic Tile Construction Sets", "Hardwood Building Blocks with Storage Box", "Marble Run Coaster Kits",
          "Miniature DIY Greenhouse Booknooks", "STEM Gear Assembly Engineering Kits", "Structural Architectural Bricks"
        ]
      },
      {
        name: "STEM & Science Kits",
        slug: "stem-science-kits",
        categories: [
          "Compound Optical Student Microscopes", "Solar Powered DIY Robot Building Kits", "Crystal Growing Laboratory Experiments",
          "Planetary Solar System Model Projectors", "Electronic Snap Circuits Exploration Sets", "Weather Station Monitoring Kits"
        ]
      },
      {
        name: "Arts, Crafts & Clay",
        slug: "arts-crafts-clay",
        categories: [
          "Air-Dry Modeling Clay Kits", "Bead Weaving Friendship Loom Kits", "Origami Paper Folding Packs with Guides",
          "Paint By Numbers Canvas Kits", "Needle Felting Wool Starter Bundles", "Eco Crayons Organic Beeswax"
        ]
      },
      {
        name: "Outdoor & Yard Play",
        slug: "outdoor-yard-play",
        categories: [
          "Wooden Lawn Bocce Ball Sets", "Tumble Tower Giant Wooden Block Games", "Aerodynamic Flying Disc Rings",
          "Kite Sets with Long Tails", "Foam Rocket Launcher Stomp Sets", "Canvas Indoor Teepee Play Tents"
        ]
      }
    ]
  },
  {
    name: "Grocery & Gourmet",
    slug: "grocery-gourmet",
    tagline: "Organic pantry staples, artisan honey, single-origin teas and healthy snacks.",
    iconName: "Coffee",
    themeColor: "#15803D",
    bannerImage: "/images/hero/category-grocery.svg",
    subDepartments: [
      {
        name: "Artisan Coffee & Beans",
        slug: "artisan-coffee-beans",
        categories: [
          "Single-Origin Arabica Whole Beans", "Dark Roast Espresso Beans Fairtrade", "Medium Roast Ground Coffee Bags",
          "Cold Brew Coarse Ground Coffee", "Organic Swiss Water Decaf Coffee", "Single-Serve Drip Coffee Bags"
        ]
      },
      {
        name: "Specialty Tea & Tisanes",
        slug: "specialty-tea-tisanes",
        categories: [
          "Darjeeling First Flush Loose Leaf Tea", "Ceremonial Grade Japanese Matcha", "Organic Chamomile Lavender Flowers",
          "Spiced Masala Chai CTC Blend", "Jasmine Dragon Pearl Green Tea", "Hibiscus Berry Herbal Infusion"
        ]
      },
      {
        name: "Nuts, Seeds & Dried Fruits",
        slug: "nuts-seeds-dried-fruits",
        categories: [
          "Raw California Almonds Unsalted", "Whole Kashmiri Walnuts In Shell", "Organic Chia and Flax Seed Mix",
          "Dried Turkish Apricots Sun-Dried", "Roasted Pumpkin Seeds Himalayan Salt", "Artisan Roasted Cashew Nuts"
        ]
      },
      {
        name: "Artisan Oils & Vinegars",
        slug: "artisan-oils-vinegars",
        categories: [
          "Extra Virgin Cold-Pressed Olive Oils", "Aged Balsamic Vinegar of Modena", "Wood Pressed Mustard Cooking Oil",
          "Toasted Sesame Seed Seasoning Oils", "Organic Virgin Coconut Oils", "Raw Apple Cider Vinegar with Mother"
        ]
      },
      {
        name: "Raw Honey & Spreads",
        slug: "raw-honey-spreads",
        categories: [
          "Raw Forest Wildflower Honey Jars", "Creamy 100% Roasted Peanut Butters", "Organic Stone-Ground Almond Butter",
          "Artisan Fruit Preserves Low Sugar", "Pure Dark Cocoa Hazelnut Spreads", "Pure Grade A Maple Syrup"
        ]
      },
      {
        name: "Gourmet Spices & Seasonings",
        slug: "gourmet-spices-seasonings",
        categories: [
          "Tellicherry Black Peppercorns Whole", "Pink Himalayan Mineral Rock Salt", "Single-Origin Lakadong Turmeric Powder",
          "Spanish Saffron Threads Certified", "Organic Green Cardamom Pods", "Smoked Spanish Paprika Powder"
        ]
      }
    ]
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    tagline: "Natural pet nutrition, ergonomic pet beds, grooming tools and interactive toys.",
    iconName: "Dog",
    themeColor: "#CA8A04",
    bannerImage: "/images/hero/category-pets.svg",
    subDepartments: [
      {
        name: "Dog Essentials & Toys",
        slug: "dog-essentials-toys",
        categories: [
          "Durable Natural Rubber Chew Toys", "Orthopedic Memory Foam Dog Beds", "Reflective No-Pull Dog Harnesses",
          "Hands-Free Bungee Running Leashes", "Stainless Steel Non-Tip Dog Bowls", "Biodegradable Dog Poop Bags"
        ]
      },
      {
        name: "Cat Furniture & Play",
        slug: "cat-furniture-play",
        categories: [
          "Sisal Rope Vertical Cat Scratching Posts", "Felt Wool Cat Cave Igloos", "Feather Wand Interactive Teasers",
          "Catnip Infused Soft Kick Toys", "Elevated Ceramic Cat Food Dishes", "Self-Grooming Wall Corner Brushes"
        ]
      },
      {
        name: "Natural Pet Grooming",
        slug: "natural-pet-grooming",
        categories: [
          "Oatmeal Soothing Pet Shampoos", "Self-Cleaning Slicker Deshedding Brushes", "Quiet Cordless Pet Hair Trimmers",
          "Paw Soothing Organic Balm Sticks", "Ear Cleansing Natural Herbal Drops", "Pet Nail Clippers with Safety Guard"
        ]
      },
      {
        name: "Pet Travel & Carriers",
        slug: "pet-travel-carriers",
        categories: [
          "Airline Approved Soft Pet Carriers", "Waterproof Car Backseat Dog Covers", "Collapsible Silicone Travel Bowls",
          "Portable Pet Water Dispenser Bottles", "Car Seatbelt Dog Safety Tether Straps", "Reflective Dog Life Jackets"
        ]
      },
      {
        name: "Healthy Pet Treats",
        slug: "healthy-pet-treats",
        categories: [
          "Freeze-Dried Single-Ingredient Treats", "Dental Chew Bones for Plaque Control", "Grain-Free Crunchy Training Bites",
          "Wild Salmon Oil Skin & Coat Pumps", "Calming Hemp Seed Chews for Dogs", "Pure Meat Puree Cat Lickable Treats"
        ]
      },
      {
        name: "Pet Hygiene & Cleaners",
        slug: "pet-hygiene-cleaners",
        categories: [
          "Bio-Enzymatic Pet Stain & Odor Sprays", "Flushable Natural Tofu Cat Litters", "Stainless Steel Sifting Litter Boxes",
          "Charcoal Deodorizing Litter Mats", "Gentle Cleansing Paw Wipes Pack", "Grooming Hair Remover Roller Tools"
        ]
      }
    ]
  },
  {
    name: "Automotive",
    slug: "automotive",
    tagline: "Car care, interior organizers, dashboard electronics and emergency gear.",
    iconName: "Car",
    themeColor: "#475569",
    bannerImage: "/images/hero/category-automotive.svg",
    subDepartments: [
      {
        name: "Car Electronics & Audio",
        slug: "car-electronics-audio",
        categories: [
          "Dual Dash Cams Front and Rear", "Bluetooth FM Transmitter Adapters", "Wireless Car Changers with Sensor",
          "Digital Tire Pressure Inflator Pumps", "Backup Reverse Cameras with Night Vision", "Heads-Up Speedometer Displays"
        ]
      },
      {
        name: "Interior Organizers & Comfort",
        slug: "interior-organizers-comfort",
        categories: [
          "Trunk Foldable Cargo Organizers", "Backseat Storage Kick Mats", "Memory Foam Car Lumbar Cushions",
          "Center Console Armrest Pads", "Car Cup Holder Expander Adapters", "Between Seat Catchall Drop Caddies"
        ]
      },
      {
        name: "Cleaning & Detailing",
        slug: "cleaning-detailing",
        categories: [
          "Thick Microfiber Car Drying Towels", "Cordless High-Power Car Vacuums", "Clay Bar Detailing Kits with Lube",
          "Ceramic Wax Shield Coating Sprays", "Interior Dashboard Cleaner Sprays", "Tire Shine Foam Applicator Sponges"
        ]
      },
      {
        name: "Sun & Weather Protection",
        slug: "sun-weather-protection",
        categories: [
          "Foldable Windshield Sunshade Umbrellas", "Static Cling Car Window Sun Shades", "All-Weather Rubber Floor Liners",
          "Waterproof Exterior Car Covers", "Steering Wheel Sun Heat Covers", "Side Mirror Snow Frost Covers"
        ]
      },
      {
        name: "Emergency & Safety Roadside",
        slug: "emergency-safety-roadside",
        categories: [
          "Compact Lithium Car Jump Starters", "Emergency Window Glass Breaker Tools", "LED Roadside Hazard Flare Lights",
          "Heavy-Duty Tow Straps with Hooks", "Reflective Breakdown Warning Triangles", "Car Battery Diagnostic Testers"
        ]
      },
      {
        name: "Air Quality & Fragrance",
        slug: "air-quality-fragrance",
        categories: [
          "Solar Powered Car Aromatherapy Diffusers", "Activated Bamboo Charcoal Air Bags", "Essential Oil Vent Clip Diffusers",
          "Ionic Car Air Purifiers USB", "Long-Lasting Solid Gel Air Fresheners", "Odor Eliminator Smoke Foggers"
        ]
      }
    ]
  },
  {
    name: "Tools & Hardware",
    slug: "tools-hardware",
    tagline: "Hand tools, precision toolkits, measuring gear and home workshop hardware.",
    iconName: "Wrench",
    themeColor: "#D97706",
    bannerImage: "/images/hero/category-tools.svg",
    subDepartments: [
      {
        name: "Hand Tools & Sets",
        slug: "hand-tools-sets",
        categories: [
          "Multi-Piece Homeowner Tool Kits", "Magnetic Screwdriver Bit Sets", "Drop Forged Steel Claw Hammers",
          "Adjustable Chrome Wrench Tools", "Locking Plier Set with Wire Cutter", "Hex Key Allen Wrench Metric Sets"
        ]
      },
      {
        name: "Measuring & Layout Tools",
        slug: "measuring-layout-tools",
        categories: [
          "Laser Distance Measurer Tools", "Heavy-Duty Rubber Tape Measures", "Digital Angle Finder Rulers",
          "Torpedo Magnetic Level Tools", "Stainless Steel Caliper Micrometers", "Contour Gauge Profile Duplicators"
        ]
      },
      {
        name: "Tool Storage & Belts",
        slug: "tool-storage-belts",
        categories: [
          "Heavy-Duty Canvas Tool Bags", "Leather Construction Tool Belts", "Magnetic Wall Tool Organizer Bars",
          "Stackable Hardware Part Organizers", "Cantilever Steel Toolboxes", "Rolling Heavy Tool Chest Cabinets"
        ]
      },
      {
        name: "Workshop Safety Gear",
        slug: "workshop-safety-gear",
        categories: [
          "Anti-Fog Safety Goggles Eyewear", "Cut-Resistant Work Gloves Level 5", "Noise Canceling Hearing Protection Earmuffs",
          "Reusable Particulate Dust Respirators", "Gel Knee Pads for Flooring", "Steel Toe Work Safety Boots"
        ]
      },
      {
        name: "Fasteners & Hardware",
        slug: "fasteners-hardware",
        categories: [
          "Assorted Wood Screw Hardware Kits", "Drywall Anchor and Screw Sets", "Stainless Steel Hex Bolt Assortments",
          "Heavy-Duty Cable Zip Ties Pack", "Magnetic Door Catch Stops", "Soft-Close Cabinet Hinge Pairs"
        ]
      },
      {
        name: "Adhesives & Sealants",
        slug: "adhesives-sealants",
        categories: [
          "Heavy-Duty Waterproof Duct Tapes", "Clear Waterproof Silicone Sealants", "High-Strength Epoxy Adhesive Resins",
          "Double-Sided Acrylic Mounting Tapes", "PVA Wood Glue Water Resistant", "Threadlocker High-Strength Compounds"
        ]
      }
    ]
  },
  {
    name: "Garden & Outdoor Decor",
    slug: "garden-outdoor-decor",
    tagline: "Planters, solar illumination, gardening tools and patio greenery.",
    iconName: "Trees",
    themeColor: "#16A34A",
    bannerImage: "/images/hero/category-garden.svg",
    subDepartments: [
      {
        name: "Planters & Pots",
        slug: "planters-pots",
        categories: [
          "Self-Watering Indoor Plant Pots", "Terracotta Clay Herb Planters", "Hanging Macrame Plant Holders",
          "Tiered Vertical Garden Towers", "Fiberstone Minimalist Planter Pots", "Breathable Fabric Grow Bags"
        ]
      },
      {
        name: "Solar Garden Lights",
        slug: "solar-garden-lights",
        categories: [
          "Solar Pathway Stake Lights", "Solar Outdoor Fairy String Lights", "Motion Sensor Solar Wall Floodlights",
          "Hanging Solar Glass Jar Lanterns", "Solar Submersible Fountain Pumps", "Flickering Flame Solar Torches"
        ]
      },
      {
        name: "Hand Gardening Tools",
        slug: "hand-gardening-tools",
        categories: [
          "Stainless Steel Garden Trowels", "Bypass Garden Pruning Shears", "Weed Puller Extractor Tools",
          "Padded Garden Kneeling Mats", "Heavy-Duty Canvas Garden Tool Totes", "Rose Pruning Thorn-Proof Gloves"
        ]
      },
      {
        name: "Watering & Irrigation",
        slug: "watering-irrigation",
        categories: [
          "Expandable Lightweight Garden Hoses", "Long Spout Brass Watering Cans", "Adjustable Hose Spray Nozzle Guns",
          "Micro Drip Irrigation Automatic Kits", "Plant Self-Watering Terracotta Spikes", "Rotating Lawn Sprinkler Heads"
        ]
      },
      {
        name: "Patio Decor & Accents",
        slug: "patio-decor-accents",
        categories: [
          "Tuned Aluminum Wind Chimes", "Cast Iron Decorative Bird Baths", "Weatherproof Outdoor Area Rugs",
          "Garden Stepping Stones Decorative", "Waterproof Patio Furniture Covers", "Tabletop Citronella Fire Bowls"
        ]
      },
      {
        name: "Plant Care & Soil",
        slug: "plant-care-soil",
        categories: [
          "Organic Neem Oil Leaf Sprays", "Compressed Coconut Coir Brick Blocks", "Liquid Kelp Plant Food Tonics",
          "Perlite Horticultural Soil Aerators", "Moisture and pH Soil Meter Probes", "Plant Support Moss Poles Coco"
        ]
      }
    ]
  },
  {
    name: "Office Products",
    slug: "office-products",
    tagline: "Productivity essentials, presentation gear, paper handling and shredders.",
    iconName: "Briefcase",
    themeColor: "#0284C7",
    bannerImage: "/images/hero/category-office.svg",
    subDepartments: [
      {
        name: "Paper Handling & Binding",
        slug: "paper-handling-binding",
        categories: [
          "Thermal Laminator Machine Kits", "Micro-Cut High Security Paper Shredders", "Heavy Duty Desktop Paper Punches",
          "Comb Binding Machines Manual", "Rotary Trimmer Guillotine Cutters", "Electric Automatic Stapler Units"
        ]
      },
      {
        name: "Presentation & Boards",
        slug: "presentation-boards",
        categories: [
          "Magnetic Glass Dry Erase Boards", "Natural Cork Bulletin Notice Boards", "Foldable Presentation Tripod Easels",
          "Low-Odor Dry Erase Markers Pack", "Microfiber Whiteboard Erasers Magnetic", "Dual-Sided Mobile Rolling Whiteboards"
        ]
      },
      {
        name: "Office Electronics",
        slug: "office-electronics",
        categories: [
          "Large Display Desktop Calculators", "Bluetooth Label Maker Printers", "Electronic Time Clock Systems",
          "Document Desktop Camera Scanners", "Digital Voice Recorders Dictaphones", "Banknote Bill Counter Machines"
        ]
      },
      {
        name: "Mailing & Shipping Supplies",
        slug: "mailing-shipping-supplies",
        categories: [
          "Self-Seal Padded Bubble Mailers", "Digital Postal Shipping Scales", "Heavy-Duty Packing Tape Guns",
          "Fragile Handle With Care Stickers", "Direct Thermal Shipping Label Rolls", "Biodegradable Packing Peanut Fillers"
        ]
      },
      {
        name: "Desk Filing & Sorters",
        slug: "desk-filing-sorters",
        categories: [
          "Wire Mesh Multi-Tier Desktop Trays", "Vertical Step File Document Sorters", "Under-Desk Slide Out Drawers",
          "Steel Mobile File Cabinets with Lock", "Hanging File Folder Sets Colored", "Rotating Desktop Pen and Clip Carousels"
        ]
      },
      {
        name: "Tape & Adhesion Supplies",
        slug: "tape-adhesion-supplies",
        categories: [
          "Weighted Desktop Tape Dispensers", "Invisible Matte Mending Tapes Pack", "Removable Mounting Putty Tacks",
          "Permanent Glue Tape Roller Applicators", "Double-Sided Foam Mounting Squares", "Brown Kraft Packaging Paper Rolls"
        ]
      }
    ]
  },
  {
    name: "Music & Audio Gear",
    slug: "music-instruments",
    tagline: "Musical instruments, podcasting gear, studio monitoring and accessories.",
    iconName: "Music",
    themeColor: "#9333EA",
    bannerImage: "/images/hero/category-music.svg",
    subDepartments: [
      {
        name: "String Instruments & Care",
        slug: "string-instruments-care",
        categories: [
          "Acoustic Guitar Starter Bundles", "Concert Sized Ukulele Instruments", "Clip-On Chromatic Guitar Tuners",
          "Padded Acoustic Guitar Gig Bags", "Phosphor Bronze Guitar Strings Sets", "Hardwood Wall Guitar Hanger Mounts"
        ]
      },
      {
        name: "Keyboards & MIDI",
        slug: "keyboards-midi",
        categories: [
          "Compact 25-Key USB MIDI Controllers", "61-Key Portable Electronic Keyboards", "Heavy-Duty Double-X Keyboard Stands",
          "Universal Piano Sustain Pedals", "Padded Keyboard Travel Gig Bags", "Adjustable Padded Keyboard Piano Benches"
        ]
      },
      {
        name: "Studio Recording Gear",
        slug: "studio-recording-gear",
        categories: [
          "Large Diaphragm Condenser Microphones", "2-Channel USB Audio Interfaces", "Studio Monitor Isolation Foam Pads",
          "Dual-Layer Microphone Pop Filters", "Adjustable Heavy Base Mic Boom Stands", "Closed-Back Reference Studio Headphones"
        ]
      },
      {
        name: "Cables & Audio Adapters",
        slug: "music-cables-adapters",
        categories: [
          "Braided XLR Balanced Microphone Cables", "Heavy-Duty 1/4 Inch Instrument Cables", "Gold Plated 3.5mm to 1/4 Adapters",
          "Patch Cables Right Angle Guitar", "Stereo TRS Breakout Cables", "Speakon Speaker Amplifier Cables"
        ]
      },
      {
        name: "Acoustic Treatment & Noise",
        slug: "acoustic-treatment-noise",
        categories: [
          "High-Density Acoustic Foam Wedges", "Bass Trap Corner Foam Absorbers", "Portable Vocal Recording Isolation Shields",
          "Sound Deadening Heavy Door Blankets", "Adhesive Acoustic Fabric Wall Panels", "Microphone Shock Mount Isolators"
        ]
      },
      {
        name: "Drums & Percussion",
        slug: "drums-percussion",
        categories: [
          "Wooden Cajon Hand Drum Box", "Silent Practice Drum Pads Dual-Sided", "Hickory Wooden Drumsticks Multi-Pack",
          "Stainless Steel Egg Shaker Percussion", "Tambourine Percussion Hand Held", "Folding Sheet Music Stand with Bag"
        ]
      }
    ]
  },
  {
    name: "Gaming Gear",
    slug: "gaming-gear",
    tagline: "Mechanical gaming accessories, low-latency audio, controllers and RGB gear.",
    iconName: "Gamepad",
    themeColor: "#7C3AED",
    bannerImage: "/images/hero/category-gaming.svg",
    subDepartments: [
      {
        name: "Gaming Controllers & Gamepads",
        slug: "gaming-controllers-gamepads",
        categories: [
          "Wireless PC and Console Gamepads", "Hall-Effect Sensor Joystick Controllers", "Arcade Fighting Stick Controllers",
          "Back Paddle Controller Attachments", "Dual Controller Charging Stations", "Thumbstick Precision Grips Caps"
        ]
      },
      {
        name: "Gaming Audio & Microphones",
        slug: "gaming-audio-microphones",
        categories: [
          "Surround Sound 7.1 Gaming Headsets", "Cardioid Pattern USB Streaming Mics", "Desktop Headphone Stands with USB Hub",
          "In-Ear Low-Latency Gaming Earbuds", "Microphone Boom Arm Scissor Stands", "Audio Stream Mixer Control Decks"
        ]
      },
      {
        name: "Gaming Keyboards & Mice",
        slug: "gaming-keyboards-mice",
        categories: [
          "Optical Switch Mechanical Gaming Keyboards", "Lightweight Wireless Gaming Mice", "PBT Double-Shot Custom Keycap Sets",
          "Extended Desk Gaming Mouse Pads", "Hot-Swappable Switch Puller Tools", "Coiled Aviator Keyboard USB Cables"
        ]
      },
      {
        name: "Gaming Chairs & Desks",
        slug: "gaming-chairs-desks",
        categories: [
          "Ergonomic High-Back Gaming Chairs", "Carbon Fiber Textured Gaming Desks", "Monitor Heavy-Duty Gas Spring Arms",
          "Footrest Angle Ergonomic Pads", "Cable Management Spine Organizers", "Under-Desk CPU Mount Holders"
        ]
      },
      {
        name: "Console Accessories & Mounts",
        slug: "console-accessories-mounts",
        categories: [
          "Wall Mount Brackets for Consoles", "Cooling Fan Stations with Stand", "Hard Shell Console Travel Cases",
          "Silicone Controller Skin Covers", "Console Dust Cover Sleeves", "Replacement Internal M.2 NVMe SSDs"
        ]
      },
      {
        name: "RGB & Gaming Lighting",
        slug: "rgb-gaming-lighting",
        categories: [
          "Smart LED Hexagonal Wall Panels", "Ambient PC Monitor Backlight Strips", "Corner Floor Standing LED Lamps",
          "Sound Reactive RGB Light Bars", "RGB Headphone Hanger Stands", "Neon LED Sign Wall Art Decor"
        ]
      }
    ]
  },
  {
    name: "Cameras & Photography",
    slug: "cameras-photography",
    tagline: "Optics, tripod stabilization, studio illumination and protective camera cases.",
    iconName: "Camera",
    themeColor: "#4338CA",
    bannerImage: "/images/hero/category-cameras.svg",
    subDepartments: [
      {
        name: "Tripods & Support",
        slug: "tripods-support",
        categories: [
          "Carbon Fiber Travel Tripods with Ballhead", "Flexible Octopus Leg Action Tripods", "Heavy-Duty Fluid Video Head Monopods",
          "Arca-Swiss Quick Release Plates", "Desktop Metal Tabletop Tripods", "Overhead Scissor Arm Camera Mounts"
        ]
      },
      {
        name: "Camera Bags & Straps",
        slug: "camera-bags-straps",
        categories: [
          "Waterproof Canvas Camera Backpacks", "Padded DSLR Camera Sling Bags", "Quick-Release Paracord Neck Straps",
          "Modular Camera Lens Insert Pouches", "Neoprene Wrist Hand Camera Straps", "Shockproof Hard Shell Lens Cases"
        ]
      },
      {
        name: "Lighting & Softboxes",
        slug: "lighting-softboxes",
        categories: [
          "Bi-Color LED Video Light Panels", "Collapsible Hexagon Softbox Diffusers", "Portable Camera Speedlight Flashes",
          "5-in-1 Photography Light Reflectors", "Heavy Duty C-Stand Light Stands", "RGB Pocket Sized Video Lights"
        ]
      },
      {
        name: "Lens Filters & Optics",
        slug: "lens-filters-optics",
        categories: [
          "Circular Polarizer CPL Glass Filters", "Variable Neutral Density ND Filters", "Black Mist Diffusion Filter Rings",
          "Step-Up Filter Ring Adapter Sets", "Magnetic Quick-Swap Filter Systems", "Lens Cleaning Pen & Blower Kits"
        ]
      },
      {
        name: "Power, Batteries & Memory",
        slug: "power-batteries-memory",
        categories: [
          "Dual Slot Camera Battery Chargers", "High-Speed V60 UHS-II SD Cards", "Dummy Battery AC Power Adapters",
          "Weatherproof Memory Card Cases", "D-Tap to USB-C Regulated Power Cables", "Rechargeable Camera Battery Packs"
        ]
      },
      {
        name: "Studio Backgrounds & Backdrops",
        slug: "studio-backgrounds-backdrops",
        categories: [
          "T-Shape Adjustable Backdrop Stands", "Non-Reflective Muslin Green Screens", "Double-Sided Flat Lay Photo Boards",
          "Heavy Duty Backdrop Spring Clamps", "Seamless Paper Studio Rolls White", "Rotating Motorized Product Turntables"
        ]
      }
    ]
  },
  {
    name: "Smart Home & Automation",
    slug: "smart-home",
    tagline: "Connected lighting, smart sockets, thermostats and voice-automated home controllers.",
    iconName: "Wifi",
    themeColor: "#0D9488",
    bannerImage: "/images/hero/category-smarthome.svg",
    subDepartments: [
      {
        name: "Smart Lighting & Bulbs",
        slug: "smart-lighting-bulbs",
        categories: [
          "Wi-Fi Color Changing LED Bulbs", "Smart Recessed Ceiling Downlights", "Smart Outdoor Garden String Lights",
          "Motion Sensor Under-Cabinet Lights", "Smart Touch Light Switch Wall Panels", "Wireless Dimmer Remote Switches"
        ]
      },
      {
        name: "Smart Plugs & Power",
        slug: "smart-plugs-power",
        categories: [
          "Wi-Fi Smart Power Strips with USB", "Energy Monitoring Smart Wall Plugs", "Heavy-Duty Outdoor Smart Outlets",
          "In-Wall Dual Smart Receptacles", "Zigbee Smart Plug Range Extenders", "Micro Smart Relay Switch Modules"
        ]
      },
      {
        name: "Climate & Air Control",
        slug: "climate-air-control",
        categories: [
          "Smart Thermostats with Room Sensors", "Universal Smart AC Remote Hubs", "Wireless Humidity and Temp Monitors",
          "Smart Motorized Curtain Rods", "Automatic Roller Shade Motors", "Smart Carbon Monoxide Detectors"
        ]
      },
      {
        name: "Smart Access & Security",
        slug: "smart-access-security",
        categories: [
          "Fingerprint Keyless Entry Door Locks", "Smart Video Doorbell Cameras", "Solar Powered Outdoor Security Cameras",
          "Smart Garage Door Opener Controls", "Wireless Siren Alarm Systems", "Magnetic Window Entry Sensors"
        ]
      },
      {
        name: "Smart Audio & Hubs",
        slug: "smart-audio-hubs",
        categories: [
          "Touchscreen Smart Display Hubs", "Voice Assistant Smart Speaker Units", "Multi-Protocol Zigbee Matter Gateways",
          "IR Remote Smart Blaster Transmitters", "Smart Wall Mounted Control Pads", "Wireless Smart Button Controllers"
        ]
      },
      {
        name: "Smart Pet & Plant Care",
        slug: "smart-pet-plant-care",
        categories: [
          "Automated Wi-Fi Pet Feeders with Cam", "Smart Pet Water Fountains with Sensor", "Soil Moisture Wireless Smart Probes",
          "Automatic Plant Drip Water Timers", "Smart Self-Cleaning Cat Litter Boxes", "Smart Aquarium Temperature Heaters"
        ]
      }
    ]
  }
];

// Fictional realistic brand names (strictly zero real trademarks)
const BRANDS = [
  "AuraGrid", "Sonarix", "LuminaCraft", "TerraTerra", "KinetiX", "Veloce", "ZenPura",
  "NeoHaven", "Oakhaven", "PristineLife", "ApexFlow", "CirrusGear", "EcoVibe", "NexaWave",
  "BrioCore", "VerdantStone", "FormaStudio", "HeliosEdge", "StratosCraft", "AeroLoom",
  "NordicGrip", "PureLoom", "EquinoxLiving", "VanguardPeak", "SolaraWorks", "TitanCraft"
];

const MATERIALS = [
  "100% Solid Moso Bamboo", "Aerospace-Grade Aluminum Alloy", "Borosilicate Thermal Glass",
  "Food-Grade 304 Stainless Steel", "Certified Organic Cotton Twill", "Water-Repellent Ballistic Nylon",
  "Matte Cast Iron with Enamel", "Full-Grain Vegetable Tanned Leather", "High-Density TPE Polymer",
  "Recycled Solid Brass Hardware", "Natural Cork & Wool Felt", "High-Modulus Carbon Fiber"
];

// 17 distinct opening sentence patterns
const V1_OPENINGS = [
  (b, n, m, c) => `The ${b} edition of ${n} introduces custom ${m.toLowerCase()} construction into modern ${c.toLowerCase()} routines.`,
  (b, n, m, c) => `Tailored by ${b} for demanding daily routines, the ${n} highlights authentic ${m.toLowerCase()} materials.`,
  (b, n, m, c) => `Engineered around ${b} rigorous standards, this ${n} utilizes premium ${m.toLowerCase()} elements.`,
  (b, n, m, c) => `Designed by ${b} for lasting reliability, the ${n} unites refined ${m.toLowerCase()} with clean ergonomics.`,
  (b, n, m, c) => `A versatile release from ${b}, the ${n} is shaped from select ${m.toLowerCase()} for daily utility.`,
  (b, n, m, c) => `Crafted under ${b} exacting oversight, the ${n} brings tactile ${m.toLowerCase()} aesthetics to modern spaces.`,
  (b, n, m, c) => `Built by ${b} to withstand active workflows, this ${n} showcases durable ${m.toLowerCase()} detailing.`,
  (b, n, m, c) => `With an emphasis on uncompromised structural stability, ${b} crafted the ${n} utilizing clean ${m.toLowerCase()}.`,
  (b, n, m, c) => `The ${n} from ${b} provides a refined balance of physical resilience and purposeful ${m.toLowerCase()} styling.`,
  (b, n, m, c) => `Developed by ${b} for conscious users, the ${n} incorporates high-grade ${m.toLowerCase()} hardware.`,
  (b, n, m, c) => `Featuring minimalist industrial styling, the ${b} ${n} utilizes verified ${m.toLowerCase()} components.`,
  (b, n, m, c) => `An indispensable asset for ${c.toLowerCase()} enthusiasts, this ${n} from ${b} is made from ${m.toLowerCase()}.`,
  (b, n, m, c) => `Constructed by ${b} for effortless longevity, the ${n} blends natural ${m.toLowerCase()} with contemporary lines.`,
  (b, n, m, c) => `The physical presence of the ${n} demonstrates ${b} focus on solid ${m.toLowerCase()} craftsmanship.`,
  (b, n, m, c) => `Assembled with care by ${b}, the ${n} offers a resilient ${m.toLowerCase()} framework for diverse needs.`,
  (b, n, m, c) => `This ${n} reflects ${b} modern design philosophy through precision-cut ${m.toLowerCase()} architecture.`,
  (b, n, m, c) => `Engineered for consistent everyday satisfaction, ${b} built the ${n} from resilient ${m.toLowerCase()}.`
];

// 19 distinct physical/specs sentence patterns
const V2_PHYSICAL = [
  (d, w, s) => `Occupying a calibrated footprint of ${d} and weighing ${w}, model ${s} provides reassuring stability.`,
  (d, w, s) => `Measuring approximately ${d} with an active net weight of ${w}, this ${s} unit balances easily.`,
  (d, w, s) => `Its physical geometry spans ${d} at a manageable ${w} mass, giving ${s} solid surface grip.`,
  (d, w, s) => `Built to exact ${d} tolerances with an overall weight of ${w}, variant ${s} resists accidental tipping.`,
  (d, w, s) => `Featuring an exterior profile of ${d} and registering ${w}, item ${s} sits cleanly on any surface.`,
  (d, w, s) => `Shaped to efficient ${d} proportions and scaling at ${w}, unit ${s} integrates smoothly into compact zones.`,
  (d, w, s) => `The external framework measures ${d} while maintaining a calibrated weight of ${w} under ${s}.`,
  (d, w, s) => `Designed around a ${d} profile, model ${s} anchors ${w} of structural integrity without excess bulk.`,
  (d, w, s) => `With overall dimensions of ${d} and a total mass of ${w}, reference ${s} provides dependable balance.`,
  (d, w, s) => `Fabricated to precise ${d} specifications, this ${s} piece feels reassuringly solid at ${w}.`,
  (d, w, s) => `Its tactile chassis encompasses ${d} at an operational weight of ${w}, making ${s} effortless to position.`,
  (d, w, s) => `Engineered within a ${d} physical envelope, variant ${s} registers ${w} for secure everyday placement.`,
  (d, w, s) => `The ergonomic form spans ${d} and balances comfortably at ${w} for reference code ${s}.`,
  (d, w, s) => `Manufactured to exact ${d} dimensions, model ${s} provides a reliable ${w} structural foundation.`,
  (d, w, s) => `Enclosing a footprint of ${d} with an overall net weight of ${w}, unit ${s} remains firmly planted.`,
  (d, w, s) => `Its clean perimeter spans ${d} and weighs a sturdy ${w}, certified under tracking code ${s}.`,
  (d, w, s) => `Calibrated to a compact ${d} volume, this ${s} edition weighs ${w} for portable resilience.`,
  (d, w, s) => `The structural envelope measures ${d} and balances smoothly at ${w} under manufacturing batch ${s}.`,
  (d, w, s) => `Featuring clean ${d} lines and an overall mass of ${w}, item ${s} resists physical deformation.`
];

// 23 distinct use-case / warranty sentence patterns
const V3_USECASE = [
  (p, s) => `Priced at ₹${p}, this batch of ${s} includes comprehensive 1-year craft coverage and prompt pan-India shipping.`,
  (p, s) => `Offered at ₹${p}, serial item ${s} features climate-neutral doorstep dispatch with full transit protection.`,
  (p, s) => `Retailing at ₹${p}, code ${s} comes backed by our verified manufacturer guarantee and easy return options.`,
  (p, s) => `Available for ₹${p}, product ${s} is thoroughly factory inspected and packaged in zero-plastic recyclable materials.`,
  (p, s) => `At ₹${p}, every ${s} unit undergoes dimensional quality audits and carries our direct warranty promise.`,
  (p, s) => `Priced transparently at ₹${p}, item ${s} is eligible for doorstep delivery and hassle-free replacements.`,
  (p, s) => `Listed at ₹${p}, this edition of ${s} includes protective packaging and verified manufacturer tracking.`,
  (p, s) => `Priced fairly at ₹${p}, reference ${s} carries a 365-day craft warranty alongside our customer satisfaction commitment.`,
  (p, s) => `At an accessible ₹${p}, batch ${s} delivers uncompromised utility supported by round-the-clock customer care.`,
  (p, s) => `Available for order at ₹${p}, code ${s} arrives securely packaged in shock-absorbing eco-friendly cartons.`,
  (p, s) => `Retailing for ₹${p}, item ${s} has been tested across thousands of operational cycles for reliable service life.`,
  (p, s) => `Offered at ₹${p}, this ${s} unit incorporates smooth rounded edge chamfers to protect adjacent surfaces.`,
  (p, s) => `Priced at ₹${p}, model ${s} includes comprehensive maintenance instructions to preserve its original finish.`,
  (p, s) => `Available at ₹${p}, serial code ${s} comes with non-marking silicone feet to prevent surface scuffs.`,
  (p, s) => `Delivered at ₹${p}, item ${s} is supported by verified sourcing and our fast pan-India logistics network.`,
  (p, s) => `Offered at ₹${p}, reference unit ${s} features corrosion-resistant hardware and simple wipe-clean care.`,
  (p, s) => `Priced at ₹${p}, this ${s} model undergoes strict pre-shipment inspections to guarantee defect-free delivery.`,
  (p, s) => `Listed at ₹${p}, batch ${s} comes with a 1-year warranty against any manufacturing or material flaws.`,
  (p, s) => `Retailing at ₹${p}, item ${s} ships directly from certified regional hubs with live tracking notifications.`,
  (p, s) => `At ₹${p}, unit ${s} combines sustainable manufacturing principles with zero-plastic packaging standards.`,
  (p, s) => `Available at ₹${p}, model ${s} provides long-term peace of mind with our dedicated after-sales support.`,
  (p, s) => `Priced at ₹${p}, serial ${s} resists daily wear and is backed by a 100% money-back satisfaction policy.`,
  (p, s) => `Offered at ₹${p}, reference ${s} meets international safety standards for non-toxic home utility.`
];

function buildCategoryMeta(catName, deptName, id) {
  const shortName = catName.length > 34 ? catName.slice(0, 31) + "..." : catName;
  const prefix = `Discover ${shortName} on Bazario.`;
  const suffix = ` Free shipping ₹999+. [Ref:${id}]`;
  const mids = [
    "Handcrafted with verified materials, durable ergonomics and 1-year craft warranty.",
    "Premium quality selection featuring reliable daily performance and lasting value.",
    "Tested for enduring everyday utility with transparent manufacturing standards.",
    "Mindfully engineered for modern comfort, verified safety and dependable design.",
    "Built with precision tolerances, authentic craftsmanship and reliable usability.",
    "Designed for functional elegance, ergonomic utility and lasting household durability."
  ];
  let mid = mids[(id.length * 7 + (id.charCodeAt(id.length - 1) || 0)) % mids.length];
  let full = `${prefix} ${mid} ${suffix}`;
  if (full.length > 160) {
    const excess = full.length - 156;
    mid = mid.slice(0, mid.length - excess) + "...";
    full = `${prefix} ${mid} ${suffix}`;
  } else if (full.length < 140) {
    full = `${prefix} Authentic quality. ${mid} ${suffix}`;
    if (full.length > 160) {
      full = full.slice(0, 156) + "...";
    }
  }
  return full;
}

function buildProductMeta(prodName, brand, id, price) {
  const shortName = prodName.length > 34 ? prodName.slice(0, 31) + "..." : prodName;
  const priceSnippet = price ? ` Price: ₹${price}.` : "";
  const prefix = `Discover ${shortName} on Bazario.${priceSnippet}`;
  const suffix = ` Free shipping ₹999+. [ID:${id}]`;
  const mids = [
    "Handcrafted with verified materials, durable ergonomics and 1-year craft warranty.",
    "Premium quality selection featuring reliable daily performance and lasting value.",
    "Tested for enduring everyday utility with transparent manufacturing standards.",
    "Mindfully engineered for modern comfort, verified safety and dependable design.",
    "Built with precision tolerances, authentic craftsmanship and reliable usability.",
    "Designed for functional elegance, ergonomic utility and lasting household durability."
  ];
  let mid = mids[(id.length * 7 + (id.charCodeAt(id.length - 1) || 0)) % mids.length];
  let full = `${prefix} ${mid} ${suffix}`;
  if (full.length > 160) {
    const excess = full.length - 156;
    mid = mid.slice(0, mid.length - excess) + "...";
    full = `${prefix} ${mid} ${suffix}`;
  } else if (full.length < 140) {
    full = `${prefix} Authentic quality. ${mid} ${suffix}`;
    if (full.length > 160) {
      full = full.slice(0, 156) + "...";
    }
  }
  return full;
}

console.log("Starting Bazario taxonomy and catalog generator...");

const departments = [];
const subDepartments = [];
const leafCategories = [];
const products = [];
const searchIndex = [];

let catCounter = 0;
let prodCounter = 0;

// Read existing Tier A flagship products if available to keep full rich editorial
let flagshipTierAProducts = [];
try {
  const existingPath = path.join(__dirname, '../data/products.json');
  if (fs.existsSync(existingPath)) {
    const raw = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    flagshipTierAProducts = raw.slice(0, 32); // original 32 rich flagship items
  }
} catch (e) {
  console.log("No existing products found, generating fresh flagship items.");
}

DEPARTMENTS_DEF.forEach((deptDef, deptIdx) => {
  const deptId = `dept-${deptIdx + 1}`;
  const subDeptSlugs = [];

  deptDef.subDepartments.forEach((subDef, subIdx) => {
    const subDeptId = `subdept-${deptIdx + 1}-${subIdx + 1}`;
    subDeptSlugs.push(subDef.slug);
    const categoriesList = [...subDef.categories];
    if (categoriesList.length < 7) {
      const extraCategories = [
        `${subDef.name} Care & Maintenance Kits`,
        `${subDef.name} Travel & Protective Sleeves`,
        `${subDef.name} Multi-Slot Organizers`,
        `${subDef.name} Premium Replacement Accessories`,
        `${subDef.name} Cleaning & Polishing Supplies`,
        `${subDef.name} Compact Minimalist Editions`,
      ];
      categoriesList.push(extraCategories[(deptIdx * 7 + subIdx) % extraCategories.length]);
    }
    const leafSlugs = [];

    categoriesList.forEach((catName, catIdx) => {
      catCounter++;
      const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      leafSlugs.push(catSlug);

      const fullPath = `${deptDef.slug}/${subDef.slug}/${catSlug}`;
      const primaryKw = `${catName} India`;
      const secondaryKws = [
        `best ${catName.toLowerCase()}`,
        `buy ${catName.toLowerCase()} online`,
        `durable ${catName.toLowerCase()}`,
        `ergonomic ${catName.toLowerCase()}`
      ];

      const introWords = [
        `Discover our premium selection of ${catName.toLowerCase()} designed to elevate your daily routine with uncompromising craftsmanship, functional durability, and sleek modern aesthetics.`,
        `Each piece in our ${deptDef.name.toLowerCase()} catalog is engineered using responsibly selected materials, providing long-lasting reliability whether utilized in home environments, modern office workspaces, or active outdoor settings.`,
        `Browse verified user dimensions, finish variants, and detailed specifications across our curated ${catName.toLowerCase()} range, all backed by comprehensive manufacturer warranties and prompt pan-India delivery.`
      ].join(' ');

      const categoryObj = {
        id: `cat-${catCounter}`,
        slug: catSlug,
        name: catName,
        departmentSlug: deptDef.slug,
        departmentName: deptDef.name,
        subDepartmentSlug: subDef.slug,
        subDepartmentName: subDef.name,
        parentPath: [deptDef.slug, subDef.slug],
        fullPath: fullPath,
        level: 3,
        breadcrumb: [
          { name: "Home", url: "/" },
          { name: deptDef.name, url: `/d/${deptDef.slug}` },
          { name: subDef.name, url: `/c/${deptDef.slug}/${subDef.slug}` },
          { name: catName, url: `/c/${fullPath}` }
        ],
        primaryKeyword: primaryKw,
        secondaryKeywords: secondaryKws,
        introText: introWords,
        faqs: [
          {
            question: `What materials are used in Bazario's ${catName.toLowerCase()}?`,
            answer: `Our ${catName.toLowerCase()} collection utilizes high-grade materials such as solid bamboo, aerospace aluminum, stainless steel, or durable organic textiles depending on specific functional requirements.`
          },
          {
            question: `How are ${catName.toLowerCase()} shipped across India?`,
            answer: `All orders over ₹999 qualify for free climate-neutral pan-India delivery, securely packaged in plastic-free recyclable cartons with doorstep tracking.`
          },
          {
            question: `What warranty coverage applies to ${catName.toLowerCase()}?`,
            answer: `Every product in this category includes a 1-year comprehensive craft warranty against manufacturing defects and material imperfections.`
          }
        ],
        metaTitle: `${catName} | Bazario`.slice(0, 60),
        metaDescription: buildCategoryMeta(catName, deptDef.name, `c-${catCounter}`),
        image: `/images/categories/${catSlug}.svg`,
        productCount: 3,
        isIndexable: true
      };

      leafCategories.push(categoryObj);

      // Generate 3 unique Tier B products per leaf category
      for (let pIdx = 1; pIdx <= 3; pIdx++) {
        prodCounter++;
        const pBrand = BRANDS[(catCounter * 3 + pIdx * 7) % BRANDS.length];
        const pMaterial = MATERIALS[(catCounter * 5 + pIdx * 11) % MATERIALS.length];
        const price = Math.round((499 + ((catCounter * 37 + pIdx * 193) % 4500)) / 50) * 50 - 1;
        const isDeal = pIdx === 1 && (catCounter % 3 === 0);
        const originalPrice = isDeal ? Math.round(price * 1.25) : undefined;
        const discountPct = isDeal ? 20 : undefined;

        const prodSlug = `${catSlug}-${pBrand.toLowerCase()}-v${pIdx}`;
        const prodName = `${pBrand} ${catName} Pro-${pIdx * 10}`;
        const pSku = `BZ-${deptDef.slug.slice(0, 3).toUpperCase()}-${catCounter}-${pIdx}`;
        const pDim = `${20 + (catCounter % 30)}cm x ${12 + (pIdx % 15)}cm x ${4 + (catCounter % 10)}cm`;
        const pWeight = `${250 + (catCounter % 800)}g`;

        // Generate prime-period sentences ensuring zero identical 3-sentence combinations across 3,300+ items
        const s1 = V1_OPENINGS[prodCounter % V1_OPENINGS.length](pBrand, prodName, pMaterial, catName);
        const s2 = V2_PHYSICAL[prodCounter % V2_PHYSICAL.length](pDim, pWeight, pSku);
        const s3 = V3_USECASE[prodCounter % V3_USECASE.length](price, pSku);

        const longDesc = `${s1} ${s2} ${s3}`;
        const pMeta = buildProductMeta(prodName, pBrand, `p-${prodCounter}`, price);

        const productObj = {
          id: `prod-${prodCounter}`,
          slug: prodSlug,
          name: prodName,
          tier: "standard",
          departmentSlug: deptDef.slug,
          subDepartmentSlug: subDef.slug,
          leafCategorySlug: catSlug,
          category: catSlug,
          subcategory: catName,
          brand: pBrand,
          price: price,
          originalPrice: originalPrice,
          deal: isDeal ? { badge: "Limited Deal", discountPercent: discountPct, badgeColor: "#EA580C" } : undefined,
          shortDescription: `Premium ${catName.toLowerCase()} handcrafted from ${pMaterial.toLowerCase()} with precision ergonomics and durable finish.`,
          longDescription: longDesc,
          features: [
            `Constructed from premium ${pMaterial}`,
            `Precision CNC-machined joinery for enduring stability`,
            `Non-slip silicone contact pads protect surfaces`,
            `Ergonomically contoured for comfortable everyday utility`,
            `1-year manufacturer craft warranty and full replacement guarantee`
          ],
          materials: pMaterial,
          dimensions: pDim,
          useCase: `Optimized for everyday home, office, and lifestyle functionality within the ${catName.toLowerCase()} collection.`,
          specs: {
            "Material": pMaterial,
            "Brand": pBrand,
            "SKU": pSku,
            "Finish": "Natural Satin Protective Sealant",
            "Country of Origin": "India",
            "Weight": pWeight
          },
          colorOptions: ["Matte Charcoal", "Natural Satin", "Classic Amber", "Slate Grey"],
          tags: [deptDef.slug, subDef.slug, catSlug, pBrand.toLowerCase(), "ergonomic", "durable"],
          images: [
            {
              url: `/images/categories/${catSlug}.svg`,
              alt: `${prodName} in ${pMaterial}`
            }
          ],
          inStock: true,
          sku: pSku,
          primaryKeyword: `${prodName} India`,
          secondaryKeywords: [
            `buy ${prodName.toLowerCase()}`,
            `${pBrand.toLowerCase()} ${catName.toLowerCase()}`,
            `${catName.toLowerCase()} price inr`
          ],
          metaTitle: `${prodName} | Bazario`.slice(0, 60),
          metaDescription: pMeta,
          relatedSlugs: []
        };

        products.push(productObj);

        // Add to lightweight search manifest
        searchIndex.push({
          slug: prodSlug,
          name: prodName,
          cat: catName,
          dept: deptDef.name,
          price: price,
          img: `/images/categories/${catSlug}.svg`
        });
      }
    });

    const subDeptObj = {
      id: subDeptId,
      slug: subDef.slug,
      name: subDef.name,
      departmentSlug: deptDef.slug,
      departmentName: deptDef.name,
      leafCategories: leafSlugs,
      productCount: leafSlugs.length * 3,
      metaTitle: `${subDef.name} | Bazario`.slice(0, 60),
      metaDescription: `Explore curated ${subDef.name.toLowerCase()} in ${deptDef.name.toLowerCase()} on Bazario. Browse verified leaf categories and free delivery over ₹999.`.slice(0, 160)
    };

    subDepartments.push(subDeptObj);
  });

  const deptObj = {
    id: deptId,
    slug: deptDef.slug,
    name: deptDef.name,
    tagline: deptDef.tagline,
    iconName: deptDef.iconName,
    themeColor: deptDef.themeColor,
    bannerImage: deptDef.bannerImage,
    isFlagship: deptDef.isFlagship || false,
    subDepartments: subDeptSlugs,
    featuredLeafCategories: subDeptSlugs.slice(0, 4),
    productCount: subDeptSlugs.length * 6 * 3,
    metaTitle: `${deptDef.name} Store | Bazario`.slice(0, 60),
    metaDescription: `Shop ${deptDef.name} on Bazario. Explore top sub-departments, verified products, and fast pan-India delivery with transparent customer support.`.slice(0, 160)
  };

  departments.push(deptObj);
});

// Re-integrate original Tier A flagship products with flagship department metadata
if (flagshipTierAProducts.length > 0) {
  flagshipTierAProducts.forEach((fProd, idx) => {
    fProd.tier = "flagship";
    fProd.departmentSlug = idx < 16 ? "sustainable-bamboo" : "sustainable-desk-accessories";
    fProd.subDepartmentSlug = idx < 16 ? "kitchen-dining-bamboo" : "laptop-monitor-risers";
    fProd.leafCategorySlug = idx < 16 ? "bamboo-cutting-boards" : "bamboo-laptop-risers";
    fProd.brand = "Bazario EcoCraft";
    fProd.metaTitle = `${fProd.name} | Bazario`.slice(0, 60);
    // prepend or merge into products list
    products.unshift(fProd);
  });
}

console.log(`Generated Statistics:`);
console.log(`- Departments: ${departments.length}`);
console.log(`- Sub-Departments: ${subDepartments.length}`);
console.log(`- Leaf Categories: ${leafCategories.length}`);
console.log(`- Total Products: ${products.length} (including ${flagshipTierAProducts.length} Tier A Flagship products)`);
console.log(`- Search Index Manifest Items: ${searchIndex.length}`);

// Write JSON files to /data
fs.writeFileSync(path.join(__dirname, '../data/departments.json'), JSON.stringify(departments, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/subdepartments.json'), JSON.stringify(subDepartments, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/categories.json'), JSON.stringify(leafCategories, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/search-index.json'), JSON.stringify(searchIndex.slice(0, 1500), null, 2), 'utf8');

console.log("Taxonomy and catalog generation complete! Files written to /data.");
