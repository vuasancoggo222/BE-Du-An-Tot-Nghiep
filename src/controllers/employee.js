import Employee from '../models/employee' 

export const list = async (req, res) => {
    try {
        const employees = await Employee.find().exec();
        res.json(employees)
    } catch (error) {
        res.status(400).json({
            message: "Khong co nhan vien nao",
        })
    }
}
