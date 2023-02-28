import { createContext } from 'react';

export type AuthContextType = {};

export const DEFAUT_AUTH_CONTEXT: AuthContextType = {};

export const applicationContext =
	createContext<AuthContextType>(DEFAUT_AUTH_CONTEXT);
