import { data } from '@/data';
import * as d3 from 'd3';
import { useMemo } from 'react';

// Hash function for consistent color mapping
const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
};

export const useCountryColors = () => {
    const [countriesA, countriesB] = useMemo(() => {
        const countriesA: string[] = [];
        const countriesB: string[] = [];

        data.forEach(item => {
            if (item.Group === 'A') {
                countriesA.push(item["Country Name"]);
            } else if (item.Group === 'B') {
                countriesB.push(item["Country Name"]);
            }
        });

        return [countriesA, countriesB];
    }, [data]);

    const countryColorsA = useMemo(() => {
        const uniqueCountries = Array.from(new Set(countriesA));
        const colorMap: Record<string, string> = {};
        const colorScale = d3.schemeSet2; // Color scale for Group A

        uniqueCountries.forEach(country => {
            const index = Math.abs(hashCode(country)) % colorScale.length;
            colorMap[country] = colorScale[index];
        });

        return colorMap;
    }, [countriesA]);

    const countryColorsB = useMemo(() => {
        const uniqueCountries = Array.from(new Set(countriesB));
        const colorMap: Record<string, string> = {};
        const colorScale = d3.schemeTableau10; // Color scale for Group B

        uniqueCountries.forEach(country => {
            const index = Math.abs(hashCode(country)) % colorScale.length;
            colorMap[country] = colorScale[index];
        });

        return colorMap;
    }, [countriesB]);

    return { ...countryColorsA, ...countryColorsB };
};
