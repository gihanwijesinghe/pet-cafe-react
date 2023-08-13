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

const CafeService = {
  getCafes: () => {
    return fetch("https://localhost:7122/api/cafes")
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
};

export default CafeService;
