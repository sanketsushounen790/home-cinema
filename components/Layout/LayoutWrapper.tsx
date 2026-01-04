"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import DrawerMenu from "./DrawerMenu";
import NavBar from "./NavBar";
import { useUser } from "@/hooks/useUser";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import {
  getAllWatchlistsWithItems,
  initWatchlistRealtime,
} from "@/lib/firebase/watchlist";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full flex justify-center items-center">
            <div className="w-72">1</div>

            <div className="w-[calc(100%-theme(width.72))]">
              {/* Navbar */}
              <NavBar />

              {/* Page content here */}
              {children}
            </div>
          </div>
        </div>

        <div className="drawer-open">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <DrawerMenu />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
