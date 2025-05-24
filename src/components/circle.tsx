import { CIRCLE_RADIUS } from "@/constants";
import type { data as dataType } from "@/data";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { color as d3color } from "d3-color";
import { Fragment, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ScatterChartTooltip } from "./ScatterChartTooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Circle(
    { year, color, data, gdpData }
        : { year: string, color: string, data: typeof dataType[number] & { 'is_active': boolean }, gdpData: typeof dataType[number] & { 'is_active': boolean } | undefined }) {

    const [dataPerYear] = useData();
    const [open, setOpen] = useState(false);
    const previousYearFilteredData = dataPerYear[(Number(year) - 1).toString()]?.filteredData.find((item) => item["Country Name"] === data["Country Name"]);
    const previousYearGdpData = dataPerYear[(Number(year) - 1).toString()]?.filteredDataGDP.find((item) => item["Country Name"] === data["Country Name"]);
    const selectedCountries = useStore((state) => state.selectedCountries);

    const selectedYear = useStore((state) => state.year);
    const setInteractionData = useDebouncedCallback(useStore((state) => state.setInteractionData), 300);
    const interactionData = useStore((state) => state.interactionData);
    const yScale = useStore((state) => state.yScale)();
    const xScale = useStore((state) => state.xScale)();

    // State to control the animated position
    const [cx, setCx] = useState(xScale ? xScale(previousYearFilteredData?.['Value'] ?? data.Value) : 0);
    const [cy, setCy] = useState(yScale ? yScale(previousYearGdpData?.['Value'] ?? (gdpData?.['Value'] ?? 0)) : 0);
    // const [radius, setRadius] = useState(CIRCLE_RADIUS / 2); // Start with half radius

    // Calculate final position
    const finalCx = xScale ? xScale(data.Value) : 0;
    const finalCy = yScale ? yScale(gdpData?.['Value'] ?? 0) : 0;

    // Animate the circle to its final position on mount
    useEffect(() => {
        if (!xScale || !yScale) {
            return;
        }
        setTimeout(() => {
            setCx(finalCx);
            setCy(finalCy);
        }, 300);
    }, [finalCx, finalCy, yScale, xScale]);

    if (!xScale || !yScale) {
        return null;
    }

    if (cx === 0 && cy === 0) {
        return null;
    }

    if (!gdpData) {
        return null;
    }

    const classNames = cn(
        'transition-all duration-700 ease-in-out transform', // Tailwind animation
        '  current_year countries',
        Number(year) === selectedYear[1] ? 'stroke-2 z-20' : 'stroke-0.5 opacity-20 z-0',
        interactionData?.["Country Name"] == data["Country Name"] ? "opacity-100 z-50" : `opacity-15 z-0`,
        'hover:cursor-pointer hover:transition-opacity',
        !interactionData && selectedYear[1] === Number(year) ? 'opacity-100 z-50 stroke-white' :
            (!interactionData && (selectedYear[1] - Number(year) == 1)) ? 'opacity-70 stroke-white' :
                (!interactionData && (selectedYear[1] - Number(year) == 2)) ? 'opacity-60 stroke-white' :
                    (!interactionData && (selectedYear[1] - Number(year) == 3)) ? 'opacity-40 stroke-white' : 'stroke-white',

    );
    const baseColor = color; // e.g., "#D74B4B"
    const darkerColor = d3color(baseColor)?.darker(1.2).formatHex(); // Slightly darker
    const yearDiff = Math.abs(Number(year) - selectedYear[1]);
    const maxYearDiff = 10; // Adjust this value based on how many years your dataset spans
    const minRadius = CIRCLE_RADIUS * 0.3; // Minimum radius for distant years

    // Scale radius based on proximity to selected year
    const radius = yearDiff === 0
        ? CIRCLE_RADIUS
        : Math.max(minRadius, CIRCLE_RADIUS * (1 - 1.75 * yearDiff / maxYearDiff));

    const gradientId = `radial-${data["Country Name"].replace(/\s+/g, '-')}-${year}`;

    if (data.is_active === false) { return null; }

    if (gdpData.is_active === false) { return null; }

    return (

        <Fragment>
            <defs>
                <radialGradient id={gradientId}
                    cx={cx + radius}
                    cy={cy - radius}
                    r={radius * 2.5}
                    gradientUnits="userSpaceOnUse" >
                    <stop offset="0.153402" stop-color={color} />
                    <stop offset="0.580475" stop-color={color} />
                    <stop offset="1" stop-color={darkerColor} />
                </radialGradient>
            </defs>
            {yearDiff === 0 ?
                <TooltipProvider>
                    <Tooltip delayDuration={300} open={(selectedCountries.length == 1 && selectedCountries[0] == data["Country Name"]) || open} onOpenChange={setOpen}>
                        <TooltipTrigger asChild>
                            <circle
                                className={classNames}
                                r={radius}
                                cx={cx}
                                cy={cy}
                                fill={`url(#${gradientId})`}
                                onMouseEnter={() => setInteractionData({
                                    'Country Name': data["Country Name"],
                                    'Group': 'Group A',
                                })}
                                onMouseLeave={() => setInteractionData(null)}
                            /></TooltipTrigger>
                        <TooltipContent side="right" className="bg-background text-foreground">
                            {/* <div>hi</div> */}
                            <ScatterChartTooltip interactionData={{
                                xPos: xScale(data.Value),
                                yPos: yScale(gdpData!.Value),
                                gdp: gdpData!.Value,
                                color,
                                ...data
                            }} />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                :
                <circle
                    className={classNames}
                    r={radius}
                    cx={cx}
                    cy={cy}
                    fill={`url(#${gradientId})`}
                    onMouseEnter={() => setInteractionData({
                        'Country Name': data["Country Name"],
                        'Group': 'Group A',
                    })}
                    onMouseLeave={() => setInteractionData(null)}
                />
            }
        </Fragment>
    );
}
