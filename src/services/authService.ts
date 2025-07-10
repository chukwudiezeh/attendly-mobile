import axios from 'axios';
import { RegisterPayload } from '../config/types';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${apiBaseUrl}/auth/login`, {
    identifier: email,
    password,
  });

  return response.data; // or response.data.token, etc.
};

export const register = async(payload: RegisterPayload) => {

  let urlSuffix = '';
  if (payload.matricNumber == '') delete payload.matricNumber;
  if (payload.role == 'student') urlSuffix = '/student';
  if (payload.role == 'lecturer') urlSuffix = '/lecturer';

  delete payload.role; // Remove role from payload as it's not needed in the request body
  const response = await axios.post(`${apiBaseUrl}/auth/register${urlSuffix}`, payload);

  return response.data;
};

export const verifyEmail = async (otp: string, token: string) => {
  console.log('Verifying OTP:', otp, 'with token:', token);
  const response = await axios.post(
    `${apiBaseUrl}/auth/verify`,
    { token: otp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const resendVerificationEmail = async (token: string) => {
  const response = await axios.get(`${apiBaseUrl}/auth/resend-verification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${apiBaseUrl}/auth/forgot-password`, {
    identifier: email,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const verifyForgotPassword = async (email: string, token: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/auth/verify-reset-token`,
    { identifier: email, token },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    } 
  );
  return response.data;
};


export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/auth/reset-password`,
    { token, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
