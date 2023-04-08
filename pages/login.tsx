import { API_URL } from "@/utils/db/apiUrl";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled(motion.input)`
  border: 1px solid rgb(152, 152, 152);
  padding: 10px;
  font-size: 1.1rem;
  margin-top: 1em;
  width: 400px;
  height: 50px;
  box-sizing: border-box;
  background-color: white;
`;

const Button = styled(Input)`
  cursor: pointer;
`;

interface ILoginResult {
  login: string;
  message: string;
  num?: string;
  name?: string;
}
export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const onChangPw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.currentTarget.value);
  };
  const onChangId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: ILoginResult = await (
      await fetch(`${API_URL}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          pw,
        }),
      })
    ).json();

    if (result.login === "success" && result.num && result.name) {
      console.log(result);
      localStorage.setItem("num", result.num);
      localStorage.setItem("name", result.name);
      router.push("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Input
          placeholder="ID를 입력해주세요."
          name="id"
          type="text"
          value={id}
          autoComplete="off"
          onChange={(e) => onChangId(e)}
        />
        <Input
          placeholder="Password를 입력해주세요."
          name="pw"
          type="password"
          value={pw}
          autoComplete="off"
          onChange={(e) => onChangPw(e)}
        />
        <Button
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          whileTap={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          type="submit"
          value="로그인"
        />
      </Form>
    </Wrapper>
  );
}
