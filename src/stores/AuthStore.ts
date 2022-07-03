import { postLogin, postRefresh, postRevoke } from '@fetches/auth';

import create from 'zustand';
import _create from 'zustand/vanilla';

interface AuthState {
  access_token: string;
  isAuth: boolean;
  isAuthenticated: () => boolean;
  getAccessToken: () => string;
  login: Function;
  loginCallback: Function | null;
  logout: Function;
  logoutCallback: Function | null;
  refresh: Function;
}

const INVALID_TOKEN = ''; // leave blank

// This vanilla store will only save the auth state and tokens and it will
// handle its transitions
export const _authStore = _create<AuthState>()((set, get) => ({
  access_token: INVALID_TOKEN,
  refresh_token: INVALID_TOKEN,
  isAuth: false,
  isAuthenticated: () => get().access_token !== INVALID_TOKEN,
  getAccessToken: () => get().access_token,
  login: async (username: string, password: string) => {
    const tokens = await postLogin(username, password);
    set({ access_token: tokens.access, isAuth: true });
    localStorage.setItem('auth', 'true');
    get().loginCallback?.();
    return tokens;
  },
  loginCallback: null,
  logout: () => {
    postRevoke();
    set({
      access_token: INVALID_TOKEN,
      isAuth: false,
    });
    localStorage.setItem('auth', 'false');
    get().logoutCallback?.();
  },
  logoutCallback: null,
  refresh: async () => {
    const newTokens = await postRefresh();
    if (!newTokens) return null;
    set({ access_token: newTokens.access, isAuth: true });
    localStorage.setItem('auth', 'true');
    return newTokens;
  },
  update: (loginCallback: Function, logoutCallback: Function) => {
    set({
      loginCallback,
      logoutCallback,
      isAuth: localStorage.getItem('auth') === 'true',
    });
  },
}));

// We also create a hook to get the vanilla auth store state inside react
export const authStore = create(_authStore);
export default authStore;
