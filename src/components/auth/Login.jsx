import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || (error.message === "Network Error" ? "Network error: Connection refused or CORS blocked" : "An error occurred");
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center relative overflow-hidden p-4'>
                {/* Animated Background Blobs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-[#F83002] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-[#6A38C2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='relative z-10 w-full max-w-md p-8 glass rounded-2xl my-10 shadow-2xl'
                >
                    <form onSubmit={submitHandler}>
                        <div className='text-center mb-8'>
                            <h1 className='font-bold text-3xl text-gradient'>Welcome Back</h1>
                            <p className='text-muted-foreground mt-2'>Login to access your account</p>
                        </div>

                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label className="text-sm font-semibold">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="patel@gmail.com"
                                    className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-sm font-semibold">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                                />
                            </div>

                            <div className='py-2'>
                                <Label className="text-sm font-semibold mb-3 block">Login as</Label>
                                <RadioGroup className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2 cursor-pointer group">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            id="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 cursor-pointer text-[#F83002] border-gray-300 focus:ring-[#F83002]"
                                        />
                                        <Label htmlFor="student" className="cursor-pointer group-hover:text-[#F83002] transition-colors">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 cursor-pointer group">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            id="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 cursor-pointer text-[#6A38C2] border-gray-300 focus:ring-[#6A38C2]"
                                        />
                                        <Label htmlFor="recruiter" className="cursor-pointer group-hover:text-[#6A38C2] transition-colors">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className='mt-8'>
                            {
                                loading ? (
                                    <Button disabled className="w-full bg-gradient-to-r from-[#F83002] to-[#6A38C2] text-white">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Logging in...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-gradient-to-r from-[#F83002] to-[#6A38C2] text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Login
                                    </Button>
                                )
                            }
                        </div>

                        <div className='text-center mt-6'>
                            <span className='text-sm text-muted-foreground'>
                                Don't have an account? <Link to="/signup" className='text-[#F83002] font-semibold hover:underline'>Sign up</Link>
                            </span>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Login