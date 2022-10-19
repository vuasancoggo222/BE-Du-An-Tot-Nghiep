import Service from "../models/service";

import slugify from "slugify";
export const createService = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  try {
    const service = await new Service(req.body).save();
    return res.json(service);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//list service
export const list = async (req, res) => {
  const status = req.query.status;
  try {
    if (status == 0) {
      const ListServices = await Service.find({ status: 0 });
      return res.json(ListServices);
    }
    const ListServices = await Service.find();
    return res.json(ListServices);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
//update service
export const update = async (req, res) => {
  try {
    const UpdateService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(UpdateService);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
// delete service
export const remove = async (req, res) => {
  try {
    const removeService = await Service.findByIdAndDelete(req.params.id);
    res.json(removeService);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
// readID service
export const read = async (req, res) => {
  try {
    const serviceId = await Service.findById(req.params.id);
    console.log(req.params.id);
    res.json(serviceId);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
export const readslug = async (req, res) => {
  try {
    const serviceId = await Service.findOne({ slug: req.params.slug });
    console.log(req.params.id);
    res.json(serviceId);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};


