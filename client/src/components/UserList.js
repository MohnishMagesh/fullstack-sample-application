import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Avatar } from 'antd';
import { Popover, Button } from 'antd';

const content = (userObj) => (
  <div>
    <p>{userObj.username}</p>
    <p>{userObj.email}</p>
  </div>
);

export default function UserList() {

    const [userNames, setUserNames] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(
                response => response.json()
            )
            .then(
                data => {
                    console.log(data);
                    setUserNames(data);
                }
            )
    }, []);

    const userInformation = () => {

    }

    return (
        <div>
            <div style={{margin: "20px", display: "flex", alignItems: "center"}}>
                {userNames && userNames.map((user, key) => (
                    <Link to={`/users/${user.id}`}>
                        <Popover content={content(user)} title="Info" key={key} style={{border: "none"}}>
                            <Button>{user.name}</Button>
                        </Popover>
                    </Link>
                ))}
            </div>
        </div>
    );
}