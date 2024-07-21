import React from 'react'
import { Link} from 'react-router-dom'
import {Footer} from 'flowbite-react'
import { FaInfoCircle } from 'react-icons/fa'
import { BsDribbble, BsFacebook, BsTwitterX, BsYoutube, BsInstagram } from 'react-icons/bs'

export default function FooterComponent() {
  return (
    <Footer container className='border boder-t-10 border-orange-500' >
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md: grid-cols-1'>
                <div >
                    <Link 
                        to='/'
                        className='self-center font-bold flex items-center px-4 py-2 text-sm text-'
                        
                    >
                         ایران ارتودوکس
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
                    
                    <div>
                    <Footer.Title title='درباره' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/iran-artodux' target='_blank' rel='noreferer noopener'>
                                
                                Link 1
                            </Footer.Link>
                            <Footer.Link href='https://github.com/iran-artodux/api' target='_blank' rel='noreferer noopener'>
                                
                                Link 2
                            </Footer.Link>
                            <Footer.Link href='https://github.com/iran-artodux/client' target='_blank' rel='noreferer noopener'>
                                
                                Link 3
                            </Footer.Link>
                            <Footer.Link href='https://github.com/iran-artodux/docs' target='_blank' rel='noreferer noopener'>
                                
                                Link 4
                            </Footer.Link>
                            <Footer.Link className="hidden">
                                {/* This is to adjust the RTL malfunction. Don't touch or it will break the layout!!! */}
                            </Footer.Link>

                        </Footer.LinkGroup>
                    </div>

                    <div>
                    <Footer.Title title='مارا دنبال کنید' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/iran-artodux' target='_blank' rel='noreferer noopener'>
                                
                                Link 1
                            </Footer.Link>
                            <Footer.Link href='https://github.com/iran-artodux/api' target='_blank' rel='noreferer noopener'>
                                
                                Link 2
                            </Footer.Link>
                            <Footer.Link href='https://github.com/iran-artodux/client' target='_blank' rel='noreferer noopener'>
                                
                                Link 3
                            </Footer.Link>
                            
                            

                        </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='قوانین' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/iran-artodux' target='_blank' rel='noreferer noopener'>
                                
                                Link 1
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='flex justify-between items-center text-sm'>
                <Footer.Copyright 
                    href="#" 
                    by="Iran Orthodox" 
                    year={new Date().getFullYear()} 
                />
                <div className="flex gap-6 sm:mt-0 mt-5 sm:justify-center ">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsTwitterX}/>
                <Footer.Icon href="#" icon={BsYoutube}/>
                <Footer.Icon href="#" icon={BsDribbble}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
                

            </div>    
            </div>
            
        </div>
    
    </Footer>
  )
}
