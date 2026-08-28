import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(rootDir, "client", "src", "content");
const arrayFiles = ["songs", "albums", "shayari", "writings", "notes", "films", "hobbies"];
const linkPattern = /^(https:\/\/|mailto:)/i;
let hasErrors = false;
let warnings = 0;

function error(message) {
  hasErrors = true;
  console.error(`✗ ${message}`);
}

function warn(message) {
  warnings += 1;
  console.warn(`! ${message}`);
}

function ensureString(item, field, label) {
  if (typeof item[field] !== "string" || item[field].trim().length === 0) {
    error(`${label} needs a non-empty "${field}" field.`);
  }
}

function ensureUnique(records, field, filename) {
  const values = new Set();
  for (const record of records) {
    if (!record[field]) continue;
    if (values.has(record[field])) error(`${filename}.json contains duplicate ${field}: "${record[field]}".`);
    values.add(record[field]);
  }
}

async function readJson(filename) {
  try {
    return JSON.parse(await readFile(path.join(contentDir, `${filename}.json`), "utf8"));
  } catch (cause) {
    error(`Cannot read valid JSON from ${filename}.json (${cause.message}).`);
    return null;
  }
}

const recordsByFile = {};
for (const filename of arrayFiles) {
  const records = await readJson(filename);
  if (!Array.isArray(records)) {
    error(`${filename}.json must contain an array of entries.`);
    continue;
  }
  recordsByFile[filename] = records;
  ensureUnique(records, "id", filename);
  if (filename !== "notes" && filename !== "hobbies") ensureUnique(records, "slug", filename);

  records.forEach((record, index) => {
    const label = `${filename}.json entry ${index + 1}`;
    ensureString(record, "id", label);
    if (filename !== "notes" && filename !== "hobbies") ensureString(record, "slug", label);
    if (typeof record.published !== "boolean") error(`${label} needs a boolean "published" field.`);
    if (record.published && (record.isIllustrative || record.isTemplate)) warn(`${label} is published but still marked as an illustrative template.`);
    if (filename === "films" && Object.hasOwn(record, "rating")) error(`${label} must not include a "rating" field; Cinephile is designed for written personal notes.`);
    if ((filename === "songs" || filename === "albums") && record.links) {
      Object.entries(record.links).forEach(([platform, url]) => {
        if (typeof url !== "string" || !linkPattern.test(url)) error(`${label} has an invalid ${platform} link.`);
      });
    }
  });
}

const songIds = new Set((recordsByFile.songs ?? []).map((song) => song.id));
for (const album of recordsByFile.albums ?? []) {
  for (const trackId of album.trackIds ?? []) {
    if (!songIds.has(trackId)) error(`Album "${album.title ?? album.id}" references missing song ID "${trackId}".`);
  }
}

const contact = await readJson("contact");
if (contact && typeof contact === "object" && !Array.isArray(contact)) {
  ["instagram", "youtube", "spotify"].forEach((field) => {
    if (contact[field] && !/^https:\/\//i.test(contact[field])) error(`contact.json field "${field}" needs a full https:// URL.`);
  });
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) error("contact.json field \"email\" does not look like an email address.");
} else if (contact !== null) {
  error("contact.json must contain one object.");
}

const artifacts = await readJson("artifacts");
if (!artifacts || typeof artifacts !== "object" || Array.isArray(artifacts)) {
  if (artifacts !== null) error("artifacts.json must contain one object.");
} else {
  if (!Array.isArray(artifacts.sessions)) error("artifacts.json needs a sessions array.");
  else {
    ensureUnique(artifacts.sessions, "id", "artifacts sessions");
    artifacts.sessions.forEach((session, index) => {
      const label = `artifacts.json session ${index + 1}`;
      ["id", "title", "kind", "date", "place", "state"].forEach((field) => ensureString(session, field, label));
      if (!/^\d{4}-\d{2}-\d{2}$/.test(session.date ?? "")) error(`${label} needs a YYYY-MM-DD date.`);
      if (session.state !== "upcoming" && session.state !== "past") error(`${label} state must be "upcoming" or "past".`);
      if (typeof session.published !== "boolean") error(`${label} needs a boolean "published" field.`);
      if (session.route && !/^https:\/\//i.test(session.route)) error(`${label} route needs a full https:// URL.`);
    });
  }
}

const connections = await readJson("connections");
if (!connections || typeof connections !== "object" || Array.isArray(connections)) {
  if (connections !== null) error("connections.json must contain one object.");
} else {
  if (!connections.frameOfTheMonth || typeof connections.frameOfTheMonth !== "object") error("connections.json needs a frameOfTheMonth object.");
  ["connections", "shareCards", "doubleFeatures"].forEach((field) => {
    if (!Array.isArray(connections[field])) error(`connections.json needs a ${field} array.`);
  });
  if (Array.isArray(connections.connections)) {
    ensureUnique(connections.connections, "id", "connections");
    connections.connections.forEach((connection, index) => {
      const label = `connections.json connection ${index + 1}`;
      ["id", "from", "fromRoom", "to", "toRoom", "thread"].forEach((field) => ensureString(connection, field, label));
    });
  }
  if (Array.isArray(connections.shareCards)) {
    ensureUnique(connections.shareCards, "id", "share cards");
    connections.shareCards.forEach((card, index) => {
      const label = `connections.json share card ${index + 1}`;
      ["id", "room", "title", "line"].forEach((field) => ensureString(card, field, label));
    });
  }
}

const press = await readJson("press");
if (!press || typeof press !== "object" || Array.isArray(press)) {
  if (press !== null) error("press.json must contain one object.");
} else {
  ["creator", "role", "archiveName", "shortBio"].forEach((field) => ensureString(press, field, "press.json"));
  if (!Array.isArray(press.focus) || press.focus.some((item) => typeof item !== "string" || item.trim().length === 0)) error("press.json needs a focus array of non-empty text items.");
  if (!Array.isArray(press.selectedRoutes)) error("press.json needs a selectedRoutes array.");
  else press.selectedRoutes.forEach((route, index) => {
    const label = `press.json selected route ${index + 1}`;
    ensureString(route, "label", label);
    ensureString(route, "route", label);
    if (typeof route.route === "string" && !route.route.startsWith("/")) error(`${label} route must begin with /.`);
  });
  if (!Array.isArray(press.pressImages)) error("press.json needs a pressImages array.");
}

const adhdGarden = await readJson("adhd-garden");
if (!adhdGarden || typeof adhdGarden !== "object" || Array.isArray(adhdGarden)) {
  if (adhdGarden !== null) error("adhd-garden.json must contain one object.");
} else {
  ["eyebrow", "title", "intro", "disclaimer", "definition", "closingTitle", "closingCopy"].forEach((field) => ensureString(adhdGarden, field, "adhd-garden.json"));
  ["tensions", "practices", "interestPetals", "sources"].forEach((field) => {
    if (!Array.isArray(adhdGarden[field]) || adhdGarden[field].length === 0) error(`adhd-garden.json needs a non-empty ${field} array.`);
  });
  if (Array.isArray(adhdGarden.tensions)) adhdGarden.tensions.forEach((item, index) => ["label", "title", "copy"].forEach((field) => ensureString(item, field, `adhd-garden.json tension ${index + 1}`)));
  if (Array.isArray(adhdGarden.practices)) adhdGarden.practices.forEach((item, index) => ["number", "title", "copy"].forEach((field) => ensureString(item, field, `adhd-garden.json practice ${index + 1}`)));
  if (Array.isArray(adhdGarden.interestPetals) && adhdGarden.interestPetals.some((item) => typeof item !== "string" || item.trim().length === 0)) error("adhd-garden.json needs interestPetals made of non-empty text items.");
  if (Array.isArray(adhdGarden.sources)) adhdGarden.sources.forEach((source, index) => {
    const label = `adhd-garden.json source ${index + 1}`;
    ensureString(source, "label", label);
    ensureString(source, "url", label);
    if (typeof source.url === "string" && !/^https:\/\//i.test(source.url)) error(`${label} needs a full https:// URL.`);
  });
}

if (hasErrors) {
  console.error("\nContent validation found errors. Fix them before publishing.");
  process.exit(1);
}

console.log(`✓ Content validation passed${warnings ? ` with ${warnings} template warning(s)` : ""}.`);
