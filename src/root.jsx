import { Link, Outlet } from "react-router-dom";
import * as Toggle from "@radix-ui/react-toggle";
import { useDarkMode } from "./context/darkmode-context";

const Root = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className="bg-baseBg text-baseText dark:bg-darkBg dark:text-white font-nunito font-light min-h-screen">
      <header className="py-8 bg-white dark:bg-darkElement shadow-md flex items-center">
        <div className="mx-auto w-11/12 max-w-7xl flex items-center">
          <h1 className="text-xl font-semibold">
            <Link to="/">Where in the world?</Link>
          </h1>
          <Toggle.Root
            pressed={darkMode}
            onPressedChange={() => toggleDarkMode()}
            aria-label="toggle dark mode"
            className="flex items-center gap-2 flex ml-auto p-1"
          >
            {darkMode ? <MooinFillIcon /> : <MoonOutlineIcon />} <span>Dark&nbsp;Mode</span>
          </Toggle.Root>
        </div>
      </header>
      <main className="mx-auto w-11/12 max-w-7xl py-16">
        <Outlet />
      </main>
    </div>
  );
};

const MoonOutlineIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
};

const MooinFillIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Root;
