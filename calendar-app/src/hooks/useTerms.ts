import type { AddTermData, Term } from "@/types";
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

  const addTerm = useCallback((data: AddTermData) => {
    const id = `t${Date.now()}`;

    setTerms((prev) => {
      const hasOverlap = prev.some(
        (t) =>
          t.orderId === data.orderId &&
          dateUtils.hasOverlap(
            dateUtils.toDate(data.startDate),
            dateUtils.toDate(data.endDate),
            dateUtils.toDate(t.startDate),
            dateUtils.toDate(t.endDate)
          )
      );

      if (hasOverlap) {
        console.warn("Terms cannot overlap within the same order");
        return prev;
      }

      return [...prev, { ...data, id }];
    });
  }, []);

  const moveTerm = useCallback((termId: string, newStartDate: string) => {
    setTerms((prev) => {
      const termToMove = prev.find((t) => t.id === termId);
      if (!termToMove) return prev;

      const duration = differenceInDays(
        dateUtils.toDate(termToMove.endDate),
        dateUtils.toDate(termToMove.startDate)
      );

      const newStart = dateUtils.toDate(newStartDate);
      const newEnd = addDays(newStart, duration);

      const hasOverlap = prev.some(
        (t) =>
          t.id !== termId &&
          t.orderId === termToMove.orderId &&
          dateUtils.hasOverlap(
            newStart,
            newEnd,
            dateUtils.toDate(t.startDate),
            dateUtils.toDate(t.endDate)
          )
      );

      if (hasOverlap) {
        console.warn("Terms cannot overlap within the same order");
        return prev;
      }

      return prev.map((term) =>
        term.id === termId
          ? {
              ...term,
              startDate: dateUtils.toString(newStart),
              endDate: dateUtils.toString(newEnd)
            }
          : term
      );
    });
  }, []);

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
