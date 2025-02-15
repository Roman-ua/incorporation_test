import { atom } from 'recoil';
import { Address, IFiles } from '../../interfaces/interfaces';

export interface IEin {
  taxId: string;
  status: string;
  companyName: string;
  lastVerifDate: string;
  documentType: string[];
  relatedAddress: Address | null;
  relatedDocument: IFiles | null;
}

const EinState = atom<IEin>({
  key: 'EinState',
  default: {
    taxId: '12-3456789',
    status: 'Confirmation Needed',
    companyName: 'ABC Company Inc.',
    lastVerifDate: '',
    documentType: [],
    relatedAddress: null,
    relatedDocument: null,
  },
});

export default EinState;
