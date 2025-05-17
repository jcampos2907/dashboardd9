import * as d3 from 'd3';
import { useMemo } from 'react';

// Hash function for consistent color mapping
const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export const useCountryColors = (countries: string[]) => {
    // Create a color scale with a consistent range of colors
    // const colorScale = d3.scaleOrdinal<string, string>()
    //     .domain(countries)
    //     .range(d3.schemeTableau10); // Choose a consistent color scheme

    // Memoize color assignment
    const countryColors = useMemo(() => {
        const uniqueCountries = Array.from(new Set(countries));
        const colorMap: Record<string, string> = {};

        uniqueCountries.forEach(country => {
            // Use the hash function for consistent color mapping
            const index = Math.abs(hashCode(country)) % d3.schemeTableau10.length;
            colorMap[country] = d3.schemeTableau10[index];
        });

        return colorMap;
    }, [countries]);

    return countryColors;
};
