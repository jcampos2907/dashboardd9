import { CIRCLE_RADIUS } from "@/constants";
import type { data as dataType } from "@/data";
import { useData } from "@/hooks/use-data";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Circle(
    { year, color, data, gdpData }
        : { year: string, color: string, data: typeof dataType[number], gdpData: typeof dataType[number] | undefined }) {

    const dataPerYear = useData();
    const previousYearFilteredData = dataPerYear[(Number(year) - 1).toString()]?.filteredData.find((item) => item["Country Name"] === data["Country Name"]);
    const previousYearGdpData = dataPerYear[(Number(year) - 1).toString()]?.filteredDataGDP.find((item) => item["Country Name"] === data["Country Name"]);

    const selectedYear = useStore((state) => state.year);
    const setInteractionData = useDebouncedCallback(useStore((state) => state.setInteractionData), 300);
    const interactionData = useStore((state) => state.interactionData);
    const yScale = useStore((state) => state.yScale)();
    const xScale = useStore((state) => state.xScale)();

    // State to control the animated position
    const [cx, setCx] = useState(xScale ? xScale(previousYearFilteredData?.['Value'] ?? data.Value) : 0);
    const [cy, setCy] = useState(yScale ? yScale(previousYearGdpData?.['Value'] ?? (gdpData?.['Value'] ?? 0)) : 0);
    const [radius, setRadius] = useState(CIRCLE_RADIUS / 2); // Start with half radius

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

    // Animate radius on year change
    useEffect(() => {
        if (Number(year) === selectedYear) {
            setTimeout(() => {
                setRadius(CIRCLE_RADIUS);
            }, 300);
        } else {
            setRadius(CIRCLE_RADIUS / 2);
        }
    }, [selectedYear, year]);

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
        'stroke-white z-20 current_year countries',
        Number(year) === selectedYear ? 'stroke-2 ' : 'stroke-0.5 opacity-20',
        interactionData?.["Country Name"] == data["Country Name"] ? "opacity-100 z-50" : "opacity-5 z-0",
        'hover:cursor-pointer hover:transition-opacity',
        !interactionData && selectedYear === Number(year) ? 'opacity-100' : ''
    );

    return (
        <circle
            className={classNames}
            r={radius} // Animated radius
            cx={cx} // Animated position
            cy={cy} // Animated position
            fill={color}
            onMouseEnter={() => // Each time the circle is hovered hover...
            {
                setInteractionData({ // ... update the interactionData state with the circle information
                    xPos: xScale(data.Value),
                    yPos: yScale(gdpData?.['Value'] ?? 0),
                    gdp: gdpData?.["Value"] ?? 0,
                    color,
                    ...data
                })
            }
            }
            onMouseLeave={() => setInteractionData(null)} // When the user leaves the circle
        />
    );
}
