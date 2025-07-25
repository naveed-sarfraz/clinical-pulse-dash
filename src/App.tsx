import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import SearchPage from "./pages/SearchPage";
import Analytics from "./pages/Analytics";
import StatusMonitor from "./pages/StatusMonitor";
import KOLNetwork from "./pages/KOLNetwork";
import Feasibility from "./pages/Feasibility";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/status" element={<StatusMonitor />} />
            <Route path="/kol" element={<KOLNetwork />} />
            <Route path="/feasibility" element={<Feasibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
