import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border-teal-500 justify-center items-center rounded rounded-tl-3xl rounded-br-3xl text-center' dir='rtl'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                آیا در مورد آموزه های کلیسا در تامل هستید؟  
            </h2>
            <p className='text-gray-500 my-2'>
                درمورد ایمان ارتودوکس بیشتر بدانید  
            </p>
            <Button gradientDuoTone='purpleToPink'>
                <a href="t.me/iranorthodox" target='_blank' rel='noopene noreferrer'>میخواهم بیشتر بدانم</a>
            </Button>
            
        </div>

        <div className='p-7 flex-1'>
            <img 
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.2ZR9KiN2OJMTlT5CbdaRuAHaJ4%26pid%3DApi&f=1&ipt=35f0ce2a969b7685d7f0c4422ad0a8c2bd38f96dbe31d9fa62b044b7e9554a3e&ipo=images'
            />
        </div>
    </div>
  )
}
