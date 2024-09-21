import React from "react";
import { useParams } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  return <div>Payment</div>;
}

export default Payment;
