"use client";

import Terminal from "../terminal/Terminal";

export default function TerminalScreen({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="w-full max-w-[912px] aspect-[912/610] border-[3px] border-bone flex items-center justify-center overflow-hidden">
                <Terminal />
            </div>
        </div>
    );
}