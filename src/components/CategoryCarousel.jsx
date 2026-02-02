import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Digital Marketing",
    "UI/UX Designer",
    "Mobile Developer",
    "Software Engineer",
    "Sales Manager",
    "Project Manager",
    "Devops Engineer",
    "Content Writer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-2xl mx-auto my-20">
                <CarouselContent className="-ml-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap w-full py-2 text-sm shadow-sm">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hover:bg-[#F83002] hover:text-white transition-all duration-300 shadow-md" />
                <CarouselNext className="hover:bg-[#F83002] hover:text-white transition-all duration-300 shadow-md" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel