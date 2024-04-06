import React from "react";

class UI extends React.Component {
    constructor(props) {
        super(props);
        console.log(111);
        if (props.addFunction)
            this.addFunction = props.addFunction;
        if (props.delFunction)
            this.delFunction = props.delFunction;

        this.num = 0;
        this.componentDidMount = this.addEventListeners;
    }

    addClickHandler() {
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'Функция №' + this.num);
        input.dataset.num = this.num;
        input.addEventListener('keyup', () => this.keyupHandler(input));

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.delFunction(input.dataset.num - 0);
            funcInputs.removeChild(input);
            funcInputs.removeChild(button);
        });

        const funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(button);
        this.num++;
    }

    keyupHandler(input) {
        try {
            let f;
            eval(`f = x => ${input.value};`);
            this.addFunction(f, input.dataset.num - 0);
        } catch (e) {
            console.log(e);
        }
    }

    addEventListeners() {
        document.getElementById('addFunction').addEventListener('click', () => {
            (ui => {
                ui.addClickHandler();
            })(this);
        });
    }

    render() {
        return (<>
            <button id='addFunction'>+</button>
            <div id='funcInputs'></div>
        </>);
    }
}

export default UI;