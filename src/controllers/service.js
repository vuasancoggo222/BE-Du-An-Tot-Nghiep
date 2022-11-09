import Service from "../models/service";

import slugify from "slugify";
import Booking from "../models/booking";
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

export const groupAgeByService = async (req, res) => {
  try {
    const serviceId = await Service.distinct("_id");
    let groupAge = [];
    for (let svid of serviceId) {
      const service = await Service.findOne({ _id: svid }).exec();
      const group1 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gte: 0, $lte: 16 },
      });
      const group2 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gte: 17, $lte: 24 },
      });
      const group3 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gte: 25, $lte: 34 },
      });
      const group4 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gte: 35, $lte: 45 },
      });
      const group5 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gte: 46, $lte: 60 },
      });
      const group6 = await Booking.countDocuments({
        status: 4,
        serviceId: { $in: [svid] },
        age: { $gt: 60 },
      });

      groupAge.push({
        name: service.name,
        data: [group1, group2, group3, group4, group5, group6],
      });
    }
    return res.json({
      groupAge,
      categories: ["0-16", "17-24", "25-34", "35-45", "46-60", ">60"],
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const servicesStatistic = async (req, res) => {
  const { timeStart, timeEnd } = req.query;
  try {
    const serviceId = await Service.distinct("_id");
    let services = [];
    let total = 0;
    if (!timeStart && !timeEnd) {
      for (let svid of serviceId) {
        const service = await Service.findOne({ _id: svid }).exec();
        const numberOfService = await Booking.countDocuments({
          serviceId: { $in: [svid] },
          status: 4,
        }).exec();
        total += Number(numberOfService * service.price);
        const serviceElement = {
          name: service.name,
          _id: service._id,
          complete: numberOfService,
          turnover: Number(numberOfService * service.price),
        };
        services.push(serviceElement);
      }
      for (let i = 0; i < services.length; i++) {
        services[i].percentage = Number(services[i].turnover / total) * 100;
      }
      return res.json(services);
    } else if (timeStart && timeEnd) {
      console.log(new Date(Number(1667412158494) * 1000).toISOString());
      for (let svid of serviceId) {
        const service = await Service.findOne({ _id: svid }).exec();
        const numberOfService = await Booking.countDocuments({
          serviceId: { $in: [svid] },
          status: 4,
          date: {
            $gte: new Date(Number(timeStart) * 1000).toISOString(),
            $lte: new Date(Number(timeEnd) * 1000).toISOString(),
          },
        }).exec();
        total += Number(numberOfService * service.price);
        const serviceElement = {
          name: service.name,
          _id: service._id,
          complete: numberOfService,
          turnover: Number(numberOfService * service.price),
        };
        services.push(serviceElement);
      }
      for (let i = 0; i < services.length; i++) {
        services[i].percentage = Number(services[i].turnover / total) * 100;
      }
      return res.json(services);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
