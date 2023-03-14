import SideBar from "@/components/SideBar";
import StudentBar from "@/components/StudentBar";
import { API_URL } from "@/utils/db/apiUrl";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div<{ bgcolor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid rgb(152, 152, 152);
  background-color: ${(props) => props.bgcolor};
  margin: 4px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`;
const Attendance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 220px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;
const Button = styled(motion.button)`
  border: 1px solid rgb(152, 152, 152);
  margin-top: 2em;
  width: 150px;
  height: 50px;
  background-color: white;
  cursor: pointer;
`;

export default function StudentPage() {
  const router = useRouter();
  const { studentId, lectureId } = router.query;
  const [attendance, setAttendance] = useState<number[]>([]);

  const valToColor = (v: number) => {
    switch (v) {
      case -1:
        return "rgb(152,152,152)";
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "red";
      default:
        return "rgb(152,152,152)";
    }
  };

  const updateAttendance = () => {
    const data = {
      attendance,
      lectureId,
      studentId,
    };
    (async () => {
      await fetch(`${API_URL}/attendance/modify`, {
        method: "POST",
        headers: {
          "Content-Type": "applicatoin/json",
        },
        body: JSON.stringify(data),
      });
    })();
    alert("수정 완료");
    location.reload();
  };

  useEffect(() => {
    if (studentId && lectureId) {
      (async () => {
        await getAttendance();
      })();
    }
  }, [router]);

  const getAttendance = async () => {
    const attendanceData = await (
      await fetch(`${API_URL}/attendance/${studentId}?lectureId=${lectureId}`)
    ).json();
    setAttendance(attendanceData.attendance[String(studentId)]);
  };
  return (
    <Wrapper>
      <SideBar />
      <StudentBar router={router} />
      <Main>
        <Attendance>
          {attendance.map((v, idx) => (
            <Box
              key={idx}
              bgcolor={valToColor(v)}
              onClick={() => {
                setAttendance((cur) => {
                  const copy = [...cur];
                  if (copy[idx] >= 2) {
                    copy[idx] = -1;
                  } else {
                    copy[idx] += 1;
                  }
                  return copy;
                });
              }}
            >
              {idx + 1}
            </Box>
          ))}
        </Attendance>
        <Button
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          whileTap={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={updateAttendance}
        >
          save
        </Button>
      </Main>
    </Wrapper>
  );
}
