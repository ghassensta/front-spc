import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FailedView from "src/sections/checkout/status/cancel";

export default function Page() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("session_id");
    setSessionId(id);
  }, [location.search]);

  return <FailedView sessionId={sessionId} />;
}
