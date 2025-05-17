import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

interface D3SliderProps {
    min: number;
    max: number;
    step?: number;
    initialValue?: number;
    onChange?: (value: number) => void;
}

const D3Slider: React.FC<D3SliderProps> = ({
    min,
    max,
    step = 1,
    initialValue = min,
    onChange,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous elements

        const width = 300;
        const height = 50;

        svg.attr('width', width).attr('height', height);

        const scale = d3.scaleLinear().domain([min, max]).range([0, width - 20]);

        const sliderGroup = svg.append('g').attr('transform', 'translate(10, 20)');

        sliderGroup.append('line')
            .attr('x1', 0)
            .attr('x2', width - 20)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 4);

        const handle = sliderGroup.append('circle')
            .attr('cx', scale(value))
            .attr('cy', 0)
            .attr('r', 8)
            .attr('fill', '#4A90E2')
            .call(d3.drag().on('drag', (event) => {
                const newValue = Math.max(min, Math.min(max, scale.invert(event.x)));
                setValue(newValue);
                handle.attr('cx', scale(newValue));
                if (onChange) onChange(newValue);
            }));

    }, [min, max, value, step, onChange]);

    return <svg ref={svgRef} />;
};

export default D3Slider;
