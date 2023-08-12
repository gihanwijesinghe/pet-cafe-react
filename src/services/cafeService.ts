export interface CafeResponse {
  id: string;
  name: string;
  description: string;
  location: string;
  employeeCount: number;
}

const CafeService = {
  getCafes: () => {
    return fetch("https://localhost:7122/api/cafes")
      .then((res) => res.json())
      .then((res) => res as CafeResponse[]);
  },
};

export default CafeService;
