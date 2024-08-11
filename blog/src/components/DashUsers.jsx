import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && users.length > 0 
            ? (
                <Table hoverable className='shadow-md'> 
                    <Table.Head>
                        <Table.HeadCell>تاریخ انتشار</Table.HeadCell>
                        <Table.HeadCell>تصویر</Table.HeadCell>
                        <Table.HeadCell>نام کاربری</Table.HeadCell>
                        <Table.HeadCell>ادمین</Table.HeadCell>
                        <Table.HeadCell>حذف</Table.HeadCell>
                        
                    </Table.Head>
                    {
                        users.map((user)=> {
                            <Table.Body className='divide-y' key={user._id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        
                                            <img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover rounded-full bg-gray-500' />
                                                                            </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.isAdmin ?(<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>) }</Table.Cell>
                                    <Table.Cell>
                                        <span className='text-teal-500 hover:underline cursor-pointer' 
                                        onClick={() => {
                                            setShowModal(true)
                                            setUserIdToDelete(user._id)
                                        }}
                                        > 
                                            حذف 
                                        </span>
                                    </Table.Cell>
                                    
                                </Table.Row>
                            </Table.Body>
                        })
                    }
                    
                </Table>
                

            )
            : ('کاربری وجود ندارد!')
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
                    <h3 className=''>آیا از حذف کاربر اطمینان دارید؟</h3>
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
                            onClick={handleDeleteUser}
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