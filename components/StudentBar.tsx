import { getStudents } from "@/utils/db/apis";
import { motion } from "framer-motion";
import Link from "next/link";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Students = styled.div`
  position: relative;
  height: 100vh;
  font-size: 1.2rem;
  color: white;
  width: 200px;
  background-color: rgb(152, 152, 152);
  overflow: scroll;
`;
const Student = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  font-size: 14px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 100%;
  height: 50px;
`;

const Title = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  color: white;
  height: 70px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 18px;
`;

interface IStudents {
  attendance: {
    [num: string]: number[];
  };
  students: Array<{
    name: string;
    num: string;
  }>;
}

const getWeek = (date: Date) => {
  const currentDate = date.getTime();
  const firstDay = new Date("2023-03-02").getTime();
  const one = 84000000;
  return Math.floor((currentDate - firstDay) / one / 7) + 1;
};

export default function StudentBar({ router }: { router: NextRouter }) {
  const [students, setStudents] = useState<IStudents>();
  const { lectureId, studentId } = router.query;
  console.log(students);
  useEffect(() => {
    (async () => {
      const studentData = await getStudents(
        router.query.lectureId ? Number(router.query.lectureId) : 0
      );
      setStudents(studentData);
      console.log(studentData);
    })();
  }, [router]);

  const week = getWeek(new Date());

  return (
    <Students>
      <Title>수강생 목록({students?.students?.length})</Title>
      {students?.students
        ? students.students.map((obj, idx) => (
            <StyledLink key={idx} href={`/${lectureId}/${obj.num}`}>
              <Student
                style={
                  students.attendance[obj.num][week - 1] === 0
                    ? { backgroundColor: "green" }
                    : undefined
                }
              >
                {studentId === obj.num ? (
                  <Highlight layoutId="studentHighlight"></Highlight>
                ) : null}
                {obj.name} ({obj.num})
              </Student>
            </StyledLink>
          ))
        : null}
    </Students>
  );
}
function generateCode() {
  throw new Error("Function not implemented.");
}
