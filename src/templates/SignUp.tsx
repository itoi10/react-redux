import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signUp } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { Card, CardContent } from "@material-ui/core";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // メモ化
  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.currentTarget.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="my-0 mx-auto p-4 max-w-md h-auto w-full">
      <div className="h-8" />
      <Card>
        <CardContent>
          <div className="h-8" />
          <h2 className="text-black text-2xl text-center mx-auto mb-4">アカウント登録</h2>

          <div className="h-8" />

          {/* ユーザー名 */}
          <TextInput
            fullWidth={true}
            label={"ユーザー名"}
            multiline={false}
            required={true}
            rows={1}
            value={username}
            type={"text"}
            onChange={inputUsername}
          />
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
          {/* パスワード */}
          <TextInput
            fullWidth={true}
            label={"パスワード"}
            multiline={false}
            required={true}
            rows={1}
            value={password}
            type={"password"}
            onChange={inputPassword}
          />
          {/* パスワード（再確認） */}
          <TextInput
            fullWidth={true}
            label={"パスワード（再確認）"}
            multiline={false}
            required={true}
            rows={1}
            value={confirmPassword}
            type={"password"}
            onChange={inputConfirmPassword}
          />

          <div className="h-8" />

          {/* ボタン */}
          <div className="mx-auto my-0 text-center">
            {/* <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        /> */}
            <PrimaryButton
              label={"アカウントを登録する(無効)"}
              onClick={() => alert("デモアプリであり登録を無効にしています")}
            />

            <div className="h-8" />
            <p onClick={() => dispatch(push("/signin"))}>アカウントをすでにお持ちの方はこちら</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
