import { useCallback, useEffect, useState } from "react";
import { BoardNode, Item } from "@mirohq/websdk-types";
import { subscribeSelectionUpdate } from "../utils/board";

export const useSelectedElements = () => {
  const [items, setItems] = useState<BoardNode[] | undefined>(undefined);

  const refreshSelection = useCallback(() => {
    miro.board
      .getSelection()
      .catch(() => {
        // TODO handle error
        const fallbackItems: Item[] = [];
        return fallbackItems;
      })
      .then((items) => {
        setItems(items);
      });
  }, []);

  useEffect(() => {
    refreshSelection();
  }, [refreshSelection]);

  useEffect(() => {
    const unsubscribe = subscribeSelectionUpdate((event) => {
      setItems(event.items);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    items,
    refreshSelection,
  };
};
