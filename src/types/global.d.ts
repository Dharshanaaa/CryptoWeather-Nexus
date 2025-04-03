import type { Notification } from "@/components/notifications/notification-list"

declare global {
  interface Window {
    addCryptoNotification?: (notification: Omit<Notification, "id" | "timestamp">) => void
    incrementNotificationCount?: () => void
  }
}

