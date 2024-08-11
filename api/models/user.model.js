import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F276%2F066%2Foriginal%2Forthodox-cross-symbol-isolated-christ-church-sign-vector.jpg&f=1&nofb=1&ipt=f32a2c1a3f6789696af23e1fbb90f369f2f3e089d4992b500965b645ed2e39a2&ipo=images',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true}

)

const User = mongoose.model('User', userSchema)


export default User;