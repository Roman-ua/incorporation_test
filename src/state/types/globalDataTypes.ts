export type Country = {
  full_name: string;
  short_name: string;
  dial_code?: string;
  id: string;
};

export type State = {
  name: string;
  abbreviation: string;
  id: string;
};

export type CountryOrState = Country | State;
