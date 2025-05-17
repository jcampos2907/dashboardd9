import { MARGIN } from "@/constants";
import { drag, select } from "d3";
import { useEffect, useState } from "react";
import useStore from "./useStore";

export default function useSweepLines() {
    const { dimensions } = useStore()
    const boundsHeight = dimensions.height - MARGIN.top - MARGIN.bottom;
    const [yTop, setYTop] = useState(1);
    const [yBottom, setYBottom] = useState(boundsHeight);

    const [isDraggingTop, setIsDraggingTop] = useState(false);
    const [isDraggingBottom, setIsDraggingBottom] = useState(false);
    useEffect(() => {
        const svg = select('#svg-container');
        const handleDragBottom = drag<SVGCircleElement, unknown>()
            .on("start", () => {
                setIsDraggingBottom(true);
            })
            .on("drag", (event) => {
                const { y } = event;
                setYBottom(Math.min(boundsHeight, Math.max(y, yTop + 10)));
            })
            .on("end", () => {
                setIsDraggingTop(false);
            });

        const handleDragTop = drag<SVGCircleElement, unknown>()
            .on("start", () => {
                setIsDraggingTop(true);
            })
            .on("drag", (event) => {
                const { y } = event;
                setYTop(Math.max(0, Math.min(y, yBottom - 10)));
            })
            .on("end", () => {
                setIsDraggingTop(false);
            });

        svg.selectAll<SVGCircleElement, unknown>(".sweep-handle-top")
            .each(function () {
                const handle = select(this as SVGCircleElement);
                handle.call(handleDragTop as any);
            });

        svg.selectAll<SVGCircleElement, unknown>(".sweep-handle-bottom")
            .each(function () {
                const handle = select(this as SVGCircleElement);
                handle.call(handleDragBottom as any);
            });


        svg.selectAll("circle.countries").each(function () {
            const circle = select(this);
            const yValue = parseFloat(circle.attr("cy") ?? "0"); // Retrieve the y value (as a number)
            // Now you can compare the yValue to your sweep line positions
            if (yValue >= yTop && yValue <= yBottom) {
                circle.attr("opacity", 1); // Full opacity within range
            } else {
                circle.attr("opacity", 0.2); // Low opacity outside range
            }
        })
        // svg.selectAll('.arrow').each(function () {
        //     const line = select(this);
        //     const y1 = parseFloat(line.attr("y1") ?? "0");
        //     const y2 = parseFloat(line.attr("y2") ?? "0");
        //     console.log(line.attr("y1"), line.attr("y2"))
        //     // Now you can compare the yValue to your sweep line positions
        //     if ((y1 >= yTop && y1 <= yBottom) || (y2 >= yTop && y2 <= yBottom)) {
        //         line.attr("opacity", 1); // Full opacity within range
        //     } else {
        //         line.attr("opacity", 0.2); // Low opacity outside range
        //     }
        // })

        svg.selectAll("svg.arrow") // Directly target the main SVG element
            .each(function () {
                const svgElement = select(this);

                // First, try to find any <line> elements directly within the SVG
                svgElement.selectAll("line").each(function () {
                    const line = select(this);
                    const y1 = parseFloat(line.attr("y1") ?? "0");
                    const y2 = parseFloat(line.attr("y2") ?? "0");
                    console.log(line.attr("y1"), line.attr("y2"))
                    // Now you can compare the yValue to your sweep line positions
                    if ((y1 >= yTop && y1 <= yBottom) || (y2 >= yTop && y2 <= yBottom)) {
                        line.attr("opacity", 1); // Full opacity within range
                    } else {
                        line.attr("opacity", 0.2); // Low opacity outside range
                    }
                });

                // If no <line> elements were found, this is a plain SVG
                if (svgElement.selectAll("line").empty()) {
                    console.log("No <line> elements found within this SVG.");
                }
            });

    }, [yTop, yBottom, boundsHeight]);

    useEffect(() => {
        setYBottom(boundsHeight)
    }, [boundsHeight])

    return {
        yTop,
        yBottom,
        isDraggingTop,
        isDraggingBottom
    }
}