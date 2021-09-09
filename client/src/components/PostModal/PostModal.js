import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

import './PostModal.css';
import Carousel from '../Carousel/Carousel';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#081737",
    border: "1px solid #282c34",
    borderRadius: 20,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function PostModal({children,media_type,id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [post,setPost] = useState([]);
  const [video,setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setPost(data);
    // console.log(data);
    
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    // console.log(data);
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, [])

  return (
    <>
      <div type="button" className="media-modal" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {post && (
            <div className={classes.paper}>
              <div className="PostModal">
                <img
                  src={
                    post.poster_path
                      ? `${img_500}/${post.poster_path}`
                      : unavailable
                  }
                  alt={post.name || post.title}
                  className="PostModal__portrait"
                />
                <img
                  src={
                    post.backdrop_path
                      ? `${img_500}/${post.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={post.name || post.title}
                  className="PostModal__landscape"
                />
                <div className="PostModal__about">
                  <div className="PostModal__title">
                    {post.name || post.title} (
                    {(
                      post.first_air_date ||
                      post.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </div>
                  {post.tagline && (
                    <div className="tagline">{post.tagline}</div>
                  )}

                  <span className="PostModal__description">
                    {post.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}