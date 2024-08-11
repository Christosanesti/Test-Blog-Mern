import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && userPosts.length > 0 
            ? (
                <Table hoverable className='shadow-md'> 
                    <Table.Head>
                        <Table.HeadCell>تاریخ پست</Table.HeadCell>
                        <Table.HeadCell>تصویر</Table.HeadCell>
                        <Table.HeadCell>عنوان</Table.HeadCell>
                        <Table.HeadCell>دسته</Table.HeadCell>
                        <Table.HeadCell>حذف</Table.HeadCell>
                        <Table.HeadCell>
                            <span>ویرایش</span>
                        </Table.HeadCell>
                    </Table.Head>
                    {
                        userPosts.map((post)=> {
                            <Table.Body className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`} >
                                            <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span className='text-teal-500 hover:underline cursor-pointer' 
                                        onClick={() => {
                                            setShowModal(true)
                                            setPostIdToDelete(post._id)
                                        }}
                                        > 
                                            حذف 
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='text-teal-500 hover:underline cursor-pointer' to={`/update-post/${post._id}`}>
                                            <span>ویرایش</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        })
                    }
                    
                </Table>
                

            )
            : ('پستی وجود ندارد')
        }
        {
                    showMore && (
                        <div className='flex justify-center mt-5'>
                            <button onClick={handleShowMore} className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-2'>
                                مشاهده همه
                            </button>
                        </div>
                    )
                }
        <Modal 
            show={showModal} 
            onClose={() => setShowModal(false)}
            popup
            size='md'
        >
            <Modal.Header/>

            <Modal.body>
                <div className="text-center">
                    <HiOutlineExclamationCircle size={64} className="text-red-500 mb-4 mx-auto"/>
                    <h3 className=''>آیا از حذف پست اطمینان دارید؟</h3>
                    <div className="flex justify-center">
                        <Button 
                            gradientDuoTone='redToPink' 
                            className="mr-3 text-white" 
                            onClick={() => setShowModal(false)}
                        >
                            بازگشت
                        </Button>
                        <Button 
                            gradientDuoTone='purpleToBlue' 
                            className="text-white" 
                            onClick={handleDeletePost}
                        >
                            حذف از دامنه
                        </Button>
                    </div>
                </div>
            </Modal.body>

        </Modal>
    </div>
  )
}