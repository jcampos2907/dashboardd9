
import { MARGIN } from "@/constants";
import { data } from "@/data";
import useStore from "@/hooks/useStore";
import { scaleLinear } from "d3";
import { useEffect, useRef } from "react";
import Arrows from "./Arrows";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import Circles from "./Circles";
import SweepLines from "./SweepLines";
import { Tooltip } from "./Tooltip";

type ScatterplotProps = {
    width: number;
    height: number;
    // data: { x: number; y: number }[];

};


export default function ScatterPlot({ width, height }: ScatterplotProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const indicator = useStore((state) => state.indicator)
    const boundsHeight = useStore((state) => state.boundsHeight)
    const boundsWidth = useStore((state) => state.boundsWidth)
    const setXScale = useStore((state) => state.setXScale)
    const setYScale = useStore((state) => state.setYScale)
    const yScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Value"])) - 0.5, Math.max(...data.filter(item => item.Indicator == 'GDP ($)').map(v => v["Value"])) + 0.5]).range([boundsHeight, 0]);
    const xScale = scaleLinear().domain([Math.min(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) - 1, Math.max(...data.filter(item => item.Indicator != 'GDP ($)').map(v => v["Value"])) + 1]).range([0, boundsWidth]);
    useEffect(() => {
        setXScale(() =>
            xScale
        );

        setYScale(() =>
            yScale
        );
    }, [yScale, xScale]);

    // const allArrrows = currentFilteredData.map((dataItem, i) => {
    //     const gdpValue = currentGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === dataItem.Year);
    //     const lastYearDataItem = lastYearFilteredData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === (dataItem.Year - 1));
    //     const lastYearGdpValue = lastYearGdpData.find((item) => item["Country Name"] === dataItem["Country Name"] && item.Year === (dataItem.Year - 1));
    //     const countryColor = CountryColors[dataItem["Country Name"]]

    //     if (lastYearDataItem && gdpValue) {
    //         return (
    //             <D3Arrow key={i + 'key_arrow'} x1={xScale(lastYearDataItem.Value)} x2={xScale(dataItem.Value)} y1={yScale(lastYearGdpValue?.["Value"] ?? 0)} y2={yScale(gdpValue?.["Value"] ?? 0)} color={countryColor} radius={CIRCLE_RADIUS} country={lastYearDataItem["Country Name"]} />
    //         )
    //     }
    //     else {

    //         return null
    //     }
    // })

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                <svg width={width} height={height} ref={svgRef} id="scatterplot">
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
                        <SweepLines />
                        <Arrows />

                        <Circles />
                    </g>
                </svg>
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
                    <Tooltip />
                </div>
            </div>


        </div>
    );
};
