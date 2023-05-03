import axios from "axios";

export async function getAll() {
  const response = await axios.get("http://localhost:3000/bugs");
  return response.data;
}

export async function save(newBugName) {
  const newBugData = {
    id: 0,
    name: newBugName,
    isClosed: false,
    createdAt: new Date(),
  };
  const response = await axios.post("http://localhost:3000/bugs", newBugData);
  return response.data;
}
