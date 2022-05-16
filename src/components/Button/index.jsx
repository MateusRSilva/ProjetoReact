import './Styles.css';

import { Component } from "react";

export class Button extends Component {

    render() {
        const {text, clicado, disabled} = this.props;
        return (
            <button 
            disabled = {disabled}
            className='button' 
            onClick={clicado}>
                {text}
            </button>
        )
    }
}