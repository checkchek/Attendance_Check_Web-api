import { getLectures } from "@/utils/db/apis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  background-color: rgb(61, 62, 66);
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
  const goTo = (lecture: string) => {
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

  // 강의 목록 가져오기

  console.log(data);

  return (
    <SideBar>
      <Item onClick={() => goTo("/")}>{userName}님 환영합니다.</Item>
      {data?.lecture_list.map((lecture) => (
        <Item
          key={lecture}
          onClick={() => {
            goTo(lecture);
          }}
        >
          {lecture}
        </Item>
      ))}
    </SideBar>
  );
}
