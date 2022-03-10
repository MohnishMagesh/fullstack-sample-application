import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

    // const viewProfile = (userDetails) => {
    //     console.log(userDetails.userId);
    //     history.push({
    //       pathname: `/users/${userDetails.userId}`,
    //     });
    // };

    return (
        <div>
            {userNames && userNames.map((data, key) => (
                <p>
                    <span>{data.id}</span>
                    <span>{data.name}</span>
                    <button>
                        <Link to={`/users/${data.id}`}>
                            User Profile
                        </Link>
                    </button>
                </p>
            ))}
        </div>
    );
}