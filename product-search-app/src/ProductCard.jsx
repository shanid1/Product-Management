import React, { useState } from "react";
import { db } from "./firebase";
import { getDocs, collection, deleteDoc, query, where } from "firebase/firestore";

const ProductCard = ({ product }) => {
  const [newprices, setNewPrice] = useState();
  const [newaed, setNewAed] = useState();

  const newWAC = (parseFloat(newaed) * 0.105) * 1.09;
  const WAC = (parseFloat(product.aed) * 0.105) * 1.09;
  const newGP = ((parseFloat(newprices) - WAC) / parseFloat(newprices)) * 100;

  function newpricechange(e) {
    setNewPrice(e.target.value);
  }function newaedchange(e) {
    setNewAed(e.target.value);
  }

  async function deleteBtn() {
    const branchRef = collection(db, `branches/${product.branch}/products`);
    try {
      const snapshot = await getDocs(branchRef);
      snapshot.forEach(async (doc) => {
        const data = doc.data();
        if (data.name === product.name) {
          await deleteDoc(doc.ref);
          window.location.reload(); 
        }
      });
    } catch (err) {
      alert(`Error Deleting products from ${product.branch}: ${err.message}`);
    }
  }

  return (
    <div className="card">
      <h1>{product.name.toUpperCase()}</h1>
      <span>{product.desc}</span>
      <div className="cardIn">
        <h2>{product.branch.toUpperCase()}</h2>
        <h2>OD: {product.price}OMR</h2>
      </div>
      <div className="cardInfo">
        <h3>WAC: {WAC.toFixed(2)}</h3>
        <h3>New WAC: {newWAC.toFixed(2)}</h3>
      </div>
      <div className="cardInfo">
        <h3>AED: {product.aed}</h3>
        <h3>New GP: {newGP.toFixed(2)}</h3>
      </div>
      <div className="cardInfo">
        <h3>Stock: {product.stock}</h3>
        <h3>New GP: {newGP.toFixed(2)}%</h3>
      </div>
      <div className="cardInfo">
        <input
          type="number"
          className="cardInput"
          placeholder="New AED..."
          value={newaed}
          onChange={newaedchange}
        />
        <input
          type="number"
          className="cardInput"
          placeholder="New Price..."
          value={newprices}
          onChange={newpricechange}
        />
      </div>
      <button className="dltbtn" onClick={deleteBtn}>
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
