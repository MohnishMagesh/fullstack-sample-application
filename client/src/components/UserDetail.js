import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PostComments from "./PostComments";

import { Collapse } from 'antd';

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
            <div>
                <h2>{userData && userData.name}</h2>
                <p>{userData && userData.email}</p>
                <p>{userData && userData.phone}</p>
                <p>{userData && userData.website}</p>
            </div>
            {/* show posts */}
            <div style={{padding: "10px"}}>
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
        </div>
    );
}