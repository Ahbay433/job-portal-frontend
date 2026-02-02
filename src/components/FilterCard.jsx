import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida", "Gurgaon", "Chennai", "Kolkata", "Ahmedabad"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Graphic Designer", "UI/UX Designer", "Mobile Developer", "Software Engineer", "DevOps Engineer", "Project Manager"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh", "10lakh-20lakh", "20lakh+"]
    },
]

const FilterCard = () => {
    const [filters, setFilters] = useState({
        Location: '',
        Industry: '',
        Salary: ''
    });
    const dispatch = useDispatch();

    const changeHandler = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    }

    const clearFilters = () => {
        setFilters({
            Location: '',
            Industry: '',
            Salary: ''
        });
    }

    useEffect(() => {
        const query = Object.values(filters).filter(Boolean).join(' ');
        dispatch(setSearchedQuery(query));
    }, [filters]);

    return (
        <div className='w-full bg-white p-5 rounded-md shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='font-bold text-xl text-[#000000]'>Filter Jobs</h1>
                <button
                    onClick={clearFilters}
                    className='text-xs font-semibold text-[#F83002] hover:underline'
                >
                    Clear All
                </button>
            </div>
            <hr className='mb-5' />
            <div className='max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar space-y-8'>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg mb-3 text-[#1f1f1f]'>{data.fitlerType}</h1>
                            <RadioGroup
                                value={filters[data.fitlerType]}
                                onValueChange={(value) => changeHandler(data.fitlerType, value)}
                            >
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center space-x-3 my-2.5 group cursor-pointer'>
                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                    className="border-gray-300 text-[#F83002] focus:ring-[#F83002]"
                                                />
                                                <Label
                                                    htmlFor={itemId}
                                                    className="text-sm font-medium text-gray-600 group-hover:text-[#F83002] cursor-pointer transition-colors duration-200"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard