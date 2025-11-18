export const ROUTES = {
  HOME: "/",
  CEPHEIDS: "/cepheid",
  CEPHEID: "/cepheid",
  CEPHEID_CALC: "/cepheid-calc",
} as const;

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  CEPHEIDS: "Каталог цефеид",
  CEPHEID: "Цефеида",
  CEPHEID_CALC: "Рассчет",
};