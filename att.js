import fs from "fs";

               
const dados = fs.readFileSync("dados.json", "utf8");
const repasses = JSON.parse(dados);

console.log("Total de repasses: " , repasses.length,"\n");


const sucesso = repasses.filter(r => r.status === "sucesso");
const falha = repasses.filter(r => r.status === "falha");


const total_Sucesso = sucesso.length;

const SucessoOrgao = sucesso.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + 1;
  return acc;
}, {});


const valorTotalSucesso = sucesso.reduce((sum, r) => sum + r.valor, 0);

const valorSucessoPorOrgao = sucesso.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + r.valor;
  return acc;
}, {});


const total_Falha = falha.length;


const falha_Orgao = falha.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + 1;
  return acc;
}, {});

const falhapormotivo = falha.reduce((acc, r) => {
  acc[r.motivo] = (acc[r.motivo] || 0) + 1;
  return acc;
}, {});


const Falha_valor_total = falha.reduce((sum, r) => sum + r.valor, 0);


const valor_Falha_Orgao = falha.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + r.valor;
  return acc;
}, {});


const valor_Falha_Motivo = falha.reduce((acc, r) => {
  acc[r.motivo] = (acc[r.motivo] || 0) + r.valor;
  return acc;
}, {});



console.log("##### Repasses Sucedidos #####");
console.log("Total:", total_Sucesso);
console.log("Por órgão:", SucessoOrgao);
console.log("Valor total:", valorTotalSucesso, "$");
console.log("Valor total por órgão:", valorSucessoPorOrgao);

console.log("\n##### Repasses Falhos #####");
console.log("Total:", total_Falha);
console.log("Por órgão:", falha_Orgao);
console.log("Por motivo:", falhapormotivo);
console.log("Valor total:", Falha_valor_total, "$");
console.log("Valor total por órgão:", valor_Falha_Orgao);
console.log("Valor total por motivo:", valor_Falha_Motivo);


const MaiorRepass = repasses.reduce((max, r) => r.valor > max.valor ? r : max, repasses[0]);

const MenorRepass = repasses.reduce((min, r) => r.valor < min.valor ? r : min, repasses[0]);


const repasses_Dia = repasses.reduce((acc, r) => {
  acc[r.data] = (acc[r.data] || 0) + 1;
  return acc;
}, {});
const diamaisrepasses = Object.entries(repasses_Dia).reduce((a, b) => b[1] > a[1] ? b : a);


const repassesPorOrgao = repasses.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + 1;
  return acc;
}, {});
const orgaoMaisRepasses = Object.entries(repassesPorOrgao).reduce((a, b) => b[1] > a[1] ? b : a);


const sucesso2 = repasses.filter(r => r.status === "sucesso");
const sucessoPorOrgao2 = sucesso.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + 1;
  return acc;
}, {});
const orgaoMaisSucesso = Object.entries(SucessoOrgao).reduce((a, b) => b[1] > a[1] ? b : a);


const falha2 = repasses.filter(r => r.status === "falha");
const falha_Orgao2 = falha.reduce((acc, r) => {
  acc[r.orgao] = (acc[r.orgao] || 0) + 1;
  return acc;
}, {});
const orgaoMaisFalha = Object.entries(falha_Orgao).reduce((a, b) => b[1] > a[1] ? b : a);


const falhapormotivo2 = falha.reduce((acc, r) => {
  acc[r.motivo] = (acc[r.motivo] || 0) + 1;
  return acc;
}, {});
const motivomaisfalha = Object.entries(falhapormotivo).reduce((a, b) => b[1] > a[1] ? b : a);


console.log("##### REPASSES #####\n");

console.log("Repasse com maior valor:");
console.log(MaiorRepass);

console.log("\nRepasse com menor valor:");
console.log(MenorRepass);

console.log("\nDia com mais repasses:");
console.log(`${diamaisrepasses[0]} com ${diamaisrepasses[1]} repasses`);

console.log("\nÓrgão com mais repasses:");
console.log(`${orgaoMaisRepasses[0]} com ${orgaoMaisRepasses[1]} repasses`);

console.log("\nÓrgão com mais repasses sucedidos:");
console.log(`${orgaoMaisSucesso[0]} com ${orgaoMaisSucesso[1]} repasses`);

console.log("\nÓrgão com mais repasses falhos:");
console.log(`${orgaoMaisFalha[0]} com ${orgaoMaisFalha[1]} repasses`);

console.log("\nMotivo de falha com mais repasses:");
console.log(`${motivomaisfalha[0]} com ${motivomaisfalha[1]} repasses\n`);


const Orgao_escolhido = "Detran";

const resultados = repasses.filter(r => r.orgao === Orgao_escolhido && r.status === "sucesso");

console.log(`##### Repasses sucedidos do orgão: ${Orgao_escolhido} #####`);
console.log(`Repasses Totais: ${resultados.length}\n`);

resultados.forEach((r, index) => {
  console.log(`Repasso #${index + 1}:`);
  console.log(`  Órgão: ${r.orgao}`);
  console.log(`  Data: ${r.data}`);
  console.log(`  Valor: R$ ${r.valor}`);
  console.log(`  Status: ${r.status}`);
  console.log("##############################");
});

const repassesFalhos = repasses.filter(r => r.status === "falha");


console.log("##### Repasses que falharam #####");
console.log(`Total de repasses com falha: ${repassesFalhos.length}\n`);

repassesFalhos.forEach((r, index) => {
  console.log(`Repasso #${index + 1}:`);
  console.log(`  Órgão: ${r.orgao}`);
  console.log(`  Data: ${r.data}`);
  console.log(`  Valor: R$ ${r.valor}`);
  console.log(`  Status: ${r.status}`);
  if (r.motivo) {
    console.log(`  Motivo da falha: ${r.motivo}`);
  }
  console.log("##############################");
});