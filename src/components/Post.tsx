import React from "react";
import Link from "next/link";

type PostProps = {
    id: number;
    title: string;
    body: string;
    author: string | undefined;
};

export default function Post({ id, title, body, author }: PostProps) {
    const displayBody = body.length > 100 ? body.slice(0, 100) + "..." : body;
    
    return (
        <div className="post">
            <span className="post-contents">
                <h3 className="post-title">{title}</h3>
                <h5>- {author}</h5>
                <p>{displayBody}</p>
                <Link href={`/posts/${id}`} passHref>
                    <button className="arrow-button"><i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </span>
        </div>
    );
}
