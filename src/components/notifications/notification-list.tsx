"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type?: "info" | "success" | "warning" | "error";
};

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add a new notification to the list
  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp">
  ) => {
    const newNotification = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      ...notification,
    };

    setNotifications((prev) => {
      // Keep only the 4 most recent notifications to make room for the new one
      const updatedNotifications = prev.length >= 5 ? prev.slice(1) : prev;
      return [...updatedNotifications, newNotification];
    });

    // Increment the notification count badge
    if (window.incrementNotificationCount) {
      window.incrementNotificationCount();
    }
  };

  // Remove a notification from the list
  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Expose the addNotification function to the window object
  useEffect(() => {
    (window as any).addCryptoNotification = addNotification;

    return () => {
      delete (window as any).addCryptoNotification;
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      <AnimatePresence>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={cn(
                "rounded-lg shadow-sm p-4 border",
                notification.type === "success" &&
                  "bg-green-500/10 border-green-500/20",
                notification.type === "error" &&
                  "bg-red-500/10 border-red-500/20",
                notification.type === "warning" &&
                  "bg-yellow-500/10 border-yellow-500/20",
                notification.type === "info" &&
                  "bg-blue-500/10 border-blue-500/20",
                !notification.type && "bg-secondary/50 border-border"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">{notification.title}</div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1 text-sm whitespace-pre-line">
                {notification.message}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
