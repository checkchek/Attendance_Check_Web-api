import { API_URL } from "@/utils/db/apiUrl";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 400px;
  height: 50px;
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
          name="id"
          type="text"
          value={id}
          onChange={(e) => onChangId(e)}
        />
        <Input
          name="pw"
          type="password"
          value={pw}
          onChange={(e) => onChangPw(e)}
        />
        <Input type="submit" />
      </Form>
    </Wrapper>
  );
}
