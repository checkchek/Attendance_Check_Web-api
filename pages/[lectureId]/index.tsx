import SideBar from "@/components/SideBar";
import { fetchGenerateCode, getStudents } from "@/utils/db/apis";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
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

const Students = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

interface IStudents {
  [num: string]: number[];
}

export default function LecturePage() {
  const router = useRouter();
  console.log(router);
  const [start, setStart] = useState(false);
  const [code, setCode] = useState(0);
  const { data, isLoading } = useQuery<IStudents>(
    "students",
    () =>
      getStudents(
        router.query.lectureName ? String(router.query.lectureName) : ""
      ),
    {
      enabled: !!router.query.lectureName,
    }
  );

  console.log(data);

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

  return (
    <Wrapper>
      <SideBar />
      <Students>
        {data
          ? Object.keys(data).map((num, idx) => <div key={idx}>{num}</div>)
          : null}
      </Students>
      <Main>
        <div>{String(code)}</div>
        {start ? <QRCodeSVG value={String(code)} size={500} /> : null}
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
