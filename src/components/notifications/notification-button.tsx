"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationPopup } from "./notification-popup";

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to increment notification count
  const incrementCount = () => {
    setNotificationCount((prev) => prev + 1);
  };

  // Function to reset notification count when popup is opened
  const handleOpenPopup = () => {
    setIsOpen(true);
    setNotificationCount(0);
  };

  // Expose the increment function to window
  useEffect(() => {
    (window as any).incrementNotificationCount = incrementCount;

    return () => {
      delete (window as any).incrementNotificationCount;
    };
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={handleOpenPopup}
      >
        <Bell className="h-5 w-5" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
      </Button>

      <NotificationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
