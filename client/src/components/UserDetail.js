import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PostComments from "./PostComments";
import Albums from "./Albums";

import { Form, Input } from 'antd';
import { Modal } from 'antd';
import { Button } from 'antd';
import { Descriptions, Badge } from 'antd';
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
    }, []);

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
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // crud operation
    const deletePost = (postID) => {
        setPostData(postData.filter(post => post.id !== postID));
        console.log(postData);
    };

    // crud operation
    const updatePost = (values) => {
        const postID = values.postid;
        const title = values.title;
        const body = values.body;

        const updatedPost = {
            "userId": userId,
            "id": postID,
            "title": title,
            "body": body
        }

        setPostData(postData.map((post) => post.id === postID ? updatedPost : post));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                                    <div style={{marginTop: "10px"}}>
                                        <Button onClick={showModal} type="primary" style={{marginRight: "10px"}}>
                                            Edit
                                        </Button>
                                        <Modal title="Edit Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 8 }}
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={updatePost}
                                                onFinishFailed={onFinishFailed}
                                                autoComplete="off"
                                            >
                                                <Form.Item
                                                    label="PostID"
                                                    name="postid"
                                                    initialValue={post.id}
                                                    rules={[{ required: true, message: 'Enter Title' }]}
                                                    style={{display: "none"}}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Title"
                                                    name="title"
                                                    initialValue={post.title}
                                                    rules={[{ required: true, message: 'Enter Title' }]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Body"
                                                    name="body"
                                                    initialValue={post.body}
                                                    rules={[{ required: true, message: 'Enter Post Details' }]}
                                                >
                                                    <Input.TextArea />
                                                </Form.Item>

                                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                    <Button type="primary" htmlType="submit">
                                                        Edit post
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Modal>
                                        <Button onClick={() => deletePost(post.id)} type="primary" danger>
                                            Delete
                                        </Button>
                                    </div>
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