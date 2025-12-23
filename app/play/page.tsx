import { Suspense } from "react";
import PlayClient from "./PlayClient";

export default function PlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08120D]" />}>
      <PlayClient />
    </Suspense>
  );
}
