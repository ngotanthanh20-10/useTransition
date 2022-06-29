import { useState, useTransition, startTransaction } from "react";

import { generateProducts } from "./data";
import ProductList from "./components/ProductList";

const dummyProducts = generateProducts();

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

function App() {
  const [isPending, startTransaction] = useTransition();
  const [filterTerm, setFilterTerm] = useState("");
  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    startTransaction(() => {
      setFilterTerm(event.target.value);
    });
  }

  return (
    <div id="app">
      <input
        type="text"
        onChange={updateFilterHandler}
        style={{ width: "100%" }}
      />
      {isPending && (
        <p style={{ color: "white", margin: "20px" }}>Uploading List.....</p>
      )}
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
