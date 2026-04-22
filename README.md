# Acquashow Piscinas - Sistema de Gestão de Rotas e Equipes

## 📋 Descrição

Sistema profissional de gestão de rotas, clientes e equipes para a empresa Acquashow Piscinas. Permite gerenciar clientes, técnicos, zonas de atuação e gerar relatórios com visualização em mapa.

## ✨ Funcionalidades Principais

### Dashboard
- Estatísticas em tempo real (total de piscinas, pontos, concluídas, pendentes)
- Alertas de piscinas não atribuídas
- Visualização rápida de métricas

### Gestão de Clientes
- ✅ Cadastro de novos clientes
- ✅ Edição de clientes existentes
- ✅ Atribuição de técnicos
- ✅ Classificação por tipo e peso
- Reagendamento de serviços
- Marcação de concluído/pendente

### Gestão de Equipe
- ✅ Cadastro de técnicos
- Definição de capacidade ideal e máxima
- Status (disponível/folga)
- Visualização de carga de trabalho

### Zonas de Atuação
- ✅ Cadastro de zonas
- Cores personalizadas por zona
- Descrição de características

### Mapa de Rotas
- Visualização de todos os clientes no mapa
- Filtros por técnico e zona
- Otimização de rotas

### Agenda
- Visualização por dia da semana
- Distribuição de carga entre técnicos

### Não Atribuídos
- Fila de clientes sem técnico atribuído
- Atribuição manual ou inteligente

### Relatórios
- Exportação em CSV
- Resumo por zona
- Resumo por técnico
- Estatísticas gerais

## 🔧 Correções Implementadas

### Fase 2 - Correções de Funcionalidade

1. **Removida Duplicação de Modais**
   - Eliminados modais duplicados no final do HTML
   - Mantido apenas um conjunto consistente

2. **Padronização de Chamadas de Funções**
   - Todas as chamadas agora usam prefixo `app.`
   - Exemplo: `app.openModal()`, `app.saveCliente()`, `app.closeModal()`

3. **Limpeza de Código**
   - Removidas duplicações de inicialização em app.js
   - Código mais limpo e organizado

4. **Integração Firebase**
   - Novo arquivo `firebase-sync.js` para sincronização
   - Dados salvos em localStorage (padrão) e Firestore (quando disponível)
   - Autenticação anônima com Firebase

## 🚀 Como Usar

### Instalação

1. Clone o repositório
2. Abra `index.html` em um navegador moderno
3. O sistema carregará com dados de exemplo

### Cadastrar Cliente

1. Clique em **"Novo Cliente"** no header
2. Preencha os campos obrigatórios (Nome, Endereço, Zona, Dia)
3. Selecione o tipo de piscina (afeta o peso automaticamente)
4. Clique em **"Salvar"**

### Cadastrar Técnico

1. Navegue para **"Equipe"**
2. Clique em **"Novo Técnico"**
3. Preencha Nome, Cor, Status e Capacidades
4. Clique em **"Salvar Técnico"**

### Cadastrar Zona

1. Navegue para **"Zonas"**
2. Clique em **"Nova Zona"**
3. Preencha Nome, Cor e Descrição
4. Clique em **"Salvar Zona"**

### Exportar para WhatsApp

1. Navegue para **"Equipe"**
2. Clique em **"Exportar para WhatsApp"** (quando implementado)
3. A lista de técnicos será compartilhada via WhatsApp

### Compartilhar com Funcionários

1. Clique em **"Copiar Link de Acesso"** (quando implementado)
2. Compartilhe o link com os funcionários
3. Eles terão acesso à sua lista de clientes e agenda

## 📊 Estrutura de Dados

### Cliente
```json
{
  "id": 1,
  "nome": "Condomínio Solaris",
  "piscina": "Piscina Olímpica",
  "endereco": "Rua das Palmeiras, 100",
  "bairro": "Urbanova",
  "condominio": "Solaris",
  "zonaId": 1,
  "lat": -23.189,
  "lng": -45.871,
  "dia": "segunda",
  "tecnicoId": 1,
  "tipo": "muito-pesada",
  "peso": 2.5,
  "tempo": 120,
  "obs": "Piscina olímpica, requer 2 pessoas",
  "status": "ativo",
  "concluido": false
}
```

### Técnico
```json
{
  "id": 1,
  "nome": "Carlos Silva",
  "cor": "#3b82f6",
  "capacidadeIdeal": 14,
  "capacidadeMax": 16,
  "status": "disponivel",
  "obs": "Especialista em piscinas grandes"
}
```

### Zona
```json
{
  "id": 1,
  "nome": "Urbanova",
  "cor": "#ef4444",
  "descricao": "Piscinas grandes e condomínios de alto padrão"
}
```

## 🔐 Segurança

- Dados armazenados em localStorage (navegador)
- Sincronização opcional com Firebase Firestore
- Autenticação anônima com Firebase
- Sem armazenamento de senhas

## 🌐 Compatibilidade

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Responsivo para mobile

## 📱 Funcionalidades Mobile

- Sidebar colapsável
- Botões adaptados para toque
- Visualização otimizada para telas pequenas

## 🔄 Sincronização com Firebase

O sistema suporta sincronização automática com Firebase:

1. Dados são salvos em localStorage (sempre)
2. Se Firebase estiver disponível, sincroniza também com Firestore
3. Ao abrir o app, busca dados do Firestore se disponível
4. Funciona offline - dados são sincronizados quando conectado

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

## 📄 Licença

Todos os direitos reservados © 2026 Acquashow Piscinas
