import { useCallback, useEffect } from 'react';
import useStore from './useStore';


const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};


export function useIndicator() {
    const store = useStore()
    const { indicator } = store
    const setIndicator = store.updateIndicator
    const updateIndicator = useCallback((indicator: string) => {
        setIndicator(indicator);
        // Store in localStorage for client-side persistence...
        localStorage.setItem('indicator', indicator);

        // Store in cookie for SSR...
        setCookie('indicator', indicator);

        // applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedIndicator = localStorage.getItem('indicator') as string | null;
        updateIndicator(savedIndicator || 'Women in Parliament (%)');
        // return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, [updateIndicator]);

    return { indicator, updateIndicator } as const;
}
