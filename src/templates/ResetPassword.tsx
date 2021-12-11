import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { Card, CardContent } from "@material-ui/core";

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
    <div className="my-0 mx-auto p-4 max-w-md h-auto w-full">
      <div className="h-8" />
      <Card>
        <CardContent>
          <div className="h-8" />
          <h2 className="text-black text-2xl text-center mx-auto mb-4">パスワードリセット</h2>

          <div className="h-8" />

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

          <div className="h-8" />

          {/* ボタン */}
          <div className="mx-auto my-0 text-center">
            <PrimaryButton label={"パスワードリセット"} onClick={() => dispatch(resetPassword(email))} />
            <div className="h-8" />
            <p onClick={() => dispatch(push("/signin"))}>サインインページはこちら</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
