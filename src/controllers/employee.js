import Employee from '../models/employee' 

export const remove = async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({id_: req.params.id}).exec();
        res.json(employee)
    } catch (error) {
        res.status(400).json({
            message: "Xoa nhan vien khong thanh cong",
        })
    }
}
