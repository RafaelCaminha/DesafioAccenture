const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");

Given("que o visitante acessou a página inicial", () => inicio.acessar());
