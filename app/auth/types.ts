export const enum AuthTabs {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export interface ActionState {
  success: boolean;
  error: string | null;
}
