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
    const store = useStore()
    const { year, updateYear: setYear } = store
    const updateYear = useCallback((year: number) => {
        setYear(year);
        // Store in localStorage for client-side persistence...
        localStorage.setItem('year', String(year));

        // Store in cookie for SSR...
        setCookie('year', String(year));

        // applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedYear = localStorage.getItem('year') as string | null;
        updateYear(Number(savedYear) || 2012);
        // return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, [updateYear]);

    return { year, updateYear } as const;
}
