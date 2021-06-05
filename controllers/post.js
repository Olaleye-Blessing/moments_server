export const getPosts = async (req, res, next) => {
    return res.status(200).json({
        "type": "posts",
    });
};
