import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>

      <div className="module-spacer--medium" />

      {/* メールアドレス */}
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />

      <div className="module-spacer--medium" />

      {/* ボタン */}
      <div className="center">
        <PrimaryButton label={"パスワードリセット"} onClick={() => dispatch(resetPassword(email))} />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signin"))}>サインインページはこちら</p>
      </div>
    </div>
  );
};

export default ResetPassword;
