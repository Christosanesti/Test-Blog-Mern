import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://w.wallha.com/ws/12/fkQm3JD5.jpg',
    },
    category: {
        type: String,
        default: '',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    likes: {
        type: Array,
        default: [],
    },

}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post