import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './shared/Footer'

const Internship = () => {
    const { allJobs } = useSelector(store => store.job);
    const [filterInternships, setFilterInternships] = useState([]);

    useEffect(() => {
        const internships = allJobs.filter((job) => {
            return job.jobType?.toLowerCase().includes('internship') ||
                job.title?.toLowerCase().includes('intern') ||
                job.description?.toLowerCase().includes('internship');
        });
        setFilterInternships(internships);
    }, [allJobs]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col gap-5 my-10 text-center'>
                    <h1 className='text-4xl font-bold'>Explore <span className='text-[#F83002]'>Internships</span></h1>
                    <p className='text-gray-500 max-w-2xl mx-auto'>Build your career with top-tier internships. Gain hands-on experience, professional mentorship, and a head start in your dream industry.</p>
                </div>

                <div className='my-10'>
                    <h2 className='text-3xl font-bold mb-8'>Top Companies for <span className='text-[#6A38C2]'>Internship</span></h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
                        {["Global Tech Solutions", "Creative Minds Studio", "Innovate Corp", "Astra Softwares"].map((comp, i) => (
                            <div key={i} className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-default group'>
                                <div className='w-16 h-16 bg-gray-50 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:bg-[#F83002]/5 transition-colors'>
                                    <span className='text-[#F83002] font-bold text-xl'>{comp.charAt(0)}</span>
                                </div>
                                <h3 className='font-semibold text-gray-800'>{comp}</h3>
                                <p className='text-xs text-gray-400 mt-1'>5+ Active Internships</p>
                            </div>
                        ))}
                    </div>

                    <h2 className='text-3xl font-bold mb-8'>Available <span className='text-[#F83002]'>Positions</span></h2>
                    {
                        filterInternships.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100'>
                                <span className='text-2xl font-semibold text-gray-400'>No Internships found at the moment.</span>
                                <p className='text-gray-500 mt-2'>Check back later or explore other job opportunities.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
                                {
                                    filterInternships.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Internship
