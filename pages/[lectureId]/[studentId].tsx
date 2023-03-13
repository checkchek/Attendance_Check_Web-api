import SideBar from "@/components/SideBar";
import StudentBar from "@/components/StudentBar";
import { API_URL } from "@/utils/db/apiUrl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Box = styled.div<{ bgcolor: string }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgcolor};
`;
const Attendance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 300px;
  width: 100%;
`;

export default function StudentPage() {
  const router = useRouter();
  const { studentId, lectureId } = router.query;
  const [attendance, setAttendance] = useState<number[]>([]);

  const valToColor = (v: number) => {
    switch (v) {
      case -1:
        return "gray";
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "red";
      default:
        return "gray";
    }
  };
  useEffect(() => {
    if (studentId && lectureId) {
      (async () => {
        const attendanceData = await (
          await fetch(
            `${API_URL}/attendance/${studentId}?lectureId=${lectureId}`
          )
        ).json();
        setAttendance(attendanceData.attendance[String(studentId)]);
      })();
    }
  });

  return (
    <Wrapper>
      <SideBar />
      <StudentBar router={router} />
      <Attendance>
        {attendance.map((v, idx) => (
          <Box key={idx} bgcolor={valToColor(v)}>
            {idx + 1}주차
          </Box>
        ))}
      </Attendance>
    </Wrapper>
  );
}
