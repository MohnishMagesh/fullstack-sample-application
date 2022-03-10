import React, { useState, useEffect } from "react";

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

    return (
        <div>
            {userNames && userNames.map((data, key) => (
                <p>
                    <span key={key}>{data.id}</span>
                    <span key={key}>{data.name}</span>
                    <button>User Profile</button>
                </p>
            ))}
        </div>
    );
}