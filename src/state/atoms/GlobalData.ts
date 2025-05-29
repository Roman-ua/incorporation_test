import { atom } from 'recoil';

export interface IGloblData {
  countryies: { id: number; short_name: string; full_name: string }[];
  states: { id: number; abbreviation: string; name: string }[];
  statuses: { id: number; name: string; full_name: string }[];
  types: { id: number; name: string; full_name: string }[];
}

const GlobalDataState = atom<IGloblData>({
  key: 'GlobalDataState',
  default: {
    countryies: [],
    states: [],
    statuses: [],
    types: [],
  },
});

export default GlobalDataState;
