"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-black",
          actionButton:
            "group-[.toast]:bg-black group-[.toast]:text-white group-[.toast]:hover:bg-gray-800",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-black group-[.toast]:hover:bg-gray-200",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
