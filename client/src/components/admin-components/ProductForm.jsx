import React, { useState, useEffect } from "react";

function ProductForm({ product, onSave, mode }) {
  const [name, setName] = useState("");
  const [flavour, setFlavour] = useState("");
  const [category, setCategory] = useState("single");
  const [priceS, setPriceS] = useState("");
  const [priceM, setPriceM] = useState("");
  const [priceL, setPriceL] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.name);
      setFlavour(product.flavour);
      setCategory(product.category);
      setPriceS(product.sizes[0].price);
      setPriceM(product.sizes[1].price);
      setPriceL(product.sizes[2].price);
      setPreview(product.image);
    }
  }, [mode, product]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = {
      id: product ? product.id : Date.now().toString(),
      name,
      flavour,
      category,
      image: preview,
      sizes: [
        { size: "S", price: priceS, isAvailable: true },
        { size: "M", price: priceM, isAvailable: true },
        { size: "L", price: priceL, isAvailable: true },
      ],
    };
    onSave(newProduct);
  }

  return (
    <div className="pt-15 w-full min-h-screen bg-gray-100 flex justify-center pl-20 md:pl-81">
      <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {mode === "edit" ? "Edit Product" : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name & Flavour */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Flavour
              </label>
              <input
                type="text"
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
                placeholder="Enter flavour"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
            </select>
          </div>

          {/* Prices */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Prices
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <input
                type="number"
                value={priceS}
                onChange={(e) => setPriceS(e.target.value)}
                placeholder="Price S (R)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                required
              />
              <input
                type="number"
                value={priceM}
                onChange={(e) => setPriceM(e.target.value)}
                placeholder="Price M (R)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                required
              />
              <input
                type="number"
                value={priceL}
                onChange={(e) => setPriceL(e.target.value)}
                placeholder="Price L (R)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-4"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-lg hover:bg-blue-700 transition font-semibold text-xl"
          >
            {mode === "edit" ? "Save Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
