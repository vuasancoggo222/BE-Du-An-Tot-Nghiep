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
