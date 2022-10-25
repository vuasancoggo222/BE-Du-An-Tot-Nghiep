import Banner from "../models/banner";
// thêm banner
export const post = async (req, res) => {
    try {
        const banner = await new Banner(req.body).save();
        res.json(banner);
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được banner"
        })
    }

}
// update banner
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
// hiển thị chi tiết banner
export const read = async (req, res) => {
    try {
        const readBanner = await Banner.findById(req.params.id);
        res.json(readBanner);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm được sản phẩm anh eiii"
        })
    }
}