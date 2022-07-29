
import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useState } from "react";
// import { createComment, fetchComments, setComments } from "../features/commentSlice";
import { createComment, fetchComments } from "../features/commentSlice";
import {useDispatch, useSelector} from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 4px;
  font-size: 14px;
  margin-left: auto;
  display: flex;
  margin-bottom: 1rem;
`

const Comments = ({videoId}) => {
  
  const {currentUser} = useSelector(state=>state.user);
  const [commentInput,setCommentInput] = useState("");

  const dispatch = useDispatch();

  const {comments} = useSelector(state=>state.comment);
  
  useEffect(() => {
    dispatch(fetchComments(videoId))
  }, [videoId,dispatch]);

  console.log(currentUser)

  const commentSubmit = (e) =>{
    e.preventDefault();

    if(commentInput === ""){
       return;
    }

  //   dispatch(setComments({
  //     _id: nanoid(),
  //     name: currentUser.name,
  //     img: currentUser.img,
  //     videoId,
  //     desc: commentInput
  //  }))


    dispatch(createComment({
        videoId,
        desc: commentInput
    }));
    
   
  
    setCommentInput("");
  }




  return (
    <Container>
          <form onSubmit={commentSubmit}>
      <NewComment>
        <Avatar src={currentUser && (currentUser.img !== "" || currentUser.img !== null) ? currentUser.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} />
        <Input placeholder="Add a comment..."  value={commentInput} onChange={(e)=>setCommentInput(e.target.value)}/>
 
      </NewComment>
      <Button type="submit">Comment</Button>
      </form>
      { comments?.map((comment)=>{
        return <Comment key={nanoid()} comment={comment} />
      })}
  

    </Container>
  );
};

export default Comments;