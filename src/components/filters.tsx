import { data } from "@/data";
import useStore from "@/hooks/useStore";
import ClearFiltersButton from "./clearFiltersButton";
import CountryList from "./countryList";
import FilterSliderGDP from "./filter-sliders-gdp";
import FilterSliderIndicator from "./filter-sliders-indicator";
import GroupCheckboxes from "./group-checkboxes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Filters() {
    const indicator = useStore((state) => state.indicator);
    const openFilter = useStore((state) => state.openFilter);
    const setOpenFilter = useStore((state) => state.setOpenFilter);
    const setSelectedCountries = useStore((state) => state.setSelectedCountries);


    return (

        <Card className="font-normal">
            <CardHeader>
                <div className="flex flex-row font-sans items-center justify-between">
                    <CardTitle className="font-normal">
                        Filtros
                    </CardTitle>
                    <ClearFiltersButton />

                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible value={openFilter} onValueChange={(value) => {
                    setSelectedCountries(Array.from(new Set(data.map((item) => item["Country Name"]))))
                    setOpenFilter(value)
                }}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-normal">Filtrar por Paises</AccordionTrigger>
                        <AccordionContent>
                            <CountryList />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="group-checkboxes">
                        <AccordionTrigger className="font-normal">Filtrar por Grupos</AccordionTrigger>
                        <AccordionContent>
                            <GroupCheckboxes />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-normal">Filtrar por {indicator}</AccordionTrigger>
                        <AccordionContent>
                            <FilterSliderIndicator />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-normal">Filtrar por PIB per capita</AccordionTrigger>
                        <AccordionContent>
                            <FilterSliderGDP />

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>


        </Card>
    )
}