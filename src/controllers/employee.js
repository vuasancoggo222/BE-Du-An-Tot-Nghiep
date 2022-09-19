import Employee from '../models/employee' 

export const read = async (req, res) => {
    try {
        const employee = await Employee.findOne({id_: req.params.id}).exec();
        res.json(employee)
    } catch (error) {
        res.status(400).json({
            message: "Khong co nhan vien nao",
        })
    }
}
