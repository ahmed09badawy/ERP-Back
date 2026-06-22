const cors = require("cors");

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
};

module.exports = cors(corsOptions);
