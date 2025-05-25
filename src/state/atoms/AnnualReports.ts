import { atom } from 'recoil';

export interface IAnnualReport {
  id: number;
  year: number;
  status: string;
  filingDate: string;
  relatedOrder: string;
  attachedFiles: boolean;
}
export interface IAnnualReports {
  list: IAnnualReport[] | [];
}

const AnnualReportsState = atom<IAnnualReports>({
  key: 'AnnualReportsState',
  default: {
    list: [],
  },
});

export default AnnualReportsState;
