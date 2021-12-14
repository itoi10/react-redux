import React, { useCallback, useState, useEffect } from "react";
import { SelectBox, TextInput, PrimaryButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProducts } from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea";
import { firestore } from "../firebase";
import { SetSizeArea } from "../components/Products";

const ProductEdit: React.FC = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);

  const inputName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.currentTarget.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(e.currentTarget.value);
    },
    [setPrice]
  );

  const category_list = [
    { id: "tops", name: "トップス" },
    { id: "shirts", name: "シャツ" },
    { id: "pants", name: "パンツ" },
  ];

  const gender_list = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  useEffect(() => {
    // 編集時
    if (id !== "") {
      firestore
        .collection("products")
        .doc(id)
        .get()
        .then((snapshop) => {
          const data = snapshop.data() as any;
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
        });
    }
  }, [id]);

  return (
    <section>
      <h2 className="text-black text-2xl text-center mx-auto mb-4">商品の登録・編集</h2>
      <div className="my-0 mx-auto p-4 max-w-md h-auto w-full">
        {/* 画像登録 */}
        <ImageArea images={images} setImages={setImages} />
        {/* 商品名 */}
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />

        {/* 商品説明 */}
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={"text"}
        />

        {/* カテゴリー */}
        <SelectBox label={"カテゴリー"} required={true} select={setCategory} value={category} options={category_list} />

        {/* 性別 */}
        <SelectBox label={"性別"} required={true} select={setGender} value={gender} options={gender_list} />

        {/* 価格 */}
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />
        <div className="h-4" />
        <SetSizeArea sizes={sizes} />
        <div className="h-4" />
        <div className="mx-auto my-0 text-center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() => dispatch(saveProducts(id, name, description, category, gender, price, images))}
          ></PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
