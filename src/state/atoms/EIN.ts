import { atom } from 'recoil';
import { Address, IFiles } from '../../interfaces/interfaces';

interface Ein {
  taxId: string;
  status: string;
  companyName: string;
  lastVerifDate: string;
  documentType: string[];
  relatedAddress: Address | null;
  relatedDocument: IFiles | null;
}

const EinState = atom<Ein>({
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
