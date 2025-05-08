import React, { createContext, useState } from 'react';

export const PolishContext = createContext();

export const PolishProvider = ({ children }) => {
    const [searchpolish, setSearchpolish] = useState({});

    const clearPolishState = () => {
        setSearchpolish({});
    };


    return (
        <PolishContext.Provider value={{ searchpolish, setSearchpolish , clearPolishState }}>
            {children}
        </PolishContext.Provider>
    );
};