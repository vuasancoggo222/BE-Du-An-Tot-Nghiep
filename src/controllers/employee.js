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
export const create = async (req, res) => {
    try {
        const employee = await new Employee(req.body).save();
        res.json(employee)
    } catch (error) {
        res.status(400).json({
            message: "Them nhan vien khong thanh cong",
        })
    }
}
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