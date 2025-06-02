import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);

  document.title = "Search/Adds";

  async function fetchBranches() {
    const branchesCol = collection(db, "branchesList");
    const snapshot = await getDocs(branchesCol);
    return snapshot.docs.map(doc => doc.data().name.toLowerCase());
  }

  const handleSearch = async (query) => {
    const branches = await fetchBranches();
    let results = [];

    for (const branch of branches) {
      const branchRef = collection(db, `branches/${branch}/products`);

      try {
        const snapshot = await getDocs(branchRef);

        snapshot.forEach((doc) => {
          const data = doc.data(); 
          if (data.name.toLowerCase().includes(query.toLowerCase())) {
            data.branch = branch;
            results.push({ ...data, branch });
          }
        });
      } catch (err) {
        console.error(`Error fetching products from ${branch}:`, err);
      }
    }
    console.log(results);
    setProducts(results);
  };

  return (
    <>
    
      <SearchBar onSearch={handleSearch} />
      
      
      <div className="maindiv">
      {products.length === 0 ? (
        <p>No products found :(</p>
      ) : (
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      )}
    </div>
    <footer><p style={{marginTop:"500px"}}>&copy;shanid</p></footer></>
  );
}

export default App;
