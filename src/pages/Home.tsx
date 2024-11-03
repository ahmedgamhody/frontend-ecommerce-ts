import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("first run");
    return () => {
      console.log("cleanup");
    };
  }, []);
  return <div>Home</div>;
}
