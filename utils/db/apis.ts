import { API_URL } from "./apiUrl";

export async function getLectures(userNum: string | null) {
  const data = await fetch(`${API_URL}/lectureList?num=${userNum}`);
  return data.json();
}

export async function fetchGenerateCode(code: string, time: number) {
  const res = await fetch(`${API_URL}/qr/generate?code=${code}&time=${time}`);
  return await res.json();
}

export async function getStudents(lecture: string) {
  const data = await fetch(`${API_URL}/studentList?lecture=${lecture}}`);
  return await data.json();
}
