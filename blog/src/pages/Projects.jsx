import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 dir='rtl' className='text-3xl font-semibold'>اساس نامه</h1>
      <p className='text-md text-gray-500' dir='rtl'>در نظر دارد...</p>
      <CallToAction />
    </div>
  )
}