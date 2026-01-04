"use client";

import { useState } from "react";
import {
  Film,
  Tv,
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  ListTree,
  Sun,
  Moon,
  LogOut,
  CirclePlus,
  GlobeIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";
import { usePathname, useRouter } from "next/navigation";
import { handleLogout } from "../Authentication/LogoutButton";
import { useUser } from "@/hooks/useUser";

import CreateNewWatchlistModal from "./CreateNewWatchlistModal";
import { useCurrentWatchlistStore } from "@/store/useCurrentWatchlistStore";
import { useGetWatchlistsSummary } from "@/hooks/useGetWatchlistsSummary";
import { useUnreadNotificationCount } from "@/hooks/useUnreadNotificationCount";
import LanguageSelect from "./LanguageSelect";
import Image from "next/image";
import { RegionSelectDropdown } from "../Shared_Components/RegionSelectDropdown";
import { DrawerRegionSelect } from "./DrawerRegionSelect";

interface SidebarItemProps {
  label: string;
  // @ts-ignore
  icon: JSX.Element;
  href: string;
  onClick?: () => void;
}

interface SidebarSectionProps {
  title: string;
  // @ts-ignore
  icon: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  items: { label: string; href: string }[];
}

interface WatchlistSidebarSectionProps {
  title: string;
  // @ts-ignore
  icon: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenCreateWatchlistModal: (value: boolean) => void;
  items: { id: string; title: string; createdAt: number; href: string }[];
  loading: boolean;
}

export default function Sidebar() {
  const router = useRouter();

  const { user, loading: userLoading } = useUser();
  const { theme, toggleTheme } = useThemeStore();

  const [openCreateWatchlistModal, setOpenCreateWatchlistModal] =
    useState(false);
  const [openMovies, setOpenMovies] = useState(false);
  const [openTV, setOpenTV] = useState(false);
  const [openWatchList, setOpenWatchList] = useState(false);
  const [openDiscover, setOpenDiscover] = useState(false);
  const [lang, setLang] = useState("en");

  const {
    data: watchlistsSummary,
    isLoading: isWatchlistsLoading,
    isError: isWatchlistsError,
    error: watchlistsError,
  } = useGetWatchlistsSummary(user?.uid ? true : false);

  const watchlistsSummaryArray = (watchlistsSummary?.list ?? [])?.map(
    (wl: any) => ({
      id: wl.id,
      title: wl.title,
      createdAt: wl.createdAt,
      href: `/user/watch-list/${wl.id}`, // dùng id để build route
    })
  );

  const handleLogoutUser = async () => {
    await handleLogout();
    router.push("/");
  };

  return (
    <>
      <CreateNewWatchlistModal
        open={openCreateWatchlistModal}
        onClose={() => setOpenCreateWatchlistModal(false)}
      />

      <aside className="fixed left-0 top-0 w-72 bg-base-100 border-r-1 h-screen flex flex-col p-4 shadow-lg z-55">
        {/* LOGO */}
        <Link href={`/`}>
          <div className="text-2xl font-bold tracking-wide mb-5 cursor-pointer">
            🎬 HomeCinema
          </div>
        </Link>

        {/* MAIN SCROLL AREA */}
        <div className="w-full overflow-y-auto flex-1 space-y-6 bg-base-100">
          {/* MOVIES */}
          <SidebarSection
            title="Movies"
            icon={<Film size={18} />}
            open={openMovies}
            setOpen={setOpenMovies}
            items={[
              { label: "Trending", href: "/movie/trending" },
              { label: "Popular", href: "/movie/popular" },
              { label: "Top Rated", href: "/movie/top-rated" },
              { label: "Now Playing", href: "/movie/now-playing" },
              { label: "Upcoming", href: "/movie/upcoming" },
            ]}
          />

          {/* TV SHOWS */}
          <SidebarSection
            title="TV Shows"
            icon={<Tv size={18} />}
            open={openTV}
            setOpen={setOpenTV}
            items={[
              { label: "Trending", href: "/tv/trending" },
              { label: "Popular", href: "/tv/popular" },
              { label: "Top Rated", href: "/tv/top-rated" },
              { label: "Airing Today", href: "/tv/airing-today" },
              { label: "On The Air", href: "/tv/on-the-air" },
            ]}
          />
          {/* DISCOVER */}
          <SidebarSection
            title="Discover"
            icon={<Search size={18} />}
            open={openDiscover}
            setOpen={setOpenDiscover}
            items={[
              { label: "Movies", href: "/movie" },
              { label: "TV Shows", href: "/tv" },
              { label: "People", href: "/people" },
            ]}
          />

          {/* WATCH LIST */}
          <WatchlistSidebarSection
            title="Watch List"
            icon={<ListTree size={18} />}
            open={openWatchList}
            setOpen={setOpenWatchList}
            setOpenCreateWatchlistModal={setOpenCreateWatchlistModal}
            items={watchlistsSummaryArray}
            loading={isWatchlistsLoading}
          />

          {/* FAVORITES */}
          {/* <SidebarItem
            href="/user/favorites"
            label="Favorites"
            icon={<Heart size={20} />}
          /> */}

          <SidebarItem
            href="/user/notifications"
            label="Notifications"
            icon={<Bell size={20} />}
          />
          {/* <SidebarItem
            href="/user/settings"
            label="Settings"
            icon={<Settings size={20} />}
          /> */}
        </div>

        {/* USER + THEME + LANGUAGE */}
        <div className="space-y-5 border-t border-base-content pt-4 mt-4">
          {/* Avatar + Logout */}
          {userLoading ? (
            <p>Loading...</p>
          ) : !user ? (
            <div className="flex justify-between items-center">
              <p>More Experience ?</p>
              <Link href={`/login`}>
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                  Sign In
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-base-300 p-3 rounded-xl">
              {/* Avatar */}
              <Image
                src={user?.providerData[0]?.photoURL as string}
                alt="avatar"
                width={45}
                height={45}
                loading="lazy"
                className="rounded-full"
              />

              {/* Name + Logout */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="font-semibold text-sm">
                  {user?.providerData[0].displayName}
                </div>

                {/* Logout button với icon Lucide */}
                <button
                  onClick={handleLogoutUser}
                  className="flex items-center gap-1 text-xs text-red-400 cursor-pointer hover:text-red-500"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* THEME */}
          <div className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2">Theme</span>

            <span className="flex items-center gap-2">
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}

              <button
                onClick={toggleTheme}
                className={`w-12 h-6 ${
                  theme === "dark" ? "bg-blue-500" : "bg-neutral-700"
                } rounded-full relative flex items-center px-1 cursor-pointer`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  animate={{ x: theme === "dark" ? 24 : 0 }}
                />
              </button>
            </span>
          </div>

          {/* LANGUAGE */}
          <div className="flex items-center justify-between cursor-pointer">
            <span>Language</span>
            <LanguageSelect />
          </div>

          {/* REGION */}
          <div className="flex items-center justify-between cursor-pointer">
            <span className="mr-2">
              <GlobeIcon />
            </span>
            <DrawerRegionSelect id="global" />
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ label, icon, onClick, href }: SidebarItemProps) {
  const pathname = usePathname();
  const { user, loading: userLoading } = useUser();
  const unreadCount = useUnreadNotificationCount(user?.uid);

  const isActive = pathname === href; // hoặc includes() nếu cần

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-1 cursor-pointer
        ${isActive ? "text-blue-500" : "hover:text-blue-600"}`}
    >
      {icon}
      <span>{label}</span>
      {label === "Notifications" && (
        <div className="relative">
          {unreadCount > 0 && (
            <span
              className="absolute top-[-20px] right-[105px] min-w-[18px] h-[18px]
          bg-red-500 text-white text-xs flex items-center justify-center
          rounded-full px-1"
            >
              {unreadCount}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

function SidebarSection({
  title,
  icon,
  open,
  setOpen,
  items,
}: SidebarSectionProps) {
  const pathname = usePathname();
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-1 cursor-pointer hover:text-blue-500"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-9 mt-1 space-y-2 overflow-hidden"
          >
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`cursor-pointer text-sm p-1 ${
                    pathname === item.href
                      ? "text-blue-500 font-semibold"
                      : "hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WatchlistSidebarSection({
  title,
  icon,
  open,
  setOpen,
  setOpenCreateWatchlistModal,
  items,
  loading,
}: WatchlistSidebarSectionProps) {
  const { user } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  const { setWatchlist } = useCurrentWatchlistStore();

  console.log(user);

  return (
    <div>
      {user?.uid ? (
        <>
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between p-1 cursor-pointer hover:text-blue-500"
          >
            <div className="flex items-center gap-3">
              {icon}
              <span>{title}</span>
            </div>
            {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="ml-9 mt-1 space-y-2 overflow-hidden"
              >
                <div className="flex justify-start items-center gap-1 hover:bg-base-200 cursor-pointer">
                  <CirclePlus size={15} />

                  <div
                    onClick={() => setOpenCreateWatchlistModal(true)}
                    className="text-sm"
                  >
                    Create Watchlist
                  </div>
                </div>

                {loading ? (
                  <div>Loading...</div>
                ) : (
                  items.map((item) => (
                    <div key={item.href}>
                      <div
                        className={`cursor-pointer text-sm p-1 ${
                          pathname === item.href
                            ? "text-blue-500 font-semibold"
                            : "hover:text-blue-500"
                        }`}
                        onClick={() => {
                          setWatchlist({
                            id: item.id,
                            title: item.title,
                            createdAt: item.createdAt,
                          });
                          router.push(`/user/watch-list/${item.id}`);
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between p-1 cursor-pointer hover:text-blue-500">
            <div
              className="flex items-center gap-3"
              onClick={() => {
                router.push("/login");
              }}
            >
              {icon}
              <span>{title}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
