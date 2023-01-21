import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { Button, CardActions, Tooltip, IconButton } from "@mui/material";
function CardAction({ deleteOption, handleDeletePost, postId }) {
  console.log("Ran");
  return (
    <CardActions disableSpacing>
      <Tooltip title="like">
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="bookmark">
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="share">
        <IconButton>
          <ShareIcon fontSize="medium" />
        </IconButton>
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
          marginLeft: "auto",
          textDecoration: "none",
          color: "gray",
        }}
      >
        <Button variant="link">Read More</Button>
      </Link>
    </CardActions>
  );
}

export default React.memo(CardAction);
