import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/40'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <Link to="/">
                    <motion.h1
                        whileHover={{ scale: 1.05 }}
                        className='text-2xl font-bold cursor-pointer'
                    >
                        <span className='hover:text-[#F83002] transition-colors duration-300'>Job</span>
                        <span className='text-[#F83002]'>Portal</span>
                    </motion.h1>
                </Link>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='relative group'>
                                        <Link to="/admin/companies" className="hover:text-[#F83002] transition-all duration-300">
                                            Companies
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                    <li className='relative group'>
                                        <Link to="/admin/jobs" className="hover:text-[#F83002] transition-all duration-300">
                                            Jobs
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='relative group'>
                                        <Link to="/" className="hover:text-[#F83002] transition-all duration-300">
                                            Home
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                    <li className='relative group'>
                                        <Link to="/jobs" className="hover:text-[#F83002] transition-all duration-300">
                                            Jobs
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                    <li className='relative group'>
                                        <Link to="/browse" className="hover:text-[#F83002] transition-all duration-300">
                                            Browse
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                    <li className='relative group'>
                                        <Link to="/internship" className="hover:text-[#F83002] transition-all duration-300">
                                            Internship
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                    <li className='relative group'>
                                        <Link to="/resume-analyser" className="hover:text-[#F83002] transition-all duration-300">
                                            Resume Analyser
                                            <span className='absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                                        </Link>
                                    </li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-[#F83002] ring-offset-2 transition-transform hover:scale-105">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback className="bg-gradient-to-r from-[#F83002] to-[#6A38C2] text-white">
                                            {user?.fullname?.split(" ").map(n => n[0]).join("").toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2 items-center'>
                                            <Avatar className="cursor-pointer ring-2 ring-[#6A38C2] ring-offset-2">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                <AvatarFallback className="bg-[#6A38C2] text-white">
                                                    {user?.fullname?.split(" ").map(n => n[0]).join("").toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors duration-200'>
                                                        <User2 className="w-4 h-4" />
                                                        <Link to="/profile" className="text-sm font-medium">View Profile</Link>
                                                    </div>
                                                )
                                            }

                                            <div onClick={logoutHandler} className='flex w-fit items-center gap-2 cursor-pointer mt-3 hover:text-[#F83002] transition-colors duration-200'>
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm font-medium">Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar