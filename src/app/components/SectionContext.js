'use client';

import { createContext, useContext, useState } from 'react';

const SectionContext = createContext();

export function SectionProvider({ children }) {
    const [currentSection, setCurrentSection] = useState(null);
    return (
        <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSection() {
    return useContext(SectionContext);
}
