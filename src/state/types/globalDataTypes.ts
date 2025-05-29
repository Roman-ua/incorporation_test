export type Country = {
  full_name: string;
  short_name: string;
  id: number;
};

export type State = {
  name: string;
  abbreviation: string;
  id: number;
};

export type CountryOrState = Country | State;
