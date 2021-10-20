import React, {useEffect, useState} from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {useSession} from "next-auth/react";
import {addDoc,collection,onSnapshot,query,orderBy,serverTimestamp,setDoc,doc,deleteDoc} from "@firebase/firestore";
import {db} from "../firebase";
import Moment from "react-moment";

const Post = ({id, username, userImage, img, caption}) => {
    const {data:session} = useSession();
    const [comments,  setComments] = useState([]);
    const [comment,  setComment] = useState('');
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(()=>
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp','desc')
            ),
            (snapshot) => setComments(snapshot.docs)
        ),
[db, id]
    )

    useEffect(()=> onSnapshot(collection(db,'posts',id, 'likes'), snapshot => {
        setLikes(snapshot.docs)
    }) , [db, id]);

    useEffect(()=> {
        setHasLiked(likes.findIndex(like=>like.id===session?.user?.uid) !== -1)
    },[likes])

    const likePost = async  (e) => {
        if (hasLiked){
            await deleteDoc(doc(db,'posts',id, 'likes', session.user.uid))
        }else{
            await setDoc(doc(db,'posts',id,'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');
        await addDoc(collection(db,'posts',id, 'comments'),{
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })
    }

    return (
        <div className={'bg-white my-7 border rounded-sm'}>
            {/*Header*/}
            <div className={'flex items-center p-5'}>
                <img className={'rounded-full h-12 w-12 object-contain border p-1 mr-3'} src={userImage} alt=""/>
                <p className={'flex-1 font-bold'}>{username}</p>
                <DotsHorizontalIcon className={'h-5'} />
            </div>

            {/*img*/}
            <img src={img} className={'object-contain w-full'} alt=""/>

            {/*buttons*/}
            {
                session && (
                    <div className={'flex justify-between p-4'}>
                        <div className={'flex space-x-4'}>
                            {
                                hasLiked ? (
                                    <HeartIconFilled onClick={likePost} className={'btn text-red-500'} />
                                ):(
                                    <HeartIcon onClick={likePost} className={'btn'} />
                                )
                            }
                            <ChatIcon className={'btn'} />
                            <PaperAirplaneIcon className={'btn'} />
                        </div>
                        <BookmarkIcon className={'btn'} />
                    </div>
                )
            }

            <div>
                <p className={'p-5 truncate'}>
                    {likes.length > 0 && (
                        <p className={'font-bold'}>
                            {likes.length} Likes
                        </p>
                    )}
                    <span className={'font-bold mr-1'}>{username}</span>
                    {caption}
                </p>
            </div>

            {comments.length > 0 && (
                <div className={'ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'}>
                    {comments.map(comment => (
                        <div className={'flex items-center space-x-2 mb-3'} key={comment.id}>
                            <img loading={'lazy'} className={'h-7 rounded-full'} src={comment.data().userImage} alt=""/>
                            <p className={'text-sm flex-1'}>
                                <span className={'font-bold'}>{comment.data().username}</span> {" "}
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className={'pr-5 text-xs'}>
                                {comment.data()?.timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {session&&(
                <div>
                    <form className={'flex items-center p-4'}>
                        <EmojiHappyIcon className={'h-7'} />
                        <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" className={'border-none flex-1 focus:ring-0'} placeholder={'Add a comment...'} />
                        <button type={"submit"} disabled={!comment.trim()} onClick={sendComment} className={'font-semibold text-blue-400'}>Post</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Post;