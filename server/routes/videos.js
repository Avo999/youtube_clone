import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import VideoControllers from '../controllers/VideoControllers';

const router = express.Router();

router.post("/", checkAuth, VideoControllers.addVideo);
router.put("/:id", checkAuth, VideoControllers.updateVideo);
router.delete("/:id", checkAuth, VideoControllers.deleteVideo);
router.get("/sub", checkAuth, VideoControllers.subscribedVideo);
router.get("/random", VideoControllers.randomVideo);
router.get("/trend", VideoControllers.trendVideo);
router.get("/tags", VideoControllers.getVideosByTags);
router.put("/view/:id", VideoControllers.addView);
router.get("/search", VideoControllers.searchingVideos);
router.put('/like/:videoId', checkAuth, VideoControllers.likeVideo);
router.put('/dislike/:videoId', checkAuth, VideoControllers.dislikeVideo);
router.get("/:id", VideoControllers.getVideo);


export default router;