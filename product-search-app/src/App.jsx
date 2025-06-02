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
  if (!query.trim()) {
    setProducts([]);
    return;
  }

  setLoading(true);
  setError(null);
  
  try {
    const searchTerm = query.toLowerCase();
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    
    let results = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const productName = data.name || '';
      if (productName.toLowerCase().includes(searchTerm)) {
        results.push({ 
          ...data,
          id: doc.id 
        });
      }
    });

    setProducts(results);
  } catch (err) {
    console.error("Search error:", err);
    setError("Failed to complete search");
  } finally {
    setLoading(false);
  }
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