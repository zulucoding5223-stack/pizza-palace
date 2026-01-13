import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const dummyUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@pizza.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "John Doe",
    email: "user@pizza.com",
    password: "user123",
    role: "user",
  },
];

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const foundUser = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setUser(foundUser);
    return { success: true, user: foundUser };
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
