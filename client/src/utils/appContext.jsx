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
    ratings: [
      { user: "Julia Doe", stars: 2, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 1, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 1, review: "The Pizza is amazing." },
    ],
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
    ratings: [
      { user: "Julia Doe", stars: 3, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 5, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 4, review: "The Pizza is amazing." },
    ],
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
    ratings: [
      { user: "Julia Doe", stars: 3, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 5, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 4, review: "The Pizza is amazing." },
    ],
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
    ratings: [
      { user: "Julia Doe", stars: 3, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 5, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 4, review: "The Pizza is amazing." },
    ],
    sizes: [
      { price: 60, size: "S", isAvailable: true },
      { price: 80, size: "M", isAvailable: false },
      { price: 100, size: "L", isAvailable: true },
    ],
  },
  {
    id: "5",
    name: "Vegetarian",
    flavour: "mashroom",
    category: "double",
    image: double,
    ratings: [
      { user: "Julia Doe", stars: 3, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 5, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 4, review: "The Pizza is amazing." },
    ],
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
    ratings: [
      { user: "Julia Doe", stars: 3, review: "The Pizza is amazing." },
      { user: "Jane Doe", stars: 5, review: "The Pizza is amazing." },
      { user: "Jack Doe", stars: 4, review: "The Pizza is amazing." },
    ],
    sizes: [
      { price: 60, size: "S", isAvailable: true },
      { price: 80, size: "M", isAvailable: true },
      { price: 100, size: "L", isAvailable: true },
    ],
  },
];

const userCart = [
  {
    cartId: "CART-001",
    user: "John Doe",
    items: [
      {
        pizzaId: "1",
        name: "Super Pizza",
        flavour: "chicken and mushroom",
        category: "single",
        image: single,
        sizes: [
          { size: "S", price: 60, quantity: 1 },
          { size: "M", price: 80, quantity: 1 },
          { size: "L", price: 100, quantity: 2 },
        ],
      },
      {
        pizzaId: "3",
        name: "Burger Pizza",
        flavour: "beef",
        category: "double",
        image: double,
        sizes: [
          { size: "S", price: 60, quantity: 2 },
          { size: "L", price: 100, quantity: 3 },
        ],
      },
    ],
  },
  {
    cartId: "CART-002",
    user: "USER-002",
    items: [
      {
        pizzaId: "4",
        name: "Vegetarian",
        flavour: "mushroom",
        category: "single",
        image: single,
        size: "S",
        price: 60,
        quantity: 1,
      },
      {
        pizzaId: "6",
        name: "Beef and Mushroom",
        flavour: "beef",
        category: "single",
        image: single,
        size: "L",
        price: 100,
        quantity: 3,
      },
    ],
  },
];

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState(userCart);
  const [cart, setCart] = useState("");
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartState, setCartState] = useState("");

  const login = (email, password) => {
    const foundUser = dummyUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setUser(foundUser);
    return { success: true, user: foundUser };
  };

  const logout = () => setUser(null);
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      items: [
        {
          pizzaId: "1",
          name: "Super Pizza",
          flavour: "chicken and mushroom",
          category: "single",
          image: single,
          sizes: [
            { size: "S", price: 60, quantity: 1 },
            { size: "M", price: 80, quantity: 1 },
            { size: "L", price: 100, quantity: 2 },
          ],
        },
        {
          pizzaId: "3",
          name: "Burger Pizza",
          flavour: "beef",
          category: "double",
          image: double,
          sizes: [
            { size: "S", price: 60, quantity: 2 },
            { size: "L", price: 100, quantity: 1 },
          ],
        },
      ],
      paymentMethod: "paid",
      createdAt: Date.now(),
      extraMinutes: 0,
      isReady: false,
      total: 800,
    },
    {
      id: "ORD-002",
      customer: "Sarah Smith",
      items: ["Burger Pizza (L)"],
      paymentMethod: "collection",
      createdAt: Date.now(),
      extraMinutes: 0,
      isReady: false,
      total: 800,
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        isOpen,
        setIsOpen,
        pizzaMenu,
        orders,
        setOrders,
        cartData,
        setCartData,
        cart,
        setCart,
        cartQuantity,
        setCartQuantity,
        cartState,
        setCartState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
