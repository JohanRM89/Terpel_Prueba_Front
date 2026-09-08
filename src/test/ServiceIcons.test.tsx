import { ServiceIcons } from "@/components/ui/ServiceIcons";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("<ServiceIcons />", () => {
  it("debe renderizar el ícono de Baños con etiqueta cuando showLabel es true", () => {
    render(<ServiceIcons service="Banos" showLabel />);
    expect(screen.getByText("Baños")).toBeInTheDocument();
  });

  it("no debe fallar si recibe un servicio no válido", () => {
    // @ts-expect-error Probando valor inválido
    const { container } = render(<ServiceIcons service="Inexistente" />);
    expect(container.firstChild).toBeNull();
  });
});