import {Video, Users, Subscribers, VideoTag, Tags, Likes} from "../models";
import HttpError from "http-errors";
import sequelize from "../services/sequelize";


class VideoControllers {
    static addVideo = async (req, res, next) => {
        try {
            const newVideo = await Video.create({userId: req.userId, ...req.body})

            res.status(200).json(newVideo)
        } catch (e) {
            next(e)
        }
    }
    static updateVideo = async (req, res, next) => {
        try {
            const video = await Video.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!video) return next(HttpError(404, "Video dose not found!!!"));
            if (req.userId === video.userId) {
                video.set({
                    ...req.body
                });

                await video.save();
                res.status(200).json("Video has been updated.")
            } else {
                next(HttpError(403, "You can't update this video!!!"))
            }
        } catch (e) {
            next(e)
        }
    }

    static deleteVideo = async (req, res, next) => {
        try {
            const video = await Video.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!video) return next(HttpError(404, "Video dose not found!!!"));
            if (req.userId === video.userId) {
                await video.destroy()
                res.status(200).json("Video has been deleted.")
            } else {
                next(HttpError(403, "You can't delete this video!!!"))
            }
        } catch (e) {
            next(e)
        }
    }

    static getVideo = async (req, res, next) => {
        try {
            const video = await Video.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!video) return next(HttpError(404, "Video not found!!!"));

            res.status(200).json(video);
        } catch (e) {
            next(e)
        }
    }
    static addView = async (req, res, next) => {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) return next(HttpError(404, "Video not found!!!"));
            video.view += 1;
            await video.save();
            res.status(200).json("The view count has been increased.");
        } catch (e) {
            next(e)
        }
    }
    static randomVideo = async (req, res, next) => {
        try {
            const videos = await Video.findAll({
                order: sequelize.fn('random'),
            });

            res.status(200).json(videos);
        } catch (e) {
            next(e)
        }
    } // TODO

    static trendVideo = async (req, res, next) => {
        try {
            const videos = await Video.findAll({
                order: [["views", "DESC"]]
            });

            res.status(200).json(videos);
        } catch (e) {
            next(e)
        }
    }

    static subscribedVideo = async (req, res, next) => {
        try {

            const user = await Users.findOne({
                where: {
                    id: req.userId
                }
            })

            const subscribed = await Subscribers.findAll({
                where: {
                    email: user.email
                }
            })

            const listIDs = subscribed.map( (item) => item.userId);

            const subscribedVideos = await Video.findAll({
                where: {
                    userId: listIDs
                }
            })

            res.status(200).json(subscribedVideos.sort((a,b) => b.createdAt - a.createdAt));
        } catch (e) {
            next(e)
        }
    }

    static getVideosByTags = async (req, res, next) => {
        try {
            const tags = req.query.tags.split(",");

            const videos = await Video.findAll({
                include: [{
                    model: Tags,
                    where: {
                        name: tags
                    }
                }]
            })
            res.status(200).json(videos)
        } catch (e) {
            next(e)
        }
    }

    static searchingVideos = async (req, res, next) => {
        try {
            const query = req.query.s;

            const searched = await Video.findAll({
                where: {
                    $or: [
                        {title: {$like: `%${query}%`}},
                        {desc: {$like: `%${query}%`}}
                    ]
                }
            });
            if (!searched) {
                return res.status(404).json(`Not found any video with "${query}"`)
            }
            res.status(200).json(searched);
        } catch (e) {
            next(e)
        }
    }

    static likeVideo = async (req, res, next) => {
        const { userId } = req;
        const { videoId } = req.params;
        try {
            const video = await Video.findOne({ where: { id: videoId }});

            const existingLike = await Likes.findOne({
                where: { videoId, userId }
            });

            if (existingLike) {
                if (existingLike.like) {
                    return res.status(400).json({ error: 'You have already liked this video.' });
                } else {
                    existingLike.like = true;
                    await existingLike.save();
                    return res.status(200).json(existingLike);
                }
            }

            const like = await Likes.create({like: true, userId});
            await video.addLike(like)
            res.status(200).json(like)
        } catch (e) {
            next(e);
        }
    }
    static dislikeVideo = async (req, res, next) => {
        const { userId } = req;
        const { videoId } = req.params;
        try {
            const video = await Video.findOne({ where: { id: videoId } });

            const existingLike = await Likes.findOne({
                where: { videoId, userId }
            });
            if (existingLike) {
                if (!existingLike.like) {
                    return res.status(400).json({ error: 'You have already disliked this video.' });
                } else {
                    existingLike.like = false;
                    await existingLike.save();
                    return res.status(200).json(existingLike);
                }
            }
            const like = await Likes.create({ like: false, userId: userId });
            await video.addLike(like);

            res.status(200).json(like);
        } catch (e) {
            next(e);
        }
    }
}

export default VideoControllers;