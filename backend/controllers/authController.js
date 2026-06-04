import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


//Register
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.json({ error: "Some fields are empty" })

    }

    const userwithUsername = await userModel.findOne({ username })
    if (userwithUsername) {
        return res.json({ error: "This username is already exist with other" })
    }
    const userwithEmail = await userModel.findOne({ email })
    if (userwithEmail) {
        return res.json({ error: "This email is already associated with other" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    return res.json({ message: "User registered successfully" })
}



//Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ error: "All fields required" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.json({ error: "You are not registered" })
    }

    const verified = await bcrypt.compare(password, user.password)
    if (!verified) {
        return res.json({ error: "invalid credentials" })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    )
    return res.json({ message: "User loggedIn", token ,user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
   }
})

}