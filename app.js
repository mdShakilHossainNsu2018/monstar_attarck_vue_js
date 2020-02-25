new Vue(
    {
        el: '#app',
        data: {
            playerHealth: 100,
            monsterHealth: 100,
            isGameRunning: false,
            truns: [],

        },

        methods: {
            startGame: function () {
                this.isGameRunning = true;
                this.playerHealth = 100;
                this.monsterHealth =100;
                this.truns = [];
            },

            attack: function () {
                var damage = this.calculateHealth(10, 3);
                this.monsterHealth -= damage;
                this.truns.unshift({
                    isPlayer: true,
                    text: 'You hits player for '+ damage
                });
                if (this.checkWon()) {
                    return;
                }

                this.monsterAttack();

                this.checkWon();
            },

            specialAttack: function () {

                var damage = this.calculateHealth(20, 10);
                this.monsterHealth -= damage;

                this.truns.unshift({
                    isPlayer: true,
                    text: 'Player hits Heard for '+ damage
                });

                if (this.checkWon()) {
                    return;
                }

                this.monsterAttack();
            },

            monsterAttack: function() {

                var damage = this.calculateHealth(12, 5);
                this.playerHealth -= damage;

                this.truns.unshift({
                    isPlayer: false,
                    text: 'Monster hits player for '+ damage
                });
            },

            heal: function () {
                if (this.playerHealth <= 90){
                    this.playerHealth+=10;
                }else {
                    this.playerHealth = 100
                }

                this.truns.unshift({
                    isPlayer: false,
                    text: 'Monster hits player for 10'
                });

                this.monsterAttack();
            },

            giveUp: function () {
                this.isGameRunning = false;
            },

            calculateHealth: function (max, min) {
                return Math.max(Math.floor(Math.random() * max) + 1, min );
            },

            checkWon: function () {
                if (this.monsterHealth <= 0){

                    if (confirm('You won! Start game?')){
                        this.startGame();
                    }else {
                        this.isGameRunning = false;
                    }
                    return true;
                } else if (this.playerHealth <= 0){
                    if (confirm('You Loos! Start game?')){
                        this.startGame();
                    }else {
                        this.isGameRunning = false;
                    }
                    return true;
                }
            }
        }
    }
);
