import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { Card, CardContent } from "@material-ui/core";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("guest@example.com");
  const [password, setPassword] = useState("password");

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

  return (
    <div className="my-0 mx-auto p-4 max-w-md h-auto w-full">
      <div className="h-8" />
      <Card>
        <CardContent>
          <div className="h-8" />
          <h2 className="text-black text-2xl text-center mx-auto mb-4">サインイン</h2>

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

          <div className="h-8" />

          {/* ボタン */}
          <div className="mx-auto my-0 text-center">
            <PrimaryButton label={"サインイン"} onClick={() => dispatch(signIn(email, password))} />
            <div className="h-8" />
            <p onClick={() => dispatch(push("/signup"))}>アカウントをお持ちでない方はこちら</p>
            <div className="h-8" />
            <p onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方はこちら</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
