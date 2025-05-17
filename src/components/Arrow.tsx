import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface ArrowProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    country: string;
    color?: string;
    thickness?: number;
    animated?: boolean;
    radius?: number;
}

const D3Arrow: React.FC<ArrowProps> = ({ x1, y1, x2, y2, color = '#000', thickness = 1, animated = true, radius = 0, country }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = d3.select<SVGSVGElement, unknown>(svgRef.current!);
        svg.selectAll('*').remove(); // Clear previous elements

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (distance < 15) return; // Do not draw if distance is too small

        // Adjust endpoint for the radius
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const adjustedX2 = x2 - Math.cos(angle) * radius;
        const adjustedY2 = y2 - Math.sin(angle) * radius;

        // Main line
        const line = svg.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', animated ? x1 : adjustedX2)
            .attr('y2', animated ? y1 : adjustedY2)
            .attr('stroke', color)
            .attr('stroke-width', thickness);

        if (animated) {
            line.transition()
                .delay(500)
                .duration(1000)
                .attr('x2', adjustedX2)
                .attr('y2', adjustedY2)
                .on('end', () => drawArrowhead(svg, adjustedX2, adjustedY2, angle, color, thickness));
        } else {
            drawArrowhead(svg, adjustedX2, adjustedY2, angle, color, thickness);
        }

        // Draw arrowhead (defined separately to ensure type safety)
        function drawArrowhead(
            svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
            x: number,
            y: number,
            angle: number,
            color: string,
            thickness: number
        ) {
            svg.append('line')
                .attr('x1', x)
                .attr('y1', y)
                .attr('x2', x - 8 * Math.cos(angle - Math.PI / 4))
                .attr('y2', y - 8 * Math.sin(angle - Math.PI / 4))
                .attr('stroke', color)
                .attr('stroke-width', thickness);

            svg.append('line')
                .attr('x1', x)
                .attr('y1', y)
                .attr('x2', x - 8 * Math.cos(angle + Math.PI / 4))
                .attr('y2', y - 8 * Math.sin(angle + Math.PI / 4))
                .attr('stroke', color)
                .attr('stroke-width', thickness);
        }

    }, [x1, y1, x2, y2, color, thickness, animated, radius]);

    return <svg ref={svgRef} className="w-screen h-screen arrow" id={'arrow' + country.replace(/ /g, "_").toLowerCase()} />;
};

export default D3Arrow;
