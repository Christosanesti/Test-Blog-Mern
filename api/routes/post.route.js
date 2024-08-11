import express from 'express'

import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
import { createComment, getPostComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post ('/create', verifyToken, createComment)
router.get('/getposts', getPostComments)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('updatepost/:postId/:userId', verifyToken, updatepost)
router.delete('/deleusers', verifyToken, deleteUser)

export default router;
