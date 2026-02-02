import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,   // ✅ use null
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file); // ✅ must be "file"
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true, // ✅ important for cookies
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || (error.message === "Network Error" ? "Network error: Connection refused or CORS blocked" : "An error occurred");
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 flex items-center justify-center py-12 relative overflow-hidden'>
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#F83002] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#6A38C2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative z-10 w-full max-w-xl p-8 glass mx-4 rounded-2xl'
        >
          <form onSubmit={submitHandler}>
            <div className='text-center mb-8'>
              <h1 className='font-bold text-3xl text-gradient'>Create Account</h1>
              <p className='text-muted-foreground mt-2'>Join our community today</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label className="text-sm font-semibold">Full Name</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                />
              </div>

              <div className='space-y-2'>
                <Label className="text-sm font-semibold">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="john@example.com"
                  className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                />
              </div>

              <div className='space-y-2'>
                <Label className="text-sm font-semibold">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="8080808080"
                  className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                />
              </div>

              <div className='space-y-2'>
                <Label className="text-sm font-semibold">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="bg-white/50 border-white/20 focus:ring-[#F83002] transition-all duration-300"
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-6 my-6'>
              <div className='w-full'>
                <Label className="text-sm font-semibold mb-3 block">Register as</Label>
                <RadioGroup className="flex items-center gap-6">
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <Input
                      type="radio"
                      name="role"
                      id="student-signup"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 cursor-pointer text-[#F83002] border-gray-300 focus:ring-[#F83002]"
                    />
                    <Label htmlFor="student-signup" className="cursor-pointer group-hover:text-[#F83002] transition-colors">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <Input
                      type="radio"
                      name="role"
                      id="recruiter-signup"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 cursor-pointer text-[#6A38C2] border-gray-300 focus:ring-[#6A38C2]"
                    />
                    <Label htmlFor="recruiter-signup" className="cursor-pointer group-hover:text-[#6A38C2] transition-colors">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className='w-full'>
                <Label className="text-sm font-semibold mb-2 block">Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="bg-white/50 border-white/20 file:bg-[#F83002] file:text-white file:border-none file:px-4 file:py-1 file:rounded-md file:cursor-pointer hover:file:opacity-90 transition-all duration-300"
                />
              </div>
            </div>

            <div className='mt-8'>
              {loading ? (
                <Button disabled className="w-full bg-gradient-to-r from-[#F83002] to-[#6A38C2] text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-gradient-to-r from-[#F83002] to-[#6A38C2] text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Signup
                </Button>
              )}
            </div>

            <div className='text-center mt-6'>
              <span className='text-sm text-muted-foreground'>
                Already have an account?{" "}
                <Link to="/login" className='text-[#F83002] font-semibold hover:underline'>Login</Link>
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
