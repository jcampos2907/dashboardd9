
import { useData } from "@/hooks/use-data";

import { useCountryColors } from "@/hooks/use-countrycolors";
import useStore from "@/hooks/useStore";
import { scaleLinear } from "d3-scale";
import { select } from 'd3-selection';

import { useDebounce } from 'use-debounce';
//@ts-ignore
// import { unstable_ViewTransition as ViewTransition } from 'react';
// import { useMemo, useState } from "react";
import { data } from "@/data";
import { useEffect, useRef, useState } from "react";
import D3Arrow from "./Arrow";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Tooltip, type InteractionData } from "./Tooltip";

type ScatterplotProps = {
    width: number;
    height: number;
    // data: { x: number; y: number }[];

};

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };
const CIRCLE_RADIUS = 10



export default function ScatterPlot({ width, height }: ScatterplotProps) {
    const { currentData, lastYearData } = useData()
    const svgRef = useRef<SVGSVGElement>(null);
    const CountryColors = useCountryColors(currentData.data.map((d) => d["Country Name"]));
    const { indicator } = useStore()
    const { data: currentFilteredData, gdp: currentGdpData } = currentData
    const { data: lastYearFilteredData, gdp: lastYearGdpData } = lastYearData

    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;


    const [interactionData, setInteractiondata] = useState<InteractionData | null>(null);

    const [interactionDataDebounced] = useDebounce(interactionData, 500);

    useEffect(() => {
        const svg = select(svgRef.current);
        svg.selectAll("circle.current_year")
            .data(currentFilteredData)
            .transition()
            .duration(500)
            .attr("opacity", (d) => {
                if (interactionDataDebounced == null) {
                    return 1
                }
                else if (interactionDataDebounced?.["Country Name"] != d["Country Name"]) {
                    return 0.2
                }
                else
                    return 1
            })

        svg.selectAll("circle.last_year")
            .data(lastYearFilteredData)
            .transition()
            .duration(500)
            .attr("opacity", (d) => {
                if (interactionDataDebounced == null) {
                    return 1
                }
                else if (interactionDataDebounced?.["Country Name"] != d["Country Name"]) {
                    return 0.2
                }
                else
                    return 1
            })
        svg.selectAll('.arrow')
            .filter(function () {
                return (this as SVGElement).id !== "arrow" + interactionDataDebounced?.["Country Name"].replace(/ /g, "_").toLowerCase();
            })
            .transition()
            .duration(500)
            .attr("opacity", () => {
                if (interactionDataDebounced == null) {
                    return 1
                }
                else {
                    return 0.3
                }
            }
            )
    }, [interactionDataDebounced])

    const yScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Log Value"])) - 0.5, Math.max(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Log Value"])) + 0.5]).range([boundsHeight, 0]);
    const xScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) - 1, Math.max(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) + 1]).range([0, boundsWidth]);
    const allShapes = currentFilteredData.map((dataItem, i) => {
        const gdpValue = currentGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === dataItem.Year);
        const color = CountryColors[dataItem["Country Name"]]
        return (
            <circle
                className="stroke-white stroke-2 z-20 current_year"
                key={i}
                r={CIRCLE_RADIUS}
                cx={xScale(dataItem.Value)}
                cy={yScale(gdpValue?.["Log Value"] ?? 0)}
                opacity={1}
                fill={color}
                fillOpacity={1}
                strokeWidth={1}
                onMouseEnter={() => // Each time the circle is hovered hover...
                    setInteractiondata({ // ... update the interactionData state with the circle information
                        xPos: xScale(dataItem.Value),
                        yPos: yScale(gdpValue?.["Log Value"] ?? 0),
                        gdp: gdpValue?.["Value"] ?? 0,
                        color,
                        ...dataItem
                    })
                }
                onMouseLeave={() => setInteractiondata(null)} // When the u
            />
        );
    });
    useEffect(() => {
        const svg = select(svgRef.current);
        svg.selectAll("circle.last_year")
            .data(currentFilteredData)
            .join("circle")
            .attr("cx", (d) => {
                const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
                return xScale(previousYearDataItem?.Value ?? 0)
            })
            .attr("cy", (d) => {
                const previousYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
                return yScale(previousYearGdpValue?.["Log Value"] ?? 0)
            })
            // .attr("cx", (d) => xScale(d.Value))
            // .attr("cy", (d) => {
            //     const gdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
            //     return yScale(gdpValue?.["Log Value"] ?? 0)
            // })
            .attr("r", CIRCLE_RADIUS)
            .attr("fill", (d) => CountryColors[d["Country Name"]])
            .attr("opacity", (d) => {
                const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
                if (!previousYearDataItem?.Value) {
                    return 0
                }
                return 0.8

            })
            .transition()
            .duration(1000)

            // .attr('cy', 0)
            .attr("r", () => CIRCLE_RADIUS / 2);

        svg.selectAll("circle.current_year")
            .data(currentFilteredData)
            .join("circle")
            .attr("r", 0)
            .attr("cx", (d) => {
                const previousYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
                return xScale(previousYearDataItem?.Value ?? d.Value)
            })
            .attr("cy", (d) => {
                const previousYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === (d.Year - 1));
                const currentGdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
                return yScale(previousYearGdpValue?.["Log Value"] ?? (currentGdpValue?.["Log Value"] ?? 0))
            })

            .attr("fill", (d) => CountryColors[d["Country Name"]])
            .transition()
            .delay(600)
            .duration(1000)
            //desactivar para opcion 2
            .attr("cx", (d) => xScale(d.Value))
            .attr("cy", (d) => {
                const gdpValue = currentGdpData.find((item) => item["Country Name"] === d["Country Name"] && item.Year === d.Year);
                return yScale(gdpValue?.["Log Value"] ?? 0)
            })
            .attr("r", CIRCLE_RADIUS)
    }, [currentFilteredData]);



    const allShapesLastYear = lastYearFilteredData.map((dataItem, i) => {
        const gdpValue = lastYearGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === dataItem.Year);
        const color = CountryColors[dataItem["Country Name"]]
        // if (!gdpValue) {
        //     console.log("No gdp value found for", dataItem["Country Name"], "in year", dataItem.Year);
        // }
        // if (!dataItem.Value) return null
        // if (!gdpValue?.["Log Value"]) return null
        return (
            <circle
                className="border-2 stroke-white -z-10 last_year"
                key={i}
                r={CIRCLE_RADIUS / 2}
                cx={xScale(dataItem.Value)}
                cy={yScale(gdpValue?.["Log Value"] ?? 0)}
                opacity={0.5}
                fill={color}
                fillOpacity={1}
                strokeWidth={1}
            />
        );
    });

    const allArrrows = currentFilteredData.map((dataItem) => {
        const gdpValue = currentGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === dataItem.Year);
        const lastYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === (dataItem.Year - 1));
        const lastYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === (dataItem.Year - 1));
        const countryColor = CountryColors[dataItem["Country Name"]]

        if (lastYearDataItem && gdpValue) {
            return (
                <D3Arrow x1={xScale(lastYearDataItem.Value)} x2={xScale(dataItem.Value)} y1={yScale(lastYearGdpValue?.["Log Value"] ?? 0)} y2={yScale(gdpValue?.["Log Value"] ?? 0)} color={countryColor} radius={CIRCLE_RADIUS} country={lastYearDataItem["Country Name"]} />
            )
        }
        else {

            return null
        }
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                <svg width={width} height={height} ref={svgRef}>
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                    >
                        {/* Y axis */}
                        <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} label="GDP per Capita (normalized)" />

                        {/* X axis, use an additional translation to appear at the bottom */}
                        <g transform={`translate(0, ${boundsHeight})`}>
                            <AxisBottom
                                xScale={xScale}
                                pixelsPerTick={40}
                                height={boundsHeight}
                                label={indicator}
                            />
                        </g>

                        {/* Circles */}
                        {allShapesLastYear}
                        {allShapes}
                        {allArrrows}

                    </g>
                </svg>
                {/* Tooltip */}
                <div
                    style={{
                        width: boundsWidth,
                        height: boundsHeight,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        marginLeft: MARGIN.left,
                        marginTop: MARGIN.top,
                    }}
                >
                    <Tooltip interactionData={interactionData} />
                </div>
            </div>


        </div>
    );
};
