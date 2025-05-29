import type { Pillar } from "./tvrf";

interface PillarsData {
  pillars: Record<string, Pillar>;
  lastUpdated: string;
}

declare module "*.json" {
  const value: PillarsData;
  export default value;
}
