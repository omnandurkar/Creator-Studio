/**
 * Public, frontend-only Creator Studio route map.
 */
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/music/:slug" component={ReleaseDetail} />
      <Route path="/music" component={Music} />
      <Route path="/shayari/:slug" component={ShayariDetail} />
      <Route path="/shayari" component={Shayari} />
      <Route path="/writings/:slug" component={WritingDetail} />
      <Route path="/writings" component={Writings} />
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
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
