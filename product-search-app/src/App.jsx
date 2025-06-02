import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Search/Adds";
  }, []);

  async function fetchBranches() {
    try {
      const branchesCol = collection(db, "branches");
      const snapshot = await getDocs(branchesCol);
      if (snapshot.empty) {
        console.warn("No branches found in database");
        return [];
      }
      return snapshot.docs.map(doc => doc.id);
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to load branches");
      return [];
    }
  }

const handleSearch = async (query) => {
  const branches = ["geepas", "olsenmark", "parajohn"];
  let results = [];

  for (const branch of branches) {
    const branchRef = collection(db, `branches/${branch}/products`);
    try {
      const snapshot = await getDocs(branchRef);
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...data, branch });
        }
      });
    } catch (error) {
      console.error(`Error fetching products from ${branch}:`, error);
    }
  }

  setProducts(results);
};

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="maindiv">
        {loading && <p>Searching...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && products.length === 0 ? (
          <p>No products found. Try a different search term.</p>
        ) : (
          products.map((product) => (
            <ProductCard 
              key={`${product.branch}-${product.id}`} 
              product={product} 
            />
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