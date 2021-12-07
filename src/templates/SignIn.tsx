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
    <div className="c-section-container">
      <div className="module-spacer--medium" />
      <Card>
        <CardContent>
          <div className="module-spacer--medium" />
          <h2 className="u-text__headline u-text-center">サインイン</h2>

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

          <div className="module-spacer--medium" />

          {/* ボタン */}
          <div className="center">
            <PrimaryButton label={"サインイン"} onClick={() => dispatch(signIn(email, password))} />
            <div className="module-spacer--medium" />
            <p onClick={() => dispatch(push("/signup"))}>アカウントをお持ちでない方はこちら</p>
            <div className="module-spacer--medium" />
            <p onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方はこちら</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
