import Service from "../models/service";
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
//list service
export const list = async(req, res) => {
        try {
            const ListServices = await Service.find();
            res.json(ListServices);
        } catch (error) {
            res.status(400).json({
                message: "Không tìm được dich vu anh eiii"
            })
        }

    }
        //update service
export const update = async(req, res) => {
        try {
            const UpdateService = await Service.findByIdAndUpdate(req.params.id, req.body)
            res.json(UpdateService);
        } catch (error) {
            res.status(400).json({
                message: "Không tìm được dich vu anh eiii"
            })
        }

    }
    // delete service
export const remove = async(req, res) => {
    try {
        const removeService = await Service.findByIdAndDelete(req.params.id)
        res.json(removeService);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm được dich vu anh eiii"
        })
    }

}
    // readID service
export const read = async(req, res) => {
    try {
        const serviceId = await Service.findById(req.params.id);
        res.json(serviceId);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm được dich vu anh eiii"
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
