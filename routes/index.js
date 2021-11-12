var express = require('express');
const { Server } = require('mongodb/lib/core');
const { response } = require('express');

var router = express.Router();

var prot = new Date();


class pessoa {
  constructor(pProtocolo, pNome, pFiliacao, pECvivil, pDataNasc, pDOC, pCPF,
    pCEP, pLogradouro, pNumero, pComplemento, pCidade, pUF,
    pTelres, pTelcom, pEmail,
  ) {
    this.pProtocolo = pProtocolo,
      this.pNome = pNome,
      this.pFiliacao = pFiliacao,
      this.pECvivil = pECvivil,
      this.pDataNasc = pDataNasc,
      this.pDOC = pDOC,
      this.pCPF = pCPF,
      this.pCEP = pCEP,
      this.pLogradouro = pLogradouro,
      this.pNumero = pNumero,
      this.pComplemento = pComplemento,
      this.pCidade = pCidade,
      this.pUF = pUF,
      this.pTelres = pTelres,
      this.pTelcom = pTelcom,
      this.pEmail = pEmail
  };
}

class requerimento extends pessoa {
  constructor(pDAC, pCDP, pDPP, pOUT, pConcurso, pAnoReal, pCargo, pNumInscr, pFundamentacao) {
    super()
    this.pDAC = pDAC,
      this.pCDP = pCDP,
      this.pDPP = pDPP,
      this.pOUT = pOUT,
      this.pConcurso = pConcurso,
      this.pAnoReal = pAnoReal,
      this.pCargo = pCargo,
      this.pNumInscr = pNumInscr,
      this.pFundamentacao = pFundamentacao
  }

}
var estadosCivis = [" Solteiro ", " Casado ", " Separado ", " Divorciado ", " Viúvo "];
var estadosBR = [
  { siglaUF: "AC", nomeUF: "Acre" }, { siglaUF: "AL", nomeUF: "Alagoas" }, { siglaUF: "AM", nomeUF: "Amazonas" }, { siglaUF: "AP", nomeUF: "Amapá" },
  { siglaUF: "BA", nomeUF: "Bahia" }, { siglaUF: "CE", nomeUF: "Ceará" }, { siglaUF: "DF", nomeUF: "Distrito Federal" }, { siglaUF: "ES", nomeUF: "Espírito Santo" },
  { siglaUF: "GO", nomeUF: "Goiás" }, { siglaUF: "MA", nomeUF: "Maranhão" }, { siglaUF: "MG", nomeUF: "Minas Gerais" }, { siglaUF: "MS", nomeUF: "Mato Grosso do Sul" },
  { siglaUF: "MT", nomeUF: "Mato Grosso" }, { siglaUF: "PA", nomeUF: "Pará" }, { siglaUF: "PB", nomeUF: "Paraíba" }, { siglaUF: "PE", nomeUF: "Pernambuco" },
  { siglaUF: "PI", nomeUF: "Piauí" }, { siglaUF: "PR", nomeUF: "Paraná" }, { siglaUF: "RJ", nomeUF: "Rio de Janeiro" }, { siglaUF: "RN", nomeUF: "Rio Grande do Norte" },
  { siglaUF: "RO", nomeUF: "Rondônia" }, { siglaUF: "RR", nomeUF: "Roraima" }, { siglaUF: "RS", nomeUF: "Rio Grande do Sul" }, { siglaUF: "SC", nomeUF: "Santa Catarina" },
  { siglaUF: "SE", nomeUF: "Sergipe" }, { siglaUF: "SP", nomeUF: "São Paulo" }, { siglaUF: "TO", nomeUF: "Tocantins" }]

for (var prop in estadosBR) {
  console.log(estadosBR[prop].siglaUF);
}

estadosCivis.forEach(item => {console.log(item)});
console.log(typeof(estadosCivis));

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: { "data01": "" }, ddUF: estadosBR, ddECivil: estadosCivis, action: '/new' });
});

router.post('/new', async (req, res, next) => {

  let nReq = new requerimento;

  nReq.pProtocolo = geraProtocolo();
  nReq.pNome = req.body.dataNome;
  nReq.pFiliacao = req.body.dataFiliacao;
  nReq.pECvivil = req.body.dataECivil;
  nReq.pDataNasc = req.body.dataDN;
  nReq.pDOC = req.body.dataDI;
  nReq.pCPF = req.body.dataCPF;
  nReq.pCEP = req.body.dataCEP;
  nReq.pLogradouro = req.body.dataLogradouro;
  nReq.pNumero = req.body.dataNumLog;
  nReq.pComplemento = req.body.dataComplemento;
  nReq.pCidade = req.body.dataCidade;
  nReq.pUF = req.body.dataUF;
  nReq.pTelres = req.body.dataTelres;
  nReq.pTelcom = req.body.dataTelcom;
  nReq.pEmail = req.body.dataEmail;
  req.body.dataDAC != null ? nReq.pDAC = true : nReq.pDAC = false;
  req.body.dataCDP != null ? nReq.pCDP = true : nReq.pCDP = false;
  req.body.dataDPP != null ? nReq.pDPP = true : nReq.pDPP = false;
  req.body.dataOUT != null ? nReq.pOUT = true : nReq.pOUT = false;
  nReq.pConcurso = req.body.dataConcurso;
  nReq.pAnoReal = req.body.dataAnoReal;
  nReq.pCargo = req.body.dataCargo;
  nReq.pNumInscr = req.body.dataInscricao;
  nReq.pFundamentacao = req.body.dataFundamentacao;

  try {
    const result = await global.db.insert(nReq);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const doc = await global.db.findOne(id);
    console.log(doc);
    res.render('new', { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  //resolver
  const id = req.params.id;

  try {
    const result = await global.db.update(id, { nome, idade });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/hotsite', (req, res, next) => {
  res.render('hotsite', { title: 'Concurso Itaguaí', action: '/hotsite' });
});

router.get('/:pagina?', async (req, res, next) => {
  const pagina = parseInt(req.params.pagina || "1");

  try {
    const docs = await global.db.findAll(pagina);
    const count = await global.db.countAll();
    const qtdPaginas = Math.ceil(count / global.db.TAMANHO_PAGINA);
    res.render('index', { title: 'Controle de Protocolo', docs, count, qtdPaginas, pagina });
  } catch (err) {
    next(err);
  }
})


function geraProtocolo() {

  prot = new Date();

  prot = prot.getFullYear() + "" + (prot.getMonth() + 1).toString().padStart(2, '0') + prot.getDate().toString().padStart(2, '0') + prot.getHours().toString().padStart(2, '0') + prot.getMinutes().toString().padStart(2, '0') + prot.getSeconds().toString().padStart(2, '0') + "CPRJ";
  return prot;
}

module.exports = router;
