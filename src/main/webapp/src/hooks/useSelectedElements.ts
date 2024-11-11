import { useCallback, useEffect, useState } from "react";
import type { BoardNode, Item } from "@mirohq/websdk-types";
import { subscribeSelectionUpdate } from "../utils/board";

type SelectedElements = {
  items?: BoardNode[];
  refreshSelection: VoidFunction;
};

export const useSelectedElements = (): SelectedElements => {
  const [items, setItems] = useState<BoardNode[] | undefined>(undefined);

  const refreshSelection = useCallback(() => {
    miro.board
      .getSelection()
      .catch(() => {
        // TODO we can potentially show some UI error, but I guess it is fine to show nothing for now
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
