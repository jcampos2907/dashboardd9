import useStore from "@/hooks/useStore";
import ClearFiltersButton from "./clearFiltersButton";
import CountryList from "./countryList";
import FilterSliderGDP from "./filter-sliders-gdp";
import FilterSliderIndicator from "./filter-sliders-indicator";
import GroupCheckboxes from "./group-checkboxes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export default function Filters() {
    const indicator = useStore((state) => state.indicator);

    return (

        <Card>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <CardTitle>
                        Filtros
                    </CardTitle>
                    <ClearFiltersButton />

                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Filtrar por Paises</AccordionTrigger>
                        <AccordionContent>
                            <CountryList />
                            <Separator className="w-full my-4" />
                            <GroupCheckboxes />
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