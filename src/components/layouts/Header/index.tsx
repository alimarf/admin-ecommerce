"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);

  const navCreateJobPage = () => router.push("/post-job");

  return (
    <div className="flex flex-row items-center justify-between pb-3 mb-8 border-b border-border">
      <div>
        <div className="font-semibold">{session?.user?.name}</div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
