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

const contracts = [];
const seenKeys = new Set();

files.forEach(file => {
  try {
    const filePath = path.join(CONTRACTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Extract core fields
    const debugName = data.DebugName || path.basename(file, '.json');
    const missionTypeName = (data.MissionType && data.MissionType.Name) || 'General';
    const missionGiver = data.MissionGiver || 'Unknown security/logistics board';
    
    let title = data.Title || 'Standard Mission';
    // Clean up template tokens (e.g. ~mission(TargetName) -> [Target])
    title = title.replace(/~mission\((.*?)\)/g, '[$1]').replace(/\|/g, '-');

    let description = data.Description || '';
    description = description.replace(/~mission\((.*?)\)/g, '[$1]');

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

    const illegal = !!data.Illegal;

    // Deduplicate by clean combination of type and giver, or title to keep a curated set
    const dedupKey = `${missionTypeName}_${missionGiver}_${illegal}`.toLowerCase();

    // Push into our compiled database
    const contractRecord = {
      id: debugName,
      type: missionTypeName,
      giver: missionGiver,
      title: title,
      description: description.substring(0, 1000), // Cap description size
      locations: locations.slice(0, 10), // Keep main locations
      illegal: illegal
    };

    // We want to keep a diverse set of templates, so let's allow multiple per type but avoid absolute duplicates
    const titleKey = title.toLowerCase().trim();
    if (!seenKeys.has(titleKey)) {
      seenKeys.add(titleKey);
      contracts.push(contractRecord);
    }
  } catch (err) {
    // Ignore malformed JSON files if any
  }
});

console.log(`Successfully compiled and cleaned ${contracts.length} unique contract templates.`);

// Group or sort contracts for easier client-side loading
contracts.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));

// Generate contracts_data.js
const fileContent = `/**
 * Star Citizen Compiled Contracts Database
 * Generated automatically by build_database.js
 */

window.SC_CONTRACTS = ${JSON.stringify(contracts, null, 2)};

window.SC_SYSTEMS = {
  "Stanton": ["Hurston", "Crusader", "ArcCorp", "microTech"],
  "Pyro": ["Pyro I", "Pyro II", "Pyro III", "Pyro IV", "Pyro V", "Pyro VI", "Ruin Station"],
  "Nyx": ["Delamar", "Levski", "Nyx I", "Nyx II", "Nyx III"]
};

console.log("Star Citizen Contracts Database Loaded. Total templates: " + window.SC_CONTRACTS.length);
`;

fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
console.log(`Database written to ${OUTPUT_FILE}`);
