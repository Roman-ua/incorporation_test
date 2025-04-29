import { atom } from 'recoil';

export interface IInvoices {
  id: string;
  amount: string;
  relatedTo: string;
  date: string;
  status: string;
}

const InvoicesState = atom<IInvoices[]>({
  key: 'InvoicesState',
  default: [],
});

export default InvoicesState;
