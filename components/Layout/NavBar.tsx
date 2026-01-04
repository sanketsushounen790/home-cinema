"use client";

import SearchBar from "../Search/SearchBar";

const NavBar = () => {
  return (
    <div className="navbar w-full sticky top-0 z-40 bg-base-100 shadow-lg">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <div className="mx-2 flex-1 px-2">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
