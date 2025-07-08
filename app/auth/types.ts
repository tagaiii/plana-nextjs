export const enum AuthTabs {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export interface ActionState {
  error: string;
  message?: string;
}
