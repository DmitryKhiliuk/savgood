import React from 'react';
import cn from "classnames";

type BurgerButtonPropsType = {
    open: boolean
    setOpen: (arg: boolean) => void
}


export const BurgerButton = ({open, setOpen}: BurgerButtonPropsType) => {

    const onClickHandler = () => {
        setOpen(!open)
    }

    return (
        <button
            type='button'
            onClick={onClickHandler}
            className={cn(
                "relative w-[30px] h-[30px] border-none bg-none cursor-pointer",
                "focus:outline-none"
            )}
        >
            <span className={cn(
                "absolute block w-[25px] h-[2px] bg-black left-[2px] transition-all duration-500",
                open ? "transform rotate-45" : "transform -translate-y-2"
            )}></span>
            <span className={cn(
                "absolute block w-[25px] h-[2px] bg-black left-[2px] transition-all duration-500",
                "top-1/2 transform -translate-y-1/2",
                open ? "opacity-0" : "opacity-100"
            )}></span>
            <span className={cn(
                "absolute block w-[25px] h-[2px] bg-black left-[2px] transition-all duration-500",
                open ? "transform -rotate-45" : "transform translate-y-2"
            )}></span>
        </button>
    );
};

