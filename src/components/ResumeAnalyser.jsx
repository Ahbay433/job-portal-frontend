import React, { useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Button } from './ui/button'
import { FileSearch, Upload, CheckCircle2, Zap, Brain, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const ResumeAnalyser = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const features = [
        {
            icon: <Zap className='text-[#F83002]' />,
            title: "Instant ATS Scoring",
            desc: "Get an immediate score on how well your resume performs against Applicant Tracking Systems."
        },
        {
            icon: <Brain className='text-[#6A38C2]' />,
            title: "AI Keyword Analysis",
            desc: "Our AI identifies missing industry keywords and suggests improvements to boost visibility."
        },
        {
            icon: <Target className='text-blue-600' />,
            title: "Job Matching",
            desc: "Compare your resume against specific job descriptions to see your match percentage."
        }
    ];

    return (
        <div className='bg-white min-h-screen'>
            <Navbar />

            {/* Hero Section */}
            <div className='bg-gradient-to-b from-gray-50 to-white py-20'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-center text-center'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='bg-[#F83002]/10 text-[#F83002] px-4 py-1 rounded-full text-sm font-semibold mb-6'
                    >
                        AI-Powered Analysis
                    </motion.div>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6 max-w-4xl'>
                        Optimize Your Resume for your <span className='text-[#6A38C2]'>Dream Career</span>
                    </h1>
                    <p className='text-gray-600 text-lg mb-10 max-w-2xl'>
                        Upload your resume and get instant feedback on how to improve your chances of getting hired. Our AI helps you stand out from the crowd.
                    </p>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className='hidden'
                    />

                    {/* Upload Box */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={handleUploadClick}
                        className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${isDragging ? 'border-[#6A38C2] bg-[#6A38C2]/5 scale-[1.02]' : 'border-gray-200 bg-white hover:border-[#6A38C2]/50 hover:bg-gray-50'}`}
                    >
                        <div className='flex flex-col items-center gap-4'>
                            <div className='bg-gray-100 p-4 rounded-full'>
                                {file ? <CheckCircle2 className='w-8 h-8 text-green-500' /> : <Upload className='w-8 h-8 text-gray-400' />}
                            </div>
                            <div className='text-center'>
                                <h3 className='text-xl font-semibold mb-1'>
                                    {file ? `File Selected: ${file.name}` : "Click to upload or drag and drop"}
                                </h3>
                                <p className='text-gray-400 text-sm'>
                                    {file ? "Click again to change file" : "PDF, DOC, DOCX (Max 5MB)"}
                                </p>
                            </div>
                            <Button
                                onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}
                                className='bg-[#6A38C2] hover:bg-[#5b30a6] px-8 py-6 text-lg rounded-xl mt-4'
                            >
                                {file ? "Change Resume" : "Upload Resume"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className='max-w-7xl mx-auto px-4 py-20'>
                <h2 className='text-3xl font-bold text-center mb-12'>Why use our Resume Analyser?</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {features.map((f, i) => (
                        <div key={i} className='p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white'>
                            <div className='bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6'>
                                {f.icon}
                            </div>
                            <h3 className='text-xl font-bold mb-3'>{f.title}</h3>
                            <p className='text-gray-500 leading-relaxed'>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Section */}
            <div className='bg-gray-50 py-20'>
                <div className='max-w-4xl mx-auto px-4 text-center'>
                    <h2 className='text-3xl font-bold mb-10'>What you get in the report</h2>
                    <div className='space-y-4 text-left'>
                        {[
                            "Visual breakdown of your resume's strengths and weaknesses",
                            "Specific bullet point suggestions for higher impact",
                            "Analysis of font, layout, and white space optimization",
                            "Comparison against 100+ industry standards"
                        ].map((item, i) => (
                            <div key={i} className='flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100'>
                                <CheckCircle2 className='text-green-500 w-5 h-5 flex-shrink-0' />
                                <span className='text-gray-700 font-medium'>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ResumeAnalyser
