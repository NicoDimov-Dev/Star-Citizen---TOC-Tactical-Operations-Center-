const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = path.join(__dirname, 'contracts');
const OUTPUT_DIR = path.join(__dirname, 'src');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'contracts_data.js');

// Create src directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

console.log(`Scanning contracts directory: ${CONTRACTS_DIR}...`);

if (!fs.existsSync(CONTRACTS_DIR)) {
  console.error(`Error: Contracts directory not found at ${CONTRACTS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(CONTRACTS_DIR).filter(file => file.endsWith('.json'));
console.log(`Found ${files.length} contract files.`);

// Faction/Giver Normalizer
function normalizeGiver(giver) {
  let g = (giver || '').trim();
  if (g.includes('SalvageContractorFrom') || g.includes('Adagio')) {
    return 'Adagio Holdings';
  }
  if (g.toLowerCase().includes('citizens for prosperity')) {
    return 'Citizens for Prosperity';
  }
  if (g.toLowerCase().includes('covalex')) {
    return 'Covalex';
  }
  if (g.toLowerCase().includes('bounty hunters guild')) {
    return 'Bounty Hunters Guild';
  }
  if (!g || g === 'Unknown' || g.toLowerCase().includes('unknown')) {
    return 'Local Security / Private Broker';
  }
  return g;
}

// Helper to determine Star System based on locations and description
function getStarSystem(locs, title, desc) {
  const text = (title + " " + desc + " " + locs.join(" ")).toLowerCase();
  if (text.includes("pyro") || text.includes("ruin station") || text.includes("sunset mesa")) {
    return "Pyro";
  }
  if (text.includes("nyx") || text.includes("delamar") || text.includes("levski")) {
    return "Nyx";
  }
  return "Stanton";
}

// -----------------------------------------------------------------------------
// DEFINITION OF CAREER TYPOLOGIES (MISSION TYPES)
// This implements a clean taxonomy free of player instance details, template tags, or specific gang member names.
// -----------------------------------------------------------------------------
const CAREER_TYPOLOGIES = [
  // Bounty Hunter
  {
    key: "bh_procedural",
    type: "Bounty Hunter",
    title: "Verified Bounty Hunting Warrant (LRT/MRT/HRT/VHRT)",
    description: "An official bounty warrant issued for a verified criminal target in atmospheric or orbital flight. Target may travel with light or heavy defensive fighter escorts.",
    match: (type, title, giver, illegal) => type === "Bounty Hunter" && !title.includes("License") && !title.includes("Certification") && !title.includes("Permit") && !title.includes("Arlington") && !title.includes("Reclusive") && !illegal
  },
  {
    key: "bh_certification",
    type: "Bounty Hunter",
    title: "Guild Bounty Hunter License Certification Evaluation",
    description: "A guild evaluation flight to test the contractor's combat and interception skills against calibrated-tier targets before issuing specialized hunter licenses.",
    match: (type, title, giver, illegal) => type === "Bounty Hunter" && (title.includes("License") || title.includes("Certification") || title.includes("Permit")) && !illegal
  },
  {
    key: "bh_reclusive",
    type: "Bounty Hunter",
    title: "Reclusive High-Value Target Bounty Warrant",
    description: "A high-priority bounty tracking contract targeting a reclusive criminal who remains hidden until multiple defensive escorts and lieutenants are drawn out and neutralized.",
    match: (type, title, giver, illegal) => type === "Bounty Hunter" && title.includes("Reclusive") && !illegal
  },
  {
    key: "bh_arlington",
    type: "Bounty Hunter",
    title: "Arlington Gang Group Warrant (Bounty Hunt)",
    description: "A high-profile multi-stage group warrant to locate, intercept, and apprehend high-ranking members of the notorious Arlington ship-jacking gang in Stanton orbit.",
    match: (type, title, giver, illegal) => type === "Bounty Hunter" && title.includes("Arlington") && !illegal
  },
  {
    key: "bh_illegal",
    type: "Bounty Hunter",
    title: "Assassination Contract (Assassinate Security Detail)",
    description: "An outlaw assassination contract issued by private brokers or syndicates to eliminate high-profile Advocacy agents, corporate security officials, or trade delegates.",
    match: (type, title, giver, illegal) => (type === "Bounty Hunter" || type === "Mercenary") && illegal && (title.includes("Bounty") || title.includes("Assassinate") || title.includes("Kill") || title.includes("Strike") || title.includes("Vaughn"))
  },

  // Mercenary
  {
    key: "merc_bunker_sweep",
    type: "Mercenary",
    title: "Subterranean Bunker Clearance Sweep",
    description: "Breach a secured underground planetary facility or UEE security depot on foot, eliminate hostile occupying forces, and restore automated defensive grids.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Bunker") || title.includes("Infiltrate") || title.includes("Clear Site") || title.includes("Eradicate") || title.includes("OccuCave") || title.includes("Evict"))
  },
  {
    key: "merc_outpost_clear",
    type: "Mercenary",
    title: "Surface Outpost Eviction & Clearance",
    description: "Tactical deployment to breach and clear occupied surface outposts, evict trespassers, and secure corporate or civilian facilities against hostiles.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Outpost") || title.includes("Settlement") || title.includes("Eviction") || title.includes("Clearance"))
  },
  {
    key: "merc_vip_defend",
    type: "Mercenary",
    title: "Asset Protection & VIP Combat Escort",
    description: "An elite close-protection contract to secure high-value civilian infrastructure, VIP transport shuttle flights, or luxury hulls against pirate attacks.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Defend") || title.includes("Asset Protection") || title.includes("VIP") || title.includes("Escort") || title.includes("Guard"))
  },
  {
    key: "merc_comm_disrupt",
    type: "Mercenary",
    title: "Comm Network Uplink Disruption",
    description: "Espionage operation to approach a local Comm-Array sector under active security fire, breach the central terminal, and temporarily disable its transmission capabilities.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Comm") || title.includes("Array") || title.includes("Tower") || title.includes("Uplink"))
  },
  {
    key: "merc_patrol",
    type: "Mercenary",
    title: "System Travel Lane Security Patrol",
    description: "Active flight patrol loops through commerce lanes or asteroid fields to scan for pirate beacons, check trading hulls, and eliminate hostile scouts.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Patrol") || title.includes("Sweep") || title.includes("Route"))
  },
  {
    key: "merc_boarding",
    type: "Mercenary",
    title: "Boarding Action Reclamation",
    description: "Emergency high-intensity boarding action to reclaim a disabled civilian transport or massive industrial freighter under active pirate boarding attack.",
    match: (type, title, giver, illegal) => type === "Mercenary" && !illegal && (title.includes("Boarding") || title.includes("Reclaim") || title.includes("Freight") || title.includes("Distress"))
  },
  {
    key: "merc_illegal_defense",
    type: "Mercenary",
    title: "Stolen Cargo & Outpost Defense Contract",
    description: "An outlaw security contract to hold and defend stolen industrial goods, weapons caches, or illegal outpost coordinates against corporate PMC raid squads.",
    match: (type, title, giver, illegal) => type === "Mercenary" && illegal && (title.includes("Guard") || title.includes("Defend") || title.includes("Stolen") || title.includes("Cargo"))
  },
  {
    key: "merc_illegal_raid",
    type: "Mercenary",
    title: "Frontier Settlement Raid / Sabotage",
    description: "An outlaw mercenary assault to breach corporate settlements, sabotage reactor cores, and disrupt regional planetary operations.",
    match: (type, title, giver, illegal) => type === "Mercenary" && illegal && (title.includes("Raid") || title.includes("Sabotage") || title.includes("Disrupt") || title.includes("Attack"))
  },

  // Logistics & Delivery
  {
    key: "delivery_courier",
    type: "Delivery",
    title: "Standard Courier Package Transport",
    description: "Pick up and transport secure logistics packages or emergency cargo containers between moons, orbital stations, and surface outposts.",
    match: (type, title, giver, illegal) => (type === "Delivery" || type === "Courier" || type === "Hauling") && !illegal && (title.includes("Courier") || title.includes("Package") || title.includes("Standard") || title.includes("Delivery") || title.includes("Run"))
  },
  {
    key: "delivery_bulk",
    type: "Delivery",
    title: "Bulk Commercial Cargo Hauling",
    description: "Secure and transport multiple SCU grids of commercial trade commodities or industrial components across stellar commerce zones.",
    match: (type, title, giver, illegal) => (type === "Delivery" || type === "Courier" || type === "Hauling") && !illegal && (title.includes("Bulk") || title.includes("Cargo") || title.includes("Haul") || title.includes("Freight"))
  },
  {
    key: "delivery_wreck_recovery",
    type: "Delivery",
    title: "Wreckage Cargo Salvage Recovery",
    description: "Locate a disabled cargo vessel or planetary crash site, search the debris fields on foot, and recover specific cargo grids under hazard alerts.",
    match: (type, title, giver, illegal) => (type === "Delivery" || type === "Courier" || type === "Hauling" || type === "Investigation") && !illegal && (title.includes("Wreck") || title.includes("Recovery") || title.includes("Retrieval") || title.includes("Debris"))
  },
  {
    key: "delivery_illegal",
    type: "Delivery",
    title: "Smuggling Contract (Contraband Delivery)",
    description: "An outlaw courier contract to transport highly restricted contraband, illegal medical supplies, or stolen assets through corporate scanner grids.",
    match: (type, title, giver, illegal) => (type === "Delivery" || type === "Courier" || type === "Hauling") && illegal
  },

  // Industrial Salvage
  {
    key: "salvage_scraping",
    type: "Salvage",
    title: "Hull Scraping & RMC Processing",
    description: "Secure legal salvage rights to corporate derelict hulls and scrape their outer plating to extract Recycled Material Composite canisters.",
    match: (type, title, giver, illegal) => type === "Salvage" && !title.includes("Fracturing") && !title.includes("Structural") && !illegal
  },
  {
    key: "salvage_fracturing",
    type: "Salvage",
    title: "Structural Hull Fracturing Operation",
    description: "Deploy massive industrial salvage beams to fracture disabled military or civilian ship frames and process their composite structural grids.",
    match: (type, title, giver, illegal) => type === "Salvage" && (title.includes("Fracturing") || title.includes("Structural") || title.includes("Frame")) && !illegal
  },
  {
    key: "salvage_illegal",
    type: "Salvage",
    title: "Unsanctioned / Illegal Salvage Reclamation",
    description: "An outlaw salvage contract to scrape and dismantle high-value ship hulls under active security blockades or before corporate sweeps arrive.",
    match: (type, title, giver, illegal) => type === "Salvage" && illegal
  },

  // Mining & Resource
  {
    key: "mining_surface",
    type: "Mining",
    title: "Moon Surface Mining & Prospecting",
    description: "Utilize ground vehicles or planetary mining lasers to locate mineral veins, fracture surface rocks, and collect raw industrial ore.",
    match: (type, title, giver, illegal) => (type.includes("Mining") || type.includes("Resource")) && !title.includes("Asteroid") && !title.includes("Belt") && !illegal
  },
  {
    key: "mining_asteroid",
    type: "Mining",
    title: "Asteroid Belt Rock-Cracking Operations",
    description: "Navigate high-density asteroid rings in a mining ship to scan, fracture, and extract volatile minerals from deep space asteroid fields.",
    match: (type, title, giver, illegal) => (type.includes("Mining") || type.includes("Resource")) && (title.includes("Asteroid") || title.includes("Belt") || title.includes("Space")) && !illegal
  },
  {
    key: "mining_refinery",
    type: "Mining",
    title: "Refined Ore Transport & Logistics",
    description: "Transport refined mineral blocks or raw ore canisters from planetary depots and orbital mining platforms to commercial refinery processing grids.",
    match: (type, title, giver, illegal) => (type.includes("Mining") || type.includes("Resource")) && (title.includes("Refinery") || title.includes("Transport") || title.includes("Logistics") || title.includes("Drop")) && !illegal
  },

  // Investigation
  {
    key: "investigation_missing",
    type: "Investigation",
    title: "Search & Rescue (Locate Missing Persons)",
    description: "Investigate coordinates of a lost ship or a surface outpost that has gone completely silent. Search the site and recover any missing crew logs.",
    match: (type, title, giver, illegal) => type === "Investigation" && !illegal && (title.includes("Missing") || title.includes("Volunteers") || title.includes("Rescue") || title.includes("Search") || title.includes("Find"))
  },
  {
    key: "investigation_blackbox",
    type: "Investigation",
    title: "Black Box Flight Recovery Operation",
    description: "Navigate to a hazardous derelict ship sector, locate the flight recorder block, slice its security encrypt, and return it safely to Covalex boards.",
    match: (type, title, giver, illegal) => type === "Investigation" && !illegal && (title.includes("Black Box") || title.includes("Blackbox") || title.includes("Recorder"))
  },
  {
    key: "investigation_facility_delve",
    type: "Investigation",
    title: "Classified ASD Facility Investigation",
    description: "Delve deep into subterranean Associated Science and Development research complexes, investigate data terminal logs, and extract prototype schematics.",
    match: (type, title, giver, illegal) => type === "Investigation" && !illegal && (title.includes("ASD") || title.includes("Facility") || title.includes("Onyx") || title.includes("Delve") || title.includes("Data"))
  }
];

// Catch-all baseline if no specific typology matches
const getBaselineFallback = (rawType, illegal) => {
  if (rawType === "Bounty Hunter") {
    return {
      title: "Verified Bounty Hunting Contract",
      description: "An official bounty warrant issued for a verified criminal target in atmospheric or orbital flight. Target may travel with light or heavy escorts."
    };
  }
  if (rawType === "Salvage") {
    return {
      title: "Standard Hull Scraping & RMC Processing",
      description: "Secure legal salvage rights to corporate derelict hulls and scrape their outer plating to extract Recycled Material Composite canisters."
    };
  }
  if (rawType === "Delivery" || rawType === "Hauling" || rawType === "Courier") {
    return {
      title: "Standard Inter-Outpost Logistics Courier",
      description: "Pick up and transport secure logistics packages or emergency cargo containers between moons, orbital stations, and surface outposts."
    };
  }
  if (rawType.includes("Mining") || rawType.includes("Resource")) {
    return {
      title: "Moon Surface Mining & Prospecting",
      description: "Utilize ground vehicles or planetary mining lasers to locate mineral veins, fracture surface rocks, and collect raw industrial ore."
    };
  }
  if (rawType === "Investigation") {
    return {
      title: "Search & Rescue / Missing Person Investigation",
      description: "Investigate coordinates of a lost ship or a surface outpost that has gone completely silent. Search the site and recover any missing crew logs."
    };
  }
  return {
    title: illegal ? "Unsanctioned Private Enforcer Contract" : "Security Contractor Tactical Sweep Operation",
    description: illegal ? "An outlaw security contract to enforce syndicate rules, defend stolen assets, or execute coordinated strikes." : "Breach a designated sector, neutralize all hostile forces occupying corporate grids, and restore secure comm frequencies."
  };
};

const finalTemplates = new Map();

files.forEach(file => {
  try {
    const filePath = path.join(CONTRACTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const rawTitle = data.Title || '';
    const rawGiver = data.MissionGiver || '';
    const illegal = !!data.Illegal;
    let rawType = (data.MissionType && data.MissionType.Name) || 'Mercenary';
    if (rawType === 'Priority') rawType = 'Mercenary';
    if (rawType === 'Courier' || rawType === 'Hauling') rawType = 'Delivery';
    if (rawType.includes('Resource Drive') || rawType.includes('Mining')) rawType = 'Mining';

    const giver = normalizeGiver(rawGiver);

    // Filter out tutorial guides or absolute blank names
    if (rawTitle.includes('Tutorial') || giver === 'How to Play Guide') return;

    // Resolve Locations
    const locations = [];
    if (data.LocationPools) {
      Object.keys(data.LocationPools).forEach(poolName => {
        const pool = data.LocationPools[poolName];
        if (pool.ResolvedLocations) {
          pool.ResolvedLocations.forEach(loc => {
            if (loc.Name && !locations.includes(loc.Name)) {
              locations.push(loc.Name);
            }
          });
        }
      });
    }

    if (data.AvailabilityLocations) {
      data.AvailabilityLocations.forEach(loc => {
        if (loc.Name && !locations.includes(loc.Name)) {
          locations.push(loc.Name);
        }
        if (loc.ResolvedLocations) {
          loc.ResolvedLocations.forEach(subLoc => {
            if (subLoc.Name && !locations.includes(subLoc.Name)) {
              locations.push(subLoc.Name);
            }
          });
        }
      });
    }

    const starSystem = getStarSystem(locations, rawTitle, data.Description || '');

    // Map to beautiful career typology
    let title = "";
    let description = "";

    const matchedTypology = CAREER_TYPOLOGIES.find(t => t.match(rawType, rawTitle, giver, illegal));
    if (matchedTypology) {
      title = matchedTypology.title;
      description = matchedTypology.description;
    } else {
      const fallback = getBaselineFallback(rawType, illegal);
      title = fallback.title;
      description = fallback.description;
    }

    const uniqueKey = `${starSystem}_${giver}_${title}_${illegal}`.toLowerCase();

    if (finalTemplates.has(uniqueKey)) {
      // Accumulate locations
      const existing = finalTemplates.get(uniqueKey);
      locations.forEach(loc => {
        if (!existing.locations.includes(loc)) {
          existing.locations.push(loc);
        }
      });
    } else {
      finalTemplates.set(uniqueKey, {
        id: `template_${rawType.toLowerCase().replace(/ /g, '_')}_${giver.toLowerCase().replace(/ /g, '_')}_${illegal}_${starSystem.toLowerCase()}`,
        type: rawType,
        giver: giver,
        title: title,
        description: description,
        locations: locations.slice(0, 15), // Cap size
        illegal: illegal
      });
    }

  } catch (err) {
    // Ignore malformed files
  }
});

// Convert Map to sorted array
const contracts = Array.from(finalTemplates.values());
contracts.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));

console.log(`Successfully compiled and grouped 1000 raw files into ${contracts.length} unique career typologies.`);

// Generate contracts_data.js file content
const fileContent = `/**
 * Star Citizen Compiled Contracts Database
 * Hand-curated career typologies grouped for zero name-clutter and premium performance.
 * Generated automatically by build_database.js
 */

window.SC_CONTRACTS = ${JSON.stringify(contracts, null, 2)};

window.SC_SYSTEMS = {
  "Stanton": ["Hurston", "Crusader", "ArcCorp", "microTech"],
  "Pyro": ["Pyro I", "Pyro II", "Pyro III", "Pyro IV", "Pyro V", "Pyro VI", "Ruin Station"],
  "Nyx": ["Delamar", "Levski", "Nyx I", "Nyx II", "Nyx III"]
};

console.log("Star Citizen Curated Grouped Database Loaded. Total templates: " + window.SC_CONTRACTS.length);
`;

fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
console.log(`Curated Database written to ${OUTPUT_FILE}`);
