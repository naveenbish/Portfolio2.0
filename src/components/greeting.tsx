"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number) {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Greeting() {
  // "Hello" is what the server renders; the real greeting replaces it after mount.
  const [text, setText] = useState("Hello");

  useEffect(() => {
    const id = setTimeout(() => setText(greetingFor(new Date().getHours())), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <p className="font-handwritten text-3xl leading-none -rotate-1 select-none">
      {text}
    </p>
  );
}
