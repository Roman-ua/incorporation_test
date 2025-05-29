import { atom } from 'recoil';
import { EinDocumentGet } from '../types/einTypes';

const EinState = atom<EinDocumentGet | null>({
  key: 'EinState',
  default: null,
});

export default EinState;
