import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Search/Adds";
  }, []);

  async function fetchBranches() {
    const branchesCol = collection(db, "branches");
    const snapshot = await getDocs(branchesCol);
    return snapshot.docs.map(doc => doc.id);  // keep original case
  }

  const handleSearch = async (query) => {
    console.log("Search query:", query);
    const branches = await fetchBranches();
    console.log("Branches found:", branches);
    let results = [];

    for (const branch of branches) {
      console.log(`Fetching products for branch: ${branch}`);
      const branchRef = collection(db, `branches/${branch}/products`);
      try {
        const snapshot = await getDocs(branchRef);
        if (snapshot.empty) {
          console.log(`No products found in branch: ${branch}`);
        }
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`Data from ${branch}:`, data);
          if (data.name?.toLowerCase().includes(query.toLowerCase())) {
            results.push({ ...data, branch, id: doc.id });
          }
        });
      } catch (err) {
        console.error(`Error fetching from ${branch}:`, err);
      }
    }

    console.log("Search results:", results);
    setProducts(results);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="maindiv">
        {products.length === 0 ? (
          <p>No products found :(</p>
        ) : (
          products.map((product) => (
            <ProductCard key={`${product.branch}-${product.id}`} product={product} />
          ))
        )}
      </div>
      <footer>
        <p style={{ marginTop: "500px" }}>&copy;shanid</p>
      </footer>
    </>
  );
}

export default App;
