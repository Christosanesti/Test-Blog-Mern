import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbFishChristianity } from "react-icons/tb";
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import OAuth from '../components/OAuth';
import { useDispatch, useSelector, } from 'react-redux';
import {clearError, clearLoading} from '../redux/user/userSlice';



function SignUp() {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const {currentUser} = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim() })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.username ||!formData.email ||!formData.password){
            return setErrorMessage('پر کردن کلیه فیلدها اجباری است')
            
        }
        // Send Data to Server 
        // handle errors and success
        try{
            setLoading(true)
            setErrorMessage(null)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success === false){
                return setErrorMessage(data.message)
            }
            setLoading(false)
            if(res.ok){
                navigate('/dashboard?tab=profile')
            }
        } catch(err){
            setErrorMessage('خطا در ارتباط با سرور! اتصال به اینترنت را بررسی فرمایید.')
        }
    }
    useEffect(() => {
        if (currentUser) {
          navigate('/dashboard');
        }
    },[dispatch])
    useEffect(() => {
    // Dispatch an action to clear the error on component mount
    dispatch(clearError()); // If you have a clearError action
    dispatch(clearLoading())
  }, [dispatch]);
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-4 max-w-2xl mx-auto flex-col md:flex-row md:items-center gap-6'>
            {/* Left Area */}
            <div dir='rtl' className='flex-1 text-center items-center'>
                <Link to='/' className='sm:text-xl font-bold  dark:text-white text-4xl text-center items-center'>
                
                    <TbFishChristianity className='text-5xl mx-auto'/>
                    <span className='px-2 h-6'> ایران ارتودوکس </span>  
                </Link>
                <p className='mt-10 text-sm'>
                    ایران ارتودوکس جهت اشاعه آموزه های صحیح مسیحی در ایران دایر گردیده است 
                
                </p>
            </div>
            {/* Right Area */}
            <div className='flex-1'>
                <form className='flex flex-col gap-5 ' dir='rtl' onSubmit={handleSubmit}>
                    <div>
                        <Label value='نام کاربری شما' />
                        <TextInput 
                            type='text'
                            placeholder='نام کاربری'
                            id='username'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label value=' نشانی الکترونیکی شما' />
                        <TextInput 
                            type='email'
                            placeholder='name@provider.com'
                            id='email'
                            dir='ltr'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label value='گذرواژه' />
                        <TextInput 
                            type='password'
                            placeholder='گذر واژه انتخابی'
                            id='password'
                            onChange={handleChange}
                        />
                    </div>
                    <Button type='submit' gradientDuoTone='pinkToOrange' outline disabled={loading}>
                        {
                            loading ? (
                                <>
                                    
                                    <Spinner size='sm' className='animate-spin' />
                                    <span>
                                        در حال بارگزاری
                                    </span>
                                </>
                            ) : 'ثبت نام'
                        }
                    </Button>
                    <OAuth />
                </form>
                <div dir='rtl' className='flex- gap-2 text-sm mt-5'>
                    <span className='text-sm'>
                        قبلا ثبت نام نموده اید؟ 
                    </span>
                    <Link to='/sign-in' className='text-blue-500 text-sm'>
                        <span>  ورود  </span>  
                    </Link>
                    <span className='text-sm'>
                        به حساب شخصی    
                    </span>
                </div>
                {
                    errorMessage && (
                        <Alert className='mt-5' color='failure' dir='rtl'>
                            {errorMessage}
                        </Alert>
                    )
                }
            </div>

        </div>
    </div>
  )
}

export default SignUp