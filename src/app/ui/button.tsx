"use client"

import clsx from "clsx";

export function Button({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx("px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500", className)}
        >
            {children}
        </button>
    );
}