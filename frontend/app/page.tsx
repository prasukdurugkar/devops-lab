"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if(!apiUrl){
      setMessage("api not there")
      return
    }
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend not reachable"));
  }, []);

  return (
    <main>
      <h1>Frontend running 🚀</h1>
      <p>{message}</p>
    </main>
  );
}
