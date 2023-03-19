import SideBar from "@/components/SideBar";
import StudentBar from "@/components/StudentBar";
import { fetchGenerateCode, getStudents } from "@/utils/db/apis";
import {
  motion,
  useAnimation,
  useAnimationControls,
  Variants,
} from "framer-motion";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const QrBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 30vw;
`;
const Button = styled(motion.button)`
  border: 1px solid rgb(152, 152, 152);
  margin-top: 2em;
  width: 150px;
  height: 50px;
  background-color: white;
  cursor: pointer;
`;
const Timer = styled(motion.svg)`
  position: absolute;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
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
  const { width: windowWidth } = useWindowSize();
  const controls = useAnimationControls();
  const [auto, setAuto] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

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

  const onClickGenerate = async () => {
    generateCode();
    await controls.start({
      strokeDashoffset: windowWidth * 0.3 * 4,
      transition: {
        type: "tween",
      },
    });
    await controls.start({
      stroke: "green",
      strokeDashoffset: 0,
      transition: {
        duration: 5,
      },
    });
    await controls.start({
      stroke: "red",
    });
  };

  useEffect(() => {
    if (auto) {
      onClickGenerate();
      const id = setInterval(onClickGenerate, 5000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
  }, [auto]);

  return (
    <Wrapper>
      <SideBar />
      <StudentBar router={router} />
      <Main>
        {/* <div>{String(code) + `,${router.query.lectureId}`}</div> */}
        <QrBox>
          {start ? (
            <QRCodeSVG
              value={String(code) + `,${router.query.lectureId}`}
              width="90%"
              height="90%"
            ></QRCodeSVG>
          ) : null}
          <Timer width={"100%"} height={"100%"}>
            <motion.rect
              width={"100%"}
              height={"100%"}
              stroke="green"
              strokeWidth={20}
              fill="none"
              strokeDasharray={windowWidth * 0.3 * 4}
              strokeDashoffset={windowWidth * 0.3 * 4}
              animate={controls}
            />
          </Timer>
        </QrBox>
        <Row>
          <Button
            whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            whileTap={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => {
              setAuto(false);
              onClickGenerate();
            }}
          >
            QR Code 생성
          </Button>
          <Button
            whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            whileTap={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => {
              setAuto((cur) => !cur);
            }}
            style={auto ? { border: "3px solid black" } : undefined}
          >
            자동생성
          </Button>
        </Row>
      </Main>
    </Wrapper>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
