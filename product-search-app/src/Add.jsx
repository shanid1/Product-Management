import { db } from "./firebase";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
function Add(){
    const [names,setName] = useState("");
    const [prices,setPrice] = useState("");
    const [branchs,setBranch] = useState("");
    const [stocks,setStock] = useState("");
    const [saless,setSales] = useState("");
    async function addProduct(){
        if (names.trim() === "") return;

        
        
        const productData = {
        name: names.toUpperCase(),
        price:prices+"$",
        stock:stocks+"pcs",
        sale: saless,
        branch: branchs.toUpperCase(),
        };
        try {
            const branchRef = collection(db, `branches/${branchs}/products`);
            await addDoc(branchRef,productData);
            
            setName("");
            setPrice("");
            setStock("");
            setSales("");
            setBranch("");
            alert("Product added successfully!");
        }
        catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  

        
        
    }

  return(
    <div className="add">
    <form>
    <input placeholder="Name" value={names}  onChange={(e)=>{setName(e.target.value)}}></input>
    <input placeholder="Price" value={prices} onChange={(e)=>{setPrice(e.target.value)}}></input>
    <input placeholder="Branch:" value={branchs} onChange={(e)=>{setBranch(e.target.value)}}></input>
    <input placeholder="Stock" value={stocks} onChange={(e)=>{setStock(e.target.value)}}></input>
    <input placeholder="Sales" value={saless} onChange={(e)=>{setSales(e.target.value)}}></input>
    <button type="button" onClick={addProduct}>Add Product</button>
    </form> 
    </div>
  );
}
export default Add;