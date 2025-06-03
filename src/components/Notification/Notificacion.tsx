import { useState } from "react";

export function Notification({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div 
    // className="fixed top-12 left-0 right-0 z-50 bg-green-600 text-white px-4 py-2 flex items-center justify-between shadow-md"
    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 w-full"
    >
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-black transition"
      >
        ✖
      </button>
    </div>
  );
}