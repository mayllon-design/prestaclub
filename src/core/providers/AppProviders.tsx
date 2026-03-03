import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <BrowserRouter>
                    {children}
                    <Toaster />
                    <Sonner />
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};
