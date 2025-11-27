import React from "react";
import { useLocation } from "react-router-dom";
import PageSuccess from "src/sections/checkout/status/succes"; // Corrected typo in import name

export default function Page() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  console.log("session_id", sessionId);

  return <PageSuccess sessionId={sessionId} />;
}