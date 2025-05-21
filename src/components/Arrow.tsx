import { CIRCLE_RADIUS } from '@/constants';
import useStore from '@/hooks/useStore';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';

interface ArrowProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    country: string;
    color?: string;
    thickness?: number;
    animated?: boolean;
    year?: string;
}

const D3Arrow: React.FC<ArrowProps> = ({ x1, y1, x2, y2, color = '#000', thickness = 1, country, year }) => {
    const selectedYear = useStore((state) => state.year);
    const interactionData = useStore((state) => state.interactionData);
    const yearDiff = Math.abs(Number(year) - selectedYear);
    const maxYearDiff = 10; // Adjust this value based on how many years your dataset spans
    const minRadius = CIRCLE_RADIUS * 0.3; // Minimum radius for distant years

    // Scale radius based on proximity to selected year
    const radius = yearDiff === 0
        ? CIRCLE_RADIUS
        : Math.max(minRadius, CIRCLE_RADIUS * (1 - 1.75 * yearDiff / maxYearDiff));

    // const radius = CIRCLE_RADIUS
    const classNames = cn(
        'absolute top-0 left-0 w-full h-full pointer-events-none',
        'transition-all duration-700 ease-in-out transform', 'w-screen h-screen arrow z-10', `stroke-[${color}]`,
        !interactionData && Number(year) === selectedYear ? 'opacity-90' : 'opacity-10',
        interactionData && interactionData?.['Country Name'] === country ? 'opacity-90' : '')
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const adjustedX2 = x2 - Math.cos(angle) * (radius + 2);
    const adjustedY2 = y2 - Math.sin(angle) * (radius + 2);
    const markerId = `arrowhead-${country.replace(/ /g, "_").toLowerCase()}-year${year}-radius_${radius}`;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const controls = useAnimation()

    useEffect(() => {
        controls.start({
            x2: adjustedX2,
            y2: adjustedY2,
            transition: { duration: 0.8, ease: "easeOut" },
        })
    }, [adjustedX2, adjustedY2])
    if (distance < radius) return null; // Do not draw if distance is too small
    return (
        <svg className={classNames} overflow={'visible'} id={'arrow' + country.replace(/ /g, "_").toLowerCase() + `-year${year}` + '-radius_' + { radius }} width="100%" height="100%">
            <defs>
                <marker
                    id={markerId}
                    markerWidth={radius}
                    markerHeight={radius}
                    refX={radius / 2}             // ← insets the arrowhead slightly
                    refY={radius / 2}
                    orient="auto"
                    markerUnits="userSpaceOnUse" // 👈 important for pixel-exact control
                >
                    <path
                        d={`M0,0 L${radius / 2},${radius / 2} L0,${radius}`}
                        stroke={color}
                        strokeWidth={thickness}
                        fill="none"
                        strokeLinecap="round"
                    />
                </marker>
            </defs>

            <motion.line
                x1={x1}
                y1={y1}
                stroke={color}
                strokeWidth={thickness}
                markerEnd={`url(#${markerId})`}
                animate={{ x2: adjustedX2, y2: adjustedY2 }}
                initial={{ x2: x1, y2: y1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                // 👇 key fix: tell Framer Motion to treat these as animatable SVG attributes
                vectorEffect="non-scaling-stroke"
                style={{}}
            />
        </svg>
    );
};

export default D3Arrow;
