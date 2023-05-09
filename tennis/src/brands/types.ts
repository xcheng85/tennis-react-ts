export type Brand = {
  id: number;
  name: string;
  origin: string;
};

export type NewBrandPayload = {
  name: string;
  origin: string;
};

export type NewBrandSuccessResponse = {
  id: number;
};
