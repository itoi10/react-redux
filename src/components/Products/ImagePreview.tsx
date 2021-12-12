import React from "react";
import { makeStyles } from "@material-ui/styles";

interface Props {
  id: string;
  path: string;
  delete: (id: string) => any;
}

const useStyles = makeStyles({
  // 画像を1:1に切り取る
  media_thumb: {
    position: "relative",
    overflow: "hidden",
    width: "50%",
    "&:before": {
      content: '""',
      display: "block",
      paddingTop: "100%",
    },
    "&>img": {
      position: "absolute",
      objectFit: "cover",
      objectPosition: "center",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  },
});

const ImagePreview: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.media_thumb} onClick={() => props.delete(props.id)}>
      <img alt={"プレビュー画像"} src={props.path} />
    </div>
  );
};

export default ImagePreview;
