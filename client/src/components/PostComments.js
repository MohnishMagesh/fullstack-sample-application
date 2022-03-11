import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Comment, Tooltip, Avatar } from 'antd';

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

    return (
        <Collapse>
            <Panel header="Comments">
                <Collapse accordion>
                    {comments && comments.map((comment, index) => (
                        <div style={{margin: "8px"}}>
                            <h5>{comment.name}</h5>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </Collapse>
            </Panel>
        </Collapse>
    );
}
