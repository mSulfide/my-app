import Action from "./Data/Action";
import Location from "./Data/Location";

class RPGGame {
    constructor() {
        this.roomId = 'start';
        this.rooms = {
            start: new Location('Комната общаги', 'Позитивное описание', '', [
                new Action('Коридор', 'hall', 3),
                new Action('Окно', 'window', 1)
            ]),
            window: new Location('Окно', 'Это печально', '', []),
            hall: new Location('Коридор', 'Перепутье жизненного пути', '', [
                new Action('Комната в общаге', 'start'),
                new Action('Вахта', 'watch', 5),
                new Action('Кухня', 'kitchen', -25),
                new Action('Туалет', 'wc', -5)
            ]),
            watch: new Location('Вахта', 'Место где на тебя хоть кто-то смотрит', '', [
                new Action('Коридор', 'hall', 15),
                new Action('Университет', 'univer', 20),
                new Action('КБ', 'kb', -50)
            ]),
            kitchen: new Location('Кухня', 'Вы подкрепились белком, более не живущим на кухне', '', [
                new Action('Коридор', 'hall')
            ]),
            wc: new Location('Туалет', 'Зайти легко, а выход не всегда прост', '', [
                new Action('Коридор', 'hall', 30)
            ]),
            univer: new Location('Университет', '', '', [
                new Action('Общага', 'watch', 30),
                new Action('КБ', 'kb', -5),
                new Action('Лекция', 'lection', 90),
                new Action('Практика', 'praktika', 120)
            ]),
            kb: new Location('КБ', '', '', [
                new Action('Общага', 'watch', 5),
                new Action('Университет', 'univer', 20)
            ]),
            lection: new Location('Лекция', 'Вы преобрели немного знаний, но устали', '', [
                new Action('Холл', 'univer')
            ]),
            praktika: new Location('Практика', 'Вы не готовы к практике. На вас накричали и вы ушли грустным', '', [
                new Action('Холл', 'univer')
            ])
        };
        this.student = {
            health: 100,
            money: 0
        };
    }

    isGameOver() {
        return this.student.health <= 0 || this.rooms[this.roomId].actions.length === 0;
    }

    restart() {
        const button = document.createElement('button');
        const game = this;
        button.innerHTML = 'Сыграем ещё раз?';
        button.addEventListener('click', function () {
            game.roomId = 'start';
            game.student.health = 100;
            game.goToRoom();
        });
        document.getElementById('actions').appendChild(button);
    }

    goToRoom() {
        const room = this.rooms[this.roomId];
        document.getElementById("roomTitle").innerHTML = room.title;
        document.getElementById("roomImage").src = room.img;
        document.getElementById("roomDescription").innerHTML = room.description;
        document.getElementById('studenHealth').innerHTML = this.student.health;
        document.getElementById('actions').innerHTML = '';
        if (this.isGameOver()) {
            this.restart();
            return;
        }
        const game = this;
        for (let i = 0; i < room.actions.length; i++) {
            (function (i) {
                const action = room.actions[i]
                const button = document.createElement('button');
                button.innerHTML = action.title;
                button.addEventListener('click', function () {
                    game.roomId = action.id;
                    game.student.health -= action.cost;
                    game.goToRoom();
                });
                document.getElementById('actions').appendChild(button);

            })(i)
        }
    }
}

export default RPGGame;