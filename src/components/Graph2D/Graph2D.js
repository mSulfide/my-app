import React from "react";
import UI from "./UI/UI";
import Graph from "../../modules/Graph/Graph";

class Graph2D extends React.Component {
    constructor(props) {
        super(props);
        const funcs = [
            { f: x => x * x, color: "#f0f", width: 2 }
        ];
        this.funcs = funcs;

        const ui = new UI({ addFunction, delFunction });

        function addFunction(f, num) {
            funcs[num] = { f, color: '#f23', width: 3 };
            this.update();
        }

        function delFunction(num) {
            funcs[num] = null;
            this.update();
        }

        const WIN = {
            left: -10,
            bottom: -10,
            width: 20,
            height: 20
        };
        this.WIN = WIN;

        const graph2D = this;

        this.componentDidMount = () => {
            let canMove = false;
            const mouseup = () => { canMove = false; }
            const mouseleave = () => { canMove = false; }
            const mousedown = () => { canMove = true; }
            const mousemove = event => {
                if (canMove) {
                    WIN.left -= graph2D.graph.sx(event.movementX);
                    WIN.bottom -= graph2D.graph.sy(event.movementY);
                    graph2D.update();
                }
            }
    
            const wheel = event => {
                const zoomStep = 0.4;
                const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
                if (WIN.width + delta >= 0) {
                    WIN.width += delta;
                    WIN.height += delta;
                    WIN.left -= delta / 2;
                    WIN.bottom -= delta / 2;
                    graph2D.update();
                }
            }
    
            graph2D.graph = new Graph({
                id: 'canvas', width: 600, height: 600, WIN,
                callbacks: { wheel, mouseup, mouseleave, mousedown, mousemove }
            });
            this.update();
        };
    }

    printFunction(func, color = "#4B4B4B", lineWidth = 2) {
        const WIN = this.WIN;
        const precision = 2000;
        let x = WIN.left;
        let dx = WIN.width / precision;
        while (x <= WIN.width + WIN.left) {
            if (Math.abs(func(x) - func(x + dx)) >= WIN.height) {
                x += dx;
                continue;
            }
            this.graph.line(x, func(x), x + dx, func(x + dx), color, lineWidth);
            x += dx;
        }
    }

    printFunctionText(f) {
        let text = f.toString();
        text = text.replaceAll('x =>', '');
        this.graph.text(1.2, f(1), 'y =' + text);
    }

    printZeroes(f, color = "#f00", size = 2) {
        const WIN = this.WIN;
        const precision = 100;
        let x = WIN.left;
        let dx = WIN.width / precision;
        while (x <= WIN.width + WIN.left) {
            let zero = this.getZero(f, x, x + dx);
            if (zero) 
                this.graph.point(zero, 0, color, size);
            x += dx;
        }
    }

    printAxes(color = "#2A2A2A") {
        const WIN = this.WIN;
        const graph = this.graph;
        const cellsColor = "#AAAAAA";
        const axesWidth = 2;
        const markupLenght = 0.2;
        const arrowLenght = 0.05;
        const top = WIN.bottom + WIN.height;
        const right = WIN.left + WIN.width;
        graph.line(0, WIN.bottom, 0, top, color, axesWidth);
        graph.line(WIN.left, 0, right, 0, color, axesWidth);
        for (let i = 1; i < right; i++) {
            graph.line(i, WIN.bottom, i, top, cellsColor);
            graph.line(i, -markupLenght, i, markupLenght, color);
        }
        for (let i = 1; i < top; i++) {
            graph.line(WIN.left, i, right, i, cellsColor);
            graph.line(-markupLenght, i, markupLenght, i, color);
        }
        for (let i = -1; i > WIN.left; i--) {
            graph.line(i, WIN.bottom, i, top, cellsColor);
            graph.line(i, -markupLenght, i, markupLenght, color);
        }
        for (let i = -1; i > WIN.bottom; i--) {
            graph.line(WIN.left, i, right, i, cellsColor);
            graph.line(-markupLenght, i, markupLenght, i, color);
        }
        const arrowOffset = arrowLenght * WIN.width / 2;
        graph.line(0, top, arrowOffset, top - arrowOffset, color, axesWidth);
        graph.line(0, top, -arrowOffset, top - arrowOffset, color, axesWidth);
        graph.line(right, 0, right - arrowOffset, arrowOffset, color, axesWidth);
        graph.line(right, 0, right - arrowOffset, -arrowOffset, color, axesWidth);
    }

    render() {
        return (<div>
            <canvas
                id="canvas"
                width="400"
                height="400">
            </canvas>
            <UI />
        </div>);
    }

    update() {
        this.graph.clear()
        this.printAxes();
        this.funcs.forEach(func => {
            if (func) {
                this.printFunction(func.f, func.color, func.width);
                this.printZeroes(func.f, func.color);
            }
        });
    }

    getZero = (f, a, b, eps = 0.0001) => {
        if (f(a) * f(b) > 0) return null;
        if (Math.abs(f(a) - f(b)) < eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps);
        if (f(half) * f(b) <= 0) return this.getZero(f, half, b, eps);
    }

    getDerivativeK = (f, x, eps = 0.0001) => (f(x + eps) - f(x)) / eps;
}

export default Graph2D;