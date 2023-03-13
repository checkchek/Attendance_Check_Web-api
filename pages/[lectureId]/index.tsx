import SideBar from "@/components/SideBar";
import StudentBar from "@/components/StudentBar";
import { fetchGenerateCode, getStudents } from "@/utils/db/apis";
import Link from "next/link";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

export default function LecturePage() {
  const router = useRouter();
  const [start, setStart] = useState(false);
  const [code, setCode] = useState(0);
  const [students, setStudents] = useState<IStudents>();

  const generateCode = () => {
    const newCode = Math.random();
    setStart(true);
    const generateTime = new Date();
    if (router.query.lectureId) {
      fetchGenerateCode(
        Number(router.query.lectureId),
        String(newCode),
        generateTime.getTime()
      );
    }

    setCode(newCode);
  };

  useEffect(() => {
    (async () => {
      const studentData = await getStudents(
        router.query.lectureId ? Number(router.query.lectureId) : 0
      );
      setStudents(studentData);
    })();
    generateCode();
  }, [router]);

  return (
    <Wrapper>
      <SideBar />
      <StudentBar router={router} />
      <Main>
        <div>{String(code) + `,${router.query.lectureId}`}</div>
        {start ? (
          <QRCodeSVG
            value={String(code) + `,${router.query.lectureId}`}
            size={300}
          />
        ) : null}
        <button
          onClick={() => {
            generateCode();
          }}
        >
          QR Code 생성
        </button>
      </Main>
    </Wrapper>
  );
}
