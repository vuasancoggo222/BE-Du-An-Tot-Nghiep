import Service from "../models/service";
    // post service
export const post = async(req, res) => {
        try {
            const Postservice = await new Service(req.body).save();
            res.json(Postservice);
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }

    }

