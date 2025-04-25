import { atom } from 'recoil';

type Theme = 'light' | 'dark';
export interface ITheme {
  theme: Theme;
}

const ThemeState = atom<ITheme>({
  key: 'EinState',
  default: {
    theme: 'light',
  },
});

export default ThemeState;
