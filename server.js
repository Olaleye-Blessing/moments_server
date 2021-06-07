import dotenv from "dotenv";
import mongoose from "mongoose";

import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log({ db_status: `Connection successful` });
    });

const server = app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log({ name: err.name });
    console.log({ message: err.message });
    console.log(err);

    server.close(() => {
        console.log("server is shutting down 😏😏😏...");
        process.exit(1);
    });
});
