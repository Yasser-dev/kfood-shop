import React, { useState } from "react";

const Search = ({ history }) => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/search/${search.trim()}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search for products"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
