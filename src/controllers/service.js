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

