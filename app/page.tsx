'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div>Homepage</div>
      <button onClick={() => router.push("/login")}>login</button>
    </>
  );
}
