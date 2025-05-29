import type { Pillar } from "../types/tvrf";
import pillarsData from "../data/pillars.json";

export function getPillarById(id: string): Pillar | undefined {
  return pillarsData.pillars[id as keyof typeof pillarsData.pillars] as
    | Pillar
    | undefined;
}

export function getAllPillars(): Pillar[] {
  return Object.values(pillarsData.pillars) as Pillar[];
}

export function getLastUpdated(): string {
  return pillarsData.lastUpdated;
}
