import User from "../models/UserModel.js";

export const Guest = async (req, res, next) => {
    if (req.session.userId) return res.status(401).json({ message: "Unauthorized !" });

    next();
}

export const Auth = async (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ message: "Unauthorized !" });

    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });

    if (!user) return res.status(401).json({ message: "Unauthorized !" });

    next();
}