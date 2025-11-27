import fs from "fs";

               
const dados = fs.readFileSync("dados.json", "utf8");
const repasses = JSON.parse(dados);

console.log("Total de repasses: " , repasses.length,"\n");


const sucesso = repasses.filter(at => at.status === "sucesso");
const falha = repasses.filter(at => at.status === "falha");


const total_Sucesso = sucesso.length;

const SucessoOrgao = sucesso.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + 1;
  return tot;
}, {});


const valorTotalSucesso = sucesso.reduce((totl, at) => totl + at.valor, 0);

const valorSucessoPorOrgao = sucesso.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + at.valor;
  return tot;
}, {});


const total_Falha = falha.length;


const falha_Orgao = falha.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + 1;
  return tot;
}, {});

const falhapormotivo = falha.reduce((tot, at) => {
  tot[at.motivo] = (tot[at.motivo] || 0) + 1;
  return tot;
}, {});


const Falha_valor_total = falha.reduce((totl, at) => totl + at.valor, 0);


const valor_Falha_Orgao = falha.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + at.valor;
  return tot;
}, {});


const valor_Falha_Motivo = falha.reduce((tot, at) => {
  tot[at.motivo] = (tot[at.motivo] || 0) + at.valor;
  return tot;
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


const MaiorRepass = repasses.reduce((max, at) => at.valor > max.valor ? at : max, repasses[0]);

const MenorRepass = repasses.reduce((min, at) => at.valor < min.valor ? at : min, repasses[0]);


const repasses_Dia = repasses.reduce((totl, at) => {
  totl[at.data] = (totl[at.data] || 0) + 1;
  return totl;
}, {});
const diamaisrepasses = Object.entries(repasses_Dia).reduce((a, b) => b[1] > a[1] ? b : a);


const repassesPorOrgao = repasses.reduce((totl, at) => {
  totl[at.orgao] = (totl[at.orgao] || 0) + 1;
  return totl;
}, {});
const orgaoMaisRepasses = Object.entries(repassesPorOrgao).reduce((a, b) => b[1] > a[1] ? b : a);


const sucesso2 = repasses.filter(at => at.status === "sucesso");
const sucessoPorOrgao2 = sucesso.reduce((totl, at) => {
  totl[at.orgao] = (totl[at.orgao] || 0) + 1;
  return totl;
}, {});
const orgaomaissucesso = Object.entries(SucessoOrgao).reduce((a, b) => b[1] > a[1] ? b : a);


const falha2 = repasses.filter(r => r.status === "falha");
const falha_Orgao2 = falha.reduce((totl, at) => {
  totl[at.orgao] = (totl[at.orgao] || 0) + 1;
  return totl;
}, {});
const orgaomaisfalha = Object.entries(falha_Orgao).reduce((a, b) => b[1] > a[1] ? b : a);


const falhapormotivo2 = falha.reduce((totl, at) => {
  totl[at.motivo] = (totl[at.motivo] || 0) + 1;
  return totl;
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
console.log(`${orgaomaissucesso[0]} com ${orgaomaissucesso[1]} repasses`);

console.log("\nÓrgão com mais repasses falhos:");
console.log(`${orgaomaisfalha[0]} com ${orgaomaisfalha[1]} repasses`);

console.log("\nMotivo de falha com mais repasses:");
console.log(`${motivomaisfalha[0]} com ${motivomaisfalha[1]} repasses\n`);


const Orgao_escolhido = "Detran";

const resultados = repasses.filter(at => at.orgao === Orgao_escolhido && at.status === "sucesso");

console.log(`##### Repasses sucedidos do orgão: ${Orgao_escolhido} #####`);
console.log(`Repasses Totais: ${resultados.length}\n`);

resultados.forEach((at, elem) => {
  console.log(`Repasso #${elem + 1}:`);
  console.log(`  Órgão: ${at.orgao}`);
  console.log(`  Data: ${at.data}`);
  console.log(`  Valor: R$ ${at.valor}`);
  console.log(`  Status: ${at.status}`);
  console.log("##############################");
});

const repassesFalhos = repasses.filter(r => r.status === "falha");


console.log("##### Repasses que falharam #####");
console.log(`Total de repasses com falha: ${repassesFalhos.length}\n`);

repassesFalhos.forEach((at, elem) => {
  console.log(`Repasso #${elem + 1}:`);
  console.log(`  Órgão: ${at.orgao}`);
  console.log(`  Data: ${at.data}`);
  console.log(`  Valor: R$ ${at.valor}`);
  console.log(`  Status: ${at.status}`);
  if (at.motivo) {
    console.log(`  Motivo da falha: ${at.motivo}`);
  }
  console.log("##############################");
});

const orgaototal = repasses.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + at.valor;
  return tot;
}, {});

const orgaoinvalidos = falha.reduce((tot, at) => {
  tot[at.orgao] = (tot[at.orgao] || 0) + at.valor;
  return tot;
}, {});

const total_f = {};

Object.keys(orgaototal).forEach(orgao => {
  const total = orgaototal[orgao] || 0;
  const invalido = orgaoinvalidos[orgao] || 0;
  total_f[orgao] = total - invalido;
});

console.log("\n##### Valor reduzido dos orgãos #####");
console.log(total_f);

