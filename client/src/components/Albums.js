import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function Albums(props) {
    console.log(props);
    const [albums, setAlbums] = useState(null);
    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${props.userID}`)
            .then(
                res => res.json()
            ).then(
                albs => {
                    console.log(albs);
                    setAlbums(albs);
                }
            )
    }, []);

    return (
        <Collapse accordion>
            <Panel header="All albums">
            {albums && albums.map((album, index) => (
                <Link to={`/users/${props.userID}/album/${album.id}`}>
                    <h4>{album.title}</h4>
                </Link>
            ))}
            </Panel>
        </Collapse>
    );
}