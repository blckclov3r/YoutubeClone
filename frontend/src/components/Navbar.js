import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { Upload } from "./Upload";
import { useState } from "react";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weigth: 500;
  color: ${({theme})=>theme.text}
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`



export default function Navbar() {

  const [open,setOpen] = useState(false);
  const [inputQuery,setInputQuery] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(state=> state.user.currentUser);
  // console.log('currentUser',user)

  const handleVideoCall = () =>{
    setOpen(true)
  }

  return (
    <>
      <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' value={inputQuery} onChange={(e)=>setInputQuery(e.target.value)} />
          <SearchOutlinedIcon onClick={()=>{navigate(`/search?q=${inputQuery}`)}} />
        </Search>
       {
        user ? (
          <User>
             <VideoCallOutlinedIcon  onClick={handleVideoCall} />
             <Avatar src={user.img}  />
             {user.name}
          </User>

        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
          <Button onClick={()=>dispatch(logout())}>
            <AccountCircleOutlinedIcon />
            {user ? 'SIGN OUT' : 'SIGN IN'}
          </Button>
        </Link>
        )
       }
      </Wrapper>
    </Container>

    {
      open && <Upload setOpen={setOpen} />
    }
    </>
  )
}
