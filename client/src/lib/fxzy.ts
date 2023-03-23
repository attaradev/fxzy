import Axios from "axios";

export default function Fxzy(accessToken: string) {
  const axios = Axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    requests: {
      async create(data: any) {
        const response = await axios.post("/requests", data);
        return response.data;
      },
      async get(id: string) {
        const response = await axios.get(`/requests/${id}`);
        return response.data;
      },
      async list() {
        const response = await axios.get("/requests");
        return response.data;
      },
      async delete(id: string) {
        const response = await axios.delete(`/requests/${id}`);
        return response.data;
      },
      async update({ id, ...data }: any) {
        const response = await axios.put(`/requests/${id}`, data);
        return response.data;
      },
    },
    bankAccounts: {
      async create(data: any) {
        const response = await axios.post("/bankAccounts", data);
        return response.data;
      },
      async get(id: string) {
        const response = await axios.get(`/bankAccounts/${id}`);
        return response.data;
      },
      async list() {
        const response = await axios.get("/bankAccounts");
        return response.data;
      },
    },
  };
}
