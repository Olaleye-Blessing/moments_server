import Moment from "../model/moment.js";

export const getMoments = async (req, res, next) => {
    try {
        let moments = await Moment.find();

        return res.status(200).json({
            "status": "success",
            moments,
        });
    } catch (error) {
        return res.status(404).json({
            "type": "fail",
        });
    }
};

export const createMoment = async (req, res, next) => {
    // let { title, message, creator, tags, selectedFile, likes, createdAt } = req.body;

    let { title, message, creator, tags, image } = req.body;
    tags = tags.split(" ");

    let moment = await Moment.create({
        title,
        message,
        creator,
        tags,
        image,
    });

    res.status(201).json({
        "type": "post created",
        moment,
    });
};

export const updateMoment = async (req, res, next) => {
    let { id } = req.params;
    let { title, message, creator, tags, image } = req.body;
    tags = tags.split(" ");

    try {
        let updatedMoment = await Moment.findByIdAndUpdate(
            id,
            { title, message, creator, tags, image },
            { new: true }
        );
        return res
            .status(201)
            .json({ status: "success", moment: updatedMoment });
    } catch (error) {
        return res.status(404).json({ "status": "fail" });
    }
};

export const deleteMoment = async (req, res, next) => {
    let { id } = req.params;

    try {
        await Moment.findByIdAndDelete(id);
        return res.status(204).json({
            "status": "success",
        });
    } catch (error) {
        return res.status(404).json({
            status: "fail",
        });
    }
};
