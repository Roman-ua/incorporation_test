import { atom } from 'recoil';

export interface IGloblData {
  dataRequested: boolean;
  countryies: {
    id: string;
    short_name: string;
    full_name: string;
    dial_code: string;
  }[];
  states: { id: string; abbreviation: string; name: string }[];
  statuses: { id: string; name: string; full_name: string }[];
  types: { id: string; name: string; full_name: string }[];
}

const GlobalDataState = atom<IGloblData>({
  key: 'GlobalDataState',
  default: {
    dataRequested: false,
    countryies: [],
    states: [],
    statuses: [],
    types: [],
  },
});

export default GlobalDataState;
