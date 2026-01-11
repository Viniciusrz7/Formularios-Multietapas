# 📋 Projeto Formulário Multi-etapas Inteligente

## O Problema que Resolvi

Sabe quando você abre um site e tem aquele formulário gigante com 500 campos? Você se assusta e pensa: _"Não vou preencher isso tudo agora"_. Eu também odeio isso! 😅

Por isso criei este projeto: um **formulário dividido em 3 etapas pequenas**, onde você preenche aos poucos sem se sentir sobrecarregado.

### As 3 Etapas

1. 🙋 **Etapa 1 - Dados Pessoais**: Nome, email e telefone 
2. 💼 **Etapa 2 - Informações Profissionais**: Empresa, cargo e nível de experiência
3. 💳 **Etapa 3 - Pagamento**: Dados do cartão para finalizar

**A mágica**: Você só vê uma etapa por vez. Preenche, clica em "Next" e vai pra próxima. Simples assim!

## Tecnologias que Usei (E Por Quê)

Para fazer isso funcionar, escolhi as melhores ferramentas modernas do mercado:

### O Trio Principal 🎯

- **React 19.2.0** → A biblioteca JavaScript mais usada do mundo para criar interfaces. É tipo LEGO: você monta peças (componentes) e constrói a tela.
- **TypeScript 5.9.3** → É o JavaScript com "superpoderes". Ele avisa quando você erra _antes_ de rodar o código. Evita bugs bobos.
- **Vite 7.2.4** → O motor que faz tudo rodar super rápido. Quando você salva o código, a tela atualiza _instantaneamente_. É viciante!

### Para o Formulário Funcionar ⚙️

- **React Hook Form 7.71.0** → Gerencia todos os campos sem complicação. Ele "vigia" o que você digita e guarda os dados.
- **Zod 4.3.5** → O validador rigoroso! Ele checa se o email é válido, se o telefone tem 10 dígitos, se o cartão tem 16 números... É o segurança do formulário! 🛡️

### Para Deixar Bonito ✨

- **Tailwind CSS 3.4.19** → Ao invés de escrever CSS tradicional, você usa classes prontas tipo `flex`, `text-center`, `bg-blue-500`. Muito mais rápido!
- **Radix UI** → Componentes profissionais e acessíveis (Select, Label, Input). Funcionam até para pessoas com deficiência visual.
- **Lucide React 0.562.0** → Biblioteca com milhares de ícones lindos. Usei para as setinhas, checks ✓ e símbolos das etapas.
- **shadcn/ui** → Sistema completo de componentes estilizados. É tipo um kit de UI pronto para usar!

## Como Organizei os Arquivos (Arquitetura)

Imagine que o projeto é uma casa 🏠. Cada pasta é um cômodo com uma função específica:

```
src/
├── components/              → A "sala de estar" (onde ficam as peças visuais)
│   ├── multi-step-form.tsx     → 🏠 O formulário principal (maestro que orquestra tudo)
│   ├── progress-steps.tsx      → 🎯 Aquelas bolinhas coloridas no topo
│   ├── steps.tsx               → 📝 As 3 telas do formulário
│   ├── form-field.tsx          → 🧩 Campo reutilizável (label + input + erro)
│   └── ui/                     → 🎨 Componentes básicos (botões, cards, inputs)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx
├── hooks/                   → ⚙️ A "sala de máquinas" (lógica do formulário)
│   └── use-multi-step-form.tsx → 🧠 O cérebro: avançar, voltar, validar
├── lib/
│   └── utils.ts             → 🛠️ Ferramentas auxiliares
├── types.ts                 → 📋 Definições de tipos do TypeScript
├── App.tsx                  → 🚪 Porta de entrada
└── main.tsx                 → 🔌 Tomada que liga tudo
```

**Por que essa organização?**
- `components/` → Tudo que você **vê** na tela
- `hooks/` → Tudo que você **não vê** (lógica, regras, cálculos)
- `types.ts` → As "regras do jogo" (o que cada campo pode ter)

## O Que Acontece em Cada Etapa

### Etapa 1: Informações Pessoais 🙋

**O que eu peço:**
- **Primeiro Nome** → Precisa ter pelo menos 2 letras (senão não é nome, é apelido! 😄)
- **Sobrenome** → Também mínimo 2 letras
- **Email** → Tem que ter @ e domínio válido (tipo `@gmail.com`)
- **Telefone** → No mínimo 10 dígitos (DDD + número)

**Se você errar:** Aparece uma mensagem em vermelho explicando o que está errado.

### Etapa 2: Informações Profissionais 💼

**O que eu peço:**
- **Empresa** → Onde você trabalha (mínimo 2 caracteres)
- **Posição/Cargo** → O que você faz lá
- **Nível de Experiência** → Um select com 3 opções:
  - 🟢 **Junior** (0-2 anos)
  - 🟡 **Pleno** (3-5 anos)
  - 🔴 **Senior** (6-10 anos)
- **Indústria** → Setor que você trabalha (tecnologia, saúde, educação...)

**Detalhe esperto:** O select tem um dropdown estilizado que formata automaticamente quando você escolhe!

### Etapa 3: Pagamento 💳

**O que eu peço:**
- **Número do Cartão** → Exatamente 16 dígitos (aceita só números)
- **Nome do Titular** → Nome que está escrito no cartão
- **Data de Validade** → Aqui tem um truque especial! 👇
- **CVV** → 3 ou 4 números (depende do cartão)

**O Truque da Data de Validade:**
Quando você digita `1225`, o campo _automaticamente_ transforma em `12/25`! Mágica? Não, é JavaScript! 🪄

```javascript
// Como funciona por dentro
Você digita: "1225"
Sistema pega só números: "1225"
Sistema divide: "12" + "/" + "25"
Resultado na tela: "12/25" ✓
```

## A Mágica Por Trás: Como Funciona?

### 1. A Navegação Entre Etapas 🚶

Criei dois botões na tela:

- **← Previous (Voltar)** → Desabilitado quando você está na primeira etapa (não tem pra onde voltar!)
- **Next → (Próximo)** → Vira "Submit" quando você chega na última etapa

**O que acontece quando você clica em "Next":**

1. ⏸️ O sistema **pausa** e valida os campos daquela etapa
2. ❌ Se tiver erro → Mostra mensagens em vermelho explicando o problema
3. ✅ Se estiver tudo ok → Salva os dados e avança para a próxima etapa
4. 🎉 Na última etapa → Envia tudo e mostra tela de sucesso!

### 2. A Validação Rigorosa (O "Segurança" do Formulário) 🛡️

Para cada campo, criei regras usando **Zod**. É tipo um guarda que não deixa dados errados passarem:

**Exemplos de regras:**

```typescript
Nome → Mínimo 2 letras, senão rejeita
Email → Tem que ter @ e domínio (.com, .br, etc)
Telefone → No mínimo 10 dígitos
Cartão → EXATAMENTE 16 números (nem mais, nem menos)
Data → Formato MM/AA obrigatório
CVV → Entre 3 e 4 dígitos
```

**Se você tentar burlar:** O botão "Next" nem funciona! 😎 O sistema só deixa você avançar quando tudo estiver correto.

### 3. O Indicador Visual de Progresso 🎯

No topo do formulário tem 3 bolinhas:

- **Bolinha Verde com ✓** → Etapa completada com sucesso
- **Bolinha Azul** → Você está aqui agora
- **Bolinha Cinza** → Ainda não chegou

**Como funciona por baixo dos panos:**

```javascript
Se (etapa < atual) → Verde ✓
Se (etapa === atual) → Azul (você está aqui)
Se (etapa > atual) → Cinza (ainda não visitou)
```

Isso ajuda você a saber: _"Estou no meio do caminho"_ ou _"Quase terminando!"_

## O Cérebro da Operação: Hook Customizado 🧠

Criei um **hook customizado** chamado `useMultiStepForm`. É ele quem controla toda a lógica do formulário. Pense nele como o maestro de uma orquestra 🎻.

### O que esse hook faz:

```javascript
currentStep → Número da etapa atual (0, 1 ou 2)
formData → Todos os dados que você digitou (guardados na memória)
isFirstStep → true se você está na etapa 1
isLastStep → true se você está na etapa 3
isSubmitted → true quando você clicou em "Submit"

// Ações (funções):
goToNextStep() → Avança uma etapa
goToPreviousStep() → Volta uma etapa
updateFormData() → Salva os dados da etapa atual
submitForm() → Envia tudo pro servidor (ou mostra mensagem de sucesso)
resetForm() → Limpa tudo e volta pro início
getCurrentStepSchema() → Pega as regras de validação da etapa atual
```

**Por que isso é inteligente?**
Separar a lógica em um hook deixa o código organizado. A tela (`MultiStepForm`) só cuida do visual, e o hook cuida do _"pensamento"_.

## Fluxo Completo: Do Início ao Fim 🎬

Vou explicar **passo a passo** o que acontece quando você usa o formulário:

### Ato 1: Abertura 🎭

1. Você abre a página → Vê a **Etapa 1** (Dados Pessoais)
2. Vê 4 campos vazios esperando você preencher
3. Vê o indicador no topo: 🔵⚪⚪ (você está no começo)

### Ato 2: Primeira Etapa ✍️

4. Você digita seu nome: `João Silva`
5. Digita email: `joao@gmail.com`
6. Digita telefone: `11987654321`
7. Clica em **Next** →

### Ato 3: Validação ⚖️

8. O sistema para e pensa: _"Deixa eu checar isso..."_
9. Valida nome → ✓ Tem mais de 2 letras
10. Valida email → ✓ Tem @ e domínio válido
11. Valida telefone → ✓ Tem 10+ dígitos
12. Conclusão: **Tudo OK!** Pode prosseguir!

### Ato 4: Segunda Etapa 💼

13. A tela muda → Agora você vê a **Etapa 2** (Profissional)
14. Indicador atualiza: ✅🔵⚪ (primeira completa, você está na segunda)
15. Você preenche empresa, cargo, nível de experiência...
16. Clica em **Next** novamente

### Ato 5: Terceira Etapa 💳

17. Vai pra **Etapa 3** (Pagamento)
18. Indicador: ✅✅🔵 (duas completas, última etapa!)
19. Você digita número do cartão, nome, data (que formata sozinha!) e CVV
20. Clica em **Submit** (agora é pra valer!)

### Ato 6: Gran Finale! 🎉

21. O sistema valida TUDO pela última vez
22. Se estiver OK → **BOOM!** Tela de sucesso aparece:
    - Ícone verde gigante ✓
    - Mensagem: _"Formulário Enviado com Sucesso!"_
    - Botão: _"Enviar Novo Formulário"_ (se quiser recomeçar)

## Tecnologias Profundas: Como Usei Cada Uma

### React Hook Form: O Gerenciador 📋

**Problema que resolve:**
Sem ele, você teria que criar um `useState` para _cada campo_. Imagina 10 campos = 10 `useState`. Um inferno! 🔥

**Como usei:**

```javascript
register("firstName") → Registra o campo "Primeiro Nome"
errors.firstName → Se tiver erro, mostra a mensagem
handleSubmit(onNext) → Quando clica Next, executa validação
setValue("experience", "Junior") → Seta o valor do select manualmente
```

É tipo um "assistente pessoal" que cuida de todos os campos pra você.

### Zod: O Validador Matemático 🔢

Criei **3 schemas** (um para cada etapa):

**Schema da Etapa 1 (Pessoal):**

```typescript
personalInfoSchema = {
  firstName: texto com no mínimo 2 caracteres,
  lastName: texto com no mínimo 2 caracteres,
  email: formato válido de email,
  phone: texto com no mínimo 10 dígitos
}
```

**Por que schemas separados?**
Porque cada etapa tem regras diferentes! Eu só valido os campos _daquela etapa_, não todos de uma vez. Isso é mais eficiente.

### TypeScript: O Detector de Bugs 🐛

Defini **tipos** para tudo:

```typescript
type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;
```

**Por que isso importa?**
Se eu tentar escrever `formData.name` (que não existe), o TypeScript grita: _"Ei! Esse campo não existe! Você quis dizer `firstName`?"_

Isso evita erros bobos que só apareceriam quando o usuário abrisse a página.

### Tailwind CSS: O Mágico dos Estilos 🎨

Ao invés de escrever CSS tradicional tipo:

```css
.botao {
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
```

Eu uso classes direto no HTML:

```html
<button className="bg-blue-500 text-white p-2 rounded">
  Clique aqui
</button>
```

**Vantagens:**
- ✅ Mais rápido de escrever
- ✅ Não precisa ficar inventando nomes de classes
- ✅ Responsivo automático (adapta pro celular)

## Desafios que Enfrentei (E Como Resolvi)

### Problema 1: Select Bugado 🐛

**O que aconteceu:**
O dropdown de "Nível de Experiência" não abria. A tela ficava branca quando clicava.

**Por que isso ocorreu:**
Eu estava importando o `Select` diretamente do `@radix-ui/react-select`, mas o projeto usa **shadcn/ui** (que é uma camada por cima do Radix).

**Como resolvi:**
Mudei o import de:
```javascript
❌ import { Select } from "@radix-ui/react-select"
✅ import { Select } from "./ui/select"
```

Agora usa a versão estilizada do shadcn/ui, que já vem bonita e funcional!

### Problema 2: Validação da Data Falhando ❌

**O que aconteceu:**
Eu digitava a data `12/25` e clicava Next, mas aparecia: _"Data inválida"_.

**Por que isso ocorreu:**
O Zod estava esperando um formato **regex muito específico**: `MM/YY`. Mas o usuário digitava de qualquer jeito: às vezes `1225`, às vezes `12/2025`.

**Como resolvi em 2 passos:**

1. **Auto-formatação:** Criei uma função que pega qualquer número e transforma em `MM/AA`:

```javascript
onChange={(e) => {
  let value = e.target.value.replace(/\D/g, ''); // Remove letras
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4); // Adiciona /
  }
  e.target.value = value;
}}
```

2. **Placeholder:** Adicionei um `placeholder="MM/AA"` para o usuário saber o formato.

Agora não tem erro! Digite `1225` que vira `12/25` sozinho! 🪄

### Problema 3: Valores do Select Não Batiam com o Schema 🔴

**O que aconteceu:**
Eu selecionava "Junior 0-2 anos" mas o Zod rejeitava dizendo: _"Valor inválido"_.

**Por que isso ocorreu:**
O `<SelectItem>` tinha:
```javascript
value="0-2"  // Isso aqui
```

Mas o schema Zod esperava:
```javascript
z.enum(["Junior", "Mid-level", "Senior"])  // Isso aqui
```

Os valores não batiam! `"0-2"` não está na lista permitida.

**Como resolvi:**
Mudei os valores para bater com o schema:

```javascript
✅ <SelectItem value="Junior">Junior 0-2 anos</SelectItem>
✅ <SelectItem value="Mid-level">Pleno 3-5 anos</SelectItem>
✅ <SelectItem value="Senior">Senior 6-10 anos</SelectItem>
```

Agora o _valor interno_ (`value`) bate com o schema, e o texto que aparece na tela continua bonito!

### Problema 4: Nenhum Feedback ao Submeter 😶

**O que aconteceu:**
Eu clicava em "Submit", os dados eram enviados (via `console.log`), mas... nada aparecia na tela. Ficava parecendo que não funcionou.

**Como resolvi:**
Criei uma **tela de sucesso** completa:

```javascript
if (isSubmitted) {
  return (
    <Tela de Sucesso>
      <Ícone Verde Gigante ✓>
      <Título> "Formulário Enviado com Sucesso!" </Título>
      <Botão> "Enviar Novo Formulário" </Botão>
    </Tela de Sucesso>
  );
}
```

Agora quando você envia, aparece uma tela linda confirmando que deu certo! Muito mais satisfatório! 😊

### Problema 5: Inputs Muito Juntos (Claustrofobia Visual) 😵

**O que aconteceu:**
Os campos estavam colados um no outro, parecendo um bloco de texto confuso.

**Como resolvi:**
Adicionei `space-y-4` nos containers de cada etapa:

```javascript
<div className="space-y-4">  ← Isso cria espaço vertical entre os filhos
  <FormField ... />
  <FormField ... />
  <FormField ... />
</div>
```

O `space-y-4` é uma classe do Tailwind que adiciona `1rem` (16px) de margem entre cada campo. Agora respira! 🌬️

## Como Rodar o Projeto 🚀

### Passo 1: Instale as Dependências
```bash
cd vite-project
npm install
```

_(Isso baixa todas as 40+ bibliotecas que o projeto usa)_

### Passo 2: Rode o Servidor de Desenvolvimento
```bash
npm run dev
```

_(Abre em `http://localhost:5173`)_

### Passo 3: Abra no Navegador
Cole o link ou pressione `o` + `Enter` no terminal que ele abre automaticamente!

### Passo 4: Teste!
Preencha o formulário, teste os erros, veja a validação funcionando em tempo real!

## O Que Aprendi Fazendo Esse Projeto 🎓

1. **Como dividir formulários grandes** → Melhor UX dividir em etapas pequenas do que um formulário gigante assustador
2. **React Hook Form + Zod = Combo Mortal** → Juntos, eles eliminam 90% dos bugs de validação
3. **Hooks customizados são poderosos** → Separam lógica de visual, deixando o código limpo e reutilizável
4. **TypeScript salva vidas** → Evitou dezenas de erros bobos que só apareceriam em produção
5. **Auto-formatação melhora muito a UX** → Usuário adora quando o campo "se arruma sozinho"
6. **Feedback visual é obrigatório** → Sempre mostre ao usuário que a ação dele funcionou (tela de sucesso, loading, etc)

## Melhorias Futuras (O Que Eu Faria Depois) 💡

Se eu fosse continuar esse projeto, adicionaria:

- [ ] **LocalStorage** → Salvar progresso no navegador (se você fechar a aba e voltar, continua de onde parou)
- [ ] **Animações entre etapas** → Transições suaves tipo "slide" quando muda de etapa
- [ ] **Integração com API** → Enviar dados de verdade para um backend (Node.js, PHP, Python...)
- [ ] **Loading state** → Mostrar "Enviando..." quando clicar em Submit
- [ ] **Dark Mode** 🌙 → Botão pra alternar entre tema claro e escuro
- [ ] **Clicar nas bolinhas** → Poder pular direto pra etapa desejada clicando no indicador
- [ ] **Suporte a Pix/Boleto** → Além de cartão, aceitar outros métodos de pagamento
- [ ] **Upload de documentos** → Adicionar uma etapa 4 para enviar RG, CPF, etc.
- [ ] **Preview antes de enviar** → Mostrar um resumo de tudo preenchido na etapa 3

## Estrutura Técnica Avançada (Para Quem Quer Se Aprofundar) 🤓

### Como o Estado é Gerenciado

O formulário usa **3 camadas de estado**:

1. **Estado Local (React Hook Form)** → Dados temporários _daquela etapa_
2. **Estado Global (Hook Customizado)** → Dados de _todas as etapas_ juntos
3. **Estado de Validação (Zod)** → Regras que definem se pode avançar ou não

**Fluxo:**
```
Usuário digita → React Hook Form captura
↓
Clica Next → Zod valida
↓
Se válido → Hook Customizado salva no estado global
↓
Etapa avança
```

### Como a Validação Dinâmica Funciona

A cada etapa, o schema de validação **muda dinamicamente**:

```javascript
// Array com os 3 schemas
const stepSchemas = [
  personalInfoSchema,      // Etapa 0
  professionalInfoSchema,  // Etapa 1
  billingInfoSchema        // Etapa 2
];

// Pega o schema da etapa atual
getCurrentStepSchema() {
  return stepSchemas[currentStep];
}
```

Quando você avança de etapa, o `resolver` do React Hook Form automaticamente usa o próximo schema!

### Persistência de Dados Entre Etapas

Quando você clica "Next", os dados são **mesclados** (não substituídos):

```javascript
const updatedData = {
  ...formData,  // Dados antigos (etapas anteriores)
  ...data       // Dados novos (etapa atual)
};
```

**Exemplo prático:**

Etapa 1: `{ firstName: "João", email: "joao@gmail.com" }`
Etapa 2: `{ company: "Google", position: "Dev" }`
Resultado mesclado: `{ firstName: "João", email: "joao@gmail.com", company: "Google", position: "Dev" }`

Assim você não perde nada ao avançar!

---

## Resumo Final (TL;DR) 📌

Criei um **formulário multi-etapas profissional** usando as melhores tecnologias de 2026:

✅ **React + TypeScript** → Base sólida e tipada
✅ **React Hook Form + Zod** → Validação poderosa e sem bugs
✅ **Tailwind CSS + shadcn/ui** → Design moderno e responsivo
✅ **Auto-formatação** → Data formata sozinha (12/25)
✅ **Feedback visual** → Tela de sucesso + indicador de progresso
✅ **Código limpo** → Hooks customizados + componentes reutilizáveis

**Tecnologias:** React, TypeScript, Vite, React Hook Form, Zod, Tailwind CSS, Radix UI, Lucide, shadcn/ui

**O que faz:** Coleta dados do usuário em 3 etapas (pessoal, profissional, pagamento) com validação rigorosa e UX impecável.

---

**Desenvolvido com 💙 usando as melhores práticas do mercado em 2026!** 🚀


