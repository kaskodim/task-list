import React from 'react';

type ButtonPropsType = {
    className?: string;
    name: string;
    onClick?: () => void;
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.className}
            onClick={props.onClick}
        >{props.name}</button>
    );
};
