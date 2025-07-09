"use client";
import React from "react";

interface ButtomProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function Button({ onClick, children }: ButtomProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}
