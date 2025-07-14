import { atom } from 'recoil';

const ModalState = atom<string>({
  key: 'ModalState',
  default: '',
});

export default ModalState;
