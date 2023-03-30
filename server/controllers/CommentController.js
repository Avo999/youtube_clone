import {Comment, Video} from "../models";
import HttpError from "http-errors";

class CommentController {
    static addComment = async (req, res, next) => {
        try {
            const {userId} = req;
            const comment = await Comment.create({userId, ...req.body});

            res.status(200).json(comment)
        } catch (e) {
            next(e);
        }
    }

    static deleteComment = async (req, res, next) => {
        try {
            const {userId} = req;
            const comment = await Comment.findOne({
                where: {
                    id: req.params.id
                }
            });
            const video = await Video.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (comment.userId === userId || userId === video.userId) {
                await comment.destroy();
                res.status(200).json("Comment has been deleted.");
            } else {
                return next(HttpError(403, "You can delete only your comment or your video's comment!!!"));
            }
        } catch (e) {
            next(e);
        }
    }

    static getComments = async (req, res, next) => {
        try {
            const {videoId} = req.params
            const comments = await Comment.findAll({
                where: {
                    videoId
                }
            });

            res.status(200).json(comments)
        } catch (e) {
            next(e);
        }
    }
}

export default CommentController;