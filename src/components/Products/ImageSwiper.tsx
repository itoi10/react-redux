import React, { useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/src/no_image.png";
import "swiper/css/swiper.css";

interface Props {
  images: { id: string; path: string }[];
}

const ImageSwiper: React.FC<Props> = (props) => {
  // Swiperの設定
  // https://www.npmjs.com/package/react-id-swiper
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        // 画像なし
        <div className="relative overflow-hidden w-full">
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        // 画像あり

        images.map((image) => (
          <div className="relative overflow-hidden w-full">
            <img src={image.path} alt="商品画像" key={image.id} />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
