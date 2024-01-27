"use client";

import { Button } from "@/components/ui/button";
import React, { FC } from "react";

import { HiOutlineClipboardList } from "react-icons/hi";
import { BsBuilding, BsGear } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
  AiOutlineCalendar,
  AiOutlineLogout,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-12">
      <div className="px-3 py-2">
        <h2 className="px-4 mb-2 text-lg font-semibold">Dashboard</h2>
        <div className="space-y-3">
          <Button
            variant={"ghost"}
            className="justify-start w-full rounded-none hover:text-primary"
            onClick={() => router.push("/")}
          >
            <AiOutlineHome className="mr-2 text-lg" />
            Products
          </Button>

          <Button
            variant={"ghost"}
            className="justify-start w-full rounded-none hover:text-primary"
            onClick={() => router.push("/users")}
          >
            <AiOutlineUsergroupAdd className="mr-2 text-lg" />
            Users
          </Button>

          <Button
            variant={"ghost"}
            className="justify-start w-full text-red-500 rounded-none hover:bg-red-200 hover:text-red-500"
            onClick={() => signOut()}
          >
            <AiOutlineLogout className="mr-2 text-lg" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
