import SideBar from "@/components/SideBar";
import { getLectures } from "@/utils/db/apis";
import { API_URL } from "@/utils/db/apiUrl";
import { Router, useRouter } from "next/router";
import QRCode, { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: rgb(61, 62, 66);
  color: white;
  border: 1px solid black;
  cursor: pointer;
`;
const Main = styled.div`
  height: 100%;
  width: 100%;
`;

interface ILecture {
  name: string;
  lecture_list: Array<string>;
}

export default function Home() {
  const [userName, setUserName] = useState("알 수 없음");
  const [userNum, setUserNum] = useState("-1");
  const router = useRouter();
  const { data, isLoading } = useQuery<ILecture>("lectures", () =>
    getLectures(localStorage.getItem("num"))
  );

  const goToLecturePage = (lecture: string) => {
    router.push(lecture);
  };

  // Localstroage에서 유저 이름 가져오기
  useEffect(() => {
    try {
      const userName = localStorage.getItem("name");
      const userNum = localStorage.getItem("num");

      if (userName && userNum) {
        setUserName(userName);
        setUserNum(userNum);
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  return (
    <Wrapper>
      <SideBar />

      <Main></Main>
    </Wrapper>
  );
}
