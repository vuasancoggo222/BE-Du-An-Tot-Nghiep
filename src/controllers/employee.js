import Employee from '../models/employee' 

export const update = async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({id_: req.params.id}, req.body, {new: true}).exec();
        res.json(employee)
    } catch (error) {
        res.status(400).json({
            message: "Sua nhan vien khong thanh cong",
        })
    }
}
