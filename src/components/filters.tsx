import useStore from "@/hooks/useStore";
import CountryList from "./countryList";
import FilterSliderGDP from "./filter-sliders-gdp";
import FilterSliderIndicator from "./filter-sliders-indicator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export default function Filters() {
    const indicator = useStore((state) => state.indicator);

    return (

        <Card>
            <CardHeader>
                <CardTitle>
                    Filtros
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Filtrar por Paises</AccordionTrigger>
                        <AccordionContent>
                            <CountryList />
                            <Separator className="w-full my-4" />
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms2" disabled />
                                <label
                                    htmlFor="terms2"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Grupo A
                                </label>
                            </div>
                            <Separator className="w-full my-4" />
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms22" disabled />
                                <label
                                    htmlFor="terms22"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Grupo B
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Filtrar por {indicator}</AccordionTrigger>
                        <AccordionContent>
                            <FilterSliderIndicator />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Filtrar por PIB per capita</AccordionTrigger>
                        <AccordionContent>
                            <FilterSliderGDP />

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>


        </Card>
    )
}