import React, { useState, useEffect } from "react";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import noAuthAxios from "../../axios/noAuthAxios";
import authAxios from "../../axios/authAxios";
import Like from "@mui/icons-material/FavoriteBorder";
import LikeFilled from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  ButtonBase,
  CardActions,
  Tooltip,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

const MyCardAction = styled(CardActions)({
  justifyContent: "space-around",
  alignItems: "center",
});
const IconBox = styled(ButtonBase)({
  border: "1px solid silver",
  borderRadius: "18px",
  flexBasis: 100,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: 4,
  gap: 8,
});
const initialState = {
  isLoading: true,
  isLiked: null,
  totalLikes: null,
};
function CardAction({ deleteOption, handleDeletePost, postId }) {
  const [likeState, setLikeState] = useState(initialState);
  const [refresh, setRefresh] = useState(true);
  async function fetchLikes() {
    const {
      data: { totalLikes, isLiked },
    } = await noAuthAxios.get(`/count/likes/post/${postId}`);
    setLikeState((prev) => {
      return { isLoading: false, isLiked: isLiked, totalLikes: totalLikes };
    });
  }
  async function handleLikeClick() {
    if (likeState.isLiked === true) {
      // delete like
      const { status } = await authAxios.delete(`/like/post/${postId}`);
      if (status === 200) setRefresh(!refresh);
    } else if (likeState.isLiked === false) {
      // like
      const { status } = await authAxios.post(`/like/post/${postId}`);
      if (status === 200) setRefresh(!refresh);
    }
  }
  useEffect(() => {
    fetchLikes();
  }, [refresh]);
  return (
    <MyCardAction disableSpacing>
      <Tooltip title="like">
        <IconBox onClick={() => handleLikeClick()}>
          {likeState?.isLiked ? (
            <LikeFilled fontSize="small" color="primary" />
          ) : (
            <Like fontSize="small" />
          )}
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption">{likeState?.totalLikes}</Typography>
        </IconBox>
      </Tooltip>
      <Tooltip title="comment">
        <IconBox>
          <CommentOutlinedIcon fontSize="small" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption">123</Typography>
        </IconBox>
      </Tooltip>

      {deleteOption && (
        <Tooltip title="delete">
          <IconButton onClick={(ev) => handleDeletePost()}>
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Link
        to={`/expand/${postId}`}
        style={{
          textDecoration: "none",
          color: "gray",
        }}
      >
        <Button variant="link">Read More</Button>
      </Link>
    </MyCardAction>
  );
}

export default React.memo(CardAction);
