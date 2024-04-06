class Action {
    title = '';
    id = 0;
    cost = 0;
    constructor(title, id, cost = 0) {
        this.title = title;
        this.id = id;
        this.cost = cost;
    }
}

export default Action;