import React from 'react';

type ButtonPropsType = {
    name: string;
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button>{props.name}</button>
    );
};
