export type Shop = {
  id: string;
  name: string;
  access: string;
  address?: string;
  genre?: {
    catch?: string;
    name?: string;
  };
  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
    mobile: {
      l: string;
      s: string;
    };
  };
  open?: string;
  close?: string;
  // Add any other properties you're using
};

export type HotPepperResponse = {
  results: {
    shop: Shop[];
    results_available: number;
    results_returned: number;
    results_start: number;
  };
};
