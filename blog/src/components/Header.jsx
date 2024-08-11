import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { HiOutlineSearchCircle } from "react-icons/hi";
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice';




function Header() {
    
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const urlParams =new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])
    const { currentUser } = useSelector((state) => state.user);
    const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm);
        const newUrl = `${location.pathname}?${urlParams.toString()}`
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
  return (
    
    <Navbar className='border-b-2' dir='rtl'>
        <Navbar.Toggle />
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold  dark:text-white '>
            
            
            <span className='px-2 h-6'> ایران ارتودوکس </span>  
        </Link>

        <form onSubmit={handleSubmit}>
            <TextInput 
                type='text'
                placeholder='جستجو . . .'
                dir='rtl'
                rightIcon={HiOutlineSearchCircle}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        

        <div className='flex gap-2 md:order-2'>
            <Button  gradientDuoTone='purpleToPink' pill outline onClick={()=>dispatch(toggleTheme())}>
                {theme === 'dark'? <FaSun className='h-6 w-6' /> : <FaMoon className='h-6 w-6' />}
            </Button>
            
            {currentUser 
                ? (
                    <Dropdown 
                        className=''
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar 
                                
                                rounded
                                img={currentUser.profilePicture} 
                                alt='کاربر' 
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item>پروفایل من</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>خروج</Dropdown.Item>

                    </Dropdown>
                )
                : (
                    <Link to='/sign-in'>
                        <Button outline gradientDuoTone='purpleToPink' pill>
                        <span className='h-6'>ورود</span>    
                        </Button>
                    </Link>
                ) 
            
            }

            
        
        </div>
        <Navbar.Collapse >     
            
            <Navbar.Link className='hidden'></Navbar.Link>

            <Navbar.Link active={path === "/"} as={'div'} >
                <Link to='/' dir='rtl'> اصلی </Link>
            </Navbar.Link>


            <Navbar.Link active={path === "/projects"} as={'div'}  >
                <Link to='/projects'> فعالیت ها </Link>
            </Navbar.Link>

            
            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'> درباره </Link>
            </Navbar.Link>

        </Navbar.Collapse>
        
        
    </Navbar>    
  )
}

export default Header