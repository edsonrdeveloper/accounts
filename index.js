// módulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// módulos internos
const fs = require("fs");
const { log } = require("console");
const { type } = require("os");

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

      if (action === 'Criar Conta') {
        createAccount()
      }
    })
    .catch((err) => console.log(err));
}

operation();

// mensagem de boas-vindas, para criação de uma nova conta
function createAccount() {
  console.log(chalk.bgGreen.black('=====================================\nParabéns por escolher o nosso Banco!!\n====================================='));
  console.log(chalk.green('Informe os dados da sua conta:'));

  buildAccount()
}

// cria uma nova conta, de fato
function buildAccount() {
  inquirer.prompt([{
    name:"accountName",
    message:"Informe um nome para a conta:"
  }]).then(answer => {
    const accountName = answer.accountName

    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.red('Esta conta já existe, tente outro nome!'));
      buildAccount()
      return
    }

    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err) {
      console.log(err);
    })

    console.log(chalk.green('Conta criada com sucesso!'));
    operation()
  }).catch(err => console.log(err))
}