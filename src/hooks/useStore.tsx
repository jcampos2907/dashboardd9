import { MARGIN } from '@/constants';
import type { DataRow } from '@/types/types';
import { type ScaleLinear } from 'd3';
import { create } from 'zustand';
import { data } from "../data";

// Store Type Definition
type Store = {
    indicator: string;
    data: DataRow[];
    year: number;
    interactionData: { 'Country Name': string, 'Group': string } | null;
    xScale: () => ScaleLinear<number, number, never> | null;
    yScale: () => ScaleLinear<number, number, never> | null;
    dimensions: { width: number; height: number };
    boundsHeight: number;
    boundsWidth: number;
    indicatorRange: number[];
    gdpRange: number[];
    setGdpRange: (gdpRange: number[]) => void;
    setIndicatorRange: (indicatorRange: number[]) => void;
    selectedCountries: string[];
    setSelectedCountries: (selectedCountries: string[]) => void;
    setBoundsHeight: (height: number) => void;
    setBoundsWidth: (width: number) => void;
    setDimensions: (dimensions: { width: number; height: number }) => void;
    setXScale: (xScale: () => ScaleLinear<number, number, never>) => void;
    setYScale: (yScale: () => ScaleLinear<number, number, never>) => void;
    setInteractionData: (data: { 'Country Name': string, 'Group': string } | null) => void;
    updateData: (data: DataRow[]) => void;
    updateIndicator: (indicator: string) => void;
    updateYear: (year: number) => void;
};

// Zustand Store Definition
const useStore = create<Store>((set) => ({
    indicator: 'Women in Parliament (%)',
    data: data,
    year: 2022,
    boundsWidth: 0,
    boundsHeight: 0,
    // Use a function that returns the scale
    xScale: () => null,
    yScale: () => null,
    setBoundsWidth: (boundsWidth: number) => set({ boundsWidth }),
    setBoundsHeight: (boundsHeight: number) => set({ boundsHeight }),
    interactionData: null,
    dimensions: { width: 0, height: 0 },
    selectedCountries: Array.from(new Set(data.map((item) => item["Country Name"]))),
    indicatorRange: [],
    gdpRange: [Math.min(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Value"])) - 0.5, Math.max(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Value"])) + 0.5],
    setGdpRange: (gdpRange: number[]) => set({ gdpRange }),
    setIndicatorRange: (indicatorRange: number[]) => set({ indicatorRange }),
    setSelectedCountries: (selectedCountries: string[]) => set({ selectedCountries }),
    setDimensions: (dimensions: { width: number, height: number }) => {
        const boundsHeight = dimensions.height - MARGIN.top - MARGIN.bottom;
        const boundsWidth = dimensions.width - MARGIN.left - MARGIN.right;
        set({ boundsHeight, boundsWidth, dimensions });
    },
    setXScale: (xScaleFn: () => ScaleLinear<number, number, never>) => set({ xScale: xScaleFn }),
    setYScale: (yScaleFn: () => ScaleLinear<number, number, never>) => set({ yScale: yScaleFn }),
    setInteractionData: (interactionData: { 'Country Name': string, 'Group': string } | null) => {

        set({ interactionData });
    },
    updateIndicator: (indicator: string) => set({ indicator }),
    updateYear: (year: number) => set({ year }),
    updateData: (data: DataRow[]) => set({ data }),
}));

export default useStore;
