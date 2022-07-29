import { useSelector } from "react-redux";
import styled from "styled-components";
import { axiosInstance } from "../config";
import Comment from "./Comment";
import {useQuery} from 'react-query'
import { useState } from "react";
import { createComment, setComments } from "../features/commentSlice";
import {useDispatch} from 'react-redux'

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
 


  const fetchComments = async () =>{
    const response = await axiosInstance.get(`/comments/${videoId}`)
    return response?.data;
  }

  const { data: comments } = useQuery(['COMMENT/FETCHCOMMENTS', videoId], fetchComments,{
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  console.log(comments)


  const commentSubmit = async(e) =>{
    e.preventDefault();

    if(commentInput === ""){
       return;
    }

    dispatch(createComment({
        videoId,
        desc: commentInput
    }));
    // await axiosInstance.post("/comments",{
    //   userId: currentUser?._id,
    //   videoId,
    //   desc: commentInput
    // }).then(res=> console.log(res))
    // .catch((err)=>{
    //   console.log(err);
    // })

  }

  dispatch(setComments(comments))


  return (
    <Container>
          <form onSubmit={commentSubmit}>
      <NewComment>
        <Avatar src={currentUser && (currentUser.img !== "" || currentUser.img !== null) ? currentUser.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} />
        <Input placeholder="Add a comment..."  value={commentInput} onChange={(e)=>setCommentInput(e.target.value)}/>
 
      </NewComment>
      <Button type="submit">Comment</Button>
      </form>
      {comments && comments?.map(comment=>{
        return <Comment key={comment?._id} comment={comment} />
      })}
  

    </Container>
  );
};

export default Comments;