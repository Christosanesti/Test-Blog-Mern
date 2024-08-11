import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { Button, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function UpdatePost() {
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
    const { postId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        try{
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getpost/${postId}`)
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message)
                    setPublishError(data.message)
                    return
                }
                if(res.ok){
                    setPublishError(null)
                    setFormData(data.post[0])
                    
                }
            }
            fetchPost()
        } catch(error){
            console.log(error)
        }
    }, [postId])


    const handleUploadImage = async () => {
        try{
            if(!file){
                setImageFileUploadError('تصویری انتخاب نشده')
            }
            setImageFileUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageFileUploadError('خطا در بروز رسانی تصویر پست')
                    setImageFileUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setImageFileUploadProgress(null)
                        setImageFileUploadError(null)
                        setFormData({...formData, image: downloadURL })
                    });
                },)
        } catch(error) {
            setImageFileUploadError('خطا در بارگزاری تصویر پست')
            setImageFileUploadProgress(null)
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch(`/api/posts/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError('data.message')
                return
            }
            if(data.success === false){
                setPublishError('data.message')
                return
            }
            if(res.ok){
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }

        } catch(error) {
            console.log(error)
        }
    } 
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'  dir='rtl' >
        <h1 className='text-center text-3xl my-7 font-semibold'>ویرایش</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="justify-between flex flex-col gap-4 sm:flex-row">
                <TextInput className='flex-1' type='text' placeholder='عنوان پست' required id='title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title}/>
                <Select className='flex-1' id='category' required 
                    onChange={(e) => setFormData({...formData, category: e.target.value  })}
                    value={formData.category}
                >
                    <option value=''>دسته بندی</option>
                    <option value='iran'>ایران</option>
                    <option value='russia'>روسیه</option>
                    <option value='messiah'>مسیح</option>
                    <option value='orthodoxy'>ارتودوکسی</option>
                    <option value='teachings'>تفسیر مسیحی</option>
                    <option value='theotokos'>مادر همیشه باکره و مقدس </option>
                    <option value='books'>کتاب های مسیحی</option>

                </Select>


            </div>
            <div className='gap-4 items-center justify-between border-4 border-black border-dotted p-3'>
                <FileInput type='file' accept='image/*' id='image' onChange={(e)=> setFile(e.target.file[0])} />
                <Button type='button' gradientDuoTone='purpleToBlue' className='text-white' outline size='sm' onClick={handleUploadImage}>
                    {
                        imageFileUploadProgress ?
                        (<div className='w-16 h-16'>
                            <CircularProgressbar
                                value={imageFileUploadProgress}
                                text={`${imageFileUploadProgress || 0}%`}
                            />
                        </div>)
                        :
                        ('بارگزاری تصویر')
                        

                    }
                </Button>
            </div>
            {
                imageFileUploadError && (
                    <Alert color='failure'>
                        {imageFileUploadError}
                    </Alert>
                )
            }
            {
                formData.image && (
                    <img 
                        src={formData.image}
                        alt='بارگزاری'
                        className='w-full h-72 object-cover'

                    />
                )
            }
            <ReactQuill theme='snow' id='content' className='h-72 mb-12' 
                required
                onChange={
                    (value) => setFormData({...formData, content: value })
                }
                value={formData.content}
            /> 
            <Button gradientDuoTone='purpleToBlue' type='submit' className='w-full'>
                اعمال ویرایش    
            </Button>
            {
                publishError &&
                    <Alert color='failure' className='mt-5'>
                        {publishError}
                    </Alert>
            }
        </form>
    </div>
  )
}
