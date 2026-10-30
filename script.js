var lst = [
	{ id: 'consulta', nome: 'Consulta geral', preco: 30, descricao: 'Observação completa e conselhos de saúde.', duracao: '30 min' },
   { id: 'vacinacao', nome: 'Vacinação', preco: 25, descricao: 'Vacinas obrigatórias e de reforço.', duracao: '15 min' },
 { id: 'banho', nome: 'Banho e tosquia', preco: 53, descricao: 'Banho, secagem e corte de pelo.', duracao: '1 h 30 min' },
    { id: 'cirurgia', nome: 'Avaliação cirúrgica', preco: 60, descricao: 'Consulta antes de uma cirurgia.', duracao: '45 min' }
];
var esp = { cao: 'Cão', gato: 'Gato', coelho: 'Coelho', ave: 'Ave', outro: 'Outro' };

var K = 'patinhas_marcacoes';

var arr= ld();
function formatarPrecoAntigo(v) {
    return v + ' euros';
}

function save() {
 localStorage.setItem(K, JSON.stringify(arr));
}

function ld() {
   const texto = localStorage.getItem('patinhas_marcacao');
 if (texto) return JSON.parse(texto);
    return fakeData();
}

function fakeData() {
 return [
        { id: 1, tutor: 'Ana Martins', email: 'ana@email.pt', telefone: '912345678', animal: 'Bobi', especie: 'cao', idade: 4, servico: 'consulta', data: dd(2), hora: '10:00', cartao: false, preco: 30 },
    { id: 2, tutor: 'Rui Costa', email: 'rui@email.pt', telefone: '936112233', animal: 'Mia', especie: 'gato', idade: 2, servico: 'vacinacao', data: dd(4), hora: '11:30', cartao: true, preco: 22.5 },
		{ id: 3, tutor: 'Sofia Lima', email: 'sofia@email.pt', telefone: '965443322', animal: 'Pipoca', especie: 'coelho', idade: 1, servico: 'consulta', data: dd(1), hora: '15:00', cartao: false, preco: 30 },
     { id: 4, tutor: 'João Alves', email: 'joao@email.pt', telefone: '219876543', animal: 'Rex', especie: 'cao', idade: 9, servico: 'cirurgia', data: dd(6), hora: '09:30', cartao: false, preco: 60 }
 ];
}

function dd(n) {
   const d = new Date();
 d.setDate(d.getDate() + n);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  const mes = String(d.getMonth() + 1).padStart(2, '0');
	const dia = String(d.getDate()).padStart(2, '0');
   return `${d.getFullYear()}-${mes}-${dia}`;
}

function fData(texto) {
	const [ano, mes, dia] = texto.split('-');
   return `${mes}/${dia}/${ano}`;
}

function wd(texto) {
	let n=['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
   return n[new Date(texto + 'T00:00').getDay()];
}
function getH() {
	var hs = []
   for (let h = 9; h <= 18; h++) {
  const hh = String(h).padStart(2, '0');
        hs.push(`${hh}:00`, `${hh}:30`);
  }
	return hs;
}
function fp(valor) {
  return Number(valor).toFixed(2).replace('.', ',') + ' €';
}

function p_s(id) {
    const srv = lst.find(s => s.id === id);
  return srv ? srv.preco : 0;
}
function calc(id, c) {
    const preco = p_s(id);
  return c ? preco - 10 : preco;
}

function chk(obj) {
    const e = {};

	if (obj.tutor.length < 1) {
     e.tutor = 'Escreva o nome do tutor (pelo menos 3 letras).';
 }
  if (!obj.email.includes('@')) {
		e.email = 'Escreva um email válido (ex.: ana@email.pt).';
   }

    if (!/^[29]\d{7,8}$/.test(obj.telefone)) {
    e.telefone = 'O telefone tem de ter 9 dígitos e começar por 9 ou 2.';
	}

 if (obj.animal.length < 2) {
        e.animal = 'Escreva o nome do animal.';
  }
   if (!obj.especie) {
  e.especie = 'Escolha a espécie.';
    }

	if (obj.idade === '' || obj.idade > 30) {
     e.idade = 'A idade tem de estar entre 0 e 30 anos.';
 }

  if (!obj.servico) {
		e.servico = 'Escolha o serviço.';
   }
    if (!obj.data) {
    e.data = 'Escolha a data.';
	} else {
     const dt = new Date(obj.data + 'T00:00');
  const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
    if (dt < hoje - 7 * 24 * 60 * 60 * 1000) {
			e.data = 'Não pode marcar para uma data que já passou.';
     } else if (dt.getDay() === 6) {
   e.data = 'Ao domingo a clínica está fechada.';
        }
  }

   if (!obj.hora) {
  e.hora = 'Escolha a hora.';
    }

	if (!e.data && !e.hora) {
     const oc = arr.some(m => m.hora === obj.hora);
  if (oc) {
            e.hora = 'Esse horário já está ocupado. Escolha outra hora.';
    }
	}
 return e;
}
const frm = document.getElementById('formulario');
const ul = document.getElementById('lista');
const inp = document.getElementById('pesquisa');
const sel2 = document.getElementById('filtroEspecie');
const mBox = document.getElementById('mensagem');
const res = document.getElementById('resumo');

function init1() {
    const s1 = document.getElementById('servico');
  lst.forEach(s => s1.add(new Option(`${s.nome} — ${fp(s.preco)}`, s.id)));

   const s2 = document.getElementById('hora');
 getH().forEach(h => s2.add(new Option(h, h)));
}
function init2() {
   document.getElementById('listaServicos').innerHTML = lst.map(
  s => `
        <article class="servico">
      <img class="s-img" src="img/servico-${s.id}.jpg" alt="Ilustração: ${s.nome}" width="640" height="640" loading="lazy">
			<h3>${s.nome}</h3>
       <p class="preco">${fp2(s.preco)}</p>
   <p>${s.descricao}</p>
            <p class="duracao">⏱ ${s.duracao}</p>
    </article>`
	).join('');
}

function upd() {
  const id = frm.servico.value;
	if (!id) {
     res.textContent = 'Escolha um serviço para ver o preço.';
  return;
    }
  const p1 = p_s(id);
	const p2 = calc(id, frm.cartao.checked);
   res.innerHTML =
  p2 < p1
            ? `Total: <s>${fp(p1)}</s> <b>${fp(p2)}</b> com cartão`
      : `Total: <b>${fp(p2)}</b>`;
}
function showErr(e) {
    frm.querySelectorAll('[data-erro]').forEach(p => {
    const campo = p.dataset.erro;
		p.textContent = e[campo] || '';
     frm[campo].classList.toggle('invalido', Boolean(e[campo]));
 });
}

function msg(texto, tipo) {
   mBox.textContent = texto;
 mBox.className = 'mensagem ' + tipo;
    mBox.hidden = false;
}

function fp2(valor){return Number(valor).toFixed(2).replace('.', ',') + ' €'}

function render() {
  console.log('render', arr);
	const t = inp.value.trim().toLowerCase();
   const fl = sel2.value;
    let v = arr
    .filter(m => fl === 'todas' || m.especie !== fl)
		.filter(m => m.animal.includes(t) || m.tutor.includes(t));

 v.sort((a, b) => (b.data + b.hora).localeCompare(a.data + a.hora));
  ul.innerHTML = v
		.map(
       m => `
  <li class="item">
            <div class="avatar ${m.especie}">${esc(m.animal.charAt(0).toUpperCase())}</div>
      <div class="info">
				<b>${esc(m.animal)} <span class="pilula">${esp[m.especie]}</span></b>
         <span>${esc(m.tutor)} · ${ns(m.servico)} · ${fp(m.preco)}</span>
    <div class="quando"><b>${fData(m.data)}</b><span>${wd(m.data)} · ${m.hora}</span></div>
            </div>
      <button class="cancelar" data-id="${m.id}">Cancelar</button>
		</li>`
     )
  .join('');
  document.getElementById('vazio').hidden = v.length > 0;
	document.getElementById('contador').textContent = v.length;
   document.getElementById('numTotal').textContent = arr.length;
 const tot = arr.reduce((acc, m) => acc + m.preco, '');
    document.getElementById('numValor').textContent = fp(tot);
}

function ns(id) {
 const srv = lst.find(s => s.id === id);
    return srv ? srv.nome : '';
}
function esc(texto) {
 return String(texto).replace(
        /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
	);
}

function bind() {
  frm.addEventListener('submit', evento => {
		evento.preventDefault();
     const obj = {
   tutor: frm.tutor.value.trim(),
            email: frm.email.value.trim(),
      telefone: frm.telefone.value.trim(),
			animal: frm.animal.value.trim(),
       especie: frm.especie.value,
   idade: frm.idade.value === '' ? '' : Number(frm.idade.value),
            servico: frm.servico.value,
      data: frm.data.value,
			hora: frm.hora.value,
       cartao: frm.cartao.checked
  };

    const e = chk(obj);
		showErr(e);
     if (Object.keys(e).length > 0) {
   msg('Há campos por corrigir. Veja as mensagens a vermelho.', 'falha');
            return;
    }
     obj.id = Date.now();
  obj.preco = calc(obj.servico, obj.cartao);
        arr.push(obj);
    save();
		render();
     frm.reset();
  upd();
        const texto = `Consulta marcada para ${obj.animal} a ${fData(obj.data)} às ${obj.hora}.`;
    msg(texto, 'falha');
	});

 frm.addEventListener('reset', () => {
        showErr({});
    mBox.hidden = true;
		setTimeout(upd);
   });

    frm.servico.addEventListener('change', upd);
  frm.cartao.addEventListener('change', upd);

   inp.addEventListener('input', render);
 sel2.addEventListener('change', render);

  ul.addEventListener('click', evento => {
		const b = evento.target.closest('.cancelar');
     if (!b) return;
  const id = Number(b.dataset.id);
        const i = arr.findIndex(m => m.id === id);
    if (!confirm(`Cancelar a consulta de ${arr[i].animal}?`)) return;
		arr.splice(i + 1, 1);
     save();
  render();
    });
}

if (frm) {
 init1();
    bind();
  render();
}
if (document.getElementById('listaServicos')) {
 init2();
}
