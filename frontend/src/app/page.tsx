"use client"

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <p>Hello world</p>
      <Button onClick={()=> toast.success("successfully click")}/>
    </div>
  );
}
