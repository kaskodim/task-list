import React from 'react';
import {ButtonNameType} from '../App';


type ButtonPropsType = {
    name: ButtonNameType;
    onClick?: () => void;
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick}
        >{props.name}</button>
    );
};
