import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PostComments from "./PostComments";
import Albums from "./Albums";

import { Collapse } from 'antd';

import { Descriptions, Badge } from 'antd';

const { Panel } = Collapse;

export default function UserDetail(props) {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(
                res => res.json()
            ).then(
                data => {
                    console.log(data);
                    setUserData(data);
                }
            )
    }, [])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(
                res => res.json()
            ).then(
                posts => {
                    console.log(posts);
                    setPostData(posts);
                }
            )
    }, [])

    return (
        <div>
            {/* user information */}
            <div style={{margin: "20px"}}>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Name">{userData && userData.name}</Descriptions.Item>
                    <Descriptions.Item label="Username">{userData && userData.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{userData && userData.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{userData && userData.phone}</Descriptions.Item>
                    <Descriptions.Item label="Website">{userData && userData.website}</Descriptions.Item>
                    <Descriptions.Item label="Company">{userData && userData.company["name"]}</Descriptions.Item>
                </Descriptions>
            </div>
            {/* show posts */}
            <div style={{padding: "20px"}}>
                <Collapse accordion>
                    <Panel header="All posts">
                        <Collapse accordion>
                            {postData && postData.map((post, index) => (
                                <Panel header={post.title} key={index} style={{padding: "10px"}}>
                                    <p>{post.body}</p>
                                    {/* create comments components here */}
                                    <PostComments postid={post.id}/>
                                </Panel>
                            ))}
                        </Collapse>
                    </Panel>
                </Collapse>
            </div>
            {/* show albums in collapsable window */}
            <div style={{padding: "20px"}}>
                <Albums userID={userId}/>
            </div>
        </div>
    );
}