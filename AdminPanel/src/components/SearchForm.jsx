import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useSearch } from '../context/SearchProvider';

function SearchForm() {
  const [query, setQuery] = useState('');
  const {handleSearch, resetSearch, searchResult } = useSearch();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!query.trim()) return;
    handleSearch(query);
  }

  const handleReset =(e) =>{ 
      resetSearch();
      setQuery("");
  }

  const handleKeyDown =(e) =>{
    if ((e.key === "Backspace" || e.key === "Escape"))
      resetSearch();

  }

  return (
    <form className='relative' onSubmit={handleSubmit}>
       <input 
         value={query} 
         onKeyDown={handleKeyDown}
         onChange={({target}) => setQuery(target.value)}
         placeholder='Search...' 
         className='border border-gray-500 
         outline-none rounded focus:ring-1 ring-blue-500 w-57' 
      />
        {searchResult.length ? <button onClick={handleReset} className='absolute top-1/2 -translate-y-1/2 text-gray-700 right-3'>
        <AiOutlineClose/>
      </button> : null }
    </form>
  )
}

export default SearchForm
