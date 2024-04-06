import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.setPageName = props.setPageName;
    }

    render() {
        return (<>
            <button onClick={() => this.setPageName('graph3D')}>3D</button>
            <button onClick={() => this.setPageName('graph2D')}>2D</button>
            <button onClick={() => this.setPageName('esse')}>Esse</button>
            <button onClick={() => this.setPageName('studentSimulator')}>Stud</button>
        </>);
    }
}

export default Header;