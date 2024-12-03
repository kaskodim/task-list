import React from 'react';

type ButtonPropsType = {
    name: string;
    onClick?: () => void;
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick}
        >{props.name}</button>
    );
};
