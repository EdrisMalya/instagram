import Post from "./Post";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, orderBy} from "@firebase/firestore";
import {db} from "../firebase";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
       return onSnapshot(query(collection(db, 'posts')), orderBy('timestamp', 'desc'), snapshot => {
           setPosts(snapshot.docs);
       })
    },[db])

    return (
        <div>
            {posts.map((post => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImage={post.data().profileImg}
                    img={post.data().image}
                    caption={post.data().caption}
                />
            )))}
        </div>
    );
};

export default Posts;