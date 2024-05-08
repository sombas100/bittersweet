const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ $or: [{ username }, { email }] });

        if(user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        user = new User({
            username,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    req.session.token = token;
                    res.json({ token })
                }
        )

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

const loginUser = async (req, res) => {
    const { email, password} = req.body

    try {
        let user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid Credentials '})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials'})
        }

        const payload = {
            user: {
                id: user.id,
            },
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                req.session.token = token;
                res.json({ token })
            }
        );

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}


const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error '});
        } else {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' })
        }
    })
}

const google = async (req, res) => {
    try {
        const { user } = req.body;

        // Check if user data is present and contains email
        if (!user || !user.email) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        // Check if user with the provided email already exists
        let existingUser = await User.findOne({ email: user.email });

        // If user doesn't exist, create a new user
        if (!existingUser) {
            existingUser = new User({
                username: user.displayName,
                email: user.email,
                password: 'defaultPw'
            });
            await existingUser.save();
        }

        // Generate JWT token for the user
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        // Send the token in a cookie and as a response JSON
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ token });

    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser, loginUser, logoutUser, google
}

