import type { AddTermData, Term } from "@/types";
import { dateUtils } from "@/utils/date";
import { addDays, differenceInDays, format } from "date-fns";
import { useCallback, useState } from "react";

export const useTerms = (initialTerms: Term[]) => {
  const [terms, setTerms] = useState(initialTerms);

  const checkOverlap = useCallback(
    (
      orderId: string,
      startDate: Date,
      endDate: Date,
      excludeTermId?: string
    ) => {
      const orderTerms = terms.filter(
        (t) => t.id !== excludeTermId && t.orderId === orderId
      );

      const overlap = orderTerms.some((term) => {
        const termStart = dateUtils.toDate(term.startDate);
        const termEnd = dateUtils.toDate(term.endDate);

        const hasOverlap = dateUtils.hasOverlap(
          startDate,
          endDate,
          termStart,
          termEnd
        );

        console.log("Checking term:", {
          termId: term.id,
          start: term.startDate,
          end: term.endDate,
          hasOverlap
        });

        return hasOverlap;
      });

      return overlap;
    },
    [terms]
  );

  const addTerm = useCallback(
    (data: AddTermData) => {
      const id = `t${Date.now()}`;
      const startDate = dateUtils.toDate(data.startDate);
      const endDate = dateUtils.toDate(data.endDate);

      console.log("Adding new term:", {
        orderId: data.orderId,
        start: data.startDate,
        end: data.endDate
      });

      setTerms((prev) => {
        const hasOverlap = checkOverlap(data.orderId, startDate, endDate);

        if (hasOverlap) {
          console.warn("Terms cannot overlap within the same order");
          return prev;
        }

        return [...prev, { ...data, id }];
      });
    },
    [checkOverlap]
  );

  const updateTerm = useCallback((termId: string, updates: Partial<Term>) => {
    setTerms((prev) =>
      prev.map((term) => (term.id === termId ? { ...term, ...updates } : term))
    );
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

      const hasOverlap = checkOverlap(
        termToMove.orderId,
        newStart,
        newEnd,
        termId
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
    addTerm,
    deleteTerm: useCallback((termId: string) => {
      setTerms((prev) => prev.filter((term) => term.id !== termId));
    }, [])
  };
};
