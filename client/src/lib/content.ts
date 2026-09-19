/**
 * Pastel Afterimage Archive visual reminder: public content is held in one place,
 * so page components can focus on expressive rooms rather than buried copy.
 */
import home from "@/content/home.json";
import adhdGardenData from "@/content/adhd-garden.json";
import albums from "@/content/albums.json";
import contact from "@/content/contact.json";
import films from "@/content/films.json";
import hobbies from "@/content/hobbies.json";
import shayari from "@/content/shayari.json";
import site from "@/content/site.json";
import songs from "@/content/songs.json";
import notes from "@/content/notes.json";
import writings from "@/content/writings.json";
import watchlist from "@/content/watchlist.json";
import desk from "@/content/desk.json";
import weather from "@/content/weather.json";
import artifacts from "@/content/artifacts.json";
import connections from "@/content/connections.json";
import press from "@/content/press.json";
import books from "@/content/books.json";
import research from "@/content/research.json";
import recommendations from "@/content/recommendations.json";
import blog from "@/content/blog.json";

export type StudioProfile = { artistName: string; fullName: string; shortTagline: string; aboutIntro: string; aboutNote: string; signatureLine: string; currentlyCreating: string; availability: string; portraitImage?: string };
export const studioProfile = site as StudioProfile;
export const homeContent = home;
export type AdhdGarden = { eyebrow: string; title: string; intro: string; disclaimer: string; definition: string; tensions: { label: string; title: string; copy: string }[]; practices: { number: string; title: string; copy: string }[]; interestPetals: string[]; closingTitle: string; closingCopy: string; sources: { label: string; url: string }[] };
export const adhdGarden = adhdGardenData as AdhdGarden;

export type MusicLinkMap = Record<string, string>;
export type MusicCredit = { role: string; name: string };
export type ReleaseVersion = { id: string; label: string; description: string; audioPreview?: string };
export type ReleaseTimelineMoment = { date: string; title: string; detail: string };

type EnrichedReleaseFields = {
  duration?: string;
  mood?: string[];
  lyricFragments?: string[];
  lyricContext?: string;
  story?: string;
  storyPlace?: string;
  credits?: MusicCredit[];
  versions?: ReleaseVersion[];
  timeline?: ReleaseTimelineMoment[];
  relatedIds?: string[];
  pastelBg?: string;
  accentColor?: string;
};

export type Song = EnrichedReleaseFields & {
  id: string;
  slug: string;
  title: string;
  type: "single" | "demo" | "collaboration";
  releaseDate: string;
  coverImage?: string;
  audioPreview?: string;
  description: string;
  published: boolean;
  featured: boolean;
  links?: MusicLinkMap;
  isIllustrative?: boolean;
};

export type Album = EnrichedReleaseFields & {
  id: string;
  slug: string;
  title: string;
  type: "album" | "ep" | "mixtape";
  releaseDate: string;
  coverImage?: string;
  description: string;
  published: boolean;
  featured: boolean;
  links?: MusicLinkMap;
  trackIds?: string[];
  isIllustrative?: boolean;
};

export type Release = Song | Album;
export const publishedSongs = (songs as Song[]).filter((song) => song.published);
export const publishedAlbums = (albums as Album[]).filter((album) => album.published);
export const publishedReleases = [...publishedAlbums, ...publishedSongs].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
export function findRelease(slug: string) { return publishedReleases.find((release) => release.slug === slug); }
export function findSongById(id: string) { return (songs as Song[]).find((song) => song.id === id); }

export type Shayari = {
  id: string; slug: string; title: string; text: string; romanizedText?: string; translation?: string; hiddenLine?: string; language: string; series?: string; seriesOrder?: number; shareable?: boolean; readingTrackId?: string; tags: string[]; date: string; published: boolean; featured: boolean; isIllustrative?: boolean;
};
export const publishedShayari = (shayari as Shayari[]).filter((entry) => entry.published);
export function findShayari(slug: string) { return publishedShayari.find((entry) => entry.slug === slug); }

export type Writing = {
  id: string; slug: string; title: string; category: string; date: string; excerpt: string; body: string[]; sections?: { heading: string; paragraphs: string[] }[]; footnotes?: { mark: string; text: string }[]; readingTrackId?: string; shareable?: boolean; printable?: boolean; tags: string[]; coverImage?: string; published: boolean; featured: boolean; isIllustrative?: boolean;
};
export const publishedWritings = (writings as Writing[]).filter((entry) => entry.published);
export function findWriting(slug: string) { return publishedWritings.find((entry) => entry.slug === slug); }

export type Note = {
  id: string; text: string; label: string; color: "butter" | "lilac" | "peach" | "mint" | "sky"; rotation: number; pinStyle: "red-pin" | "blue-pin" | "tape"; date: string; tags: string[]; printable?: boolean; published: boolean; featured: boolean; isIllustrative?: boolean;
};
export const publishedNotes = (notes as Note[]).filter((entry) => entry.published);

export type FilmNote = {
  id: string; slug: string; title: string; director: string; year: string; watchedOn: string; posterImage?: string; trailerUrl?: string; whatStayedWithMe: string; review: string; sceneToRemember: string; motifs?: string[]; relatedSongIds?: string[]; crossfadeNote?: string; spoilers?: string; spoilerSections?: { title: string; text: string }[]; tags: string[]; published: boolean; featured: boolean; isTemplate?: boolean;
};
export const publishedFilms = (films as FilmNote[]).filter((entry) => entry.published);
export function findFilm(slug: string) { return publishedFilms.find((entry) => entry.slug === slug); }

export type Hobby = { id: string; title: string; description: string; icon: string; color: "peach" | "butter" | "sky"; published: boolean; isTemplate?: boolean; route?: string };
export type ContactDetails = { email: string; bookingEmail: string; instagram: string; instagramMusic?: string; instagramPersonal?: string; portfolio: string; youtube: string; spotify: string; linkedin?: string; easterEggJoke?: string; availability: string; collaborationTypes: string[] };
export const publishedHobbies = (hobbies as Hobby[]).filter((entry) => entry.published);
export const contactDetails = contact as ContactDetails;
export type WatchlistItem = { id: string; title: string; format: string; reason: string; published: boolean; isTemplate?: boolean };
export type DeskObject = { id: string; label: string; title: string; description: string; route: string; accent: "blue" | "rose" | "green" | "lemon" | "teal"; symbol: string };
export type StudioWeather = { month: string; eyebrow: string; listening: string; making: string; reading: string; carrying: string; isIllustrative?: boolean };
export const publishedWatchlist = (watchlist as WatchlistItem[]).filter((item) => item.published);
export const deskObjects = desk as DeskObject[];
export const studioWeather = weather as StudioWeather;
export type ArtifactShelf = { zine: { issue: string; title: string; description: string; entries: { label: string; title: string; route: string }[] }; wallpapers: { id: string; title: string; subtitle: string; background: string; foreground: string; mark: string }[]; glossary: { term: string; definition: string; room: string }[]; processFrames: { id: string; stage: string; title: string; description: string; color: "rose" | "blue" | "lemon" }[]; toolkit: { title: string; description: string }[]; sessions: { id: string; title: string; kind: string; date: string; place: string; route?: string; state: "upcoming" | "past"; published: boolean }[]; audioPostcard: { songId: string; eyebrow: string; title: string; description: string } };
export const artifactShelf = artifacts as ArtifactShelf;
export type ConnectionArchive = { frameOfTheMonth: { filed: boolean; title: string; caption: string; image: string }; doubleFeatures: { id: string; firstTitle: string; secondTitle: string; title: string }[]; connections: { id: string; from: string; fromRoom: string; to: string; toRoom: string; thread: string; isIllustrative?: boolean }[]; shareCards: { id: string; room: "music" | "shayari" | "writings"; title: string; line: string; isIllustrative?: boolean }[] };
export const connectionArchive = connections as ConnectionArchive;
export type PressKit = { creator: string; role: string; archiveName: string; shortBio: string; focus: string[]; pressImages: { src: string; alt: string }[]; selectedRoutes: { label: string; route: string }[] };
export const pressKit = press as PressKit;

export type Book = {
  id: string; slug: string; title: string; status: string; category: string; date: string; excerpt: string; pdfUrl: string; coverImage?: string; tags: string[]; published: boolean; featured: boolean;
};
export const publishedBooks = (books as Book[]).filter((entry) => entry.published);
export function findBook(slug: string) { return publishedBooks.find((entry) => entry.slug === slug); }

export type ResearchPaper = {
  id: string; slug: string; title: string; authors: string[]; abstract: string; field: string; conference?: string; date: string; pdfUrl: string; externalUrl: string; tags: string[]; published: boolean; featured: boolean; sections?: { heading: string; paragraphs: string[] }[];
};
export const publishedResearch = (research as ResearchPaper[]).filter((entry) => entry.published);
export function findResearch(slug: string) { return publishedResearch.find((entry) => entry.slug === slug); }

export type LibraryItem = (Book & { kind: "book" }) | (ResearchPaper & { kind: "research" });
export const allLibraryItems: LibraryItem[] = [
  ...publishedBooks.map((b) => ({ ...b, kind: "book" as const })),
  ...publishedResearch.map((r) => ({ ...r, kind: "research" as const })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type RecommendationPick = {
  id: string;
  title: string;
  creator: string;
  year: string;
  type: "film" | "show" | "youtube" | "place" | "café" | "artist" | "album" | "book" | "site" | "tool" | string;
  why: string;
  link: string;
  image: string;
  tag: string;
  published: boolean;
  featured: boolean;
};

export type RecommendationCategory = {
  id: string;
  category: string;
  slug: string;
  emoji: string;
  color: "teal" | "coral" | "butter" | "peach" | "sky" | "lilac" | string;
  kicker: string;
  description: string;
  picks: RecommendationPick[];
  published: boolean;
};

export const publishedRecs = (recommendations as RecommendationCategory[]).filter((cat) => cat.published);

export type BlogEntry = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  tags: string[];
  mood: string;
  published: boolean;
  featured: boolean;
};

export const publishedBlogEntries = (blog as BlogEntry[]).filter((entry) => entry.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export function findBlogEntry(slug: string) { return publishedBlogEntries.find((entry) => entry.slug === slug); }
