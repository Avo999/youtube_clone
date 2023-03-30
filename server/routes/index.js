import express from "express";
import users from "./users";
import videos from "./videos";
import comment from "./comment";

const router = express.Router();

router.use('/user', users);
router.use("/video", videos);
router.use("/comment", comment);

export default router;