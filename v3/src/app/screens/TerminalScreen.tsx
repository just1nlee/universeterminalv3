"use client";

import Terminal from "../terminal/Terminal";

export default function TerminalScreen({ onNext }: { onNext: () => void }) {
    return (
        <div>
            <Terminal />
        </div>
    );
}