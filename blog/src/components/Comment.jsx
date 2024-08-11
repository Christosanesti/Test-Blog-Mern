import React from 'react'
import { get } from 'mongoose'
import moment from 'moment'
import { Button, Textarea } from 'flowbite-react'
import { GiHeartShield } from "react-icons/gi";
import { useSelector } from 'react-redux'




export default function Comment({comment, onLike, onEdit}) {
    const currentUser = useSelector((state) => state.user)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    const [user, setUser] = ueState()
    
    useState(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                if(res.ok){
                    const data = await res.json()
                    if(res.ok){
                        setUser(data)
                    }
                }
            } catch(error) {
                console.log(error.message)
            }
        }
        getUser();
    }, [connect])
    const handleEdit = () => {
        setIsEditing(true)
        setEditedContent(comment.content)
    }
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify({ content: editedContent }),
            })
            if(res.ok){
                setIsEditing(false)
                onEdit(comment._id, editedContent)
            }

                
        
        } catch(error) {
            console.log(error)
        }
    }
    const handleDelete = async (commentId) => {

    }
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-1'>
            <img className='flex-shrink-0 ml-3 w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
        </div>
        <div className='flex items-center mb-1'>
            <div className="font-bold mr-1 text-xs truncate">
                <span>{user ? `@${user.username}` : 'کاربر غیر عضو'}</span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {isEditing ? (
                <>
                    <Textarea 
                        className='mb-3'
                        
                        value={editedContent}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className='flex justify-end gap-2 text-xs'>
                        <Button 
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            onClick={handleSave}
                        >ذخیره</Button>

                        <Button 
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            onClick={() => setIsEditing(false)}
                            
                        >انصراف
                        </Button>

                        
                    
                    </div>
                </>

            ) : (
                <>
                <p className='text-gray-500 pb-2'>{comment.content}</p>
                <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                <button type='button' onClick={() => onLike(comment_.id)} className={`text-red-500 hover:text-red-600 ${currentUser && comment.likes.includes(currentUser._id) && '!text-red-500'}`} >
                    <GiHeartShield />
                </button>
                <p>
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + ('پسند')
                    }
                </p>
                {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      Delete
                    </button>
                  </>
                )}
                
            </div>
            </>
            )}
            
        </div>
    </div>
  )
}
