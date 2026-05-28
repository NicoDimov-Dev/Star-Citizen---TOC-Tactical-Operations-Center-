/**
 * Star Citizen Condensed Tactical Archetypes Database
 * Hand-curated for premium client-side execution in SC-TOC.
 */

window.SC_CONTRACTS = [
  {
    id: "combat_bounty",
    type: "Ship Bounty (Space Combat)",
    title: "Space Bounty: Neutralize Active Flight Wing",
    description: "Intercept and eliminate an active flight wing blockading local sectors or harassing shipping lanes. Be prepared to engage multiple fighter classes in zero-g ship combat."
  },
  {
    id: "fps_clearance",
    type: "FPS Assault (Bunker / Outpost)",
    title: "FPS Clearance: Sweep and Secure Facility Perimeter",
    description: "Infiltrate a hostile-controlled ground facility, bunker, or outpost. Conduct a full tactical sweep of all interior levels to neutralize defensive sentries and secure the perimeter."
  },
  {
    id: "fps_investigation",
    type: "FPS Investigation (Data / Intel)",
    title: "FPS Investigation: Recover Restricted Flight Intel",
    description: "Deploy to a crash site or derelict structure. Conduct search operations to recover black box flight logs, decrypt active terminal databanks, or upload vital telemetry files to Command."
  },
  {
    id: "cargo_hauling",
    type: "Hauling & Logistics (Cargo Transport)",
    title: "Hauling Operations: Transport Tactical Supplies",
    description: "Load and secure cargo grids with critical logistical crates or industrial trade commodities. Safely transport and deposit the cargo at designated security drop-points."
  },
  {
    id: "industrial_salvage",
    type: "Industrial Salvage / Hull Scraping",
    title: "Industrial Salvage: Reclaim Wreck Plating and Cargo",
    description: "Deploy to a designated ship wreck sector. Utilize hull scraping and structural fracturing lasers to process hull plating, and secure internal components from the wreckage."
  },
  {
    id: "special_ops",
    type: "Special Operations (Major Fleet/Event)",
    title: "Special Operations: Capital Blockade Break",
    description: "Engage in a major strategic fleet defense, dynamic sector raid, or capital ship defense. Requires heavy tactical armor, multi-crew flight grids, and high-intensity fire support."
  }
];

window.SC_SYSTEMS = {
  "Stanton": ["Hurston", "Crusader", "ArcCorp", "microTech"],
  "Pyro": ["Pyro I", "Pyro II", "Pyro III", "Pyro IV", "Pyro V", "Pyro VI", "Ruin Station"],
  "Nyx": ["Delamar", "Levski", "Nyx I", "Nyx II", "Nyx III"]
};

console.log("Star Citizen Condensed Database Loaded. Total templates: " + window.SC_CONTRACTS.length);
