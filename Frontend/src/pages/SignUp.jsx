import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore.js';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, UserRound  } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from "react-hot-toast"

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Name is required🤦‍♂️");
    if(!formData.email.trim()) return toast.error("email is required🤦‍♂️");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    //sending form data to signup in signup fn
    if(success === true) {
      signup(formData)
    }

  };

  return (
    <>
      <Navbar/>
      <div className='min-h-screen grid lg:grid-cols-2 mt-10'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
          <div className='w-full max-w-md space-y-8'>

            {/* Logo */}
            <div className='text-center mb-8 flex items-center flex-col'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-black mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get Started with you Free Account</p>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='form-control'>
                <label className="label">
                  <span className='label-text font-medium text-sm'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <UserRound className='size-5 text-base-content/40'/>
                  </div>
                  <input
                    type="text" 
                    className={'input input-bordered w-full pl-10'}
                    placeholder='Ashirwad Chaurasia'
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className="label">
                  <span className='label-text font-medium text-sm'>Email</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='size-5 text-base-content/40'/>
                  </div>
                  <input
                    type="email" 
                    className={'input input-bordered w-full pl-10'}
                    placeholder='ashirwadbappy@gmail.com'
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className="label">
                  <span className='label-text font-medium text-sm'>Password</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='size-5 text-base-content/40'/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"} 
                    className={'input input-bordered w-full pl-10'}
                    placeholder='*********'
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {
                      showPassword ? (
                        <EyeOff className='size-5 text-base-content/40'/>
                      ) : (
                        <Eye className='size-5 text-base-content/40'/>
                      )
                    }
                  </button>
                </div>
              </div>

              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                {
                  isSigningUp ? (
                    <>
                      <Loader2 className='size-5 animate-spin'/>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )
                }
              </button>
            </form>

            <div className='text-center'>
              <p className='text-base-content/60'>
                Already have an account ? {" "}
                <Link to="/login" className='link link-primary'>
                 Sign in
                </Link>
              </p>
            </div>

          </div>
           
        </div>

        {/* Right Side */}

        <AuthImagePattern
          title="Join Our Community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </>
  )
}

export default SignUp