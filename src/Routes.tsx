export const ROUTES = {
  HOME: "/",
  CEPHEIDS: "/cepheid",
  CEPHEID: "/cepheid",
} as const;

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  CEPHEIDS: "Каталог цефеид",
  CEPHEID: "Цефеида",
};