import api from "./index";


class VideoRequests {
    static getTrendVideos<T>(type: string) {
        return api.get<T>(`/video/${type}`);
    }
}

export default VideoRequests;