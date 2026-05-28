/**
 * SC-TOC: Monolithic Tactical Operations Center Controller & Generator (Revision 4)
 * Merges the UEE-Allied PMC Narrative Grammar Engine and Dashboard Logic into a single atomic script.
 * 100% self-contained and immune to browser caching race conditions.
 */

document.addEventListener("DOMContentLoaded", () => {
  try {
    // ==========================================
    // 1. DATA DICTIONARY (Generic Mission Types)
    // ==========================================
    const SC_CONTRACTS = [
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

    const SC_SYSTEMS = {
      "Stanton": ["Hurston", "Crusader", "ArcCorp", "microTech"],
      "Pyro": ["Pyro I", "Pyro II", "Pyro III", "Pyro IV", "Pyro V", "Pyro VI", "Ruin Station"],
      "Nyx": ["Delamar", "Levski", "Nyx I", "Nyx II", "Nyx III"]
    };

    // ==========================================
    // 2. MODULAR NARRATIVE GRAMMAR ENGINE
    // ==========================================

    // System-Specific Nouns for [ENEMY], [SECURITY], [ALERT], [BASE] (Strictly UEE-Allied PMC)
    const SYSTEM_TOKENS = {
      "Stanton": {
        enemy: "NineTails corporate defector cells",
        security: "Stanton Advocacy patrols",
        alert: "corporate security sensors",
        base: "Hurston Dynamics orbital arrays"
      },
      "Pyro": {
        enemy: "Xenothreat insurgent wings",
        security: "Coalition defense scanners",
        alert: "independent defense grids",
        base: "Coalition outpost radars"
      },
      "Nyx": {
        enemy: "border syndicate raiders",
        security: "Delamar defense taskforces",
        alert: "People's Alliance sensors",
        base: "Levski orbital tracking nodes"
      }
    };

    // Layer 1: System-Specific PMC Authorization Intros (Strictly Lawful UEE-Allied)
    const SYSTEM_INTROS = {
      "Stanton": [
        "Stanton Security Command has cleared our flight vectors for **[CODENAME]** under corporate compliance guidelines. Our directive is to safeguard local commercial lanes.",
        "We have locked in official corporate taskforce vectors for **[CODENAME]** in the Stanton sector. Operating under legal compliance guidelines, stay sharp.",
        "Advocacy telemetry is synced for **[CODENAME]** in Stanton. Sponsoring corporate boards have cleared our operational corridor, maintain legal compliance profiles."
      ],
      "Pyro": [
        "We are launching into Pyro's contested grids for **[CODENAME]** under a Coalition expeditionary contract. There is no Advocacy backup out here, shields hot.",
        "Check your seals, crew. We are locking quantum vectors for **[CODENAME]** in Pyro turf under Coalition security directives. Scan all contacts.",
        "Feeds secure. **[CODENAME]** is active in the Pyro system. Sponsoring security alliances have contracted us for a regional sweep. Outlaw space—guns hot."
      ],
      "Nyx": [
        "Levski local defense has greenlit our flight corridor for **[CODENAME]** here in Nyx. We are protecting independent mining corridors and safeguarding community assets.",
        "Frequencies coordinated for **[CODENAME]** in the Nyx system under Levski People's Alliance authorization. Solidarity is our primary security factor, look out for each other.",
        "Operational deck is locked for **[CODENAME]** here in Nyx under Delamar local defense contracts. Defend the local mining collectives and protect regional freighters."
      ]
    };

    // Layer 2: Connecting Prerequisite Transitions (All 36 Combinations - Fully Logical, UEE-Allied PMC)
    const TRANSITION_POOL = {
      // Space Combat to FPS Bunker
      "combat_bounty_fps_clearance": [
        "Before ground breach teams can safely insert at the facility, we must clear contested space vectors. The primary ground location is guarded by a local [ENEMY] patrol wing in orbit. Sweeping and neutralizing these interceptors first (Phase 1) secures the dropship corridor and denies the facility any orbital air support during the ground clearing phase (Phase 2).",
        "A hostile fighter patrol is blockading airspace above the ground sector. We cannot drop ground tactical teams without getting targeted in the atmosphere. Command dictates we intercept and neutralize their air support wing in orbit first (Phase 1), allowing us to safely touch down and breach the facility bulkheads (Phase 2).",
        "Facility automated defenses are linked to an active flight coordinator in orbit. By hunting down the flight wing leader first in space (Phase 1), we will scramble their local radar links, allowing ground teams to drop in under terrain cover undetected and clear the facility corridors (Phase 2)."
      ],
      
      // FPS Bunker to Cargo Hauling (A-to-B logic)
      "fps_clearance_cargo_hauling": [
        "The primary goal of this sector run is to haul high-value cargo from Point A to the secure UEE depot at Point B. However, the cargo storage facility at Point A is currently held by a defensive garrison. We must execute a ground facility breach to clear the defenders first (Phase 1), ensuring our heavy transport grids can safely touch down at Point A, load the freight, and haul it to Point B (Phase 2).",
        "To safely execute our cargo hauling operations from Point A to Point B, we must first establish ground safety at the loading terminal at Point A. We will deploy ground forces to clear a hostile occupying squad first (Phase 1), allowing our cargo loaders to safely stage the supplies and haul the freight to Point B (Phase 2).",
        "Freight grids sitting at Point A must be hauled to Point B, but local ground security at the pickup pad is heavily compromised. We must execute an FPS clearance sweep at Point A first (Phase 1) to neutralize the threat, enabling a secure, unharassed load-and-haul run to Point B (Phase 2)."
      ],

      // FPS Bunker to FPS Investigation
      "fps_clearance_fps_investigation": [
        "The main objective of this deployment is to retrieve encrypted data logs from terminal cores. However, the facility bulkheads are heavily guarded. We must execute a clean ground sweep to eliminate local defenders first (Phase 1), allowing our tech specialists to safely access database rooms and decrypt the restricted flight files (Phase 2).",
        "Hostiles have initiated emergency data-wipe protocols from their terminal cores. To stop the purge and recover the flight data, we must first secure the facility bulkheads. We sweep and neutralize the defensive garrison first (Phase 1), then initiate databank search operations to recover the active intel (Phase 2).",
        "Command requires deep-dive telemetry files from the bunker server, but the perimeter is occupied by hostile patrols. We must execute a clean ground sweep to eliminate the local defenders first (Phase 1), then safely proceed with data uploads and black box diagnostics (Phase 2)."
      ],

      // FPS Investigation to Cargo Hauling (A-to-B logic)
      "fps_investigation_cargo_hauling": [
        "Our primary objective is to haul locked supply crates from Point A to the secure base at Point B. However, the vault access codes are stored on a crashed vessel in the sector. First, we must search the crash site and recover the flight data logs (Phase 1). Once decrypted, we will proceed to Point A, bypass the locks, and safely haul the materials to Point B (Phase 2).",
        "To execute our hauling run from Point A to Point B, we need the security encryption bypass keys held in a local ground terminal database. We will conduct search and retrieval operations at the ground outpost first (Phase 1) to secure the codes, then proceed to Point A to load the grids and haul the freight to Point B (Phase 2).",
        "We are tasked with hauling tactical ordnance from Point A to Point B, but we lack the UEE flight manifests required to clear regional border blockades. We must search a local downed scout ship first to recover the UEE flight logs (Phase 1), enabling us to legally haul the cargo from Point A to Point B (Phase 2) without sector scans flag-alerting our ships."
      ],

      // Cargo Hauling to Industrial Salvage (A-to-B logic)
      "cargo_hauling_industrial_salvage": [
        "The primary operational objective is to salvage a high-value ship wreck. However, to execute the salvage run, we must deliver heavy industrial repair components and laser batteries from Point A to our staging outpost at Point B. Once our cargo haulers deliver the equipment (Phase 1), our industrial rigs will deploy from Point B to process the target hulls (Phase 2).",
        "Before we can begin hull scraping operations on the target wrecks, we must resupply our sector staging base at Point B. We will haul industrial gear from Point A to Point B first (Phase 1). Once the tools are secured at the FOB, we will immediately launch salvage protocols to strip the target hulls (Phase 2).",
        "Industrial salvage lasers require massive energy cells currently stored at UEE Depot A. We must haul these energy cells from Point A to our fleet carrier at Point B first (Phase 1), allowing our salvage teams to power up their scraping arrays and strip the target wrecks in the sector (Phase 2)."
      ],

      // Space Combat to Industrial Salvage
      "combat_bounty_industrial_salvage": [
        "Our ultimate goal is to strip and salvage the wreckage of a massive ship hull. However, local airspace is actively patrolled by an [ENEMY] interceptor wing. We must run orbital combat sweeps to clear out these hostile fighters first (Phase 1). Once the skies are green, our salvage rigs will safely scrap the target hulls (Phase 2).",
        "Hostile fighter wings are actively contesting our salvage sectors, scanning all industrial signatures. We must sweep and neutralize these active combat interceptors first (Phase 1). Once the air is cleared, we will deploy our scrap platforms to strip the target hulls and process the combat wreckage (Phase 2).",
        "To maximize our salvage profits, we must first secure the wreckage grid from local raiders. We will engage and neutralize their defense fleet in space first (Phase 1), then immediately move in our industrial ships to scrape the hulls and reclaim high-value internal ship components (Phase 2)."
      ],

      // Hauling to FPS Bunker (A-to-B logic - Casualty Evac Staging)
      "cargo_hauling_fps_clearance": [
        "Our primary objective is a high-risk tactical ground raid to clear the facility bulkheads. Under UEE military guidelines, we cannot initiate ground raids without establishing an active medical evacuation pipeline first. We will execute a logistics haul first, transporting emergency medical crates from Point A to the regional staging center at Point B (Phase 1). Once the CASEVAC post is operational at Point B, ground teams are cleared to launch the bunker assault (Phase 2).",
        "Tactical command requires us to secure facility bulkheads, but our ground assault teams lack the heavy ballistic munitions currently sitting at UEE Depot A. We must haul these ordnance crates from Point A to our forward staging post at Point B (Phase 1). Once resupplied, we proceed immediately to initiate the facility clearance (Phase 2).",
        "We are cleared to launch a ground facility breach, but first we must resupply our sector's radar blocking systems. We will execute a cargo run, hauling specialized jamming components from Point A to the local orbital relay at Point B (Phase 1). Once the relay is powered up, the facility's long-range scan arrays will be blinded, allowing ground teams to launch the breach (Phase 2) undetected."
      ],

      // FPS Bunker to Space Combat
      "fps_clearance_combat_bounty": [
        "The primary goal of this operation is to neutralize an [ENEMY] flight wing leader blockading space lanes. However, the target wing is currently receiving real-time targeting coordinates from a ground tracking station. We must execute a ground bunker assault to disable their array first (Phase 1), forcing the target wing to fly blind and allowing our fighters to intercept and neutralize them in space (Phase 2).",
        "To destroy the hostile patrol wing blockading orbit, we must first neutralize their ground-to-air anti-ship battery. We will deploy ground forces to breach the facility and disable the battery generators (Phase 1). Once the airspace is clear, our fighter wings can safely engage and eliminate the blockading fleet in space (Phase 2).",
        "Our primary target is a hostile flight coordinator. However, they are currently sheltered within an orbital shields envelope powered by a ground outpost. We must assault and secure the facility to shut down the shield transmitters first (Phase 1), exposing the target wing to immediate space intercept operations (Phase 2)."
      ],

      // FPS Investigation to FPS Bunker
      "fps_investigation_fps_clearance": [
        "Our overarching objective is to sweep and secure the ground facility perimeter. However, the facility's security vault is currently locked down on an automated server loop. We must search a downed cargo ship crash site first to recover the mainframe bypass keys (Phase 1). Once secured, ground teams will initiate the facility assault (Phase 2) with immediate door override capability.",
        "To safely breach the facility, we need to locate the base's ventilation blueprints stored on an encrypted data core at a nearby crash site. We will deploy to search the crash site and recover the core first (Phase 1), then utilize the structural maps to execute a surgical ground breach at the facility (Phase 2).",
        "The primary goal is a hard breach of the facility corridors. To ensure our tactical teams aren't ambushed by internal defensive turrets, we must search a nearby outpost first to decrypt their regional sensor files (Phase 1). Once the turret layout is secured, we launch our facility sweep (Phase 2) with complete tactical visibility."
      ],

      // FPS Investigation to Space Combat
      "fps_investigation_combat_bounty": [
        "We are contracted to neutralize a high-priority [ENEMY] wing leader blockading orbit. To pinpoint their exact quantum vector, we must search a local crash site first to recover their crashed scout wing's black box data (Phase 1). Once we decrypt the telemetry, our fighter squadrons will launch space intercept operations (Phase 2) directly onto their coordinates.",
        "The primary target is a hostile patrol wing blockading sector airspace. First, we must search a local ground database to decrypt their active flight schedules and orbital coordinates (Phase 1). Armed with this intelligence, our combat fleet will jump to space coordinates and eliminate the blockading wing (Phase 2).",
        "Command has authorized the neutralization of an [ENEMY] fleet commander. To lure them out of their heavy staging base, we must first infiltrate a ground outpost and upload corrupted navigation data to their relay (Phase 1), forcing the commander's ship to jump into space coordinates where our fighters lie in wait (Phase 2)."
      ],

      // Cargo Hauling to Cargo Hauling (A-to-B and B-to-C logic)
      "cargo_hauling_cargo_hauling": [
        "Logistical grids require a multi-stage transport sequence. First, we are hauling heavy industrial supplies from Point A to the regional distributor at Point B (Phase 1). Immediately upon delivery, we will load our grids with high-value medical crates at Point B and haul them to the secure UEE base at Point C (Phase 2) to complete the sector supply lines.",
        "We are executing a double-chain logistics operation. Phase 1 requires transporting specialized engine parts from Point A to our staging carrier at Point B. Once received, our transport will reload with essential food/medical freights at Point B and haul them to the contested settlement at Point C (Phase 2).",
        "Logistical commands have cleared a two-phase cargo run. We will load raw minerals at Point A and transport them to the refinery at Point B (Phase 1). Once the drop is registered, we will haul the refined alloy grids from Point B to the planetary security shipyard at Point C (Phase 2)."
      ],

      // Cargo Hauling to Space Combat (A-to-B logic)
      "cargo_hauling_combat_bounty": [
        "Our primary objective is to engage and neutralize an [ENEMY] flight wing blockading local sectors. However, our fighter squadron's ordnance reserves are heavily depleted. First, we must haul heavy torpedoes and missile grids from Point A to the security carrier at Point B (Phase 1). Once our fighters are resupplied, we launch space intercept operations (Phase 2) to break the blockade.",
        "Tactical command has authorized space combat operations against an active patrol wing. To ensure local security forces can support us, we must first execute a logistical haul, delivering fuel arrays from Point A to the UEE security station at Point B (Phase 1). Once their support fleet is powered up, we initiate the combat run (Phase 2) with active patrol backup.",
        "To clear the blockade in orbit, we must first stage supplies for the sector's civilian evacuation ships. We will haul critical medical supplies from Point A to the orbital station at Point B (Phase 1). Once the evacuation lines are locked in, our combat fighters will launch space sweeps (Phase 2) to eliminate the blockading fleet."
      ],

      // Cargo Hauling to FPS Investigation (A-to-B logic)
      "cargo_hauling_fps_investigation": [
        "Our primary goal is to search a downed cargo ship and recover its restricted flight data. However, the crash site is located in an extreme hazardous atmosphere. First, we must haul environmental shelter gear and hazard tanks from Point A to our local outpost at Point B (Phase 1). Staging these supplies allows our ground specialists to safely deploy to the crash site and recover the intel (Phase 2).",
        "To safely search the crash site and decrypt the black box, we need a high-power decryption terminal currently sitting at UEE Depot A. We must haul this terminal from Point A to our local relay outpost at Point B (Phase 1), allowing our ground teams to interface with the wreck and extract the telemetry files (Phase 2).",
        "Logistics requires us to deliver secure server cores from Point A to UEE Base B (Phase 1). Delivering these cores is a prerequisite because the intelligence database at Base B is the only facility equipped to decrypt the crashed scout ship's data core that we are tasked with recovering in Phase 2."
      ],

      // Industrial Salvage to Space Combat
      "industrial_salvage_combat_bounty": [
        "Our primary objective is to intercept and eliminate an [ENEMY] wing leader blockading sector lanes. To locate their exact stealth frequency, we must first deploy our salvage lasers to strip the structural hull of a disabled scout ship (Phase 1), exposing and extracting their tactical encryption mainframe. Once decrypted, we initiate space combat runs (Phase 2) on their coordinates.",
        "We are contracted to neutralize an active fighter wing. First, we will deploy to a local wreckage field to salvage raw metal alloy grids (Phase 1). Reclaiming these materials is a prerequisite, as the corporate sponsor will use these alloys to repair and resupply our fighter squadron before we initiate the combat run (Phase 2).",
        "Command has authorized space intercept operations. To secure UEE defensive escorts, we must first execute salvage operations, stripping disabled wreck hulls to extract rare titanium composites (Phase 1). Once delivered to the UEE shipyard, they will deploy fighter wings to support our combat run (Phase 2)."
      ],

      // Industrial Salvage to FPS Bunker
      "industrial_salvage_fps_clearance": [
        "Our ultimate goal is to sweep and secure the ground facility perimeter. To bypass their heavy reinforced blast doors, we need heavy industrial cutting lasers. First, we will deploy to a nearby space wreck to salvage structural laser grids and power emitters (Phase 1). Staging these scrap tools allows our ground forces to breach the facility and clear the garrison (Phase 2).",
        "We are tasked with an FPS facility clearance. To ensure the facility's emergency power grids don't activate their automated defense turrets, we must first salvage the local orbital power relay wreck, cutting its main conduits and stripping the core (Phase 1). With the relay disabled, we launch our ground bunker assault (Phase 2) under complete power blackout.",
        "Our ground team is authorized to breach the facility bulkheads. First, we must salvage a downed transport wreck nearby, stripping its cargo grids to extract heavy hazardous combat suits (Phase 1). Once equipped, our ground forces will breach the facility (Phase 2), protected against their toxic security gas systems."
      ],

      // Industrial Salvage to FPS Investigation
      "industrial_salvage_fps_investigation": [
        "We are tasked with deploying to a crash site to recover a highly secure black box core. Because the black box is buried deep within fused titanium bulkheads, we must first conduct salvage scraping operations on the outer ship hull (Phase 1) to cut away the structural wreckage. Once the hull is sliced, our ground team will safely search the interior and extract the data core (Phase 2).",
        "To recover encrypted databanks from a downed vessel, we must first use salvage lasers to dismantle the outer structural shielding and clear the wreckage (Phase 1). Once the hull layers are stripped, our technicians will deploy to the mainframe terminals to search the database and extract the flight files (Phase 2).",
        "The primary goal is to search a derelict outpost and recover encrypted files. To ensure our scanners can penetrate the outpost's shielding, we must first salvage a nearby military wreck, stripping its sensors grid to extract a high-power scanner booster (Phase 1). Staging the booster enables our search operations (Phase 2)."
      ],

      // Industrial Salvage to Cargo Hauling (A-to-B logic)
      "industrial_salvage_cargo_hauling": [
        "Our strategic contract requires us to haul processed alloy grids from Point A to the planetary security center at Point B. First, we must deploy to a local wreck site at Point A to execute hull scraping and salvage operations, cutting the wrecks to extract the raw alloys (Phase 1). Once the cargo grids are fully loaded at Point A, we haul the freight to Point B (Phase 2).",
        "To execute our cargo hauling run from Point A to Point B, we must first gather the cargo. We will deploy our salvage platforms to a ship wreck at Point A, stripping the structural plating and loading the cargo grid with scrap metals (Phase 1). Once fully loaded, we will fly to Point B to deliver the resources (Phase 2).",
        "We are contracted to haul commercial salvage crates from Point A to Point B. First, our salvage crews must deploy to the wreck coordinates at Point A, utilizing scrap lasers to slice the hull and extract the secured components (Phase 1). Once the scrap is boxed and staged at Point A, our haulers will deliver it to Point B (Phase 2)."
      ],

      // Industrial Salvage to Industrial Salvage
      "industrial_salvage_industrial_salvage": [
        "Industrial commands have cleared a double wreckage reclamation sweep. First, our teams will deploy to strip the outer hull plating of a light fighter wreck (Phase 1). Once processed, we immediately redirect our heavy scrap lasers to a neighboring capital ship wreck (Phase 2) to fracture the main structural hull and secure maximum titanium margins.",
        "We are executing a two-stage salvage operation. Phase 1 requires hull scraping the starboard hull of a disabled cargo transport to extract raw aluminum alloys. Once stripped, we will launch Phase 2: using structural fracturing lasers to slice open the ship's main reactor housing to extract high-value core components.",
        "To maximize payout, we are running consecutive salvage sweeps. First, we will deploy to scrape the hull plating of an Aegis wreck (Phase 1). Once the cargo grid is staged, we immediately redirect to a Drake wreckage grid (Phase 2) to salvage internal components and secure industrial copper composites."
      ],

      // Special Operations to Space Combat
      "special_ops_combat_bounty": [
        "Our primary objective is to neutralize an active [ENEMY] flight wing harassing sector traffic. First, we must deploy to a high-intensity strategic warzone to break an orbital capital ship blockade (Phase 1). Dispelling this blockade is a prerequisite, as it deprives the target flight wing of their primary logistics carrier, forcing them to scatter where our fighters can easily intercept and neutralize them (Phase 2).",
        "Tactical command has authorized space combat operations. To ensure our fighters aren't ambushed by massive threat fleets, we must first participate in a major fleet defense operation, reinforcing UEE capital ships against heavy bombers (Phase 1). Once the main fleet is secure, our squadrons will redirect to sweep and eliminate the remaining fighter wings (Phase 2).",
        "To clear the blockade in orbit, we must first participate in a joint taskforce capital defense run. Once the UEE flagship is secured (Phase 1), they will deploy strategic sector scans to locate and flag the hostile flight leader's coordinates, enabling us to launch space intercept operations (Phase 2) with complete tactical visibility."
      ],

      // Special Operations to FPS Bunker
      "special_ops_fps_clearance": [
        "Our primary goal is to sweep and secure a ground facility perimeter. However, the local star system is locked down by a massive orbital capital ship blockade. First, we must deploy to space coordinates to participate in a joint fleet blockade break (Phase 1). Clearing the skies is a prerequisite, allowing our dropships to safely enter the atmosphere and land ground forces to assault the facility (Phase 2).",
        "We are tasked with a ground facility clearance. To ensure the facility doesn't receive orbital air support, we must first participate in a major space fleet defense operation, reinforcing the UEE security carrier against hostile bombers (Phase 1). Once air superiority is locked in, our ground forces will breach the facility and clear the garrison (Phase 2).",
        "Our tactical team is authorized to breach the ground bunker. To disable the outpost's planetary defense shield, we must first execute an orbital capital strike, neutralizing their space shielding relay (Phase 1). With their orbital shields collapsed, our dropships will drop in on foot and execute the ground assault (Phase 2)."
      ],

      // Special Operations to FPS Investigation
      "special_ops_fps_investigation": [
        "We are tasked with searching a downed cargo vessel crash site to recover secure UEE databanks. Because the crash site is blockaded by a massive fleet, we must first participate in a high-intensity strategic fleet blockade break (Phase 1) to clear the space lane. Once the blockade is broken, our ground search teams can safely land and extract the UEE files (Phase 2).",
        "To safely search the derelict outpost and recover the black box, we must first secure regional airspace by reinforcing the local UEE capital ship against active bomber threats (Phase 1). Once the strategic space sector is secure, our ground forces will deploy to the outpost to decrypt the databases and secure the flight logs (Phase 2).",
        "The primary goal is to recover encrypted flight logs from a downed capital wreck. First, we must participate in a major fleet orbital raid to disable their regional comms blockade (Phase 1). Once the jamming network is down, our search teams will deploy to the wreck to extract and upload the encrypted databanks (Phase 2)."
      ],

      // Special Operations to Cargo Hauling (A-to-B logic)
      "special_ops_cargo_hauling": [
        "Our strategic contract requires us to haul critical civilian medical supplies from Point A to Point B. However, the cargo route at Point A is actively contested by a massive threat fleet. First, we must participate in a joint taskforce blockade break at Point A to clear the skies (Phase 1). Once the airspace is secure, our cargo transport will touch down, load the supplies, and safely haul them to Point B (Phase 2).",
        "To execute our cargo hauling run from Point A to Point B, we must first clear a path through blockaded space. We will deploy our combat ships to reinforce the local UEE security carrier against active threat wings first (Phase 1). With the shipping lanes cleared, our transport can safely load the freight at Point A and deliver it to Point B (Phase 2).",
        "We are contracted to haul commercial supplies from Point A to Point B. First, we must participate in an orbital fleet raid to secure UEE authorization codes (Phase 1). Staging these UEE transit codes is a prerequisite, allowing our cargo transport to legally pass through regional blockades from Point A to Point B (Phase 2)."
      ],

      // Special Operations to Industrial Salvage
      "special_ops_industrial_salvage": [
        "Our primary objective is to salvage the wreckage of a massive UEE capital ship. However, the wreckage grid is actively guarded by a blockading threat fleet. First, we must participate in a high-intensity joint taskforce fleet defense to break the blockade (Phase 1). Once the threat ships are neutralized, our salvage crews will move in to scrape the hull and process the scrap metal (Phase 2).",
        "To scrape the hull plating of the contested wreck, we must first secure the space lane. We will deploy to space coordinates to reinforce the local security carrier against active bomber wings (Phase 1). With airspace secured, our industrial platforms will safely touch down on the wreck and initiate salvage scraping (Phase 2).",
        "The primary goal is to salvage titanium composites from a blockaded wreck. First, we must participate in a major fleet orbital strike to disable their capital shielding grids (Phase 1). With their shields down, we will deploy our industrial lasers to fracture the hull and reclaim high-value components (Phase 2)."
      ],

      // Special Operations to Special Operations
      "special_ops_special_ops": [
        "Tactical command has cleared a two-phase strategic campaign. First, we must deploy to space coordinates to participate in a high-intensity joint taskforce capital strike, neutralizing their primary logistics carrier (Phase 1). Once disabled, we will immediately jump to secondary coordinates to reinforce our contested flagship against active bomber waves (Phase 2).",
        "We are executing a double-chain fleet operation. Phase 1 requires reinforcing UEE capital ships against heavy bomber sweeps to secure our sector staging carrier. Once the carrier is safe, we immediately launch Phase 2: participating in a joint taskforce orbital raid to break the primary enemy blockade grid.",
        "To survive in this contested warzone, we must execute consecutive strategic fleet runs. First, we will join the fleet defense grid to protect the UEE flagship (Phase 1). Once secured, we immediately redirect to launch a coordinated capital assault (Phase 2) to neutralize the threat's sector dreadnought."
      ],

      // General / Fallback Transitions (if any IDs are anomalous)
      "general": [
        "Logistical grids require systematic multi-phase execution. Phase 0[N] acts as a critical tactical enabler. We must secure our positions, establish active operational grids, and execute our directives under UEE compliance guidelines.",
        "Command reports that Phase 0[N] is a vital prerequisite to clear local contested vectors. We will coordinate our flight plans, deploy target systems, and ensure complete compliance to UEE protocols.",
        "Tactical feasibility mandates the successful resolution of Phase 0[N] before further operations. Stay sharp, watch your sensors, and execute your directives in uniform coordination."
      ]
    };

    // Layer 3: Dynamic Tactical Complications (Fully Randomized for rich variety)
    const COMPLICATIONS_POOL = [
      "Sensors flag localized solar flare interference in the sector, which will severely scramble our long-range comms—maintain strict visual contact and coordinate on short-range tactical channels.",
      "Intelligence reports a high probability of local civilian logistics traffic in the surrounding grids—verify all signatures, maintain strict scanning protocols, and ensure zero non-hostile collateral.",
      "Operational feeds indicate the hostiles have deployed automated proximity sensors around their coordinates—approach low-altitude, minimize electromagnetic signatures, and proceed under terrain masking.",
      "Tactical updates show severe atmospheric turbulence and low-visibility weather patterns in the target zone—pilot must lock dampeners and ground teams utilize thermal scanner overlays.",
      "Scans indicate the threat has established secondary orbital jammer networks—expect active radar scrambling and maintain complete manual targeting overlays during combat runs.",
      "Scans detect high levels of cosmic radiation surrounding the grid—suit oxygen seals must be checked and operational windows are strictly timed.",
      "Intelligence warns of localized asteroid debris drifting into the approach corridor—lock shield deflectors and maintain strict flight path corrections.",
      "Local scanners show high electromagnetic noise—missile lock times are doubled, prepare for manual dumb-fire or secondary gun runs.",
      "Target signature is masked by localized planetary gas venting—visual verification of hostile markings is required before engaging weapons.",
      "Threat forces have active thermal tracking relays—minimize reactor output, glide to target under low-power output arrays."
    ];

    // Layer 4: Tactical Rules of Engagement (ROE) (Fully Randomized)
    const ROE_POOL = [
      "Rules of engagement: Lethal force is authorized on all active hostiles. Minimize collateral damage to corporate assets and conserve ship ammunition.",
      "Rules of engagement: Protect the crew at all costs. Maintain tight squad coordination, do not fire until targets are fully verified, and stay locked in combat formations.",
      "Rules of engagement: Executive directive. Conserve ammunition and fuel grids. Keep comms limited strictly to targeting telemetry, and secure payout archives upon completion.",
      "Rules of engagement: UEE joint taskforce directives apply. Lethal response cleared for confirmed threat signatures. Maintain 360-degree security and check your lines.",
      "Rules of engagement: Hostiles must be clearly identified with active weapons lock before firing. Zero warning shots, neutralize threats instantly.",
      "Rules of engagement: In-universe standard defense procedures apply. Hold fire until fired upon or when defensive targets are directly threatened. Protect transport corridors first.",
      "Rules of engagement: Surgical strikes only. Minimize infrastructure damage. Avoid utilizing heavy explosive ordnance inside facility bounds.",
      "Rules of engagement: High-alert protocols. Secure high-value assets and prisoners if possible. Lethal force cleared for defensive resistance."
    ];

    // --- Expanded Generator Wordlists & Helper Scope Functions ---
    const GENERATOR_ADJECTIVES = [
      "Iron", "Vanguard", "Shadow", "Frozen", "Shattered", "Silent", "Crimson", "Obsidian", 
      "Apex", "Sovereign", "Spectral", "Steel", "Nova", "Aegis", "Valiant", "Grizzly", 
      "Eclipse", "Rogue", "Tactical", "Phalanx", "Zephyr", "Dark", "Rift", "Caliban",
      "Onyx", "Quantum", "Solar", "Glacial", "Titan", "Nebula", "Specter", "Astral",
      "Nomad", "Hunter", "Stardust", "Pioneer"
    ];

    const GENERATOR_NOUNS = [
      "Crucible", "Canopy", "Dawn", "Scythe", "Horizon", "Grasp", "Sentinel", "Vortex", 
      "Starlight", "Dagger", "Phantom", "Rift", "Citadel", "Anvil", "Storm", "Fist", 
      "Vanguard", "Claw", "Shield", "Talon", "Bane", "Specter", "Reaper", "Bastion",
      "Beacon", "Crest", "Shackle", "Strike", "Garrison", "Apex", "Wraith", "Hammer",
      "Warden", "Revenant", "Saber", "Stalker"
    ];

    function replaceTokens(text, system) {
      const tokens = SYSTEM_TOKENS[system] || SYSTEM_TOKENS["Stanton"];
      return text
        .replace(/\[ENEMY\]/g, tokens.enemy)
        .replace(/\[SECURITY\]/g, tokens.security)
        .replace(/\[ALERT\]/g, tokens.alert)
        .replace(/\[BASE\]/g, tokens.base);
    }

    function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateCodename() {
      const adj = GENERATOR_ADJECTIVES[Math.floor(Math.random() * GENERATOR_ADJECTIVES.length)];
      const noun = GENERATOR_NOUNS[Math.floor(Math.random() * GENERATOR_NOUNS.length)];
      return `Operation ${adj} ${noun}`;
    }

    // ==========================================
    // 3. MAIN CONTROLLER LOGIC & DOM BINDINGS
    // ==========================================
    const plannerForm = document.getElementById("planner-form");
    const scaleSelect = document.getElementById("op-scale");
    const systemSelect = document.getElementById("op-system");
    const sponsorSelect = document.getElementById("op-sponsor");
    const threatSelect = document.getElementById("op-threat");
    const codenameInput = document.getElementById("op-codename");
    const randCodenameBtn = document.getElementById("btn-rand-codename");
    const phaseBuilderContainer = document.getElementById("phase-builder-container");

    const hudEmptyState = document.getElementById("hud-empty-state");
    const hudActiveState = document.getElementById("hud-active-state");
    const hudOpName = document.getElementById("hud-op-name");
    const hudOpSubtitle = document.getElementById("hud-op-subtitle");
    const hudOpProgressPct = document.getElementById("hud-op-progress-pct");
    const hudOpProgressBar = document.getElementById("hud-op-progress-bar");
    const bannerContainer = document.getElementById("banner-container");

    const speechText = document.getElementById("brief-speech-text");
    const threatBody = document.getElementById("brief-threat-body");
    const logisticsBody = document.getElementById("brief-logistics-body");
    const timelineHTML = document.getElementById("brief-timeline-html");
    const checklistContainer = document.getElementById("hud-phases-checklist-container");

    const logbookEmpty = document.getElementById("logbook-empty");
    const logbookTableContainer = document.getElementById("logbook-table-container");
    const logbookTbody = document.getElementById("logbook-tbody");
    const clearHistoryBtn = document.getElementById("btn-clear-history");

    const clockEl = document.getElementById("hud-clock");

    // --- State Variables ---
    let activeOperation = null;
    let historyLogs = [];

    // --- Clock Updater ---
    function updateClock() {
      if (clockEl) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        clockEl.textContent = timeStr;
      }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Tab Controllers ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const tabId = btn.getAttribute("data-tab");
        document.querySelectorAll(".tab-content").forEach(content => {
          content.classList.remove("active");
        });
        const targetTab = document.getElementById(tabId);
        if (targetTab) targetTab.classList.add("active");
      });
    });

    // --- Campaign Deck State & UI Selectors ---
    const btnToggleCampaign = document.getElementById("btn-toggle-campaign-view");
    const campaignStatusText = document.getElementById("campaign-status-text");
    const campaignProgressText = document.getElementById("campaign-progress-text");
    const campaignSetupPanel = document.getElementById("campaign-setup-panel");
    const campaignSetupFormGroup = document.getElementById("campaign-setup-form-group");
    const campaignNameInput = document.getElementById("campaign-name-input");
    const campaignLengthSelect = document.getElementById("campaign-length-select");
    const btnCommissionCampaign = document.getElementById("btn-commission-campaign");
    const campaignActiveControls = document.getElementById("campaign-active-controls");
    const campaignActiveTitle = document.getElementById("campaign-active-title");
    const campaignStatSuccess = document.getElementById("campaign-stat-success");
    const campaignStatFailed = document.getElementById("campaign-stat-failed");
    const btnRetireCampaign = document.getElementById("btn-retire-campaign");

    let activeCampaign = null;

    function saveCampaign() {
      if (activeCampaign) {
        localStorage.setItem("SC_TOC_CAMPAIGN", JSON.stringify(activeCampaign));
      } else {
        localStorage.removeItem("SC_TOC_CAMPAIGN");
      }
    }

    function loadCampaign() {
      const saved = localStorage.getItem("SC_TOC_CAMPAIGN");
      if (saved) {
        try {
          activeCampaign = JSON.parse(saved);
        } catch (e) {
          activeCampaign = null;
        }
      }
      renderCampaignUI();
    }

    function renderCampaignUI() {
      if (!campaignStatusText || !campaignProgressText) return;

      if (!activeCampaign) {
        campaignStatusText.textContent = "OFFLINE";
        campaignStatusText.style.color = "var(--color-text-muted)";
        campaignProgressText.textContent = "-";
        if (campaignSetupFormGroup) campaignSetupFormGroup.style.display = "block";
        if (campaignActiveControls) campaignActiveControls.style.display = "none";

        // Unlock system and sponsor selectors
        if (systemSelect) systemSelect.disabled = false;
        if (sponsorSelect) sponsorSelect.disabled = false;
      } else {
        const currentOp = activeCampaign.stats.completed + 1;
        campaignStatusText.textContent = `ACTIVE (OP ${currentOp} OF ${activeCampaign.totalOps})`;
        campaignStatusText.style.color = "var(--color-primary)";
        campaignProgressText.textContent = `${activeCampaign.stats.success} W // ${activeCampaign.stats.failed} L`;

        if (campaignSetupFormGroup) campaignSetupFormGroup.style.display = "none";
        if (campaignActiveControls) campaignActiveControls.style.display = "block";

        if (campaignActiveTitle) campaignActiveTitle.textContent = activeCampaign.name;
        if (campaignStatSuccess) campaignStatSuccess.textContent = activeCampaign.stats.success;
        if (campaignStatFailed) campaignStatFailed.textContent = activeCampaign.stats.failed;

        // Lock system and sponsor selectors to ensure campaign consistency
        if (systemSelect) {
          systemSelect.value = activeCampaign.system;
          systemSelect.disabled = true;
        }
        if (sponsorSelect) {
          // Temporarily populate sponsor if not present
          let optExists = Array.from(sponsorSelect.options).some(opt => opt.value === activeCampaign.sponsor);
          if (!optExists) {
            const opt = document.createElement("option");
            opt.value = activeCampaign.sponsor;
            opt.textContent = activeCampaign.sponsor;
            sponsorSelect.appendChild(opt);
          }
          sponsorSelect.value = activeCampaign.sponsor;
          sponsorSelect.disabled = true;
        }
      }
    }

    function updateAiStatusHeader() {
      const hudAiStatus = document.getElementById("hud-ai-status");
      if (!hudAiStatus) return;

      const aiEnabled = localStorage.getItem("SC_TOC_AI_ENABLED") === "true";
      const geminiKey = localStorage.getItem("SC_TOC_GEMINI_KEY");

      if (aiEnabled && geminiKey) {
        hudAiStatus.textContent = "CONNECTED";
        hudAiStatus.style.color = "var(--color-primary)";
      } else if (aiEnabled && !geminiKey) {
        hudAiStatus.textContent = "NO KEY";
        hudAiStatus.style.color = "var(--color-danger)";
      } else {
        hudAiStatus.textContent = "OFFLINE";
        hudAiStatus.style.color = "var(--color-text-muted)";
      }
    }

    // UI toggle
    if (btnToggleCampaign && campaignSetupPanel) {
      btnToggleCampaign.addEventListener("click", () => {
        const isCollapsed = campaignSetupPanel.style.display === "none";
        campaignSetupPanel.style.display = isCollapsed ? "block" : "none";
        btnToggleCampaign.textContent = isCollapsed ? "🗉 Collapse" : "📊 Expand Control";
      });
    }

    // Commission Campaign
    if (btnCommissionCampaign) {
      btnCommissionCampaign.addEventListener("click", () => {
        if (!campaignNameInput || !campaignLengthSelect) return;
        const nameVal = campaignNameInput.value.trim() || `Campaign ${generateCodename().replace("Operation ", "")}`;
        const total = parseInt(campaignLengthSelect.value);

        activeCampaign = {
          active: true,
          name: nameVal,
          system: systemSelect.value,
          sponsor: sponsorSelect.value,
          totalOps: total,
          stats: {
            completed: 0,
            success: 0,
            failed: 0
          },
          lastOpOutcome: null,
          lastOpCodename: null,
          lastOpClimaxType: null
        };

        saveCampaign();
        renderCampaignUI();
        randomizeCodename(); // update name immediately
      });
    }

    // Decommission Campaign
    if (btnRetireCampaign) {
      btnRetireCampaign.addEventListener("click", () => {
        if (confirm("⚠️ WARNING: This will immediately abort and wipe the active Campaign from the console memory. Proceed?")) {
          activeCampaign = null;
          saveCampaign();
          renderCampaignUI();
          randomizeCodename();
        }
      });
    }

    // --- Dynamic Codename Generator ---
    function randomizeCodename() {
      if (codenameInput) {
        if (activeCampaign && activeCampaign.active) {
          codenameInput.value = `Operation ${activeCampaign.name.replace("Campaign ", "")} ${activeCampaign.stats.completed + 1}`;
        } else {
          codenameInput.value = generateCodename();
        }
      }
    }
    if (randCodenameBtn) {
      randCodenameBtn.addEventListener("click", () => {
        if (activeCampaign && activeCampaign.active) {
          alert("Operational naming scheme is automatically locked under the active Campaign contract grid.");
        } else {
          randomizeCodename();
        }
      });
    }
    randomizeCodename(); // Initial default codename

    // --- Dynamic Phase Builder dropdowns ---
    function rebuildPhaseSelectors() {
      if (!scaleSelect || !phaseBuilderContainer) return;
      
      const numPhases = parseInt(scaleSelect.value);
      phaseBuilderContainer.innerHTML = "";

      for (let i = 1; i <= numPhases; i++) {
        const phaseDiv = document.createElement("div");
        phaseDiv.className = `phase-builder-item ${i === 1 ? 'active' : ''}`;
        
        const phaseTag = document.createElement("span");
        phaseTag.className = "phase-tag";
        phaseTag.textContent = `PHASE 0${i}`;
        phaseDiv.appendChild(phaseTag);

        const formGroup = document.createElement("div");
        formGroup.className = "form-group";
        formGroup.style.margin = "0";

        const select = document.createElement("select");
        select.id = `phase-select-${i}`;
        select.className = "phase-dropdown-select";

        SC_CONTRACTS.forEach(c => {
          const option = document.createElement("option");
          option.value = c.id;
          option.textContent = c.type;
          select.appendChild(option);
        });

        // Default variety selection
        const allSelectOptions = select.querySelectorAll("option");
        if (allSelectOptions.length > 0) {
          const randIndex = Math.floor(Math.random() * allSelectOptions.length);
          allSelectOptions[randIndex].selected = true;
        }

        formGroup.appendChild(select);
        phaseDiv.appendChild(formGroup);
        phaseBuilderContainer.appendChild(phaseDiv);
      }
    }
    if (scaleSelect) {
      scaleSelect.addEventListener("change", rebuildPhaseSelectors);
    }
    rebuildPhaseSelectors(); // Initial build

    // --- Star System / Sponsor Dynamic Auto-Updater ---
    if (systemSelect && sponsorSelect) {
      systemSelect.addEventListener("change", () => {
        const sys = systemSelect.value;
        sponsorSelect.innerHTML = "";

        const sponsorsBySystem = {
          "Stanton": [
            { val: "Hurston Dynamics Tactical Command", text: "Hurston Dynamics Tactical Command" },
            { val: "Crusader Security Fleet", text: "Crusader Industries Fleet Security" },
            { val: "microTech Logistical Protection", text: "microTech Logistical Protection" },
            { val: "Bounty Hunters Guild (Stanton)", text: "Bounty Hunters Guild (Stanton Office)" },
            { val: "Stanton Civilian Defense Force", text: "Stanton Civilian Defense Force (CDF)" }
          ],
          "Pyro": [
            { val: "Coalition Expeditionary Command", text: "Coalition Frontier Joint Taskforce" },
            { val: "Independent Settlement Alliance", text: "Pyro Free Settlers Alliance" },
            { val: "Ruin Station Security Syndicate", text: "Ruin Station Allied Security" },
            { val: "Coalition Logistics Protection", text: "Coalition Logistics Escort wing" }
          ],
          "Nyx": [
            { val: "People's Alliance of Levski", text: "People's Alliance of Levski" },
            { val: "Nyx Independent Miners Association", text: "Nyx Mining Collective Protection" },
            { val: "Delamar Local Defense Force", text: "Delamar Local Defense Force" }
          ]
        };

        const currentSponsors = sponsorsBySystem[sys] || sponsorsBySystem["Stanton"];
        currentSponsors.forEach(s => {
          const option = document.createElement("option");
          option.value = s.val;
          option.textContent = s.text;
          sponsorSelect.appendChild(option);
        });
      });
      systemSelect.dispatchEvent(new Event("change"));
    }

    // ==========================================
    // 4. THE PROCEDURAL BRIEFING COMPILER
    // ==========================================
    function compileBriefing(codename, system, threat, phases) {
      const threatLevels = {
        "Low": { rating: "GREEN (MINOR RESISTANCE)", armor: "Light armor, small arms, defensive pistols" },
        "Medium": { rating: "AMBER (MODERATE CONTEST)", armor: "Medium tactical plating, assault rifles, light turrets" },
        "High": { rating: "RED (HEAVY RESISTANCE)", armor: "Heavy combat suits, anti-material rifles, automated defenses" },
        "Extreme": { rating: "BLACK (LETHAL HOTZONE)", armor: "Spec-Ops heavy armor, railguns, fighter fleet escort wings" }
      };

      const currentTokens = SYSTEM_TOKENS[system] || SYSTEM_TOKENS["Stanton"];
      const currentThreat = threatLevels[threat] || threatLevels["Medium"];

      // 1. Compile System/Campaign Intro (Layer 1)
      let selectedIntro = "";

      if (activeCampaign && activeCampaign.active) {
        const opNum = activeCampaign.stats.completed + 1;
        const lastOutcome = activeCampaign.lastOpOutcome;
        const lastOpName = activeCampaign.lastOpCodename;
        const lastClimax = activeCampaign.lastOpClimaxType;

        if (opNum === 1) {
          // Inaugural Campaign Intro
          const campaignFirstIntros = {
            "Stanton": [
              `Stanton Security Command has officially commissioned our battle grid under **${activeCampaign.name}**. Sponsoring corporate boards have allocated orbital clearance logs for our first deployment sequence. Stay inside legal commercial frameworks as we secure the sector vectors.`,
              `This operational run marks the inaugural deployment of **${activeCampaign.name}** under corporate compliance contracts. We are tasked by Stanton Command to protect civilian assets and maintain grid logistics.`
            ],
            "Pyro": [
              `Check your weapons grids—this is the inaugural deployment of **${activeCampaign.name}** here in the wild sectors of Pyro. Sponsoring local settlement alliances have contracted our PMC fleet for deep security patrols. Outlaw space—shields hot.`,
              `Comms clear. We are launching the first strategic sweep of **${activeCampaign.name}** in the contested grids of Pyro. No Advocacy backup coming, stick together and look out for each other.`
            ],
            "Nyx": [
              `Militia feeds online. Levski Local Defense has cleared our battle group for **${activeCampaign.name}**. We are deploying to secure independent mining arrays and safe corridors for the mining collectives.`,
              `Solidarity, crew. This marks the beginning of **${activeCampaign.name}** under Delamar local defense authority. We defend Levski's independence from border syndicates.`
            ]
          };
          const firstPool = campaignFirstIntros[system] || campaignFirstIntros["Stanton"];
          selectedIntro = randomChoice(firstPool);
        } else if (lastOutcome === "SUCCESS") {
          // Success Follow-up Campaign Intro
          const campaignSuccessIntros = {
            "Stanton": [
              `Following our highly successful sweep of **${lastOpName}** where our tactical teams successfully secured the climax vector, we have established firm control over local orbits. Sponsoring boards have immediate clearance logs for our next contract push.`,
              `Advocacy telemetry is glowing green after our flawless resolution of **${lastOpName}**. Stanton Command is leveraging our PMC momentum to lock in our next security clearance.`
            ],
            "Pyro": [
              `Solid work on **${lastOpName}**, crew. Securing the climax objective in that zone has reinforced Coalition defenses. Sponsoring settlements are doubling our tactical pay margins as we launch our next sweep.`,
              `We have hostile telemetry scrambling after our successful breach of **${lastOpName}**. Sponsoring frontier alliances have cleared our flight decks to press our combat advantage in the neighboring sector.`
            ],
            "Nyx": [
              `Levski miners are broadcasting thanks after our successful defense in **${lastOpName}**. Sponsoring militia guilds have cleared our fuel arrays to deploy our next sector protection run.`,
              `With **${lastOpName}** secured and archived under success parameters, the People's Alliance has cleared our flight grids for a secondary sweep.`
            ]
          };
          const successPool = campaignSuccessIntros[system] || campaignSuccessIntros["Stanton"];
          selectedIntro = randomChoice(successPool);
        } else {
          // Recovery/Retaliation Campaign Intro
          const campaignFailureIntros = {
            "Stanton": [
              `Listen up. Following the tactical setback in **${lastOpName}** where our mission goals were compromised, corporate boards are demanding immediate recovery action. We are launching an high-priority retaliation sweep to re-establish commercial compliance.`,
              `Attention, crew. Sponsoring corporate boards are locking down security files after our failure in **${lastOpName}**. We must conduct a highly disciplined, standard recovery run to secure the lost sectors.`
            ],
            "Pyro": [
              `Attention, battle deck. Our tactical withdraw in **${lastOpName}** has left the sector vulnerable. We are launching a high-priority combat sweep to secure the forward staging grids and protect our outposts.`,
              `No time to lick our wounds, crew. Our failure in **${lastOpName}** has hostile scanners tracking our signature. We must launch a fast recovery sweep immediately—shields redline hot.`
            ],
            "Nyx": [
              `Links synced. After the tactical setback in **${lastOpName}** where border syndicates compromised our cargo corridors, Levski militia is calling in our reserve squads. We must execute a secure recovery sweep.`,
              `With independent sectors compromised after our operational defeat in **${lastOpName}**, Delamar local defense requires a high-priority defensive response to secure local miners.`
            ]
          };
          const failurePool = campaignFailureIntros[system] || campaignFailureIntros["Stanton"];
          selectedIntro = randomChoice(failurePool);
        }
      } else {
        // Standard One-Off Intro
        const introPool = SYSTEM_INTROS[system] || SYSTEM_INTROS["Stanton"];
        selectedIntro = randomChoice(introPool).replace("[CODENAME]", codename);
      }

      // 2. Compile Connective Timeline & Address Speech (Layer 2 - Goal/Enabler)
      const numPhases = phases.length;
      const climaxPhase = phases[numPhases - 1];

      let crewAddress = `${selectedIntro} `;
      let timeline = "";

      if (numPhases >= 2) {
        const objectiveIntros = [
          `Our primary, overarching objective for this tactical sector run is <strong>${climaxPhase.title}</strong>. `,
          `Tactical command has designated <strong>${climaxPhase.title}</strong> as our ultimate objective for this sector run. `,
          `All strategic vectors for this contract converge on our primary target: <strong>${climaxPhase.title}</strong>. `,
          `We are locking in our main tactical focus: <strong>${climaxPhase.title}</strong>. `
        ];
        crewAddress += randomChoice(objectiveIntros);

        for (let i = 0; i < numPhases - 1; i++) {
          const current = phases[i];
          const next = phases[i + 1];
          const transitionKey = `${current.id}_${next.id}`;
          
          let transitionText = "";
          if (TRANSITION_POOL[transitionKey]) {
            transitionText = randomChoice(TRANSITION_POOL[transitionKey]);
          } else {
            // Safe fallback using generic array
            const fallbackKey = `fallback_${next.id.replace("combat_bounty", "combat")}`;
            const pool = TRANSITION_POOL[fallbackKey] || TRANSITION_POOL["general"];
            transitionText = randomChoice(pool).replace("[N]", i + 1);
          }

          crewAddress += `${transitionText} `;
        }
      } else {
        crewAddress += `We are deploying directly under UEE security coordinates to secure <strong>${phases[0].title}</strong>. `;
      }

      // Inject system tokens into address
      crewAddress = replaceTokens(crewAddress, system);

      // 3. Compile Random Tactical Complication & ROE (Layer 3 & 4)
      const complication = replaceTokens(randomChoice(COMPLICATIONS_POOL), system);
      const roe = randomChoice(ROE_POOL);

      // Finalize read-aloud commander speech (Streamlined - NO stacked alert openers/closers!)
      const fullSpeech = `${crewAddress.trim()} Furthermore, ${complication} ${roe}`;

      // 4. Compile Chronological Flight Sequence HTML
      for (let i = 0; i < numPhases; i++) {
        const current = phases[i];
        const isClimax = (i === numPhases - 1);
        
        timeline += `<p><strong>Phase 0${i + 1}: ${current.title}</strong><br/>`;
        
        if (isClimax) {
          timeline += `<em>Tactical Justification:</em> **PRIMARY OBJECTIVE (CLIMAX)**. This represents the ultimate goal of the operation. All preceding enablers lead directly to securing this sector vector.<br/>`;
        } else {
          const next = phases[i + 1];
          const transitionKey = `${current.id}_${next.id}`;
          let transitionText = "";
          
          if (TRANSITION_POOL[transitionKey]) {
            transitionText = randomChoice(TRANSITION_POOL[transitionKey]);
          } else {
            const fallbackKey = `fallback_${next.id.replace("combat_bounty", "combat")}`;
            const pool = TRANSITION_POOL[fallbackKey] || TRANSITION_POOL["general"];
            transitionText = randomChoice(pool).replace("[N]", i + 1);
          }
          
          timeline += `<em>Tactical Justification:</em> **OPERATIONAL ENABLER**. ${replaceTokens(transitionText, system)}<br/>`;
        }
        timeline += `</p><br/>`;
      }

      // 5. Compile Crew Roleplay Directives
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
        insertion = "Secure corporate flight vector. Approach under local security satellite coordinates. Ground breach utilizes ground Cyclone/STV vehicles dropped 1,200m out.";
      } else if (system === "Pyro") {
        insertion = "Taskforce vector. Drop quantum drive 2,500m out from coordinates to avoid local scanner sweeps. Approach low-altitude, hugging terrain cover.";
      } else {
        insertion = "Militia fuel-conserving vector. Approach low thermal signature under Delamar asteroid cover to prevent blockade arrays tracking energy grids.";
      }

      return {
        codename,
        system,
        threat: currentThreat.rating,
        threatDetails: currentTokens.enemy,
        threatArmor: currentThreat.armor,
        speechToCrew: fullSpeech,
        timelineHTML: timeline,
        insertionVector: insertion,
        gearsList: `Tactical gear spec: ${currentThreat.armor}. Recommended entry tactics: ${insertion}`,
        phasesRP: phasesRP,
        complication: complication,
        roe: roe
      };
    }

    // ==========================================
    // 5. SYSTEM CONFIG CONFIGURATION BINDERS
    // ==========================================
    const btnOpenSettings = document.getElementById("btn-open-settings");
    const settingsModal = document.getElementById("settings-modal");
    const settingAiEnabled = document.getElementById("setting-ai-enabled");
    const settingGeminiKey = document.getElementById("setting-gemini-key");
    const settingAiModel = document.getElementById("setting-ai-model");
    const btnCloseSettings = document.getElementById("btn-close-settings");
    const btnSaveSettings = document.getElementById("btn-save-settings");

    if (btnOpenSettings && settingsModal) {
      btnOpenSettings.addEventListener("click", () => {
        // Load latest configuration values
        if (settingAiEnabled) settingAiEnabled.checked = localStorage.getItem("SC_TOC_AI_ENABLED") === "true";
        if (settingGeminiKey) settingGeminiKey.value = localStorage.getItem("SC_TOC_GEMINI_KEY") || "";
        if (settingAiModel) settingAiModel.value = localStorage.getItem("SC_TOC_AI_MODEL") || "gemini-flash-latest";
        
        settingsModal.classList.add("active");
      });
    }

    if (btnCloseSettings && settingsModal) {
      btnCloseSettings.addEventListener("click", () => {
        settingsModal.classList.remove("active");
      });
    }

    if (btnSaveSettings && settingsModal) {
      btnSaveSettings.addEventListener("click", () => {
        if (settingAiEnabled) localStorage.setItem("SC_TOC_AI_ENABLED", settingAiEnabled.checked);
        if (settingGeminiKey) localStorage.setItem("SC_TOC_GEMINI_KEY", settingGeminiKey.value.trim());
        if (settingAiModel) localStorage.setItem("SC_TOC_AI_MODEL", settingAiModel.value);
        
        settingsModal.classList.remove("active");
        renderCampaignUI();
        updateAiStatusHeader();
      });
    }

    // ==========================================
    // 6. ASSEMBLE FORM SUBMIT & STORAGE PERSISTENCE
    // ==========================================
    if (plannerForm) {
      plannerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const codename = codenameInput.value;
        const system = systemSelect.value;
        const sponsor = sponsorSelect.value;
        const threat = threatSelect.value;
        const numPhases = parseInt(scaleSelect.value);

        // Collect selected contracts
        const selectedPhases = [];
        for (let i = 1; i <= numPhases; i++) {
          const select = document.getElementById(`phase-select-${i}`);
          if (select) {
            const contractId = select.value;
            const contract = SC_CONTRACTS.find(c => c.id === contractId);
            if (contract) {
              selectedPhases.push({
                ...contract,
                status: "PENDING"
              });
            }
          }
        }

        // Compile base static briefing (acts as fail-safe fallback)
        let briefing = compileBriefing(
          codename,
          system,
          threat,
          selectedPhases
        );

        // Check if Neural AI Bridge is active
        const aiEnabled = localStorage.getItem("SC_TOC_AI_ENABLED") === "true";
        const geminiKey = (localStorage.getItem("SC_TOC_GEMINI_KEY") || "").trim();
        const aiModel = localStorage.getItem("SC_TOC_AI_MODEL") || "gemini-flash-latest";

        console.log("SC-TOC: Submit handler entered. aiEnabled:", aiEnabled, "geminiKey length:", geminiKey.length, "aiModel:", aiModel);

        if (aiEnabled && geminiKey) {
          console.log("SC-TOC: Neural AI Bridge is active. Initializing API call.");
          // Auto-focus Active HUD Tab to show processing overlay
          const hudTabBtn = document.querySelector('[data-tab="active-hud-tab"]');
          if (hudTabBtn) hudTabBtn.click();

          // Render BLINKING NEURAL LOADER overlay on the HUD Board
          const speechContainer = document.getElementById("brief-speech-text");
          let loader = null;
          if (speechContainer) {
            loader = document.createElement("div");
            loader.className = "neural-loading-overlay";
            loader.innerHTML = `
              <div class="neural-loading-spinner"></div>
              <div class="blink-text">AEGIS NEURAL INTEL CONNECTING...</div>
              <div style="font-size: 9px; color: var(--color-text-muted); margin-top: 10px; max-width: 320px; line-height: 1.4;">
                Synthesizing multi-phase campaign objectives with zero-CORS local terminal instructions.
              </div>
            `;
            speechContainer.style.position = "relative";
            speechContainer.appendChild(loader);
          }

          try {
            const systemInstruction = `You are the Lead Intelligence Officer for a UEE-aligned Private Military Coalition. Your job is to compile a realistic, gritty, and narrative-driven tactical intelligence briefing for Captain Nico and his crew.

Return your response strictly as a single, valid JSON object. Do NOT wrap the JSON in markdown code blocks, do not add any markdown backticks, and do not add any conversational text before or after the JSON.

The JSON structure MUST follow this exact format:
{
  "briefing": "Cinematic, Tom Clancy style situational briefing. Use clear, high-impact tactical paragraph sections with HTML <br/> spacing. Break down the phases into a clean, bold bulleted list (e.g. using <strong>Phase 1: ...</strong>) for instant HUD scannability. Keep it highly narrative and immersive.",
  "threatDetails": "Custom, realistic intel details about the hostiles and local tactical environment (under 25 words). Never invent specific named NPCs or custom coordinates.",
  "insertionVector": "Custom recommended entry tactics and landing specifications (under 30 words). Keep it highly technical.",
  "crewDirectives": [
    "Custom crew roleplay directive for Phase 1",
    "Custom crew roleplay directive for Phase 2 (add one for each phase requested)"
  ]
}

Follow these strict constraints for the content:
1. Tone & Voice: Highly professional, human, story-driven, realistic, and narrative. Speak in a natural, gritty, first-person plural voice representing the "Intel Team" (e.g. "we've got," "our recon suggests," "we recommend"). Avoid overly-complicated administrative jargon.
2. Variety & Creative Hooks: Randomize your narrative framing, hooks, and opening angles. Sometimes start with a scout report, sometimes with a decoded emergency signal, sometimes with a corporate bounty posting, and sometimes with a direct military SITREP.
3. Narrative Connection (No Formulaic Phrases): Connect the phases with organic, highly creative, and logical tactical justifications. Strictly AVOID formulaic phrasing like "In order to do B, we must first do A."
4. No Gameplay Clashing Details: Do NOT invent specific named NPCs, custom coordinates, or precise base names. Never use fourth-wall breaking gaming terms like "FPS," "bunker," or "subterranean." Keep ground locations referred to as "outposts," "facilities," or "strongholds."
5. Complication & ROE Integration: Seamlessly blend the complication and Rules of Engagement (ROE) at the end of the "briefing" text as a natural tactical heads-up from the intel team.
6. Phase Directives Alignment: Match the length of the "crewDirectives" array exactly to the number of phases requested (e.g., if there are 2 phases in the flow, provide exactly 2 custom crew directives).`;

            const promptText = `Generate the intel JSON dossier for:
- Operation Codename: "${codename}"
- Sector: "${system}"
- Sponsoring Client: "${sponsor}"
- Threat Profile: "${threat} (${briefing.threatDetails})"
- Mission Flow:
${selectedPhases.map((p, idx) => `  * Phase ${idx+1}: ${p.type} - "${p.title}" (${p.description})`).join("\n")}
- Complication Parameter: "${briefing.complication}"
- Rules of Engagement: "${briefing.roe}"
`;

            console.log("SC-TOC: Requesting Gemini API with prompt length:", promptText.length);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${geminiKey}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: promptText
                  }]
                }],
                systemInstruction: {
                  parts: [{
                    text: systemInstruction
                  }]
                },
                generationConfig: {
                  temperature: 0.8,
                  maxOutputTokens: 1000,
                  responseMimeType: "application/json",
                  thinkingConfig: {
                    thinkingBudget: 0
                  }
                }
              })
            });

            console.log("SC-TOC: Gemini response received. status:", response.status, "ok:", response.ok);

            if (!response.ok) {
              throw new Error(`Gemini API HTTP Error: status ${response.status}`);
            }

            const data = await response.json();
            
            if (data && data.error) {
              throw new Error(`Gemini API Error: ${data.error.message || data.error.status}`);
            }

            if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
              throw new Error("Gemini API returned an empty or invalid response structure.");
            }

            const rawText = data.candidates[0].content.parts[0].text.trim();
            console.log("SC-TOC: Raw response text fetched successfully. Length:", rawText.length);
            
            // Strip potential markdown blocks
            let cleanedText = rawText;
            if (cleanedText.startsWith("```json")) {
              cleanedText = cleanedText.substring(7);
            }
            if (cleanedText.endsWith("```")) {
              cleanedText = cleanedText.substring(0, cleanedText.length - 3);
            }
            cleanedText = cleanedText.trim();

            const parsedJSON = JSON.parse(cleanedText);
            console.log("SC-TOC: Parsed JSON successfully:", parsedJSON);
            
            if (parsedJSON.briefing) {
              briefing.speechToCrew = parsedJSON.briefing;
            } else {
              console.warn("SC-TOC: Parsed JSON is missing the 'briefing' key.");
            }
            if (parsedJSON.threatDetails) {
              briefing.threatDetails = parsedJSON.threatDetails;
            }
            if (parsedJSON.insertionVector) {
              briefing.insertionVector = parsedJSON.insertionVector;
              briefing.gearsList = `Tactical gear spec: ${briefing.threatArmor}. Recommended entry tactics: ${parsedJSON.insertionVector}`;
            }
            if (parsedJSON.crewDirectives && Array.isArray(parsedJSON.crewDirectives)) {
              briefing.phasesRP = parsedJSON.crewDirectives.map((directive, index) => ({
                phaseNum: index + 1,
                rule: directive
              }));
            }
          } catch (apiErr) {
            console.error("SC-TOC: Gemini AI bridge compilation failed, reverting to local static compiler.", apiErr);
            briefing.speechToCrew = `"[System Alert: Secure comms link degraded. Reverting to local static command grids. Error: ${apiErr.message}]" <br/><br/> ${briefing.speechToCrew}`;
          } finally {
            if (loader) loader.remove();
          }
        } else {
          console.log("SC-TOC: Neural AI Bridge is OFFLINE or key is missing. Using local static engine.");
        }

        // Save Active Operation State
        activeOperation = {
          codename,
          system,
          sponsor,
          threat,
          briefing,
          phases: selectedPhases,
          timestamp: new Date().toLocaleString()
        };

        saveActiveOperation();
        renderActiveHUD();

        // Auto-focus Active HUD Tab
        const hudTabBtn = document.querySelector('[data-tab="active-hud-tab"]');
        if (hudTabBtn) hudTabBtn.click();
      });
    }

    // --- Render Active Operation HUD UI ---
    function renderActiveHUD() {
      if (!activeOperation) {
        if (hudEmptyState) hudEmptyState.style.display = "flex";
        if (hudActiveState) hudActiveState.style.display = "none";
        return;
      }

      if (hudEmptyState) hudEmptyState.style.display = "none";
      if (hudActiveState) hudActiveState.style.display = "block";

      // Set Header/Banner Values
      if (hudOpName) hudOpName.textContent = activeOperation.codename;
      if (hudOpSubtitle) hudOpSubtitle.textContent = `${activeOperation.system} Sector // Sponsoring Tactical Client: ${activeOperation.sponsor}`;

      // Load Briefing Board Texts
      if (speechText) speechText.innerHTML = activeOperation.briefing ? activeOperation.briefing.speechToCrew || "" : "";
      if (threatBody) {
        threatBody.innerHTML = activeOperation.briefing ? `
          <strong>Threat Profile:</strong> ${activeOperation.briefing.threat || ""}<br/>
          <strong>Intel Details:</strong> ${activeOperation.briefing.threatDetails || ""}<br/>
          <strong>Tactical Limit:</strong> ${activeOperation.briefing.threatArmor || ""}
        ` : "";
      }
      if (logisticsBody) {
        logisticsBody.innerHTML = activeOperation.briefing ? `
          <strong>Logistics:</strong> ${activeOperation.briefing.insertionVector || ""}<br/>
          <strong>Operational Spec:</strong> ${activeOperation.briefing.gearsList || ""}
        ` : "";
      }
      if (timelineHTML) timelineHTML.innerHTML = activeOperation.briefing ? activeOperation.briefing.timelineHTML || "" : "";

      // Redraw Checklist Phases
      if (checklistContainer) {
        checklistContainer.innerHTML = "";
        activeOperation.phases.forEach((phase, index) => {
          const card = document.createElement("div");
          card.className = `phase-card`;
          if (phase.status === "COMPLETED") card.classList.add("completed");
          if (phase.status === "FAILED") card.classList.add("failed");

          // Custom RP description rule
          let rpText = "Maintain active radar and standard combat awareness.";
          if (activeOperation.briefing && activeOperation.briefing.phasesRP) {
            const rpObj = activeOperation.briefing.phasesRP.find(r => r.phaseNum === (index + 1));
            if (rpObj) rpText = rpObj.rule;
          }

          card.innerHTML = `
            <div class="phase-status-indicator">
              <div class="phase-circle">${phase.status === "COMPLETED" ? "✓" : phase.status === "FAILED" ? "✕" : (index + 1)}</div>
              ${index < activeOperation.phases.length - 1 ? '<div class="phase-line"></div>' : ''}
            </div>
            <div class="phase-card-info">
              <div class="phase-card-header">
                <span class="phase-card-num">PHASE 0${index + 1}</span>
                <span class="phase-card-type">${phase.type}</span>
              </div>
              <h4 class="phase-card-name">${phase.title}</h4>
              <p class="phase-card-desc">${phase.description}</p>
              <div class="phase-card-rp">
                <strong>Crew Roleplay Directives:</strong> ${rpText}
              </div>
              
              ${phase.status === "PENDING" ? `
                <div class="phase-action-buttons">
                  <button class="btn btn-mini btn-complete" data-index="${index}">✓ COMPLETE</button>
                  <button class="btn btn-danger btn-mini btn-fail" data-index="${index}">✕ FAIL</button>
                </div>
              ` : ''}
            </div>
          `;

          checklistContainer.appendChild(card);
        });

        // Bind checklist action buttons
        document.querySelectorAll(".btn-complete").forEach(btn => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-index"));
            activeOperation.phases[idx].status = "COMPLETED";
            onPhaseStateChange();
          });
        });

        document.querySelectorAll(".btn-fail").forEach(btn => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-index"));
            activeOperation.phases[idx].status = "FAILED";
            onPhaseStateChange();
          });
        });
      }

      // Update Progress calculations
      calculateProgress();
    }

    // --- Phase Completion Event ---
    function onPhaseStateChange() {
      saveActiveOperation();
      renderActiveHUD();
    }

    // --- Progress Math & Completion Handler ---
    function calculateProgress() {
      if (!activeOperation) return;
      const total = activeOperation.phases.length;
      const resolved = activeOperation.phases.filter(p => p.status !== "PENDING").length;
      const completed = activeOperation.phases.filter(p => p.status === "COMPLETED").length;
      
      const progressPct = Math.round((resolved / total) * 100);
      if (hudOpProgressPct) hudOpProgressPct.textContent = `${progressPct}%`;
      if (hudOpProgressBar) hudOpProgressBar.style.width = `${progressPct}%`;

      // If all phases are resolved (Completed or Failed), render "Complete Operation" box
      if (resolved === total) {
        renderOperationClosure(completed, total);
      }
    }

    // Render closure button at bottom of checklist
    function renderOperationClosure(completedCount, totalCount) {
      const closureDiv = document.createElement("div");
      closureDiv.style.marginTop = "20px";
      closureDiv.style.borderTop = "1px solid rgba(254, 161, 0, 0.15)";
      closureDiv.style.paddingTop = "15px";

      const isSuccessful = completedCount === totalCount;
      const statusText = isSuccessful ? "SUCCESSFUL" : `${completedCount}/${totalCount} PHASES COMPLETED`;

      closureDiv.innerHTML = `
        <div style="background: rgba(254, 161, 0, 0.03); border: 1px solid var(--color-primary); border-radius: 2px; padding: 15px; text-align: center;">
          <h4 style="font-family: var(--font-console); font-size: 14px; color: ${isSuccessful ? 'var(--color-primary)' : 'var(--color-danger)'}; margin-bottom: 8px; letter-spacing: 1px;">
            🛡️ OPERATION TERMINAL COMPLETED
          </h4>
          <p style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 12px;">
            All tactical sectors resolved. Outcome: <strong>${statusText}</strong>.
          </p>
          <button class="btn" id="btn-close-operation">🔒 COLLECT SECURED PAY & ARCHIVE BRIEFING</button>
        </div>
      `;

      if (checklistContainer) {
        checklistContainer.appendChild(closureDiv);
        const closeBtn = document.getElementById("btn-close-operation");
        if (closeBtn) closeBtn.addEventListener("click", archiveActiveOperation);
      }
    }

    // --- Archive Active Operation into Logbook History ---
    // --- Archive Active Operation into Logbook History ---
    function archiveActiveOperation() {
      if (!activeOperation) return;

      const total = activeOperation.phases.length;
      const completed = activeOperation.phases.filter(p => p.status === "COMPLETED").length;
      const outcome = completed === total ? "SUCCESS" : `${completed}/${total} COMPLETED`;

      // --- Campaign Increments ---
      if (activeCampaign && activeCampaign.active) {
        activeCampaign.stats.completed += 1;
        if (completed === total) {
          activeCampaign.stats.success += 1;
          activeCampaign.lastOpOutcome = "SUCCESS";
        } else {
          activeCampaign.stats.failed += 1;
          activeCampaign.lastOpOutcome = "FAILED";
        }
        activeCampaign.lastOpCodename = activeOperation.codename;
        activeCampaign.lastOpClimaxType = activeOperation.phases[total - 1].type;

        saveCampaign();
      }

      const logRecord = {
        timestamp: activeOperation.timestamp,
        codename: activeOperation.codename,
        system: activeOperation.system,
        scale: `${total} Phases`,
        outcome: outcome,
        details: activeOperation
      };

      historyLogs.unshift(logRecord); // Add to beginning of history array
      saveHistoryLogs();
      
      // Reset active operation state
      activeOperation = null;
      localStorage.removeItem("SC_TOC_ACTIVE_OP");
      
      renderActiveHUD();
      renderHistoryLogs();
      renderCampaignUI();

      // Check if Campaign is complete!
      if (activeCampaign && activeCampaign.active && activeCampaign.stats.completed === activeCampaign.totalOps) {
        triggerCampaignCompletion();
      } else {
        // Auto-focus Logbook Tab
        const logTabBtn = document.querySelector('[data-tab="logbook-tab"]');
        if (logTabBtn) logTabBtn.click();
      }
    }

    // --- Campaign Completion Interface Overlay ---
    function triggerCampaignCompletion() {
      const isPerfect = activeCampaign.stats.success === activeCampaign.totalOps;
      const isAbysmal = activeCampaign.stats.success === 0;

      let rank = "TACTICAL CONTRACT FULFILLMENT";
      let description = "";

      if (isPerfect) {
        rank = "🏆 FLAWLESS GOLDEN CRUCIBLE CITATION";
        description = `Command has issued a high-priority sector citation for the crew of **${activeCampaign.name}**. With a 100% tactical success rate, sponsoring boards have cleared maximum profit grids. Your fleet is officially registered as an elite UEE coalition strike squad. Flawless work, commanders!`;
      } else if (isAbysmal) {
        rank = "🚨 CRITICAL PMC CONTRACT BREACH";
        description = `Attention. Sponsoring boards have logged a 100% operational failure rating for **${activeCampaign.name}**. Under commercial compliance codes, our tactical credits have been frozen. A sector investigation is pending registry. Double-check your seals and expect audit sweeps.`;
      } else {
        rank = "🔰 SECURE CONTRACT SETTLEMENT";
        description = `Campaign **${activeCampaign.name}** has resolved under standard clearance guidelines with ${activeCampaign.stats.success} successes out of ${activeCampaign.totalOps} operations. Sponsoring boards have settled our base tactical credits, and local logistics lines remain secure. Ready grids for the next sector deployment.`;
      }

      const hudTab = document.getElementById("active-hud-tab");
      if (hudTab) {
        hudTab.innerHTML = `
          <div class="campaign-debriefing-panel" style="padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; text-align: center; font-family: var(--font-console); background: rgba(0,0,0,0.25);">
            <div style="font-size: 50px; margin-bottom: 20px;">🛡️</div>
            <h2 style="font-family: var(--font-header); letter-spacing: 2px; color: var(--color-primary); font-size: 24px; margin-bottom: 15px;">CAMPAIGN COMMAND DEBRIEFING</h2>
            <h3 style="color: var(--color-primary); font-size: 16px; margin-bottom: 20px; font-weight: bold;">${activeCampaign.name}</h3>
            
            <div style="background: rgba(254, 161, 0, 0.03); border: 1px solid var(--color-primary); padding: 25px; border-radius: 2px; max-width: 600px; margin-bottom: 30px;">
              <h4 style="color: ${isPerfect ? 'var(--color-primary)' : isAbysmal ? 'var(--color-danger)' : 'var(--color-primary)'}; font-size: 14px; margin-bottom: 12px; letter-spacing: 1px; font-weight: bold;">
                ${rank}
              </h4>
              <p style="font-size: 12px; line-height: 1.6; color: var(--color-text-muted);">
                ${description}
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; width: 100%; max-width: 500px; margin-bottom: 30px; font-size: 12px;">
              <div style="border: 1px solid rgba(254, 161, 0, 0.15); padding: 10px; background: rgba(0,0,0,0.1);">
                <span style="color: var(--color-text-muted); display: block; margin-bottom: 5px;">Total Ops</span>
                <strong style="font-size: 18px; color: var(--color-primary);">${activeCampaign.totalOps}</strong>
              </div>
              <div style="border: 1px solid rgba(254, 161, 0, 0.15); padding: 10px; background: rgba(0,0,0,0.1);">
                <span style="color: var(--color-text-muted); display: block; margin-bottom: 5px;">Successes</span>
                <strong style="font-size: 18px; color: var(--color-primary);">${activeCampaign.stats.success}</strong>
              </div>
              <div style="border: 1px solid rgba(254, 161, 0, 0.15); padding: 10px; background: rgba(0,0,0,0.1);">
                <span style="color: var(--color-text-muted); display: block; margin-bottom: 5px;">Failures</span>
                <strong style="font-size: 18px; color: var(--color-danger);">${activeCampaign.stats.failed}</strong>
              </div>
            </div>

            <button class="btn" id="btn-close-campaign-debrief" style="max-width: 320px;">🔒 CLOSE ARCHIVES & DECOMMISSION CAMPAIGN</button>
          </div>
        `;

        const closeBtn = document.getElementById("btn-close-campaign-debrief");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            activeCampaign = null;
            saveCampaign();
            window.location.reload();
          });
        }
      }
    }

    // --- Render Logbook History View ---
    function renderHistoryLogs() {
      if (!logbookEmpty || !logbookTableContainer || !logbookTbody) return;

      if (historyLogs.length === 0) {
        logbookEmpty.style.display = "block";
        logbookTableContainer.style.display = "none";
        return;
      }

      logbookEmpty.style.display = "none";
      logbookTableContainer.style.display = "block";

      logbookTbody.innerHTML = "";
      historyLogs.forEach((log, index) => {
        const tr = document.createElement("tr");
        
        const badgeClass = log.outcome === "SUCCESS" ? "badge-success" : "badge-failed";

        tr.innerHTML = `
          <td style="font-family: var(--font-console);">${log.timestamp}</td>
          <td style="font-family: var(--font-console); font-weight: bold; color: var(--color-primary);">${log.codename}</td>
          <td style="font-family: var(--font-console);">${log.system}</td>
          <td style="font-family: var(--font-console);">${log.scale}</td>
          <td><span class="badge ${badgeClass}">${log.outcome}</span></td>
          <td>
            <button class="btn btn-secondary btn-mini btn-view-log" data-index="${index}" style="padding: 3px 6px;">📁 View</button>
          </td>
        `;

        logbookTbody.appendChild(tr);
      });

      // Bind historical view button triggers
      document.querySelectorAll(".btn-view-log").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          const historicalOp = historyLogs[idx].details;
          
          // Temporarily load this historical op into active operations for HUD viewing (no editing)
          activeOperation = { ...historicalOp };
          renderActiveHUD();
          
          // Block modification buttons in historical view by removing phase action UI
          document.querySelectorAll(".phase-action-buttons").forEach(el => el.remove());
          if (checklistContainer) {
            const closureBox = checklistContainer.querySelector("div[style*='border-top']");
            if (closureBox) {
              closureBox.innerHTML = `
                <div style="background: rgba(254, 161, 0, 0.03); border: 1px solid rgba(254, 161, 0, 0.2); border-radius: 2px; padding: 12px; text-align: center;">
                  <span style="font-family: var(--font-console); font-size: 11px; color: var(--color-text-muted);">
                    📜 ARCHIVED BRIEFING (READ-ONLY)
                  </span>
                </div>
              `;
            }
          }

          // Switch to HUD tab
          const hudTabBtn = document.querySelector('[data-tab="active-hud-tab"]');
          if (hudTabBtn) hudTabBtn.click();
        });
      });
    }

    // --- Local Storage Management ---
    function saveActiveOperation() {
      if (activeOperation) {
        localStorage.setItem("SC_TOC_ACTIVE_OP", JSON.stringify(activeOperation));
      }
    }

    // In-house reset of corrupted legacy operations if any
    function forceClearOldFormat() {
      const savedActive = localStorage.getItem("SC_TOC_ACTIVE_OP");
      if (savedActive) {
        try {
          const parsed = JSON.parse(savedActive);
          // If old format doesn't have deep transitions or compilation fields, reset it
          if (!parsed.briefing || !parsed.briefing.phasesRP || !parsed.briefing.timelineHTML.includes("Justification")) {
            console.warn("Legacy operational schema purged automatically.");
            localStorage.removeItem("SC_TOC_ACTIVE_OP");
          }
        } catch (err) {
          localStorage.removeItem("SC_TOC_ACTIVE_OP");
        }
      }
    }
    forceClearOldFormat();

    function saveHistoryLogs() {
      localStorage.setItem("SC_TOC_HISTORY", JSON.stringify(historyLogs));
    }

    function loadSavedState() {
      try {
        // Auto-migrate legacy models to production-grade latest models
        const storedModel = localStorage.getItem("SC_TOC_AI_MODEL");
        if (storedModel === "gemini-1.5-flash" || storedModel === "gemini-2.5-flash") {
          localStorage.setItem("SC_TOC_AI_MODEL", "gemini-flash-latest");
        } else if (storedModel === "gemini-1.5-pro" || storedModel === "gemini-2.5-pro") {
          localStorage.setItem("SC_TOC_AI_MODEL", "gemini-pro-latest");
        }

        // Load historical logbook
        const savedHistory = localStorage.getItem("SC_TOC_HISTORY");
        if (savedHistory) {
          historyLogs = JSON.parse(savedHistory);
          renderHistoryLogs();
        }

        // Load active campaign
        loadCampaign();

        // Load active operation
        const savedActive = localStorage.getItem("SC_TOC_ACTIVE_OP");
        if (savedActive) {
          activeOperation = JSON.parse(savedActive);
          renderActiveHUD();
        }

        // Check if Campaign is complete!
        if (activeCampaign && activeCampaign.active && activeCampaign.stats.completed === activeCampaign.totalOps) {
          triggerCampaignCompletion();
        }
        updateAiStatusHeader();
      } catch (err) {
        console.warn("Schema migration: Clearing active operations state to recover console execution.", err);
        localStorage.removeItem("SC_TOC_ACTIVE_OP");
        activeOperation = null;
        renderActiveHUD();
      }
    }

    // --- History Purge Trigger ---
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", () => {
        if (confirm("⚠️ WARNING: This will permanently wipe all archived operational logs from your local terminal. Do you want to proceed?")) {
          historyLogs = [];
          saveHistoryLogs();
          renderHistoryLogs();
        }
      });
    }

    // --- Initial Load Hook ---
    loadSavedState();
  } catch (globalErr) {
    console.error("SC-TOC Global Error Caught:", globalErr);
    alert("SC-TOC Tactical Console Initial Load Crash:\n\n" + globalErr.message + "\n\nStack:\n" + globalErr.stack);
  }
});
