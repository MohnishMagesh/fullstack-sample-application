import React, { useState, useEffect } from "react";

export default function UserList() {

    const [userNames, setUserNames] = useState(null);

    useEffect(() => {
        fetch("/users")
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
                <p key={key}>{data.name}</p>
            ))}
        </div>
    );
}