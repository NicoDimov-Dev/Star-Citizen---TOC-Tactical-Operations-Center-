/**
 * Star Citizen Compiled Contracts Database
 * Hand-curated for premium client-side execution in SC-TOC.
 * Groups missions of the same nature into clean, neat, repeatable typologies.
 */

window.SC_CONTRACTS = [
  // ==========================================
  // STANTON - Bounty Hunter
  // ==========================================
  {
    id: "bhg_bounty_procedural",
    type: "Bounty Hunter",
    giver: "Bounty Hunters Guild",
    title: "Verified Bounty Warrant (LRT/MRT/HRT/VHRT)",
    description: "An official bounty warrant issued for a verified criminal target in Stanton orbit or atmosphere. Target may travel with light or heavy defensive fighter escorts.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "bhg_bounty_license",
    type: "Bounty Hunter",
    giver: "Bounty Hunters Guild",
    title: "Guild Tracker License Certification",
    description: "A guild evaluation flight to test the contractor's combat and interception skills against VHRT/ERT-tier targets before issuing specialized hunter licenses.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "bhg_bounty_asd_target",
    type: "Bounty Hunter",
    giver: "Bounty Hunters Guild",
    title: "ASD Facility Target Neutralization",
    description: "An enforcement warrant to locate and neutralize high-priority targets or rogue scientists occupying abandoned Associated Science and Development research wings.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "vaughn_assassination",
    type: "Bounty Hunter",
    giver: "Vaughn",
    title: "Assassination Contract: Neutralize Security Detail",
    description: "An outlaw contract issued by Vaughn to intercept and eliminate a high-profile corporate security or Advocacy target in space lanes.",
    locations: ["Stanton"],
    illegal: true
  },
  {
    id: "eckhart_arlington_warrant",
    type: "Bounty Hunter",
    giver: "Eckhart Security",
    title: "Arlington Gang Group Warrant (Capture Arlington Member)",
    description: "A high-priority multi-stage group warrant issued to track down and apprehend high-ranking members of the notorious Arlington ship-jacking gang.",
    locations: ["Stanton"],
    illegal: false
  },

  // ==========================================
  // STANTON - Mercenary
  // ==========================================
  {
    id: "eckhart_mercenary_eval",
    type: "Mercenary",
    giver: "Eckhart Security",
    title: "Security Contractor Evaluation Trial",
    description: "A high-priority tactical trial organized by Miles Eckhart to evaluate independent contractors before clearing them for classified fleet operations.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "eckhart_asset_protection",
    type: "Mercenary",
    giver: "Eckhart Security",
    title: "Corporate Asset & VIP Protection Detail",
    description: "A close-protection contract to secure high-value corporate clients, luxury hulls, or transport shuttles under active pirate threat.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "eckhart_asd_server_purge",
    type: "Mercenary",
    giver: "Eckhart Security",
    title: "Classified ASD Server Purge (Data Wipe)",
    description: "Espionage deployment to infiltrate the offices or laboratory wings of abandoned ASD facilities on foot and physically purge classified database mainframes.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "foxwell_patrol_sweep",
    type: "Mercenary",
    giver: "Foxwell Enforcement",
    title: "Routine Security Patrol & Intercept",
    description: "Active flight patrol loops through planetary zones or trade grids to identify, scan, and neutralize outlaw scouts or blockading fighter wings.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "foxwell_facility_defend",
    type: "Mercenary",
    giver: "Foxwell Enforcement",
    title: "Facility Defense & Employee Escort",
    description: "FPS security deployment to defend planetary facilities, guard critical objects, or escort science teams through hazardous zones under attack.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "foxwell_ambush_strike",
    type: "Mercenary",
    giver: "Foxwell Enforcement",
    title: "Ambush Combat Sweep / Spring a Trap",
    description: "Coordinated tactical trap to lure local outlaw groups into specific coordinates and execute a sudden strike to wipe their regional assets.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "hurston_bunker_infiltrate",
    type: "Mercenary",
    giver: "Hurston Dynamics",
    title: "Infiltrate and Clear Site (Bunker Sweep)",
    description: "Hurston Dynamics corporate clearance sweep. Breach subterranean bunkers, neutralize occupying outlaws, and secure Lorville security grids.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "hurston_outpost_eviction",
    type: "Mercenary",
    giver: "Hurston Dynamics",
    title: "Evict Illegal Occupants (Outpost Clearance)",
    description: "Breach and sweep planetary outposts to evict trespassers or illegal salvage teams and re-establish corporate compliance.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "hurston_facility_repel",
    type: "Mercenary",
    giver: "Hurston Dynamics",
    title: "Repel Raid on Mining Facility",
    description: "FPS defense sweep to secure Hurston mining outposts against aggressive raiders or corporate defector cells.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "crusader_convoy_defense",
    type: "Mercenary",
    giver: "Crusader Industries",
    title: "Sector Cargo Convoy Escort & Defense",
    description: "Defend heavy civilian transport ships or cargo grids flying through the Crusader clouds against active NineTails raids.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "arccorp_paf_clearance",
    type: "Mercenary",
    giver: "ArcCorp",
    title: "Clear PAF (Public Accommodation Facility)",
    description: "Tactical clearance sweep of planetary housing blocks or accommodation hubs occupied by armed syndicate cells.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "headhunters_objects_defense",
    type: "Mercenary",
    giver: "Headhunters",
    title: "Guard Destructible Objects At All Costs",
    description: "An outlaw security contract to hold and defend stolen weapons crates, industrial components, or hijacked grids against corporate PMC boarding squads.",
    locations: ["Stanton"],
    illegal: true
  },

  // ==========================================
  // STANTON - Logistics & Hauling
  // ==========================================
  {
    id: "covalex_courier_local",
    type: "Delivery",
    giver: "Covalex",
    title: "Standard Courier Package Delivery",
    description: "Pick up and transport secure logistics parcels or emergency supplies between moons and local orbital ports.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "covalex_cargo_haul",
    type: "Delivery",
    giver: "Covalex",
    title: "Bulk Cargo Hauling Contract",
    description: "Secure and transport multiple SCU grids of commercial trade commodities or industrial resources to secure planetary hubs.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "covalex_wreck_recovery",
    type: "Delivery",
    giver: "Covalex",
    title: "Covalex Shipment Wreckage Recovery",
    description: "Locate disabled cargo haulers or planetary crash sites, scan the debris, and retrieve intact shipping containers under hazardous conditions.",
    locations: ["Stanton"],
    illegal: false
  },

  // ==========================================
  // STANTON - Industrial Salvage
  // ==========================================
  {
    id: "adagio_hull_scraping",
    type: "Salvage",
    giver: "Adagio Holdings",
    title: "Hull Scraping & RMC Processing",
    description: "Secure scrap rights to derelict ship hulls and process their outer plating into Recycled Material Composite canisters.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "adagio_structural_fracturing",
    type: "Salvage",
    giver: "Adagio Holdings",
    title: "Structural Wreck Fracturing",
    description: "Utilize industrial lasers to fracture massive disabled ship frames and retrieve highly valuable internal composite grids.",
    locations: ["Stanton"],
    illegal: false
  },

  // ==========================================
  // STANTON - Mining & Resource
  // ==========================================
  {
    id: "shubin_surface_mining",
    type: "Mining",
    giver: "Shubin Interstellar",
    title: "Moon Surface Mining & Prospecting",
    description: "Utilize ROC ground vehicles or Prospector mining lasers to fracture surface mineral deposits and extract raw ores.",
    locations: ["Stanton"],
    illegal: false
  },
  {
    id: "shubin_asteroid_mining",
    type: "Mining",
    giver: "Shubin Interstellar",
    title: "Asteroid Belt Rock-Cracking Field",
    description: "Navigate active asteroid belts to scan, fracture, and extract volatile minerals from deep space rock deposits.",
    locations: ["Stanton"],
    illegal: false
  },

  // ==========================================
  // PYRO - Mercenary
  // ==========================================
  {
    id: "cfp_pyro_reclaim_outpost",
    type: "Mercenary",
    giver: "Citizens for Prosperity",
    title: "Campaign to Reclaim XenoThreat Outpost",
    description: "A high-intensity settlement assault to breach, clear, and secure frontier outposts occupied by active XenoThreat insurgent cells.",
    locations: ["Pyro"],
    illegal: false
  },
  {
    id: "cfp_pyro_stronghold_purge",
    type: "Mercenary",
    giver: "Citizens for Prosperity",
    title: "Eradicate Headhunter Stronghold Data",
    description: "Breach a hostile outlaw outpost, locate their servers, and execute a permanent data wipe of their regional coordinates.",
    locations: ["Pyro"],
    illegal: false
  },
  {
    id: "headhunters_pyro_raid",
    type: "Mercenary",
    giver: "Headhunters",
    title: "Raid Frontier Settlement / Disrupt Operations",
    description: "An outlaw mercenary assault to breach, sabotage, and clear Citizens for Prosperity outpost grids and disrupt their logistics.",
    locations: ["Pyro"],
    illegal: true
  },
  {
    id: "headhunters_pyro_ambush",
    type: "Mercenary",
    giver: "Headhunters",
    title: "Ambush Corporate Shipping Convoys",
    description: "Coordinate a sudden interdiction trap to snare, board, and neutralize UEE-aligned cargo transport convoys in space.",
    locations: ["Pyro"],
    illegal: true
  },

  // ==========================================
  // PYRO - Logistics & Hauling
  // ==========================================
  {
    id: "cfp_pyro_remote_run",
    type: "Delivery",
    giver: "Citizens for Prosperity",
    title: "Frontier Remote Outpost Supply Run",
    description: "Haul emergency food, medpen grids, and reactor parts to isolated frontier settlements through heavily patrolled outlaw lanes.",
    locations: ["Pyro"],
    illegal: false
  },
  {
    id: "cfp_pyro_reclaim_cargo",
    type: "Delivery",
    giver: "Citizens for Prosperity",
    title: "Reclaim Stolen Cargo Grids",
    description: "Track and intercept outlaw raiders carrying stolen settlement goods, retrieve the cargo boxes, and haul them to safety.",
    locations: ["Pyro"],
    illegal: false
  },

  // ==========================================
  // PYRO - Investigation
  // ==========================================
  {
    id: "cfp_pyro_rescue_volunteers",
    type: "Investigation",
    giver: "Citizens for Prosperity",
    title: "Search & Rescue: Locate Missing Volunteers",
    description: "Investigate coordinates where a CFP volunteer squad has gone off the radar. Locate their wreck site and defend against active scavenger waves.",
    locations: ["Pyro"],
    illegal: false
  },
  {
    id: "headhunters_pyro_cave_search",
    type: "Investigation",
    giver: "Headhunters",
    title: "Search & Rescue: Locate Lost Outlaw Runner",
    description: "Spelunk into dangerous, unmapped caves to locate a missing outlaw enforcer, neutralizing hostile fauna or rival miners hiding inside.",
    locations: ["Pyro"],
    illegal: false
  },

  // ==========================================
  // NYX - Mercenary
  // ==========================================
  {
    id: "cfp_nyx_belt_patrol",
    type: "Mercenary",
    giver: "Citizens for Prosperity",
    title: "Patrol Dangerous Asteroid Belt Lanes",
    description: "Fly security sweeps through Nyx's dense rings to scan for borders syndicate ships or protect independent trade convoys.",
    locations: ["Nyx"],
    illegal: false
  },
  {
    id: "cfp_nyx_clear_route",
    type: "Mercenary",
    giver: "Citizens for Prosperity",
    title: "Clear Colony Travel Route of Hostiles",
    description: "Conduct security Sweeps to eliminate hostile outlaws occupying surface paths or beacons on Delamar's moons.",
    locations: ["Nyx"],
    illegal: false
  },
  {
    id: "intersec_combat_escort",
    type: "Mercenary",
    giver: "InterSec Defense Solutions",
    title: "Sector Combat Escort Detail",
    description: "Reinforce and defend high-profile corporate VIPs or transport ships flying through contested Nyx coordinates.",
    locations: ["Nyx"],
    illegal: false
  },
  {
    id: "intersec_repel_vanduul",
    type: "Mercenary",
    giver: "InterSec Defense Solutions",
    title: "Repel Vanduul Boarding Attack",
    description: "Elite tactical deployment to board and reclaim a military transport under active Vanduul swarm attack in orbital space.",
    locations: ["Nyx"],
    illegal: false
  },
  {
    id: "levski_evict_border_raiders",
    type: "Mercenary",
    giver: "People's Alliance of Levski",
    title: "Evict Border Syndicate Raiders",
    description: "FPS sweep inside mining shafts or abandoned Levski outposts to purge border syndicate raider cells.",
    locations: ["Nyx"],
    illegal: false
  },

  // ==========================================
  // NYX - Investigation & Salvage
  // ==========================================
  {
    id: "covalex_nyx_salvage_recovery",
    type: "Investigation",
    giver: "Covalex",
    title: "Bulk Covalex Shipment Needs Recovering",
    description: "Infiltrate a massive cargo wreck drifting in deep Nyx space, slice open the locks, and recover Covalex cargo boxes under fire.",
    locations: ["Nyx"],
    illegal: false
  }
];

window.SC_SYSTEMS = {
  "Stanton": ["Hurston", "Crusader", "ArcCorp", "microTech"],
  "Pyro": ["Pyro I", "Pyro II", "Pyro III", "Pyro IV", "Pyro V", "Pyro VI", "Ruin Station"],
  "Nyx": ["Delamar", "Levski", "Nyx I", "Nyx II", "Nyx III"]
};

console.log("Star Citizen Curated Grouped Database Loaded. Total templates: " + window.SC_CONTRACTS.length);
