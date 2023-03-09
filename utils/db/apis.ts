import { API_URL } from "./apiUrl";

export async function getLectures(userNum: string | null) {
  const data = await fetch(`${API_URL}/lectureList?num=${userNum}`);
  return data.json();
}
