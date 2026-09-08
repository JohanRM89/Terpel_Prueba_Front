import { StatusModal } from "@/components/ui/StatusModal";
import { render,screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("<StatusModal />", () => {
  it("debe mostrar el texto de desactivación cuando la estación está activa", () => {
    render(
      <StatusModal
        stationName="Estación Norte"
        currentStatus="active"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("¿Desactivar esta estación?")).toBeInTheDocument();
    expect(screen.getByText(/Estación Norte/i)).toBeInTheDocument();
  });

  it("debe llamar a onCancel al hacer clic en el botón Cancelar", () => {
    const handleCancel = vi.fn();
    render(
      <StatusModal
        stationName="Estación Norte"
        currentStatus="active"
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar onConfirm al hacer clic en el botón de confirmación", async () => {
    const handleConfirm = vi.fn().mockResolvedValue(undefined);
    render(
      <StatusModal
        stationName="Estación Norte"
        currentStatus="inactive"
        onConfirm={handleConfirm}
        onCancel={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /activar estación/i }));
    await waitFor(() => {
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });
  });
});