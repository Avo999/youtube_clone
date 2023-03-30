import {Users, Video, Comment, Likes, Tags, VideoTag, Subscribers} from '../models';


(async function main() {

    for (const Model of [
        Users,
        Video,
        Likes,
        Comment,
        Tags,
        VideoTag, 
        Subscribers
    ]){
        await Model.sync({ alter: true, logging: true });
    }
    console.log('done');
    process.exit();
})()