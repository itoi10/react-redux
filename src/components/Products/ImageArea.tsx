import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/styles";
import { firebaseStorage } from "../../firebase/index";
import ImagePreview from "./ImagePreview";

interface Props {
  images: { id: string; path: string }[];
  setImages: (param: any) => void;
}

const useStyle = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea: React.FC<Props> = (props) => {
  const classes = useStyle();

  // Firebase Cloud Storage  ファイルをアップロードする
  // https://firebase.google.com/docs/storage/web/upload-files?hl=ja#upload_files
  const uploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: any = e.target.files;
      // BlobはバイナリデータをJSで扱えるようにしたもの (データ, ファイルタイプ)
      let blob = new Blob(file, { type: "image/jpeg" });
      // 16桁のランダムな文字列を生成しファイル名に使う
      const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      // imagesディレクトリにfilenameをstorageに保存
      const uploadRef = firebaseStorage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        // upload完了後の処理. ダウンロードできるURLを取得
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          // 画像を追加
          props.setImages((prev: any) => [...prev, newImage]);
        });
      });
    },
    // レンダーのたびに再作成するのは無駄なのでuseCallbackを使うが、setImages関数に変更があった場合は作り直す
    [props.setImages]
  );

  const deleteImage = useCallback(
    async (id: string) => {
      if (!window.confirm("この画像を削除しますか？")) {
        return false;
      }
      // stateから削除
      const newImages = props.images.filter((image) => image.id !== id);
      props.setImages(newImages);
      // firebase storageからも削除
      return firebaseStorage.ref("images").child(id).delete();
    },
    // 画像が変更するたびに作り直さないと異なる画像が削除されることがあるかもしれない
    [props.images]
  );

  return (
    <div>
      <div className="flex flex-wrap">
        {props.images.length > 0 &&
          props.images.map((image: any) => (
            <ImagePreview path={image.path} id={image.id} delete={deleteImage} key={image.id} />
          ))}
      </div>
      <div className="text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="hidden" type="file" id="image" onChange={(e) => uploadImage(e)} />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
