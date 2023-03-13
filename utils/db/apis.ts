import { API_URL } from "./apiUrl";

export async function getLectures(userNum: string | null) {
  const data = await fetch(`${API_URL}/lectureList?num=${userNum}`);
  return data.json();
}

export async function fetchGenerateCode(
  lectureId: number,
  code: string,
  time: number
) {
  const res = await fetch(
    `${API_URL}/qr/generate?lectureId=${lectureId}&code=${code}&time=${time}`
  );
  return await res.json();
}

export async function getStudents(lecture: string) {
  console.log("test", `${API_URL}/studentList?lecture=${lecture}`);
  const data = await fetch(`${API_URL}/studentList?lecture=${lecture}`);
  return data.json();
}
