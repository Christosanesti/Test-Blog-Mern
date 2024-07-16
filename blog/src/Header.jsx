import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { HiOutlineSearchCircle } from "react-icons/hi";
import { FaMoon } from 'react-icons/fa'


function Header() {
    const path = useLocation().pathname;
  return (
    
    <Navbar className='border-b-2' dir='rtl'>
        <Navbar.Toggle />
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold  dark:text-white '>
            
            
            <span className='px-2 h-6'> ایران ارتودوکس </span>  
        </Link>

        <form>
            <TextInput 
                type='text'
                placeholder='جستجو . . .'
                dir='rtl'
                rightIcon={HiOutlineSearchCircle}
                className='hidden lg:inline'
            />
        </form>
        <Button className="h-12 w-12 lg:hidden" color='gray' pill>
            <HiOutlineSearchCircle className='h-6 w-6'/>
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-12 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>
            

            <Link to='/sign-in'>
            <Button outline gradientDuoTone='redToYellow' pill>
               <span className='h-6'>ورود</span>    
            </Button>
        </Link>
        
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'} >
                <Link to='/'>اصلی</Link>
            </Navbar.Link>

            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'>درباره</Link>
            </Navbar.Link>

            <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to='/projects'>فعالیت ها</Link>
            </Navbar.Link>
        </Navbar.Collapse>
        
        
    </Navbar>    
  )
}

export default Header