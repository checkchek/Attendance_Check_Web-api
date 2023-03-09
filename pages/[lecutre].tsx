import SideBar from "@/components/SideBar";
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

  return (
    <Wrapper>
      <SideBar />
      <Main>
        {start ? (
          <QRCodeSVG value="test" size={500} />
        ) : (
          <button onClick={() => setStart(true)}>QR Code 생성</button>
        )}
      </Main>
    </Wrapper>
  );
}
