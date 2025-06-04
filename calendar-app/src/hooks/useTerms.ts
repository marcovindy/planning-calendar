import type { Term } from "@/types";
import { dateUtils } from "@/utils/date";
import { addDays, differenceInDays } from "date-fns";
import { useCallback, useState } from "react";

export const useTerms = (initialTerms: Term[]) => {
  const [terms, setTerms] = useState(initialTerms);

  const updateTerm = useCallback((termId: string, updates: Partial<Term>) => {
    setTerms((prev) =>
      prev.map((term) => (term.id === termId ? { ...term, ...updates } : term))
    );
  }, []);

  const moveTerm = useCallback(
    (termId: string, newStartDate: string, newOrderId: string) => {
      setTerms((prev) => {
        const termToMove = prev.find((t) => t.id === termId);
        if (!termToMove) return prev;

        const duration = differenceInDays(
          dateUtils.toDate(termToMove.endDate),
          dateUtils.toDate(termToMove.startDate)
        );

        const newStart = dateUtils.toDate(newStartDate);
        const newEnd = addDays(newStart, duration);

        return prev.map((term) =>
          term.id === termId
            ? {
                ...term,
                orderId: newOrderId,
                startDate: dateUtils.toString(newStart),
                endDate: dateUtils.toString(newEnd)
              }
            : term
        );
      });
    },
    []
  );

  return {
    terms,
    updateTerm,
    moveTerm,
    addTerm: useCallback((newTerm: Omit<Term, "id">) => {
      const id = `t${Date.now()}`;
      setTerms((prev) => [...prev, { ...newTerm, id }]);
    }, []),
    deleteTerm: useCallback((termId: string) => {
      setTerms((prev) => prev.filter((term) => term.id !== termId));
    }, [])
  };
};
