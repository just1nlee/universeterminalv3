"use client";

import { useState, useEffect } from "react";
import { TerminalState, Node } from "./helper";
import * as help from "./commands/help";
import * as ls from "./commands/ls";
import * as cd from "./commands/cd";
import * as pwd from "./commands/pwd";
import * as clear from "./commands/clear";
import * as bigbang from "./commands/bigbang";

type Command = {
    run: (args: string[], state: TerminalState) => void;
}

const commands: Record<string, Command> = {
    help,
    ls,
    cd,
    pwd,
    clear,
    bigbang,
}

async function runCommand(input: string, state: TerminalState) {
    const [cmd, ...args] = input.trim().split(" ");
    state.addHistory(`${input}`);

    const command = commands[cmd];
    if (!command) {
        state.addHistory(`command ${cmd} not found`);
        return;
    }

    await command.run(args, state);
}

export default function Terminal() {
    const [universe, setUniverse] = useState<Node>({
        name: "/",
        explored: true,
        children: [],
      });
    useEffect(() => {
        (async () => {
            try {
                await fetch("/api/universe/reset", { method: "POST" });

                const res = await fetch("/api/universe");
                const data = await res.json();
                setUniverse(data);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const [currentPath, setCurrentPath] = useState<string[]>(["/"]);
    const [history, setHistory] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const terminalState: TerminalState = {
        universe,
        setUniverse,
        currentPath,
        setCurrentPath,
        history,
        addHistory: (line: string) =>
          setHistory((h) => [...h, line]),
        clearHistory: () => setHistory([]),
    };
    
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        runCommand(input, terminalState);
        setInput("");
    }

    return (
        <div>
        {/* Output */}
        <div>
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
  
        {/* Input */}
        <form onSubmit={onSubmit}>
          <span>$ </span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    )
}