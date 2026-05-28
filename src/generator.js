/**
 * SC-TOC: Procedural Tactical Narrative Generator (Fail-Safe Version)
 * Weaves generic Star Citizen mission archetypes using deep in-universe PMC lore
 * customized by System (Stanton, Pyro, Nyx) with procedural connection pools.
 */

try {
  const COMMANDER_OPENERS = [
    "Listen up, crew. We have locked in our flight vectors and confirmed a multi-phase operational contract.",
    "All stations, coordinate frequencies. Command has finalized our strategic flight sequence.",
    "Crew, stack up and sync links. Operational clearance is green and telemetry is locked.",
    "Frequencies secure. I have the tactical layout for our next deployment deck."
  ];

  const COMMANDER_CLOSERS = [
    "Double-check your seals, check your lines, and stick together. Let's move out!",
    "Keep your eyes on the radar, stay tight in formation, and let's secure the pay. Move!",
    "Lock and load, no loose ends, and let's execute this contract clean. Let's go!",
    "Watch your six, keep your weapons hot, and let's get the job done. Deploy!"
  ];

  const GENERATOR_ADJECTIVES = [
    "Iron", "Vanguard", "Shadow", "Frozen", "Shattered", "Silent", "Crimson", "Obsidian", 
    "Apex", "Sovereign", "Spectral", "Steel", "Nova", "Aegis", "Valiant", "Grizzly", 
    "Eclipse", "Rogue", "Tactical", "Phalanx", "Zephyr", "Dark", "Rift", "Caliban"
  ];

  const GENERATOR_NOUNS = [
    "Crucible", "Canopy", "Dawn", "Scythe", "Horizon", "Grasp", "Sentinel", "Vortex", 
    "Starlight", "Dagger", "Phantom", "Rift", "Citadel", "Anvil", "Storm", "Fist", 
    "Vanguard", "Claw", "Shield", "Talon", "Bane", "Specter", "Reaper", "Bastion"
  ];

  // System-Specific Nouns for procedural tokens: [ENEMY], [SECURITY], [ALERT], [BASE]
  const SYSTEM_TOKENS = {
    "Stanton": {
      enemy: "NineTails corporate infiltrators",
      security: "Stanton Advocacy wings",
      alert: "corporate security sensors",
      base: "Hurston Dynamics orbital arrays"
    },
    "Pyro": {
      enemy: "Xenothreat gang divisions",
      security: "rival outlaw scout ships",
      alert: "Ruin Station scanner grids",
      base: "scrap-manning hacker nodes"
    },
    "Nyx": {
      enemy: "corporate-funded scrap mercenaries",
      security: "border blockade ships",
      alert: "People's Alliance asteroid sensors",
      base: "Levski orbital defense cells"
    }
  };

  // Transition Template Pools: Multiple distinct narrative contexts per transition category
  const TRANSITION_POOLS = {
    // Space Combat -> FPS Bunker Clearance
    "combat_bounty_fps_clearance": [
      "Scans confirm our primary goal is to secure and sweep the facility. However, the ground pad coordinates are blockaded by a local [ENEMY] response wing in orbit. We must sweep the skies, neutralize the active fighter threat first, and secure the airspace before the dropship can safely proceed with ground breach protocols.",
      "A hostile air patrol wing is actively contesting the ground landing vector, scanning for all incoming signatures. We cannot deploy our ground breach team without getting targeted in the atmosphere. Command dictates we intercept and neutralize their air support in space first, allowing us to safely touch down and clear the facility garrison.",
      "Tactical reports indicate the facility's local automated defenses are linked to an active flight commander blockading orbit. By hunting down the flight wing leader first in space, we will scramble their local terminal links, enabling us to drop in under radar cover and sweep the interior corridors undetected."
    ],
    
    // FPS Bunker Clearance -> Cargo Hauling
    "fps_clearance_cargo_hauling": [
      "The primary objective of this operation is to extract and transport high-value material freight from the facility. However, the outpost is currently occupied by a defensive garrison. We must conduct a surgical ground sweep to clear the hostile forces first, allowing our heavy cargo transport to safely touch down and haul the resources to secure drop zones.",
      "Sensors show valuable supplies sitting in the hangar grids, but a hostile [ENEMY] unit is holding a tight perimeter. We must execute a ground facility breach to neutralize their guards first. Once the sector is fully secure, our haulers will land, load the freight grids, and relocate the assets to safe coordinates.",
      "We have secured lucrative contracts to haul industrial supplies out of the facility, but the sector is crawling with ground hostiles. We must sweep the outpost corridors first to establish complete ground security. Once the threat is neutralized, we will safely load our material grids and proceed with hauling logistics."
    ],
    
    // FPS Bunker Clearance -> FPS Investigation (Intel/Data)
    "fps_clearance_fps_investigation": [
      "The primary goal of this sector run is to retrieve decrypted terminal datalinks and restricted flight files. However, the server terminal is heavily guarded. We must conduct an FPS clearance sweep first to secure the physical server rooms, allowing our tech specialists to safely bypass local firewalls and download the flight logs.",
      "Hostiles have initiated emergency data-wipe protocols from their terminal cores. To stop the purge and recover the flight data, we must first secure the facility bulkheads. We sweep and neutralize the defensive garrison first, then initiate databank search operations to recover the active intel.",
      "Command requires deep-dive telemetry files from the bunker server, but the perimeter is occupied by hostile patrols. We must execute a clean ground sweep to eliminate the local defenders first, then safely proceed with data uploads and black box diagnostics."
    ],
    
    // FPS Investigation -> Cargo Hauling
    "fps_investigation_cargo_hauling": [
      "The ultimate goal of this operation is to secure and haul critical material crates hidden in the sector. First, we must deploy to the crash site to recover the black box flight coordinates. Once we decrypt the exact storage grid files from the data logs, we will fly to the coordinates and haul the materials to drop zones.",
      "Decrypted flight logs recovered from the terminal will yield coordinates for locked supply reserves. We will search the local data hubs first to extract the vault frequencies. Once the data is secured, our cargo haulers will proceed immediately to the coordinates to load and relocate the assets.",
      "To safely execute our hauling operations, we need the security encryption bypass codes stored on local terminal databanks. We will conduct search and retrieval operations first to secure the passcode files, then proceed immediately with loading and hauling the supply freights."
    ],

    // Cargo Hauling -> Industrial Salvage
    "cargo_hauling_industrial_salvage": [
      "The primary operational objective is to salvage high-value ship hulls in the wreckage field. However, to execute the salvage run, we need to transport heavy industrial batteries and processing tools to our forward operating coordinates first. Once our cargo haulers deliver the equipment, we will immediately initiate hull scraping and wreck slicing.",
      "Command requires us to run a heavy logistics supply run to secure sector fuel reserves. Once the material crates are delivered to our forward operations base, our industrial platforms will immediately redirect to a local wreckage field. Strip the target hulls and reclaim the valuable scrap metals to maximize today's operational margins.",
      "Before we can begin hull scraping operations on the target wrecks, we must deliver standard industrial gear to our local staging base. Once the cargo hauling is complete and the tools are secured, we will immediately initiate salvage protocols to process the scrap plating."
    ],

    // Space Combat -> Industrial Salvage
    "combat_bounty_industrial_salvage": [
      "Our ultimate goal is to strip and salvage the wreckage of a massive ship hull in the sector. However, local airspace is actively patrolled by an [ENEMY] interceptor wing. We must run orbital combat sweeps to clear out these hostile fighters first. Once the skies are green, our salvage rigs will safely scrap the target hulls.",
      "Hostile fighter wings are actively contesting our salvage sectors, scanning all industrial signatures. We must sweep and neutralize these active combat interceptors first. Once the air is cleared, we will deploy our scrap platforms to strip the target hulls and process the combat wreckage.",
      "To maximize our salvage profits, we must first secure the wreckage grid from local raiders. We will engage and neutralize their defense fleet in space first, then immediately move in our industrial ships to scrape the hulls and reclaim high-value internal ship components."
    ],

    // Generic Fallback Transition Pools: 3 options per mission type
    "fallback_combat": [
      "Intelligence scans indicate [ENEMY] interceptors are attempting to blockade our path. We must establish orbital air superiority first and sweep their fighter wings to clear the vector.",
      "Command has flagged an active hostile wing contesting local airspace. We must run intercept coordinates first to neutralize their patrols before proceeding.",
      "Scans confirm our flight vector is blocked by a hostile fighter wing. We must engage and eliminate their space defense forces first to ensure a clean path."
    ],
    "fallback_fps_clearance": [
      "Tactical sensors indicate a hostile ground garrison is currently occupying our target sector. We must initiate a surgical ground breach to sweep and secure the facility corridors first.",
      "Our objectives are blocked by a defensive ground garrison holding a tight perimeter. We must conduct an FPS clearance sweep first to secure the facility pads.",
      "Ground reports confirm hostiles have established a tight defensive perimeter at the outpost. We must execute a ground breach first to eliminate target sentries."
    ],
    "fallback_fps_investigation": [
      "Command has flagged encrypted data links in the sector. We must deploy search operations first to locate the black box and recover restricted flight files.",
      "Telemetry scans show active databanks in the wreckage. We must conduct search and retrieval operations first to decrypt and secure localized flight intel.",
      "To unlock the next phase, we need target coordinates. We will search the ground site first to recover flight logs and bypass local encryption networks."
    ],
    "fallback_cargo_hauling": [
      "Logistical coordinates require immediate supply cargo redistribution. We must load and haul critical material freights to designated security drop points.",
      "Command has authorized the relocation of vital supply crates. We must secure the cargo grid first and haul the resources to commercial trade zones.",
      "Freight grids at the sector require relocation. We must load our cargo decks and transport the supply crates to secure drop parameters."
    ],
    "fallback_industrial_salvage": [
      "Target ship wreckage in the sector represents massive unrecovered credits. We must utilize hull scrapers to process the scrap plating and reclaim valuable components.",
      "Industrial sensors have located high-value wreckage grids. We must deploy salvage lasers to strip the target hulls and secure industrial scrap metals.",
      "The sector holds structural wreckage grids. We must initiate salvage scrap sweeps to strip the hull plating and salvage high-value internal components."
    ],
    "fallback_special_ops": [
      "We are entering a heavily blockaded combat sector. We must deploy heavy fleet escorts, coordinate remote turrets, and project maximum tactical firepower.",
      "A massive strategic blockade has lock downed the sector. We must deploy capital-grade fire support and maintain tight flight grids to break through.",
      "Command has flagged this as a high-intensity strategic warzone. We must coordinate multi-crew combat grids and project heavy defensive shields to survive."
    ]
  };

  /**
   * Procedural Token Replacer based on selected System
   */
  function replaceTokens(text, system) {
    const tokens = SYSTEM_TOKENS[system] || SYSTEM_TOKENS["Stanton"];
    return text
      .replace(/\[ENEMY\]/g, tokens.enemy)
      .replace(/\[SECURITY\]/g, tokens.security)
      .replace(/\[ALERT\]/g, tokens.alert)
      .replace(/\[BASE\]/g, tokens.base);
  }

  /**
   * Select a random item from an array
   */
  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generate a random Drake-style operation codename
   */
  function generateCodename() {
    const adj = GENERATOR_ADJECTIVES[Math.floor(Math.random() * GENERATOR_ADJECTIVES.length)];
    const noun = GENERATOR_NOUNS[Math.floor(Math.random() * GENERATOR_NOUNS.length)];
    return `Operation ${adj} ${noun}`;
  }

  /**
   * Get transition text between two generic archetypes
   */
  function getTransitionText(prev, next, phaseNum) {
    const transitionKey = `${prev.id}_${next.id}`;
    if (TRANSITION_POOLS[transitionKey]) {
      return randomChoice(TRANSITION_POOLS[transitionKey]);
    }
    
    // Fallback to single category general transition
    if (next.id === "combat_bounty") return randomChoice(TRANSITION_POOLS["fallback_combat"]);
    if (next.id === "fps_clearance") return randomChoice(TRANSITION_POOLS["fallback_fps_clearance"]);
    if (next.id === "fps_investigation") return randomChoice(TRANSITION_POOLS["fallback_fps_investigation"]);
    if (next.id === "cargo_hauling") return randomChoice(TRANSITION_POOLS["fallback_cargo_hauling"]);
    if (next.id === "industrial_salvage") return randomChoice(TRANSITION_POOLS["fallback_industrial_salvage"]);
    if (next.id === "special_ops") return randomChoice(TRANSITION_POOLS["fallback_special_ops"]);
    
    return `Tactical integration phase. Execute Phase ${phaseNum} parameters as dictated by local operational grids.`;
  }

  /**
   * Generate fully in-universe procedurally randomized briefings
   */
  function generateOperationBriefing(codename, system, threat, phases) {
    // System-Specific Lore Tones (Corporate Security vs. Outlaw Grit vs. Militia Solidary)
    const systemIntros = {
      "Stanton": [
        "All stations, this is Command. We have received UEE authorization clearance and a direct corporate security sponsorship for <strong>[CODENAME]</strong> here in the Stanton sector. Operating under corporate compliance guidelines, our objective is to secure commercial safety and protect corporate assets.",
        "Comms online, crew. Stanton Corporate Security has cleared our flight vectors for <strong>[CODENAME]</strong>. We are operating under official corporate contract parameters, tasked with protecting corporate investments and sweeping local trade lanes.",
        "Tactical feeds active. Sponsoring corporate boards have greenlit <strong>[CODENAME]</strong> in the Stanton sector. All actions must remain within legal security compliance parameters to protect commercial assets."
      ],
      "Pyro": [
        "Listen up, crew. We are operating in the wild zones of Pyro, and <strong>[CODENAME]</strong> is a raw turf-and-survival play. There are no security networks out here, no Advocacy wings coming to bail us out, and zero rules. We fight for every credit and scrap of plating.",
        "Crew, check your seals. We're launching into Pyro turf for <strong>[CODENAME]</strong>. No UEE network, no backup, just outlaw space. Keep your shields redline hot, weapons charged, and assume everything out here is hostile.",
        "Feeds secure. <strong>[CODENAME]</strong> is locked in for the Pyro system. Out here, we play by scavenger rules. Keep your guns hot, watch the radar, and let's secure the pay before other pirate clans trace our quantum telemetry."
      ],
      "Nyx": [
        "All crew members, coordinate frequencies. Levski Command has greenlit <strong>[CODENAME]</strong> to protect our independent sectors here in Nyx. We aren't fighting for corporate margins or pirate plunder—we are fighting for our community and our independence.",
        "Links synced. <strong>[CODENAME]</strong> is active in the Nyx system, sponsored by the People's Alliance. Conserve fuel and ammunition where possible, and look out for one another. Levski's solidarity is our greatest weapon.",
        "Militia feeds active. Operational deck is locked for <strong>[CODENAME]</strong> here in Nyx. We are deploying to defend local mining collectives and protect independent cargo corridors from aggressive outside raiders."
      ]
    };

    const threatLevels = {
      "Low": { rating: "GREEN (MINOR RESISTANCE)", armor: "Light armor, small arms, defensive pistols" },
      "Medium": { rating: "AMBER (MODERATE CONTEST)", armor: "Medium tactical plating, assault rifles, light turrets" },
      "High": { rating: "RED (HEAVY RESISTANCE)", armor: "Heavy combat suits, anti-material rifles, automated defenses" },
      "Extreme": { rating: "BLACK (LETHAL HOTZONE)", armor: "Spec-Ops heavy armor, railguns, fighter fleet escort wings" }
    };

    const systemIntroPool = systemIntros[system] || systemIntros["Stanton"];
    const selectedIntro = replaceTokens(randomChoice(systemIntroPool), system).replace("[CODENAME]", codename);
    
    const currentThreat = threatLevels[threat] || threatLevels["Medium"];
    const currentTokens = SYSTEM_TOKENS[system] || SYSTEM_TOKENS["Stanton"];

    // --- GOAL & ENABLER Narrative Builder ---
    const numPhases = phases.length;
    const climaxPhase = phases[numPhases - 1];
    
    let crewAddress = `"${selectedIntro} `;
    
    if (numPhases >= 2) {
      crewAddress += `Our primary, overarching objective for this sector run is <strong>${climaxPhase.title}</strong>. `;
      crewAddress += `However, intelligence confirms we cannot execute the main objective directly. `;
      
      // Systematically describe how the preceding phases enable the goal
      for (let i = 0; i < numPhases - 1; i++) {
        const current = phases[i];
        const next = phases[i + 1];
        const text = getTransitionText(current, next, i + 1);
        crewAddress += `${text} `;
      }
    } else {
      crewAddress += `We are deploying directly to secure <strong>${phases[0].title}</strong>. `;
    }

    // Inject System Lore tokens into the Crew Address
    crewAddress = replaceTokens(crewAddress, system);

    const randomOpener = randomChoice(COMMANDER_OPENERS);
    const randomCloser = randomChoice(COMMANDER_CLOSERS);
    
    // Assemble final speech
    crewAddress = `"${randomOpener} ${crewAddress.substring(1, crewAddress.length - 1)} Intelligence reports threat resistance in the sector is <strong>${currentThreat.rating}</strong>, consisting of ${currentTokens.enemy}. ${randomCloser}"`;

    // --- Build Chronological Flight Sequence HTML ---
    let timeline = "";
    for (let i = 0; i < numPhases; i++) {
      const current = phases[i];
      const isClimax = (i === numPhases - 1);
      
      timeline += `<p><strong>Phase 0${i + 1}: ${current.title}</strong><br/>`;
      
      if (isClimax) {
        timeline += `<em>Tactical Justification:</em> **PRIMARY OBJECTIVE (CLIMAX)**. This represents the ultimate goal of the operation. All preceding enablers lead directly to securing this sector vector.<br/>`;
      } else {
        const next = phases[i + 1];
        const transitionText = getTransitionText(current, next, i + 1);
        timeline += `<em>Tactical Justification:</em> **OPERATIONAL ENABLER**. ${replaceTokens(transitionText, system)}<br/>`;
      }
      timeline += `</p><br/>`;
    }

    // --- Build Crew Roleplay Directives ---
    const phasesRP = [];
    phases.forEach((phase, index) => {
      let rpRule = "";
      if (phase.id === "combat_bounty") {
        rpRule = "Maintain tight fighter wings. Interceptors lead formation, heavy gunboats hold rear cover. Keep comms limited strictly to targeting coordinates.";
      } else if (phase.id === "fps_clearance") {
        rpRule = "Surgical breaching rules. Stack at elevators, deploy shield operators first, check all corner zones, and do not fire until target is fully verified.";
      } else if (phase.id === "fps_investigation") {
        rpRule = "Establish 360-degree security perimeter. Operators hold all access corridors while tech specialists conduct data decrypts at the terminals.";
      } else if (phase.id === "cargo_hauling") {
        rpRule = "Lock remote turrets. Pilot holds hot cockpit while loader crews operate synchronized tractor beams to stage cargo crates.";
      } else if (phase.id === "industrial_salvage") {
        rpRule = "Conserve laser heat. Industrial scraping ships strip outer hull armor plates, while support crews stage unrefined scrap container cargo.";
      } else if (phase.id === "special_ops") {
        rpRule = "Redline active shields. Multi-crew gunners lock remote turrets. Project heavy combat fire support and focus targeting on major hostiles.";
      } else {
        rpRule = "Maintain active scanners and corporate PMC tactical awareness.";
      }

      phasesRP.push({
        phaseNum: index + 1,
        rule: rpRule
      });
    });

    // Recommended insertion vector based on System
    let insertion = "";
    if (system === "Stanton") {
      insertion = "Secure corporate flight vector. Approach under local security satellite coordinates. Ground breach utilizes standard ground vehicles (STV/Cyclone) dropped 1,200m out.";
    } else if (system === "Pyro") {
      insertion = "Outlaw vector. Drop quantum drive 2,500m out from coordinates to avoid local pirate scans. Approach low-altitude, hugging terrain canyons.";
    } else {
      insertion = "Militia fuel-conserving vector. Approach low thermal signature under Delamar asteroid cover to prevent blockade scanners tracking energy grids.";
    }

    return {
      codename,
      system,
      threat: currentThreat.rating,
      threatDetails: currentTokens.enemy,
      threatArmor: currentThreat.armor,
      speechToCrew: crewAddress,
      timelineHTML: timeline,
      insertionVector: insertion,
      gearsList: `Tactical gear spec: ${currentThreat.armor}. Recommended entry tactics: ${insertion}`,
      phasesRP: phasesRP
    };
  }

  // Export functions to global window scope
  window.SC_GENERATOR = {
    generateCodename,
    generateBriefing: generateOperationBriefing
  };
} catch (loadErr) {
  console.error("SC-TOC Generator Load Crash:", loadErr);
  alert("SC-TOC Tactical Generator Load Crash:\n\n" + loadErr.message + "\n\nStack:\n" + loadErr.stack);
}
