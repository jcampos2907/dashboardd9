import { useCallback, useEffect } from 'react';
import useStore from './useStore';


const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};


export function useYear() {
    const year = useStore((state) => state.year)
    const setYear = useStore((state) => state.updateYear)
    const updateYear = useCallback((year: number[]) => {
        setYear(year);
        // Store in localStorage for client-side persistence...
        localStorage.setItem('year', JSON.stringify(year));

        // Store in cookie for SSR...
        setCookie('year', JSON.stringify(year));

        // applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedYear = localStorage.getItem('year') as string | null;

        try {
            const parsedYear = savedYear ? JSON.parse(savedYear) : null;
            const isValidArray = Array.isArray(parsedYear) && parsedYear.length === 2;
            updateYear(isValidArray ? parsedYear : [2012, 2022]);
        } catch (error) {
            updateYear([2012, 2022]);
        }
        // return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, [updateYear]);

    return { year, updateYear } as const;
}
