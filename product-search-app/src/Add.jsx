import { db } from "./firebase";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
function Add(){
    const [names,setName] = useState("");
    const [prices,setPrice] = useState("");
    const [branchs,setBranch] = useState("");
    const [stocks,setStock] = useState("");
    const [aeds,setAed] = useState("");
    const [descs,setDesc] = useState("");


async function addProduct(){
        if (names.trim() === "" || branchs.trim() === "") {
    alert("Name and Brand are required!");
    return;
  }
  const branches = ["geepas", "olsenmark", "krypton"];
    if (!branches.includes(branchs.toLowerCase())) {
      alert("Invalid branch name!");
      return;
    }

        
        
       const productData = {
  name: names,
  price: prices,
  stock: stocks,
  desc:descs,
  aed: aeds,
  branch: branchs, 
};


const branchRef = collection(db, `branches/${branchs}/products`);
        try {
            
            await addDoc(branchRef,productData);
            
            setName("");
            setPrice("");
            setStock("");
            setBranch("");
            setAed("");
            setDesc("");
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
    <input placeholder="Model Number:" value={names}  onChange={(e)=>{setName(e.target.value)}}></input>
    <input placeholder="Description" value={descs}  onChange={(e)=>{setDesc(e.target.value)}}></input>

    <input placeholder="Price(OD):" value={prices} onChange={(e)=>{setPrice(e.target.value)}}></input>
    
    <input placeholder="Stock:" value={stocks} onChange={(e)=>{setStock(e.target.value)}}></input>
    <input placeholder="AED:" value={aeds} onChange={(e)=>{setAed(e.target.value)}}></input>
    <select value={branchs} onChange={(e)=>{setBranch(e.target.value)}}>
      <option>Select a brand</option>
      <option>geepas</option>
      <option>olsenmark</option>
      <option>krypton</option>
    </select>
    <button type="button" onClick={addProduct}>Add Product</button>
    </form> 
    </div>
  );
}
export default Add;