import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Card } from 'antd';

const { Meta } = Card;

export default function AlbumDetail(props) {
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState(null);

    const { userId, albumId } = useParams();
    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}&id=${albumId}`)
            .then(
                res => res.json()
            ).then(
                data => {
                    setAlbum(data);
                }
            )
    }, []);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then(
                res => res.json()
            ).then(
                data => {
                    console.log(data);
                    setPhotos(data);
                }
            )
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {photos && photos.map((photo, id) => (
                <Card
                    hoverable
                    style={{ width: 150, margin: "5px", borderColor: "black" }}
                    cover={<img alt="example" src={photo.thumbnailUrl} />}
                >
                    <Meta title={photo.title}/>
                </Card>
            ))}
        </div>
    );
}