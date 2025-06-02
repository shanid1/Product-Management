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

 // Updated handleSearch function
const handleSearch = async (query) => {
  if (!query.trim()) {
    setProducts([]);
    return;
  }

  setLoading(true);
  setError(null);
  
  try {
    console.log("Starting search for:", query);
    const branches = await fetchBranches();
    console.log("Available branches:", branches);

    let results = [];
    const searchTerm = query.toLowerCase();

    for (const branch of branches) {
      console.log(`Checking branch: ${branch}`);
      // Convert branch to uppercase to match how you store it
      const formattedBranch = branch.toUpperCase();
      const branchRef = collection(db, `branches/${formattedBranch}/products`);
      const snapshot = await getDocs(branchRef);
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const productName = data.name || '';
        if (productName.toLowerCase().includes(searchTerm)) {
          results.push({ 
            ...data, 
            branch: formattedBranch, // Use the formatted branch name
            id: doc.id 
          });
        }
      });
    }

    console.log("Final results:", results);
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