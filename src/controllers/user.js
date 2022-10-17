import User from "../models/user"
export const listUser = async(req,res) => {
    try {
        const listUser = await User.find({}).sort({createdAt : -1}).exec()
        res.json(listUser)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

