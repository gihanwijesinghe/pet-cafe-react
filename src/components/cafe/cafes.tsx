import React from "react";
import CafeService, { CafeResponse } from "../../services/cafeService";

const Cafes: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cafes, setCafes] = React.useState<CafeResponse[]>([]);

  React.useEffect(() => {
    CafeService.getCafes()
      .then((res) => setCafes(res))
      .finally(() => setLoading(false));
  }, []);

  return <div className="container">{loading ? <>Loading...</> : cafes.map((cafe) => <>{cafe.name}</>)}</div>;
};

export default Cafes;
