import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {IVideo} from "../types";
import VideoRequests from "../api/VideoRequests";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface IHomeProps {
    type: string
}
const Home: FC<IHomeProps> = ({type}) => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    useEffect(() => {
        (async () => {
            const res = await VideoRequests.getTrendVideos<IVideo[]>(type);
            setVideos(res.data);
        })()
    }, [type]);

    return (
        <Container>
            {videos.map(video => (
                <Card type="sm" key={video.id} video={video}/>
            ))}
        </Container>
    );
};

export default Home;