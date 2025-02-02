import React, { useState } from 'react';
import { ISearch } from '../interfaces/fetch.interface';

const SearchBar: React.FC<ISearch> = ({ onSearch, onSubmitSearch }) => {
  const [search, setSearch] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      onSubmitSearch(search); 
    }
  };

  const onFormSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value); 
  };

  return (
    <form onSubmit={onSubmit}>
      <input 
        type="text" 
        placeholder="Search"
        value={search}
        onChange={onFormSubmit}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
