import Users from "../models/user"

export const getListUserByRole = async (role) =>{{
    const users = await Users.find({role : role}).exec()
    return users
}}