import { Slider } from "@/components/ui/slider";
import { useYear } from "@/hooks/use-year";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const YearSelector: React.FC = () => {
    const min = 2012;
    const max = 2022;
    const step = 1;

    const { year, updateYear } = useYear();

    const generateMarkers = () => {
        const total = (max - min) / step;
        return Array.from({ length: total + 1 }, (_, i) => {
            const value = min + i * step;
            return (
                <div key={value} className="text-xs text-muted-foreground font-mono">
                    {value}
                </div>
            );
        });
    };

    return (
        <Card className="w-full p-4">
            <CardHeader>
                <CardTitle>Años</CardTitle>
            </CardHeader>
            {/* add pb-10 to give room for absolutely positioned markers */}
            <CardContent className="flex flex-col space-y-4 w-full pb-10">
                <div className="w-full relative">
                    <Slider
                        value={[year]}
                        min={min}
                        max={max}
                        step={step}
                        onValueChange={(e) => updateYear(e[0])}
                    />
                    {/* absolutely positioned marker row */}
                    <div className="absolute inset-x-0 top-full mt-2 flex justify-between">
                        {generateMarkers()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default YearSelector;
