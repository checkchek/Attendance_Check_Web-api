import { getStudents } from "@/utils/db/apis";
import { motion } from "framer-motion";
import Link from "next/link";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Students = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.2rem;
  color: white;
  width: 200px;
  background-color: rgb(152, 152, 152);
`;
const Student = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

export default function StudentBar({ router }: { router: NextRouter }) {
  const [students, setStudents] = useState<IStudents>();
  const { lectureId, studentId } = router.query;

  useEffect(() => {
    (async () => {
      const studentData = await getStudents(
        router.query.lectureId ? Number(router.query.lectureId) : 0
      );
      setStudents(studentData);
    })();
  }, [router]);

  return (
    <Students>
      <Title>수강생 목록</Title>
      {students?.students
        ? students.students.map((obj, idx) => (
            <StyledLink key={idx} href={`/${lectureId}/${obj.num}`}>
              <Student>
                {studentId === obj.num ? (
                  <Highlight layoutId="studentHighlight"></Highlight>
                ) : null}

                {obj.name}
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
