import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";

function RestrurantData() {
  const { id } = useParams();
  const { getRestrurantById } = useAdminAuthentication();
  const [restrurantData, setRestrurantData] = useState(null);
  useEffect(() => {
    async function getRestrurant() {
      try {
        const res = await getRestrurantById(id);
        setRestrurantData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) getRestrurant();
  }, [id]);

  useEffect(() => {
    console.log(restrurantData);
  }, [restrurantData]);
  return <div>RestrurantData</div>;
}

export default RestrurantData;
