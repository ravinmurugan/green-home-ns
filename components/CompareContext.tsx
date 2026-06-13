"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CompareContextType {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextType>({
  ids: [],
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
  isFull: false,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const clear = useCallback(() => setIds([]), []);
  const isSelected = useCallback((id: string) => ids.includes(id), [ids]);
  const isFull = ids.length >= 4;

  return (
    <CompareContext.Provider value={{ ids, toggle, clear, isSelected, isFull }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
