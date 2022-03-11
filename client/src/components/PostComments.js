import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { Modal } from 'antd';
import { Button } from 'antd';
import { Form, Input } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function PostComments(props) {
    console.log(props);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${props.postid}`)
            .then(
                res => res.json()
            ).then(
                comms => {
                    console.log(comms);
                    setComments(comms);
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

    const addComment = (values) => {
        console.log(values);
        const id = Object.keys(comments).length;
        const newComment = {
            postId: props.postid,
            id: id + 1,
            name: values.name,
            email: values.email,
            body: values.body
        }
        const currComments = comments;
        currComments.push(newComment);
        setComments(currComments);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Collapse
            accordion
            expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
        >
            <Panel header="Comments">
                <Collapse
                    accordion
                >
                    {comments && comments.map((comment, index) => (
                        <div style={{margin: "8px"}}>
                            <h5 style={{fontStyle: "italic"}}>{comment.name}</h5>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </Collapse>
                <Button onClick={showModal} type="primary" style={{marginRight: "10px"}} ghost>
                    Add Comment
                </Button>
                <Modal title="Edit Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={addComment}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Enter name' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Enter email', type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Body"
                            name="body"
                            rules={[{ required: true, message: 'Enter comment' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Add comment
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Panel>
        </Collapse>
    );
}
