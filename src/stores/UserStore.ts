import { User } from 'user';
import create from 'zustand';

interface UserState {
  user: User | null;
  refeatcher: Function | null;
}

export const userStore = create<UserState>()((set, get) => ({
  user: null,
  refeatcher: null,
  update: (user: User, refeatcher: Function) => set({ user, refeatcher }),
  refeatch: () => get().refeatcher?.(),
}));
export default userStore;
