import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

        if (
            !username ||
            !email ||
            !password || 
            username === "" || 
            email === "" || 
            password === "") { 
                next(errorHandler(400, 'Please provide all required fields')); 
            }
        
        const hashPassword = await bcryptjs.hashSync(password, 10);

        const newUser = new User({ 
            username, 
            email, 
            password: hashPassword  // Hash the password before saving it in the database,
        });

        try {
            await newUser.save();
            res.json('Signup successful');
          } catch (error) {
            next(error);
          }
    
        
}
