export interface User {
  uid: string;
  email: string;
  password: string;
  displayName?: string;
  returnSecureToken?: boolean;
  roles: Roles;
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export  interface Todo {
  content: string;
  id?: string;
  datemodified?: Date;
  isDone?: boolean;
}
export interface Roles {
  editor?: boolean;
  admin?: boolean;
}

