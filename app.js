new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  computer: {},
  methods: {
    healthDamage: function(max, min) {
      return Math.max(Math.floor(Math.random() * max + 1), min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You win! Wanna continue?")) {
          this.startGame();
        } else {
          this.gameIsRunning = true;
        }

        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost! Wanna continue?")) {
          this.startGame();
        } else {
          this.gameIsRunning = true;
        }
        return true;
      }
      return false;
    },
    monsterAttacks: function() {
      var damage = this.healthDamage(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for " + damage
      });
      if (this.checkWin()) {
        return;
      }
    },
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      var max = 10,
        min = 3;
      var damage = this.healthDamage(max, min);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function() {
      var max = 20,
        min = 10;
      var damage = this.healthDamage(max, min);
      this.turns.unshift({
        isPlayer: false,
        text: "Player hits monster hard for " + damage
      });
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth < 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: false,
        text: "Player heals for 10"
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.turns=[]
    }
  }
});
