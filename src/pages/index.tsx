import React, { useState, useEffect } from "react";
import Post from "../components/Post";

type PostData = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type UserData = {
    [key: number]: string;
};

function HomePage() {
    const [data, setData] = useState<PostData[]>([]);
    const [userData, setUserData] = useState<UserData>({});
    const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setData(data));

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((users) => {
                const userDict: UserData = users.reduce((dict: UserData, user: any) => {
                    dict[user.id] = user.name;
                    return dict;
                }, {});
                setUserData(userDict);
            });
    }, []);

    const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = event.target.value;
        setSelectedAuthor(selectedUserId ? parseInt(selectedUserId) : null);
    };

    const filteredPosts = selectedAuthor
        ? data.filter((post) => post.userId === selectedAuthor)
        : data;

    return (
        <div className="container">
            <h1 className="page-title">Blog Posts</h1>

            <select className="filter" onChange={handleAuthorChange}>
                <option value="">All Authors</option>
                {Object.entries(userData).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>

            <section className="post-list">
                {filteredPosts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        author={userData[post.userId]}
                    />
                ))}
            </section>
        </div>
    );
}

export default HomePage;
