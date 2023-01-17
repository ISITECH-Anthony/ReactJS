import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Validator from "../utils/Validator.js";

export const Login = async (req, res) => {
    const validation = Validator(req.body, {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minLength: 8,
            maxLength: 16
        }
    }, {
        email: {
            email: ":attribute est invalide !"
        },
        required: {
            email: "Le champ \":attribute\" est obligatoire !",
            password: "Le champ \":attribute\" est obligatoire !"
        },
    }, {
        email: 'Adresse e-mail',
        password: 'Mot de passe'
    });

    if (Object.keys(validation).length > 0) {
        return res.status(400).json({ message: "Validation error", data: validation});
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(!user) return res.status(400).json({ message: "User not found", data: {
        email: [
            "Adresse e-mail invalide !"
        ]
    }});

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({ message: "Incorrect information", data: {
        password: [
            "Information incorrecte !"
        ]
    }});

    req.session.userId = user.id;

    return res.status(200).json({ 
        message: "Login success", 
        data: {
            id: user.id,
            email: user.email
        }
    });
}

export const Register = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
        email: req.body.email,
        password: hash
    });

    req.session.userId = newUser.id;

    return res.status(200).json({ 
        message: "Register success", 
        data: {
            id: newUser.id,
            email: newUser.email
        }
    });
};

export const Logout = (req, res) => {
    req.session.destroy((err)=>{
        if (err) return res.status(400).json({ message: "Unable to logout" });

        return res.status(200).json({ 
            message: "Logout success" 
        });
    });
}

export const AuthVerification = async (req, res) => {
    if (!req.session.userId) return res.status(200).json({ message: "Not connected", data: null });

    const user = await User.findOne({
        attributes:[ 'id', 'email' ],
        where: {
            id: req.session.userId
        }
    });

    if (!user) return res.status(200).json({ message: "Not connected", data: null });

    return res.status(200).json({
        message: "Connected",
        data: user
    });
}