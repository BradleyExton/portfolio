import { describe, expect, it } from "vitest";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as servicesMetadata } from "@/app/services/page";
import { metadata as contactMetadata } from "@/app/contact/page";

describe("route metadata exports", () => {
  it("exports metadata for all primary routes", () => {
    expect(homeMetadata).toBeDefined();
    expect(aboutMetadata).toBeDefined();
    expect(servicesMetadata).toBeDefined();
    expect(contactMetadata).toBeDefined();
  });

  it("contains expected route titles", () => {
    expect(String(homeMetadata.title)).toContain("Bradley Exton");
    expect(String(aboutMetadata.title)).toContain("About");
    expect(String(servicesMetadata.title)).toContain("Services");
    expect(String(contactMetadata.title)).toContain("Contact");
  });
});
