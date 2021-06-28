import React, { useState, useEffect } from "react";
import "./Comments.css";
import { getComments, addComment } from "../../service/CommentService";
import NewComment from "./newComments/NewComments";

import Comment from "./comment/Comment";

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [showNewComment, setShowComment] = useState(false);
    const [changes, setChanges] = useState(false);

    const openNewComment = () => setShowComment(true);
    const closeNewComment = () => setShowComment(false);

    useEffect( () => {
        const fechData = async () =>{
            let commentArray = await getComments();
            setComments(commentArray);
        }
        fechData();
    }, [changes]);

    const addNewComment = async (message, rating) => {
        if ((localStorage.getItem('user') !== null)) {
            const newComment = {
                name: JSON.parse(localStorage.user).firstName + " " + JSON.parse(localStorage.user).lastName,
                response: message,
                rating: rating,
                };
           const checkPost =  await addComment(newComment);
           if(checkPost){
               setChanges(!changes);
           } 
        }
    }
    return (
        <div >
            <div className="container">
                <button className="responses-add " onClick={openNewComment}>
                    Add your rating</button>
            </div>
            <div className="margeing ">
                <div className="row row-cols-4 row-cols-6 g-4">
                    {Object.keys(comments).map((comment) => {
                        return (
                           <div key={comment}> <Comment
                                name={comments[comment].name}
                                response={comments[comment].response}
                                rating={comments[comment].rating}
                                time={comments[comment].time}
                            /></div>
                        )
                    })}
                </div>
            </div>
            <NewComment
                show={showNewComment}
                handleClose={closeNewComment}
                addNewResponse={addNewComment}
            />
        </div>
    );
}
