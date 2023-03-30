import express from "express";
import checkAuth from "../middlewares/checkAuth";
import CommentController from "../controllers/CommentController";

const router = express.Router();

router.post("/", checkAuth, CommentController.addComment);
router.delete("/:id", checkAuth, CommentController.deleteComment);
router.get("/:videoId", CommentController.getComments);

export default router;