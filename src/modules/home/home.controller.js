const getHomeMessage = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the ERP System API!",
    });
};

module.exports = {
    getHomeMessage
};
