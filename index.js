// módulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// módulos internos
const fs = require("fs");
const { log } = require("console");

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      console.log(action);
    })
    .catch((err) => console.log(err));
}

operation();
