export interface LoginDto {
  email: string;
  password: string;
}

export interface ChangePwDto {
  email: string;
  password: string;
  otp: number;
}

export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  gender: boolean;
  userId: number;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
}

export interface Me {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  email: string;
  address: string;
  phone: string;
  isActive: number;
  userId: number;
}

export interface ResponseLogin {
  user: Me;
  token: Token;
}

export interface RegisterDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginGGDto {
  idToken: string;
}
