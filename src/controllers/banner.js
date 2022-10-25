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
// update sản phẩm
export const update = async (req, res) => {
    try {
        const UpdateBanner = await Banner.findByIdAndUpdate(req.params.id, req.body)
        res.json(UpdateBanner);
    } catch (error) {
        res.status(400).json({
            message: "Không update thành công"
        })
    }

}