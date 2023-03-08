import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SideBar = styled.div`
  width: 200px;
  height: 100%;
  border: 1px solid red;
`;

export default function Home() {
  const [userName, setUserName] = useState("알 수 없음");
  const router = useRouter();

  // Localstroage에서 유저 이름 가져오기
  useEffect(() => {
    try {
      const userName = localStorage.getItem("name");
      if (userName) {
        setUserName(userName);
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  return (
    <Wrapper>
      <SideBar>{userName}</SideBar>
    </Wrapper>
  );
}
