import {FC, useEffect, useMemo} from "react";
import {Item} from "@mirohq/websdk-types";
import cn from 'classnames';
import {useTrackActiveElement} from "../hooks/useTrackActiveElement";
import {useSpellCheck} from "../hooks/useSpellCheck";
import {linkChecksWithItems} from "../utils/checks";
import {SupportedLanguage} from "../utils/language";
import {NoElementsSelected} from "./NoElementsSelected/NoElementsSelected";
import {StatusWrapper} from "./StatusWrapper/StatusWrapper";
import {SpellCheckerCardList} from "./SpellCheckerCardList";

interface Props {
    active: boolean;
    items: Item[];
    setItems: (items: Item[]) => void;
    switchToAll: () => void;
    onActivate: (fn: () => void) => void;
    className: string;
    language: SupportedLanguage;
    heightShift: number;
}
export const SelectedElementsChecks: FC<Props> = ({ active, items, setItems, switchToAll, onActivate, className, language, heightShift}) => {
    useTrackActiveElement(items, setItems);

    const {checks, refetch, isLoading, isError } = useSpellCheck(items, language);

    useEffect(() => {
        if (!items.length) {
            return;
        }
        refetch();
    }, [items, refetch]);

    useEffect(() => {
        if (!active) {
            return;
        }

        onActivate(refetch)
    }, [active, onActivate, refetch])

    const list = useMemo(() => {
        return linkChecksWithItems(checks || [], items);
    }, [items, checks])

    if (!active) {
        return null;
    }

    if (!items.length) {
        return <div className={cn('centered', className)}>
            <NoElementsSelected onSwitch={switchToAll}/>
        </div>
    }

    return (
        <StatusWrapper isError={isError} isLoading={isLoading} className={className} count={list.length}>
            <SpellCheckerCardList className={className} items={list} hideFocus heightShift={heightShift}/>
        </StatusWrapper>
    );
}