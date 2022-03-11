import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

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
    }, [])

    return (
        <Collapse accordion>
            {comments && comments.map((comment, index) => (
                <Panel header={comment.name} key={index} style={{padding: "10px"}}>
                    <p>{comment.body}</p>
                </Panel>
            ))}
        </Collapse>
    );
}
