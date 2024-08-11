import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {clearError, clearLoading} from '../redux/user/userSlice';
import { TbFishChristianity } from "react-icons/tb";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const {currentUser} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('پر کردن کلیه فیلد ها الزامی است'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    // Dispatch an action to clear the error on component mount
    dispatch(clearError()); // If you have a clearError action
    dispatch(clearLoading())
    if(currentUser){
        navigate(('/dashboard'))
    }
  }, [dispatch]);
  
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-4 max-w-2xl mx-auto flex-col md:flex-row md:items-center gap-6'>
        {/* Left Area */}
        {/* ... */}
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div  dir='rtl'>
              <Label value='نشانی الکترونیکی'/>
              <TextInput
                type='email'
                placeholder='user@provider.com'
                id='email'
                onChange={handleChange}
                dir='ltr'
              />
            </div>
            <div dir='rtl'>
              <Label value='گذرواژه' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                dir='ltr'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5' dir='rtl'>
            <span>نیاز به حساب کاربری دارید؟</span>
            <Link to='/sign-up' className='text-blue-500'>
            ثبت نام
            </Link>
            کنید
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}