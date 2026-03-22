import { render, screen, waitFor, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./index";

const listeners = new Set<() => void>();

const mediaQueryList = {
  matches: false,
  media: "(min-width: 768px)",
  onchange: null,
  addEventListener: vi.fn((_event: string, listener: () => void) => {
    listeners.add(listener);
  }),
  removeEventListener: vi.fn((_event: string, listener: () => void) => {
    listeners.delete(listener);
  }),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

const matchMediaMock = vi.fn().mockReturnValue(mediaQueryList);

function TestComponent({ query }: { query: string }) {
  const matches = useMediaQuery(query);

  return <div>{matches ? "matched" : "not matched"}</div>;
}

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", matchMediaMock);
    listeners.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("subscribes to matchMedia changes", async () => {
    render(<TestComponent query="(min-width: 768px)" />);
    expect(screen.getByText("not matched")).toBeInTheDocument();

    mediaQueryList.matches = true;
    act(() => {
      listeners.forEach((listener) => listener());
    });

    await waitFor(() => {
      expect(screen.getByText("matched")).toBeInTheDocument();
    });
  });
});
