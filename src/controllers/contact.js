import Contact from "../models/contact";
export const createContact = async (req, res) => {
  try {
    const contact = await new Contact(req.body).save();
    return res.json(contact);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}


