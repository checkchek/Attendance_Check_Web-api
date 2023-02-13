import styled from "styled-components";

const Wrapper = styled.div`
  margin: 30px;
`;
const Item = styled.div``;
const Params = styled.div`
  margin: 10px;
  width: 300px;
`;
const Response = styled.div`
  margin: 10px;
`;
const H3 = styled.div`
  margin-bottom: 10px;
`;
const Url = styled.span`
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 5px;
  margin-left: 10px;
`;
const Method = styled.span`
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

interface IBlockProps {
  title: string;
  method: string;
  url: string;
  desc: string;
  params?: string[];
  res?: string[];
}
function Block({ title, method, url, desc, params, res }: IBlockProps) {
  return (
    <Item>
      <h2>{title}</h2>
      <H3>
        <Method>{method}</Method>
        <Url>{url}</Url>
      </H3>
      <div>{desc}</div>
      <Row>
        <Params>
          <h3>params</h3>
          {params?.map((p, idx) => (
            <>
              <span key={idx}>{p}</span>
              <br />
            </>
          ))}
        </Params>

        <Response>
          <h3>Response</h3>
          {res?.map((p, idx) => (
            <>
              <span key={idx}>{p}</span>
              <br />
            </>
          ))}
        </Response>
      </Row>
      <hr />
    </Item>
  );
}

export default function Home() {
  const obj = {
    result: {
      C언어: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      네트워크: [-1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    },
  };
  return (
    <Wrapper>
      <Block
        title="로그인"
        method="POST"
        url="http://localhost:3003/api/login"
        desc="id pw를 검색하여 결과를 반환합니다."
        params={["id: string", "pw: string"]}
        res={["login: boolean", "message: string"]}
      ></Block>
      <Block
        title="조회"
        method="GET"
        url="http://localhost:3003/api/attendance/&#123;stdno&#125;"
        desc="출석부를 조회할 수 있습니다."
        res={["object"]}
      ></Block>
      <Block
        title="출석 체크"
        method="GET"
        url="http://localhost:3003/api/check"
        desc="stdno 학생의 lecture 강의 출석부를 수정합니다."
        params={["stdno: string", "lecture: string", "week: number"]}
      ></Block>
    </Wrapper>
  );
}
