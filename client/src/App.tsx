/**
 * Public, frontend-only Creator Studio route map.
 */
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Music from "./pages/Music";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";
import ReleaseDetail from "./pages/ReleaseDetail";
import Shayari from "./pages/Shayari";
import ShayariDetail from "./pages/ShayariDetail";
import WritingDetail from "./pages/WritingDetail";
import Writings from "./pages/Writings";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import ResearchDetail from "./pages/ResearchDetail";
import GojoLimitlessResearch from "./pages/research/GojoLimitlessResearch";
import TojiHeavenlyRestrictionResearch from "./pages/research/TojiHeavenlyRestrictionResearch";
import VarginhaUfoResearch from "./pages/research/VarginhaUfoResearch";
import Cinephile from "./pages/Cinephile";
import FilmDetail from "./pages/FilmDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudioDesk from "./pages/StudioDesk";
import Search from "./pages/Search";
import ArchiveCalendar from "./pages/ArchiveCalendar";
import ArchiveChangeLog from "./pages/ArchiveChangeLog";
import ArchiveArtifacts from "./pages/ArchiveArtifacts";
import ArchiveConnections from "./pages/ArchiveConnections";
import PressKit from "./pages/PressKit";
import AdhdGarden from "./pages/AdhdGarden";
import Recs from "./pages/Recs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function DynamicPageTitle() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "Creator Studio";
    const path = location.split("?")[0];

    if (path === "/") {
      title = "Creator Studio";
    } else if (path.startsWith("/music/tere-ishq-mein")) {
      title = "Tere Ishq Mein · Single · Om Nandurkar";
    } else if (path.startsWith("/music")) {
      title = "Music & Discography · Om Nandurkar";
    } else if (path === "/research/varginha-ufo-phenomenon-analysis") {
      title = "Brazil's Roswell: Deconstructing the Varginha Alien Myth · Sociological Research";
    } else if (path === "/research/mathematical-physics-gojo-limitless") {
      title = "Paper №01: Gojo's Limitless & Metric Tensor Distortions · Metaphysical Mechanics";
    } else if (path === "/research/toji-fushiguro-heavenly-restriction") {
      title = "Paper №02: Toji's Heavenly Restriction Null-State · Metaphysical Mechanics";
    } else if (path.startsWith("/research")) {
      title = "Metaphysical Mechanics · Research Papers · Om Nandurkar";
    } else if (path === "/recs") {
      title = "Om's Shelf & Rec Room · Om Nandurkar";
    } else if (path.startsWith("/blog")) {
      title = "Om's Daily Dispatches & Essays · Studio Blog";
    } else if (path === "/adhd-garden" || path === "/mind-garden" || path === "/adhd") {
      title = "ADHD Living Archive & Mind Garden · Om Nandurkar";
    } else if (path.startsWith("/library") || path.startsWith("/books")) {
      title = "Library & Reading Shelf · Om Nandurkar";
    } else if (path.startsWith("/writings")) {
      title = "Writings & Prose · Om Nandurkar";
    } else if (path.startsWith("/shayari")) {
      title = "Shayari & Verse · Om Nandurkar";
    } else if (path.startsWith("/cinephile")) {
      title = "Cinephile & Film Shelf · Om Nandurkar";
    } else if (path === "/about") {
      title = "About Om Nandurkar · Dept. of Speculative Physics";
    } else if (path === "/contact") {
      title = "Say Hello · Contact · Om Nandurkar";
    } else if (path === "/studio-desk") {
      title = "Studio Desk · Om Nandurkar";
    } else if (path === "/search") {
      title = "Search Archive · Om Nandurkar";
    } else if (path === "/press") {
      title = "Press Kit · Om Nandurkar";
    } else if (path === "/calendar") {
      title = "Archive Calendar · Om Nandurkar";
    } else if (path === "/changelog") {
      title = "Archive Change Log · Om Nandurkar";
    }

    document.title = title;
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <DynamicPageTitle />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/music/:slug" component={ReleaseDetail} />
        <Route path="/music" component={Music} />
        <Route path="/shayari/:slug" component={ShayariDetail} />
        <Route path="/shayari" component={Shayari} />
        <Route path="/writings/:slug" component={WritingDetail} />
        <Route path="/writings" component={Writings} />
        <Route path="/library/:slug" component={BookDetail} />
        <Route path="/library" component={Library} />
        <Route path="/books/:slug" component={BookDetail} />
        <Route path="/books" component={Library} />
        <Route path="/research/varginha-ufo-phenomenon-analysis" component={VarginhaUfoResearch} />
        <Route path="/research/mathematical-physics-gojo-limitless" component={GojoLimitlessResearch} />
        <Route path="/research/toji-fushiguro-heavenly-restriction" component={TojiHeavenlyRestrictionResearch} />
        <Route path="/research/:slug" component={ResearchDetail} />
        <Route path="/notes" component={Notes} />
        <Route path="/cinephile/:slug" component={FilmDetail} />
        <Route path="/cinephile" component={Cinephile} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/studio-desk" component={StudioDesk} />
        <Route path="/search" component={Search} />
        <Route path="/calendar" component={ArchiveCalendar} />
        <Route path="/changelog" component={ArchiveChangeLog} />
        <Route path="/archive-artifacts" component={ArchiveArtifacts} />
        <Route path="/connections" component={ArchiveConnections} />
        <Route path="/press" component={PressKit} />
        <Route path="/mind-garden" component={AdhdGarden} />
        <Route path="/adhd-garden" component={AdhdGarden} />
        <Route path="/adhd" component={AdhdGarden} />
        <Route path="/recs" component={Recs} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/blog" component={Blog} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

import MiniPlayer from "./components/MiniPlayer";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="bottom-right" />
          <Router />
          <MiniPlayer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
