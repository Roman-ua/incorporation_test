import { atom } from 'recoil';

type Theme = 'light' | 'dark';
export interface ITheme {
  theme: Theme;
}

const ThemeState = atom<ITheme>({
  key: 'ThemeState',
  default: {
    theme: 'light',
  },
});

export default ThemeState;
