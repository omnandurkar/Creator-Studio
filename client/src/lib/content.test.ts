import { describe, expect, it } from "vitest";
import { adhdGarden } from "./content";

describe("ADHD garden content", () => {
  it("keeps a balanced, non-diagnostic reflection with trusted sources", () => {
    expect(adhdGarden.tensions).toHaveLength(2);
    expect(adhdGarden.disclaimer.toLowerCase()).toContain("not a diagnosis");
    expect(adhdGarden.practices).toHaveLength(4);
    expect(adhdGarden.interestPetals.length).toBeGreaterThanOrEqual(6);
    expect(adhdGarden.sources.map((source) => source.url)).toEqual(expect.arrayContaining([
      expect.stringContaining("nimh.nih.gov"),
      expect.stringContaining("nhs.uk"),
    ]));
  });
});
