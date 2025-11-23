"use client"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ChartRadialText } from "./radial-chart";
import Autoplay from "embla-carousel-autoplay";

interface chartCarouselProps {
    data: number[],
    headerText: string[],
    footerText: string[],
    color: string[]
}

export function ChartCarousel({ data, headerText, footerText, color }: chartCarouselProps) {
    return (
        <Carousel plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index}>
                        <ChartRadialText data={item} headerText={headerText[index]} footerText={footerText[index]} color={color[index]} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}