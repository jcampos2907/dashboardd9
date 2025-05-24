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
    const indicator = useStore((state) => state.indicator)
    const setIndicator = useStore((state) => state.updateIndicator)
    const updateIndicator = useCallback((indicator: string) => {
        setIndicator(indicator);
        // Store in localStorage for client-side persistence...
        localStorage.setItem('indicator', indicator);

        // Store in cookie for SSR...
        setCookie('indicator', indicator);

        // const filteredData = useMemo(() => {
        //     return Object.values(dataPerYear)
        //         .flatMap(entry => entry.filteredData ?? [])
        //         .filter(item => item.Indicator === indicator)
        // }, [dataPerYear, indicator])
        // const [minVal, maxVal] = useMemo(() => {
        //     const vals = filteredData.map(item => Number(item.Value)).filter(val => !isNaN(val))
        //     return [Math.min(...vals), Math.max(...vals)]
        // }, [filteredData, indicator])
        // const newValues = [minVal, maxVal]

        // setValues(newValues)


        // applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedIndicator = localStorage.getItem('indicator') as string | null;
        updateIndicator(savedIndicator || 'Mujeres en el Parlamento (%)');
        // return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, [updateIndicator]);

    return { indicator, updateIndicator } as const;
}
