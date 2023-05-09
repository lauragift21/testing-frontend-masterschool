"use client";
import { useState, useEffect } from "react";
import Header from './header';
import Footer from "./footer";
import TimeAgo from 'timeago-react'; 

const url = "https://hacker-news.firebaseio.com/v0/newstories.json";

const Posts = ({ posts }) => {
  const vkey = 0;
  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header />
    <div className="news">
      {posts.map((post, key) => (
        <div className="card-long" key={key}>
          {/* <span className="text-muted">{this.vkey = ++key}</span>  */}
          &#160;
          <a href={post.url} target="_blank">
            {post.title}
          </a>
          <div className="sub">
            {post.score} points by {post.by}
            &#160; <TimeAgo datetime={post.date} /> | {post.descendants} comments
          </div>
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
};

export default function News() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getTopStories() {
      try {
        const res = await fetch(url);

        if (res.ok === false) {
          throw new Error("response Error:" + res.text);
        }

        const json = await res.json();

        const promises = json
          .slice(0, 30)
          .map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (res) => res.json()
            )
          );

        const result = await Promise.all(promises);

        setPosts(result);
      } catch (err) {
        console.error(err);
      }
    }
    getTopStories();
  }, []);

  return (
    <div className="api">
      <Posts posts={posts} />
    </div>
  );
}
