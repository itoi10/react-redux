import React from "react";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

interface Props {}

const ImageArea: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
