export type ValidationFeedback = { isValid: boolean | null; message: string | null };

export interface LoginResponse {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      
    };
}
  
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  department: string;
  matricNumber?: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  matricNumber?: string;
  emailVerified: boolean;
};

export type AuthData = {
  token: string;
  user: User;
};

export type AuthContextType = {
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: (data: AuthData | null) => Promise<void>;
  logout: () => Promise<void>;
};

export type NonAuthStackParamList = {
  ForgotPassword: undefined;
  VerifyForgotPassword: { email: string };
  ResetPassword: { token: string };
  Login: undefined;
  Register: undefined;
};
