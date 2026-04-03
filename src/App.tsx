import './App.css'
import { ThemeProvider } from './context/theme-provider'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sooner } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster/>
      <Sooner/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
