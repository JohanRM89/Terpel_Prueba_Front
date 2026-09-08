import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { StationDetail } from "@/features/pages/StationDetail";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

describe("<StationDetail /> Integración", () => {
  it("debe renderizar la información de la estación basada en la URL", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/stations/1"]}>
          <Routes>
            <Route path="/stations/:id" element={<StationDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Esperar a que cargue la estación con ID 1
    const stationTitle = await screen.findByText(/Estación Prueba 1/i);
    expect(stationTitle).toBeInTheDocument();
    expect(screen.getByText("Volver")).toBeInTheDocument();
  });
});