import service from "../models/service";
import Service from "../models/service";
import { addNewDocument } from "../ultils/newDocument";

export const createService = async(req, res) => {
    try {
        const service = await new Service(req.body).save();
        return res.json(service);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

export const unactiveService = async (req,res) => {
    try {
        const services = await Service.find({status : 0}).exec()
        return res.json(services)
    } catch (error) {
        res.status(400).json({
            error : error.message,
            message : 'Không thể lấy dữ liệu'
        })
    }
}

export const deleteManyServices = async(req,res) => {
    const services = req.body.services
    try {
            const deletedServices = await Service.deleteMany({ _id : services})
            res.json({
                deletedServices,
                message : 'Xoá thành công'
            })
    } catch (error) {
            return res.status(400).json({
                error : error.message,
                message : 'Xoá các dịch vụ không thành công'
            })
    }
}
