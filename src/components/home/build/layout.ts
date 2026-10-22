/**
 * The demo product's screen regions, in the 1000 × 625 coordinate space the
 * blueprint and the live dashboard share — so the wireframe drawn in stage 01
 * lands exactly where the real UI appears in stage 04.
 */
export type Region = { id: string; label: string; x: number; y: number; w: number; h: number };

export const SCREEN = { w: 1000, h: 625 };

export const REGIONS: Region[] = [
  { id: "nav", label: "<Sidebar />", x: 0, y: 0, w: 176, h: 625 },
  { id: "header", label: "<Header />", x: 176, y: 0, w: 824, h: 64 },
  { id: "kpi1", label: "<Kpi />", x: 196, y: 84, w: 182, h: 96 },
  { id: "kpi2", label: "<Kpi />", x: 392, y: 84, w: 182, h: 96 },
  { id: "kpi3", label: "<Kpi />", x: 588, y: 84, w: 182, h: 96 },
  { id: "kpi4", label: "<Kpi />", x: 784, y: 84, w: 196, h: 96 },
  { id: "chart", label: "<RevenueChart />", x: 196, y: 200, w: 520, h: 236 },
  { id: "feed", label: "<LiveFeed />", x: 736, y: 200, w: 244, h: 405 },
  { id: "table", label: "<OrdersTable />", x: 196, y: 456, w: 520, h: 149 },
];
