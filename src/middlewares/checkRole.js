
export const isAdmin = (req, res, next) => {
    if(req.user.role !== 2) {
        return res.status(401).json({
            message: "Bạn không phải là admin."
        })
    }
    next();
}