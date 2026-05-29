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

// Star System Resolver
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
// INTELLIGENT CAREER CLASSIFIER & GROUPER
// Resolves the true in-game career profile based on the actual contract contents.
// Strips player instance clutter, bracket placeholders, and specific names.
// -----------------------------------------------------------------------------
function classifyContract(data, rawTitle, giver, rawType, illegal, starSystem) {
  const t = (rawTitle || "").toLowerCase();
  const d = (data.Description || "").toLowerCase();
  const type = (rawType || "").toLowerCase().trim();

  // 1. RESOLVE THE TRUE MOBIGLAS CATEGORY FIRST BASED ON ACTUAL NATURE
  let category = "Mercenary"; // Default fallback
  
  if (
    t.includes("black box") || t.includes("blackbox") ||
    t.includes("missing") || t.includes("find ") ||
    t.includes("search cave") || t.includes("rescue") ||
    t.includes("captive") || t.includes("volunteer") ||
    t.includes("onyx") || t.includes("asd facility delving") ||
    d.includes("black box") || d.includes("blackbox") ||
    d.includes("missing person") || d.includes("locate missing") ||
    d.includes("hostage") || d.includes("captive")
  ) {
    category = "Investigation";
  } else if (type === "bounty hunter" || t.includes("bounty") || t.includes("assassinate") || t.includes("arlington") || t.includes("targetname")) {
    category = "Bounty Hunter";
  } else if (type === "salvage" || t.includes("salvage") || t.includes("scraping") || t.includes("fracturing")) {
    category = "Industrial Salvage";
  } else if (type.includes("resource drive") || type.includes("mining") || t.includes("mining") || t.includes("prospecting") || t.includes("rock-cracking")) {
    category = "Mining & Resource";
  } else if (type === "delivery" || type === "hauling" || type === "courier" || t.includes("delivery") || t.includes("hauling") || t.includes("courier") || t.includes("haul")) {
    category = "Delivery & Logistics";
  }

  // 2. MAP TO A BEAUTIFUL, GROUPED CAREER TYPOLOGY TITLE AND DESCRIPTION
  let cleanTitle = "";
  let cleanDesc = "";

  if (category === "Investigation") {
    if (giver === "Bit Zeros") {
      cleanTitle = "Unsanctioned Black Box Flight Recovery";
      cleanDesc = "Locate a disabled space transport drifting in blocked space, breach the locks, recover the flight recorder box, and slice its encryption key.";
    } else if (giver === "Citizens for Prosperity") {
      if (t.includes("missing person") || t.includes("missing:") || t.includes("volunteers") || t.includes("find ")) {
        cleanTitle = "Search & Rescue: Locate Missing Settlers";
        cleanDesc = "Investigate coordinates of a lost ship or a frontier outpost that has gone completely silent. Search the site and recover crew logs or survivors.";
      } else if (t.includes("search cave")) {
        cleanTitle = "Spelunking Search & Rescue: Cave Delve";
        cleanDesc = "Spelunk into dense, hazardous planetary caves to locate missing volunteers or enforcers, neutralizing rival miners or hostile fauna hiding inside.";
      } else {
        cleanTitle = "Search & Retrieve: Lost Outpost Supplies";
        cleanDesc = "Navigate to hostile-controlled remote coordinates, search the wreckage, and retrieve stolen cargo units or vital logistics containers.";
      }
    } else if (giver === "Eckhart Security") {
      cleanTitle = "Classified ASD Facility Server Purge (Data Wipe)";
      cleanDesc = "Infiltrate subterranean Associated Science and Development complexes, access data terminals, and execute a permanent server purge of research logs.";
    } else if (giver === "MicroTech" || giver === "Hurston Dynamics" || giver === "Crusader Industries" || giver === "ArcCorp") {
      cleanTitle = "Resource Drive: Emergency Cargo Rescue";
      cleanDesc = "Locate a disabled corporate transport drifting in deep space after a raid, scan for survivors, and recover vital cargo boxes under active fire.";
    } else {
      cleanTitle = "Classified Forensic Flight Investigation";
      cleanDesc = "Navigate to coordinate wreckage sites, scan disabled hulls for telemetry recordings, and extract flight logs for private brokers.";
    }
  }

  else if (category === "Bounty Hunter") {
    if (t.includes("arlington")) {
      cleanTitle = "Arlington Gang Group Bounty Hunt Warrant";
      cleanDesc = "A high-profile multi-stage group warrant issued by Eckhart Security to locate, intercept, and apprehend high-ranking members of the notorious Arlington gang.";
    } else if (t.includes("certification") || t.includes("license") || t.includes("permit")) {
      cleanTitle = "Guild Bounty Hunter License Evaluation";
      cleanDesc = "A guild evaluation flight to test the contractor's combat and interception skills against calibrated-tier targets before issuing specialized hunter licenses.";
    } else if (t.includes("reclusive")) {
      cleanTitle = "Reclusive High-Value Target Bounty Warrant";
      cleanDesc = "A high-priority bounty tracking contract targeting a reclusive criminal who remains hidden until multiple defensive escorts and lieutenants are drawn out.";
    } else {
      cleanTitle = illegal ? "Assassination Contract: Neutralize Security Detail" : "Verified Bounty Hunting Warrant (LRT/MRT/HRT/VHRT)";
      cleanDesc = illegal ? "An outlaw contract issued to intercept and eliminate high-profile corporate security or Advocacy officials in deep space lanes."
                          : "An official guild-sanctioned bounty warrant issued for a verified criminal target in atmospheric or orbital flight.";
    }
  }

  else if (category === "Industrial Salvage") {
    if (t.includes("fracturing") || t.includes("structural")) {
      cleanTitle = "Structural Hull Fracturing Operation";
      cleanDesc = "Utilize heavy industrial salvage lasers to fracture disabled military or civilian ship frames and process their composite structural grids.";
    } else {
      cleanTitle = illegal ? "Unsanctioned / Illegal Salvage Reclamation" : "Hull Scraping & RMC Processing";
      cleanDesc = illegal ? "An outlaw salvage contract to scrape and dismantle high-value ship hulls under active security blockades or before corporate sweeps arrive."
                          : "Secure legal salvage rights to corporate derelict hulls and scrape their outer plating to extract Recycled Material Composite canisters.";
    }
  }

  else if (category === "Mining & Resource") {
    if (t.includes("asteroid") || t.includes("belt") || t.includes("space")) {
      cleanTitle = "Asteroid Belt Rock-Cracking Operations";
      cleanDesc = "Navigate high-density asteroid rings in a mining ship to scan, fracture, and extract volatile minerals from deep space asteroid fields.";
    } else if (t.includes("refinery") || t.includes("logistics") || t.includes("transport")) {
      cleanTitle = "Refined Ore Transport & Logistics";
      cleanDesc = "Transport refined mineral blocks or raw ore canisters from planetary depots and orbital mining platforms to commercial refinery processing grids.";
    } else {
      cleanTitle = "Moon Surface Mining & Ground Prospecting";
      cleanDesc = "Utilize ground vehicles or planetary mining lasers to locate mineral veins, fracture surface rocks, and collect raw industrial ore.";
    }
  }

  else if (category === "Delivery & Logistics") {
    if (illegal) {
      cleanTitle = "Smuggling Contract: Contraband Cargo Run";
      cleanDesc = "An outlaw logistics contract to transport restricted cargo, illegal medical supplies, or stolen assets through corporate scanner grids.";
    } else if (t.includes("bulk") || t.includes("cargo haul") || t.includes("freight")) {
      cleanTitle = "Bulk Commercial Cargo Hauling Contract";
      cleanDesc = "Secure and transport multiple SCU grids of commercial trade commodities or industrial components across stellar commerce zones.";
    } else if (t.includes("multiple")) {
      cleanTitle = "Multi-Drop Logistics Courier Delivery";
      cleanDesc = "Pick up and transport multiple secure logistics parcels between planetary outposts, local moons, and orbital cargo transfer hubs.";
    } else {
      cleanTitle = "Standard Courier Package Transport";
      cleanDesc = "Pick up and transport secure logistics packages or emergency cargo containers between moons, orbital stations, and surface outposts.";
    }
  }

  else { // Mercenary
    if (t.includes("bunker") || t.includes("infiltrate") || t.includes("clear site") || t.includes("sweep") || t.includes("evict") || t.includes("clear paf")) {
      cleanTitle = "Subterranean Bunker Clearance Sweep";
      cleanDesc = "Breach a secured underground planetary facility or UEE security depot on foot, eliminate hostile occupying forces, and restore automated defensive grids.";
    } else if (t.includes("outpost") || t.includes("settlement") || t.includes("clearance")) {
      cleanTitle = "Surface Outpost Eviction & Clearance";
      cleanDesc = "Tactical deployment to breach and clear occupied surface outposts, evict trespassers, and secure corporate or civilian facilities against hostiles.";
    } else if (t.includes("defend") || t.includes("asset protection") || t.includes("vip") || t.includes("escort") || t.includes("guard")) {
      cleanTitle = illegal ? "Stolen Cargo & Outpost Defense Contract" : "Asset Protection & VIP Combat Escort";
      cleanDesc = illegal ? "An outlaw security contract to hold and defend stolen industrial goods, weapons caches, or illegal outpost coordinates against corporate PMC squads."
                          : "An elite close-protection contract to secure high-value civilian infrastructure, VIP transport shuttle flights, or luxury hulls against pirate attacks.";
    } else if (t.includes("comm tower") || t.includes("commstowers") || t.includes("disablecommstowers")) {
      cleanTitle = "Comm Network Uplink Disruption";
      cleanDesc = "Espionage operation to approach a local Comm-Array sector under active security fire, breach the central terminal, and temporarily disable its transmission capabilities.";
    } else if (t.includes("patrol") || t.includes("security sweep") || t.includes("route")) {
      cleanTitle = "System Travel Lane Security Patrol";
      cleanDesc = "Active flight patrol loops through commerce lanes or asteroid fields to scan for pirate beacons, check trading hulls, and eliminate hostile scouts.";
    } else if (t.includes("boarding") || t.includes("reclaim") || t.includes("freight") || t.includes("distress")) {
      cleanTitle = "Boarding Action Reclamation Sweep";
      cleanDesc = "Emergency high-intensity boarding action to reclaim a disabled civilian transport or massive industrial freighter under active pirate boarding attack.";
    } else if (t.includes("tutorial")) {
      cleanTitle = "Contractor Orientation & Field Training";
      cleanDesc = "Orientation training to familiarize new security contractors with basic flight parameters, tactical HUD sweeps, and UEE code regulations.";
    } else {
      cleanTitle = "Security Contractor Tactical Sweep Operation";
      cleanDesc = "Breach a designated sector in atmospheric or orbital coordinates, neutralize all hostile forces occupying corporate grids, and restore secure communications.";
    }
  }

  return { category, title: cleanTitle, description: cleanDesc };
}

const finalTemplates = new Map();

files.forEach(file => {
  try {
    const filePath = path.join(CONTRACTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const rawTitle = data.Title || '';
    const rawGiver = data.MissionGiver || '';
    const illegal = !!data.Illegal;
    let rawType = (data.MissionType && data.MissionType.Name) || 'Mercenary';

    const giver = normalizeGiver(rawGiver);

    // Skip tutorials and guides
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

    // Classify into high-quality career template
    const classified = classifyContract(data, rawTitle, giver, rawType, illegal, starSystem);

    const uniqueKey = `${starSystem}_${giver}_${classified.title}_${illegal}`.toLowerCase();

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
        id: `template_${classified.category.toLowerCase().replace(/ /g, '_')}_${giver.toLowerCase().replace(/ /g, '_')}_${illegal}_${starSystem.toLowerCase()}`,
        system: starSystem,
        category: classified.category, // Store category explicitly
        type: rawType, // Fallback type
        giver: giver,
        title: classified.title,
        description: classified.description,
        locations: locations.slice(0, 15), // Cap size
        illegal: illegal
      });
    }

  } catch (err) {
    // Ignore malformed JSON files
  }
});

// Convert Map to array and sort
const contracts = Array.from(finalTemplates.values());
contracts.sort((a, b) => a.system.localeCompare(b.system) || a.category.localeCompare(b.category) || a.giver.localeCompare(b.giver) || a.title.localeCompare(b.title));

console.log(`Successfully compiled and grouped all raw files into ${contracts.length} unique career typologies.`);

// Generate contracts_data.js content
const fileContent = `/**
 * Star Citizen Compiled Contracts Database
 * Curated career typologies grouped for zero name-clutter and premium performance.
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
