import { createContext } from "react";

export interface User {
  username: string;
}

export interface UserContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
