export type Shop = {
  id: string;
  name: string;
  photo: {
    pc: {
      l: string;
    };
  };
  access: string;
  address?: string;
  open?: string;
  close?: string;
};

export type HotPepperResponse = {
  results: {
    shop: Shop[];
    results_available: number;
  };
};
