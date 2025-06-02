import React, { useState } from "react";
import Add from "./Add";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false); 

  function handleSearch() {
    setShowAdd(false)
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  function addProduct() {
    
    showAdd==true?setShowAdd(false):setShowAdd(true); 
  }

  function changeSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <div className="searchbox">
        <input
          className="searchinput"
          placeholder="Search for a product..."
          type="text"
          value={query}
          onChange={changeSearch}
        />
        <button className="searchbtn" onClick={handleSearch}>
          Search
        </button>
        <button className="addbtn" onClick={addProduct}>
          Add Product
        </button>
      </div>

      {showAdd && <Add />}
    </>
  );
};

export default SearchBar;
