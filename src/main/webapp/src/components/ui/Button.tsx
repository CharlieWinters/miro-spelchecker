import {FC, ReactNode} from "react";
import cn from 'classnames'

interface Props {
    children: string | ReactNode;
    onClick: () => void;
    type: 'secondary' | 'tertiary',
    size: 'medium' | 'small'
    isLoading?: boolean;
}
export const Button: FC<Props> = ({onClick, isLoading, type, size, children}) => {
    const onButtonClick = () => {
        if (isLoading) {
            return;
        }
        onClick();
    }
    return (<button
        className={cn('button', `button-${type}`, `p-${size}`, {'button-loading': isLoading, 'button-small': size==='small'})}
        type="button"
        onClick={onButtonClick}
        >
        {children}
    </button>)
}