import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchState, setSearchState,] = useState({});

    const clearSearchState = () => {
        setSearchState({});
    };



    return (
        <SearchContext.Provider value={{searchState, setSearchState,clearSearchState }}>
            {children}
        </SearchContext.Provider>
    );
};