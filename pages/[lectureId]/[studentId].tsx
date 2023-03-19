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
  position: relative;
`;
const Box = styled.div<{ bgcolor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #95a5a6;
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
  border: 1px solid #95a5a6;
  margin-top: 2em;
  width: 150px;
  height: 50px;
  background-color: white;
  cursor: pointer;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 100px;
  bottom: -100px;
`;
const Rect = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  margin-bottom: 3px;
  box-sizing: border-box;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;

export default function StudentPage() {
  const today = new Date();
  const router = useRouter();
  const { studentId, lectureId } = router.query;
  const [attendance, setAttendance] = useState<number[]>([]);

  const valToColor = (v: number) => {
    switch (v) {
      case -1:
        return "#95a5a6";
      case 0:
        return "#27ae60";
      case 1:
        return "#f1c40f";
      case 2:
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  const getWeek = (date: Date) => {
    const currentDate = date.getTime();
    const firstDay = new Date("2023-03-02").getTime();
    const one = 84000000;
    return Math.floor((currentDate - firstDay) / one / 7) + 1;
  };
  const week = getWeek(today); // 주차

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
              style={
                week === idx + 1 ? { border: "4px solid #2c3e50" } : undefined
              }
              bgcolor={valToColor(v)}
              onClick={() => {
                if (week >= idx + 1) {
                  setAttendance((cur) => {
                    const copy = [...cur];
                    if (copy[idx] >= 2) {
                      copy[idx] = -1;
                    } else {
                      copy[idx] += 1;
                    }
                    return copy;
                  });
                }
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
        <Info>
          <Row>
            <Rect color="#95a5a6" />
            미확인
          </Row>
          <Row>
            <Rect color="#27ae60" />
            출석
          </Row>
          <Row>
            <Rect color="#f1c40f" />
            지각
          </Row>
          <Row>
            <Rect color="#e74c3c" />
            결석
          </Row>
          <Row>
            <Rect color="none" style={{ border: "2px solid #2c3e50" }} />
            현재 주차
          </Row>
        </Info>
      </Main>
    </Wrapper>
  );
}
