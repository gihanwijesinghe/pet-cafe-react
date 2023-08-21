import { baseUrl } from "./baseService";

export interface CafeResponse {
  id: string;
  name: string;
  description: string;
  location: string;
  employeeCount: number;
}

export interface CafePost {
  name: string;
  description: string;
  location: string;
}

export interface CafePut extends CafePost {
  id: string;
}

const cafeUrl = baseUrl + "cafes";
const CafeService = {
  getCafes: (location?: string) => {
    return fetch(`${cafeUrl}?location=${location ?? ""}`)
      .then((res) => res.json())
      .then((res) => res as CafeResponse[]);
  },

  postCafe: (cafePost: CafePost) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cafePost),
    };

    return fetch(`${cafeUrl}`, requestOptions)
      .then((res) => res.json())
      .then((res) => res as any);
  },

  putCafe: (cafePut: CafePut) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cafePut),
    };

    return fetch(`${cafeUrl}/${cafePut.id}`, requestOptions);
  },

  deleteCafe: (id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(`${cafeUrl}/${id}`, requestOptions);
  },
};

export default CafeService;
