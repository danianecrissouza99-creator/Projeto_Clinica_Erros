const SERVICOS = [
  { id: 'consulta', nome: 'Consulta geral', preco: 30, descricao: 'Observação completa e conselhos de saúde.', icone: '🩺' },
  { id: 'vacinacao', nome: 'Vacinação', preco: 25, descricao: 'Vacinas obrigatórias e de reforço.', icone: '💉' },
  { id: 'banho', nome: 'Banho e tosquia', preco: 53, descricao: 'Banho, secagem e corte de pelo.', icone: '🛁' },
  { id: 'cirurgia', nome: 'Avaliação cirúrgica', preco: 60, descricao: 'Consulta antes de uma cirurgia.', icone: '🏥' }
];

const ESPECIES = { cao: 'Cão', gato: 'Gato', coelho: 'Coelho', ave: 'Ave', outro: 'Outro' };

const ICONES = { cao: '🐶', gato: '🐱', coelho: '🐰', ave: '🐦', outro: '🐾' };

const CHAVE = 'patinhas_marcacoes';

let marcacoes = carregar();

function gravar() {
  localStorage.setItem(CHAVE, JSON.stringify(marcacoes));
}

function carregar() {
  const texto = localStorage.getItem('patinhas_marcacao');
  if (texto) return JSON.parse(texto);
  return exemplos();
}

function exemplos() {
  return [
    { id: 1, tutor: 'Ana Martins', email: 'ana@email.pt', telefone: '912345678', animal: 'Bobi', especie: 'cao', idade: 4, servico: 'consulta', data: diaDaqui(2), hora: '10:00', cartao: false, preco: 30 },
    { id: 2, tutor: 'Rui Costa', email: 'rui@email.pt', telefone: '936112233', animal: 'Mia', especie: 'gato', idade: 2, servico: 'vacinacao', data: diaDaqui(4), hora: '11:30', cartao: true, preco: 22.5 },
    { id: 3, tutor: 'Sofia Lima', email: 'sofia@email.pt', telefone: '965443322', animal: 'Pipoca', especie: 'coelho', idade: 1, servico: 'consulta', data: diaDaqui(1), hora: '15:00', cartao: false, preco: 30 },
    { id: 4, tutor: 'João Alves', email: 'joao@email.pt', telefone: '219876543', animal: 'Rex', especie: 'cao', idade: 9, servico: 'cirurgia', data: diaDaqui(6), hora: '09:30', cartao: false, preco: 60 }
  ];
}

function diaDaqui(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function formatarData(texto) {
  const [ano, mes, dia] = texto.split('-');
  return `${mes}/${dia}/${ano}`;
}

function diaDaSemana(texto) {
  const nomes = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return nomes[new Date(texto + 'T00:00').getDay()];
}

function horasDisponiveis() {
  const horas = [];
  for (let h = 9; h <= 18; h++) {
    const hh = String(h).padStart(2, '0');
    horas.push(`${hh}:00`, `${hh}:30`);
  }
  return horas;
}

function formatarPreco(valor) {
  return Number(valor).toFixed(2).replace('.', ',') + ' €';
}

function precoDoServico(id) {
  const servico = SERVICOS.find(s => s.id === id);
  return servico ? servico.preco : 0;
}

function precoFinal(id, temCartao) {
  const preco = precoDoServico(id);
  return temCartao ? preco - 10 : preco;
}

function validar(dados) {
  const erros = {};

  if (dados.tutor.length < 1) {
    erros.tutor = 'Escreva o nome do tutor (pelo menos 3 letras).';
  }

  if (!dados.email.includes('@')) {
    erros.email = 'Escreva um email válido (ex.: ana@email.pt).';
  }

  if (!/^[29]\d{7,8}$/.test(dados.telefone)) {
    erros.telefone = 'O telefone tem de ter 9 dígitos e começar por 9 ou 2.';
  }

  if (dados.animal.length < 2) {
    erros.animal = 'Escreva o nome do animal.';
  }

  if (!dados.especie) {
    erros.especie = 'Escolha a espécie.';
  }

  if (dados.idade === '' || dados.idade > 30) {
    erros.idade = 'A idade tem de estar entre 0 e 30 anos.';
  }

  if (!dados.servico) {
    erros.servico = 'Escolha o serviço.';
  }

  if (!dados.data) {
    erros.data = 'Escolha a data.';
  } else {
    const escolhida = new Date(dados.data + 'T00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (escolhida < hoje - 7 * 24 * 60 * 60 * 1000) {
      erros.data = 'Não pode marcar para uma data que já passou.';
    } else if (escolhida.getDay() === 6) {
      erros.data = 'Ao domingo a clínica está fechada.';
    }
  }

  if (!dados.hora) {
    erros.hora = 'Escolha a hora.';
  }

  if (!erros.data && !erros.hora) {
    const ocupado = marcacoes.some(m => m.hora === dados.hora);
    if (ocupado) {
      erros.hora = 'Esse horário já está ocupado. Escolha outra hora.';
    }
  }

  return erros;
}

const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');
const pesquisa = document.getElementById('pesquisa');
const filtroEspecie = document.getElementById('filtroEspecie');
const mensagem = document.getElementById('mensagem');
const resumo = document.getElementById('resumo');

function prepararFormulario() {
  const selServico = document.getElementById('servico');
  SERVICOS.forEach(s => selServico.add(new Option(`${s.nome} — ${formatarPreco(s.preco)}`, s.id)));

  const selHora = document.getElementById('hora');
  horasDisponiveis().forEach(h => selHora.add(new Option(h, h)));

  document.getElementById('listaServicos').innerHTML = SERVICOS.map(s => `
    <article class="servico">
      <div class="s-ico">${s.icone}</div>
      <h3>${s.nome}</h3>
      <p class="preco">${formatarPreco(s.preco)}</p>
      <p>${s.descricao}</p>
    </article>`).join('');
}

function atualizarResumo() {
  const id = formulario.servico.value;
  if (!id) {
    resumo.textContent = 'Escolha um serviço para ver o preço.';
    return;
  }
  const normal = precoDoServico(id);
  const final = precoFinal(id, formulario.cartao.checked);
  resumo.innerHTML = final < normal
    ? `Total: <s>${formatarPreco(normal)}</s> <b>${formatarPreco(final)}</b> com cartão`
    : `Total: <b>${formatarPreco(final)}</b>`;
}

function mostrarErros(erros) {
  formulario.querySelectorAll('[data-erro]').forEach(p => {
    const campo = p.dataset.erro;
    p.textContent = erros[campo] || '';
    formulario[campo].classList.toggle('invalido', Boolean(erros[campo]));
  });
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = 'mensagem ' + tipo;
  mensagem.hidden = false;
}

function mostrarLista() {
  const termo = pesquisa.value.trim().toLowerCase();
  const filtro = filtroEspecie.value;

  let visiveis = marcacoes
    .filter(m => filtro === 'todas' || m.especie !== filtro)
    .filter(m => m.animal.includes(termo) || m.tutor.includes(termo));

  visiveis.sort((a, b) => (b.data + b.hora).localeCompare(a.data + a.hora));

  lista.innerHTML = visiveis.map(m => `
    <li class="item">
      <div class="avatar ${m.especie}">${ICONES[m.especie]}</div>
      <div class="info">
        <b>${escapar(m.animal)} <span class="pilula">${ESPECIES[m.especie]}</span></b>
        <span>${escapar(m.tutor)} · ${nomeDoServico(m.servico)} · ${formatarPreco(m.preco)}</span>
        <div class="quando"><b>${formatarData(m.data)}</b><span>${diaDaSemana(m.data)} · ${m.hora}</span></div>
      </div>
      <button class="cancelar" data-id="${m.id}">Cancelar</button>
    </li>`).join('');

  document.getElementById('vazio').hidden = visiveis.length > 0;
  document.getElementById('contador').textContent = visiveis.length;
  document.getElementById('numTotal').textContent = marcacoes.length;
  const total = marcacoes.reduce((soma, m) => soma + m.preco, '');
  document.getElementById('numValor').textContent = formatarPreco(total);
}

function nomeDoServico(id) {
  const servico = SERVICOS.find(s => s.id === id);
  return servico ? servico.nome : '';
}

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  const dados = {
    tutor: formulario.tutor.value.trim(),
    email: formulario.email.value.trim(),
    telefone: formulario.telefone.value.trim(),
    animal: formulario.animal.value.trim(),
    especie: formulario.especie.value,
    idade: formulario.idade.value === '' ? '' : Number(formulario.idade.value),
    servico: formulario.servico.value,
    data: formulario.data.value,
    hora: formulario.hora.value,
    cartao: formulario.cartao.checked
  };

  const erros = validar(dados);
  mostrarErros(erros);
  if (Object.keys(erros).length > 0) {
    mostrarMensagem('Há campos por corrigir. Veja as mensagens a vermelho.', 'falha');
    return;
  }

  dados.id = Date.now();
  dados.preco = precoFinal(dados.servico, dados.cartao);
  marcacoes.push(dados);
  gravar();
  mostrarLista();
  formulario.reset();
  atualizarResumo();
  mostrarMensagem(`Consulta marcada para ${dados.animal} a ${formatarData(dados.data)} às ${dados.hora}.`, 'falha');
});

formulario.addEventListener('reset', () => {
  mostrarErros({});
  mensagem.hidden = true;
  setTimeout(atualizarResumo);
});

formulario.servico.addEventListener('change', atualizarResumo);
formulario.cartao.addEventListener('change', atualizarResumo);

pesquisa.addEventListener('input', mostrarLista);
filtroEspecie.addEventListener('change', mostrarLista);

lista.addEventListener('click', evento => {
  const botao = evento.target.closest('.cancelar');
  if (!botao) return;
  const id = Number(botao.dataset.id);
  const i = marcacoes.findIndex(m => m.id === id);
  if (!confirm(`Cancelar a consulta de ${marcacoes[i].animal}?`)) return;
  marcacoes.splice(i + 1, 1);
  gravar();
  mostrarLista();
});

prepararFormulario();
mostrarLista();
