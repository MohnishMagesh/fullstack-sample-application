import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function UserDetail(props) {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const URL = `https://jsonplaceholder.typicode.com/users/${userId}`

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(
                res => res.json()
            ).then(
                data => {
                    console.log(URL);
                    console.log(data);
                    setUserData(data);
                }
            )
    }, [])

    return (
        <h1>This is user detail page</h1>
    );
}