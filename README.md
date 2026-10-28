# Clínica Veterinária Patinhas 🐾

Site de marcação de consultas para uma clínica veterinária (fictícia): formulário de marcação, lista de marcações com filtro e pesquisa, serviços e contactos.

**▶ Abrir o site:** https://danianecrissouza99-creator.github.io/Projeto_Clinica/

---

## Sobre o projeto

Projeto da UC **Testes e Qualidade de Software**, ISTEC.

O site foi feito para ser **testado e corrigido por um colega**. O trabalho tem duas partes:

1. **Testar:** comparar o que o site **faz** com o que **devia fazer**, segundo os requisitos abaixo, e registar cada defeito no relatório.
2. **Corrigir:** encontrar no código a causa de cada defeito e corrigi-la. Todos os defeitos se corrigem mudando **uma ou duas linhas**.

---

## Como abrir no computador

1. Descarregue o repositório (botão verde **Code → Download ZIP**) e extraia a pasta.
2. Abra o ficheiro `index.html` no browser (duplo clique). Não é preciso instalar nada.
3. Para corrigir, abra a pasta no **VS Code**, altere o código, grave e recarregue a página (F5).

> As marcações ficam gravadas no browser. Para recomeçar do zero: F12 → Application → Local Storage → apagar.

---

## Estrutura do código

| Ficheiro | O que tem |
|---|---|
| `index.html` | A estrutura da página: menu, formulário, lista de marcações, serviços e contactos |
| `style.css` | O aspeto: cores, tamanhos e a versão para telemóvel (`@media`) |
| `script.js` | O funcionamento: dados dos serviços, validação do formulário, datas e horas, preços, lista, filtro, pesquisa, cancelar e gravação |

Funções principais do `script.js`: `validar()`, `precoFinal()`, `horasDisponiveis()`, `formatarData()`, `mostrarLista()`, `gravar()` e `carregar()`.

---

## Requisitos

Isto é o que o site **deve** fazer. No arranque, a lista já tem 4 marcações de exemplo (Bobi, Mia, Pipoca e Rex) para facilitar os testes.

### Dados do tutor

| ID | Regra |
|---|---|
| RF-01 | O nome do tutor é obrigatório e tem de ter pelo menos 3 letras. |
| RF-02 | O email tem de ser válido: nome@domínio.extensão (ex.: ana@email.pt). |
| RF-03 | O telefone tem 9 dígitos e começa por 9 ou 2. |
| RF-04 | Clicar no nome de um campo (ex.: "Telefone") põe o cursor nesse campo. |

### Animal

| ID | Regra |
|---|---|
| RF-05 | O nome do animal e a espécie são obrigatórios. |
| RF-06 | A idade tem de estar entre 0 e 30 anos. |

### Data e hora

| ID | Regra |
|---|---|
| RF-07 | Não se pode marcar para uma data que já passou. |
| RF-08 | A clínica abre de segunda a sábado. Ao domingo está fechada e não se pode marcar. |
| RF-09 | As horas vão de meia em meia hora, das 09:00 às 17:30 (a última consulta é às 17:30). |
| RF-10 | Não pode haver duas marcações no mesmo dia à mesma hora. A mesma hora noutro dia é permitida. |

### Preços

| ID | Regra |
|---|---|
| RF-11 | Preços: Consulta geral 30 €, Vacinação 25 €, Banho e tosquia 35 €, Avaliação cirúrgica 60 €. |
| RF-12 | Com cartão de cliente há 10% de desconto (ex.: vacinação com cartão = 22,50 €). |
| RF-13 | O "valor previsto" no topo é a soma dos preços de todas as marcações. |

### Formulário

| ID | Regra |
|---|---|
| RF-14 | Depois de marcar aparece uma mensagem de sucesso a verde e o formulário fica limpo. |
| RF-15 | O botão "Limpar" apaga tudo o que foi escrito no formulário. |

### Lista de marcações

| ID | Regra |
|---|---|
| RF-16 | As datas aparecem no formato dd/mm/aaaa (dia/mês/ano). |
| RF-17 | A lista está ordenada pela data e hora: a marcação mais próxima aparece primeiro. |
| RF-18 | O filtro de espécie mostra só as marcações dessa espécie. |
| RF-19 | A pesquisa encontra pelo nome do animal ou do tutor, escrito com maiúsculas ou minúsculas. |
| RF-20 | "Cancelar" pede confirmação e remove essa marcação (e só essa). |
| RF-21 | As marcações ficam gravadas no browser: ao recarregar a página (F5) continuam lá. |

### Geral

| ID | Regra |
|---|---|
| RF-22 | Cada link do menu leva à secção com o mesmo nome. |
| RNF-01 | No telemóvel (a partir de 360 px) a página cabe no ecrã, sem sair para o lado. |
| RNF-02 | Todos os textos estão em português correto. |

---

## Como registar um defeito

| Campo | O que escrever |
|---|---|
| **ID** | D-01, D-02… |
| **Título** | Frase curta com o problema |
| **Requisito** | O RF/RNF que não é cumprido |
| **Passos para reproduzir** | 1. Abrir… 2. Preencher… 3. Carregar em… |
| **Resultado esperado** | O que o requisito diz |
| **Resultado obtido** | O que aconteceu |
| **Tipo** | Validação, Datas, Cálculo, Interface, Usabilidade, Navegação, Dados/gravação, Responsividade, Texto |
| **Severidade** | Alta, Média ou Baixa |
| **Evidência** | Captura de ecrã |
| **Correção** | Ficheiro, linha e o que foi alterado |

---

## Tecnologias

HTML, CSS e JavaScript, sem bibliotecas. Os dados ficam no `localStorage` do browser.

---

Daniane Christyni Souza da Silva · Desenvolvimento de Software, 2.º ano · ISTEC
