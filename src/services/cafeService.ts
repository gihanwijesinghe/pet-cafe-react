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
  id: number;
}

const CafeService = {
  getCafes: (location?: string) => {
    return fetch(`https://localhost:7122/api/cafes?location=${location ?? ""}`)
      .then((res) => res.json())
      .then((res) => res as CafeResponse[]);
  },

  postCafe: (cafePost: CafePost) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cafePost),
    };

    return fetch("https://localhost:7122/api/cafes", requestOptions)
      .then((res) => res.json())
      .then((res) => res as any);
  },

  putCafe: (cafePut: CafePut) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cafePut),
    };

    return fetch(`https://localhost:7122/api/cafes/${cafePut.id}`, requestOptions);
  },

  deleteCafe: (id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    return fetch(`https://localhost:7122/api/cafes/${id}`, requestOptions);
  },
};

export default CafeService;
