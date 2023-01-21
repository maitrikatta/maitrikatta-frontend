import CardAction from "./PostCard/CardAction";
import MiddleContent from "./PostCard/MiddleContent";
import TheHeader from "./PostCard/TheHeader";
import customAxios from "../axios/authAxios";
import setImageBlob from "../lib/setImageBlob";
import { useCallback } from "react";
import { useEffect, useState, useRef } from "react";
import { Box, Card, CardMedia } from "@mui/material";
function PostCard({
  createdBy,
  PostHeading,
  _id: postId,
  Content,
  picturePath,
  deleteOption,
}) {
  const [profilePath, setProfilePath] = useState("");
  const [userName, setUserName] = useState("");
  const ellipse = PostHeading.length > 30 ? "..." : "";
  const imgRef = useRef(null);
  async function fetchUser() {
    const response = await customAxios(`/profile/${createdBy}`);
    const { data } = await customAxios(`/profile/login/${createdBy}`);
    setUserName(data?.name);

    if (response.data) {
      const { profilePath } = response.data;
      setProfilePath(profilePath);
    }
  }

  const handleDeletePost = useCallback(async function (ev) {
    try {
      const res = await customAxios.delete(`/posts/${postId}`);
      console.log(res);
    } catch (error) {
      console.error("Cant delete post!");
    }
  }, []);
  function getImage() {
    const route = "images/public/posts";
    const imgKey = picturePath;
    setImageBlob({ route, targetRef: imgRef, imgKey });
  }
  useEffect(() => {
    fetchUser();
    getImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      elevation={8}
      sx={{
        flexBasis: { xs: 280, sm: 390 },
        flexGrow: { xs: 1, sm: 0 },
        // boxShadow: '0px 0px 2px gray',
        // '& .MuiCardHeader-title': { wordBreak: 'break-all' },
      }}
    >
      <Box
        sx={
          {
            // color: 'white',
            // backgroundColor: '#062C30',
          }
        }
      ></Box>
      <TheHeader
        profilePath={profilePath}
        userName={userName}
        ellipse={ellipse}
        PostHeading={PostHeading}
      />
      <CardMedia
        component="img"
        ref={imgRef}
        height="194"
        alt="Loading image..."
        sx={{
          objectFit: "cover",
          objectPosition: "0 15%",
        }}
      />
      <MiddleContent Content={Content} />
      <CardAction
        deleteOption={deleteOption}
        postId={postId}
        handleDeletePost={handleDeletePost}
      />
    </Card>
  );
}

export default PostCard;
