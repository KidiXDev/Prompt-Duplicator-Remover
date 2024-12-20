import { CheckIcon, CrossIcon } from "./icons/IconComponent";

interface NotificationProps {
  message: string;
  isVisible: boolean;
  type?: "success" | "error";
}

export function Notification({
  message,
  isVisible,
  type = "success",
}: NotificationProps) {
  return (
    <div
      className={`fixed top-4 right-4 transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg">
        {type === "success" ? <CheckIcon /> : <CrossIcon />}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
