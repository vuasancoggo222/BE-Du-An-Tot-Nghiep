import Banner from "../models/banner";
// thêm sản phẩm
export const post = async (req, res) => {
    try {
        const banner = await new Banner(req.body).save();
        res.json(banner);
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được sản phẩm"
        })
    }

}