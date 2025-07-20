import { useEffect, useRef } from 'react';
import { useSection } from './SectionContext';

export default function useSectionObserver(sectionName) {
    const ref = useRef();
    const { setCurrentSection } = useSection();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCurrentSection(sectionName);
                }
            },
            { threshold: 0.1 } // Adjust based on when you want it to trigger
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [sectionName, setCurrentSection]);

    return ref;
}
