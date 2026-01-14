import { createContext, useContext, useState } from "react";
import single from "../assets/pictures-of-pizza-23-1.jpg";
import double from "../assets/OIP.webp";

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

const pizzaMenu = [
    {
      id: "1",
      name: "Super pizza",
      flavour: "chicken and mashroom",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S", isAvailable: false },
        { price: 80, size: "M", isAvailable: true },
        { price: 100, size: "L", isAvailable: true },
      ],
    },
    {
      id: "2",
      name: "Super pizza 2",
      flavour: "beef",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S", isAvailable: true },
        { price: 160, size: "M", isAvailable: true },
        { price: 200, size: "L", isAvailable: false },
      ],
    },
    {
      id: "3",
      name: "Burger Pizza",
      flavour: "beef",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S", isAvailable: true },
        { price: 160, size: "M", isAvailable: true },
        { price: 200, size: "L", isAvailable: true },
      ],
    },
    {
      id: "4",
      name: "Vegetarian",
      flavour: "mashroom",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S", isAvailable:true },
        { price: 80, size: "M", isAvailable:false },
        { price: 100, size: "L", isAvailable:true },
      ],
    },
    {
      id: "5",
      name: "Vegetarian",
      flavour: "mashroom",
      category: "double",
      image: double,
      sizes: [
        { price: 120, size: "S", isAvailable: true },
        { price: 160, size: "M", isAvailable: true },
        { price: 200, size: "L", isAvailable: false },
      ],
    },
    {
      id: "6",
      name: "Beef and mashroom",
      flavour: "beef",
      category: "single",
      image: single,
      sizes: [
        { price: 60, size: "S", isAvailable: true },
        { price: 80, size: "M", isAvailable: true },
        { price: 100, size: "L", isAvailable: true },
      ],
    },
  ];

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    <AppContext.Provider value={{ user, login, logout, isOpen, setIsOpen, pizzaMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
