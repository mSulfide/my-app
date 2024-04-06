import React from "react";
import RPGGame from "../../modules/StudentSimulator/RPGGame";

class StudentSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.game = new RPGGame();
        this.componentDidMount = () => {
            this.game.goToRoom();
        };
    }

    render() {
        return (<div>
            <h1>Студента Жизнь</h1>
            <div>
                <span id='roomTitle'></span>
            </div>
            <img id='roomImage' alt=''></img>
            <div>
                <span id='roomDescription'></span>
            </div>
            <span id='studenHealth'></span>
            <div id='actions'></div>
        </div>)
    }
}

export default StudentSimulator;