import Employee from '../models/employee' 

export const create = async (req, res) => {
    try {
        const employee = await new Employee(req.body).save();
        res.json(employee)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
