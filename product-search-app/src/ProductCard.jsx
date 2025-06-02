import React from "react";
import { db } from "./firebase";
import { getDocs, collection ,deleteDoc} from "firebase/firestore";

const ProductCard = ({product}) =>{
    async function deleteBtn(){
        const branchRef = collection(db,`branches/${product.branch}/products`)
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
                alert(`Error Deleting products from ${product.branch}:`, err);
              }
    }
    return(
    <div className="card">
        <h1>{product.name.toUpperCase()}</h1>
        <div className="cardIn">
        <h2>{product.branch.toUpperCase()}</h2>
        <h2>{product.price}</h2>
        </div>
        <div className="cardInfo">
        <h3>Sale: {product.sale}</h3>
        <h3>Stock: {product.stock}</h3>
        </div>
        <button className="dltbtn" onClick={deleteBtn}>Remove</button>
    </div>
    )
}

export default ProductCard