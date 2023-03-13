import SideBar from "@/components/SideBar";
import { fetchGenerateCode } from "@/utils/db/apis";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
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
export default function LecturePage() {
  const [start, setStart] = useState(false);
  const [code, setCode] = useState(Math.random());

  const generateCode = () => {
    setStart(true);
    const generateTime = new Date();
    fetchGenerateCode(String(code), generateTime.getTime());
    setCode(Math.random());
  };

  return (
    <Wrapper>
      <SideBar />
      <Main>
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
