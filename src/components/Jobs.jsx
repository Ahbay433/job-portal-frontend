import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const keywords = searchedQuery.toLowerCase().split(' ').filter(Boolean);
            const filteredJobs = allJobs.filter((job) => {
                const jobTitle = (job.title || "").toLowerCase();
                const jobDesc = (job.description || "").toLowerCase();
                const jobLoc = (job.location || "").toLowerCase();
                const jobSalary = Number(job.salary) || 0;

                return keywords.every(keyword => {
                    // Check if keyword is a predefined salary range
                    if (keyword === '0-40k') return jobSalary <= 0.4;
                    if (keyword === '40k-1lakh') return jobSalary > 0.4 && jobSalary <= 1;
                    if (keyword === '1lakh-5lakh') return jobSalary > 1 && jobSalary <= 5;
                    if (keyword === '5lakh-10lakh') return jobSalary > 5 && jobSalary <= 10;
                    if (keyword === '10lakh-20lakh') return jobSalary > 10 && jobSalary <= 20;
                    if (keyword === '20lakh+') return jobSalary > 20;

                    // Otherwise match title, description or location
                    return jobTitle.includes(keyword) ||
                        jobDesc.includes(keyword) ||
                        jobLoc.includes(keyword);
                });
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs