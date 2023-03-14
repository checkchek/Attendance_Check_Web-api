import { getLectures } from "@/utils/db/apis";
import { motion } from "framer-motion";
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

const Title = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 70px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
`;
const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: rgb(61, 62, 66);
  color: white;
  border: 1px solid black;
  cursor: pointer;
`;

const Highlight = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

interface ILecture {
  name: string;
  lecture_list: Array<ILectureList>;
}
interface ILectureList {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export default function Home() {
  const [userName, setUserName] = useState("알 수 없음");
  const [userNum, setUserNum] = useState("-1");
  const router = useRouter();
  const { data, isLoading } = useQuery<ILecture>("lectures", () =>
    getLectures(localStorage.getItem("num"))
  );
  const goTo = (path: string | number) => {
    router.push(`/${String(path)}`);
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
    <SideBar>
      <Title onClick={() => goTo("/")}>{userName}님 환영합니다.</Title>
      {data?.lecture_list.map((lecture, idx) => (
        <Item
          key={idx}
          onClick={() => {
            goTo(lecture.id);
          }}
        >
          {String(lecture.id) === router.query.lectureId ? (
            <Highlight layoutId="highlight"></Highlight>
          ) : null}
          {lecture.name}
        </Item>
      ))}
    </SideBar>
  );
}
