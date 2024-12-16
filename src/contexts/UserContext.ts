import { createContext } from "react";

interface User {
  username: string;
}

interface UserContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
