import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type Comment = {
    id: number;
    postId: number;
    name: string;
    body: string;
};

function PostDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [author, setAuthor] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then((res) => res.json())
            .then((user) => setAuthor(user.name));

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then((res) => res.json())
            .then((data) => setComments(data));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newComment = {
            postId: Number(id),
            name,
            body: commentText,
        };

        const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        });

        if (response.ok) {
            const savedComment = await response.json();
            setComments((prevComments) => [savedComment, ...prevComments]);
            setName("");
            setCommentText("");
        } else {
            console.error("Failed to submit comment.");
        }
    };

    const handleDeleteComment = (commentId: number) => {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-page">
            <h1 className="post-page-title">{post.title}</h1>
            <h3 className="post-page-author">- {author || "Unknown Author"}</h3>
            <p>{post.body}</p>

            <h5 className="post-page-comment-title" >Comments:</h5>
            <ul>
                {comments.map((comment) => (
                    <li className="post-page-comment" key={comment.id}>
                        <strong>{comment.name}:</strong> {comment.body}
                        <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}><i className="fa-solid fa-trash"></i></button>
                    </li>
                ))}
            </ul>

            <form className="post-page-form" onSubmit={handleSubmit}>
                <div>
                    <label className="form-name">Name:</label>
                    <input
                        className="name-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="form-name">Comment:</label>
                    <textarea
                        className="comment-field"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                    />
                </div>
                <button className="form-button" type="submit">Submit Comment</button>
            </form>
        </div>
    );
}

export default PostDetails;
