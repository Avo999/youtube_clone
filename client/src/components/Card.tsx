import React, {FC, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IVideo } from "../types";
import {IUser} from "../types/UserTypes";
import UserRequests from "../api/UserRequests";
import {Partial} from "../types";

const Container = styled.div`
  width: ${(props: Partial<CardProps>) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props: Partial<CardProps>) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props: Partial<CardProps>) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props: Partial<CardProps>) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
interface CardProps {
    type: string,
    video: IVideo,
}


const Card: FC<CardProps> = ({ type , video}) => {
    const [channel, setChannel] = useState<IUser | object>({});

    useEffect(() => {
        (async () => {
            const res = await UserRequests.getOneUser<IUser>(video.userId);
            setChannel(res.data);
        })()
    }, [video.userId])


    return (
        <Link to="/video/test" style={{ textDecoration: "none" }}>
            <Container type={type} >
                <Image
                    type={type}
                    src={video?.imageUrl}
                />
                <Details type={type}>
                    <ChannelImage
                        type={type}
                        src={"image" in channel ? channel.image : ""}
                    />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{"name" in channel ? channel.name : ""}</ChannelName>
                        <Info>{video.views} views • 1 day ago</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;