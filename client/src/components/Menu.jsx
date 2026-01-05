import React, { useEffect, useState } from "react";

const Menu = () => {
  const products = [
    {
      name: "Chicken&Mashroom",
      id: "1",
      flavour: "Chicken",
      sizes: [
        { size: "small", price: 60 },
        { size: "medium", price: 80 },
        { size: "large", price: 100 },
      ],
    },
    {
      name: "ChickenOnly",
      id: "2",
      flavour: "Chicken",
      sizes: [
        { size: "small", price: 60 },
        { size: "medium", price: 80 },
        { size: "large", price: 100 },
      ],
    },
    {
      name: "ChickenDust",
      id: "3",
      flavour: "Chicken",
      sizes: [
        { size: "small", price: 60, quantity: 0 },
        { size: "medium", price: 80, quantity: 0 },
        { size: "large", price: 100, quantity: 0 },
      ],
    },
  ];

  const orders = [
    {
      id: "1",
      name: "Bongokuhle",
      items: [
        {
          productId: "1",
          quantity: 1,
          sizes: [{ size: "small", price: 60, quantity: 1 }],
        },
      ],
      orderTotal: 60,
    },

    {
      id: "2",
      name: "Ndabezinhle",
      items: [
        {
          productId: "1",
          quantity: 2,
          sizes: [
            { size: "medium", price: 80, quantity: 1 },
            { size: "large", price: 100, quantity: 1 },
          ],
        },
        {
          productId: "2",
          quantity: 1,
          sizes: [{ size: "large", price: 100, quantity: 1 }],
        },
      ],
      orderTotal: 280,
    },
  ];

  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    function handleProductsDisplay() {
      const result = [];
      for (let i = 0; i < products.length; i++) {
        let productsOrderTotal = 0;
        const product = products[i];
        let sizesData = {
          small: { price: 0, quantity: 0 },
          medium: { price: 0, quantity: 0 },
          large: { price: 0, quantity: 0 },
        };

        for (let j = 0; j < orders.length; j++) {
          const currentOrder = orders[j];

          for (let x = 0; x < currentOrder.items.length; x++) {
            const orderItems = currentOrder.items[x];

            if (orderItems.productId === product.id) {
              productsOrderTotal += orderItems.quantity;

              for (let y = 0; y < orderItems.sizes.length; y++) {
                const sizeItem = orderItems.sizes[y];
                if (orderItems.sizes[y].size === "small") {
                  sizesData.small.price += sizeItem.price;
                  sizesData.small.quantity += sizeItem.quantity;

                } else if (orderItems.sizes[y].size === "medium") {
                  sizesData.medium.price += sizeItem.price;
                  sizesData.medium.quantity += sizeItem.quantity;
                  
                } else if (orderItems.sizes[y].size === "large") {
                  sizesData.large.price += sizeItem.price;
                  sizesData.large.quantity += sizeItem.quantity;
                }
              }
            }
          }
        }
        result.push({
          name: product.name,
          totalOrders: productsOrderTotal,
          sizesData,
        });
      }
      setNewArray(result);
    }

    function displayTotal() {
      let total = 0;
      for (let i = 0; i < orders.length; i++) {
        total += orders[i].orderTotal;
      }
      return total;
    }

    console.log("Total orders: ", displayTotal());

    handleProductsDisplay();
  }, []);
  console.log(newArray);
  return (
    <div>
      {/*{newArray.map((item, index) => {
        return(
            <div className="w-screen" key={index}>
                <span>Name: {item.name}</span>{" - "}<span>Total: {item.totalOrders}</span>
            </div>
        )
    })}*/}
    </div>
  );
};

export default Menu;
