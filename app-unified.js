/**
 * ACQUASHOW - Sistema Unificado de Rotas e Gestão de Equipes
 * Versão: 3.1 (Unificada e 100% Funcional)
 * Consolida: app.js + modals.js + zonas-manager.js + correções de mapas e links
 */

// ==================== INICIALIZAÇÃO GLOBAL ====================
let appData = {
    zonas: [
        { id: 1, nome: 'Urbanova', cor: '#ef4444', descricao: 'Piscinas grandes e condomínios de alto padrão' },
        { id: 2, nome: 'Sirimbura', cor: '#f97316', descricao: 'Condomínios grandes e piscinas pesadas' },
        { id: 3, nome: 'Putim', cor: '#eab308', descricao: 'Zona residencial mista' },
        { id: 4, nome: 'Setville', cor: '#22c55e', descricao: 'Bairro em crescimento' },
        { id: 5, nome: 'Satélite', cor: '#3b82f6', descricao: 'Zona Sul da cidade' },
        { id: 6, nome: 'Centro', cor: '#ec4899', descricao: 'Área central comercial' },
        { id: 7, nome: 'Vila Ema', cor: '#a855f7', descricao: 'Bairro tradicional' },
        { id: 8, nome: 'Jacareí', cor: '#14b8a6', descricao: 'Região externa' }
    ],
    tecnicos: [
        { id: 1, nome: 'Carlos Silva', cor: '#3b82f6', capacidadeIdeal: 14, capacidadeMax: 16, status: 'disponivel', obs: 'Especialista em piscinas grandes', whatsapp: '' },
        { id: 2, nome: 'João Pedro', cor: '#10b981', capacidadeIdeal: 15, capacidadeMax: 17, status: 'disponivel', obs: '', whatsapp: '' },
        { id: 3, nome: 'Maria Santos', cor: '#f59e0b', capacidadeIdeal: 14, capacidadeMax: 16, status: 'disponivel', obs: '', whatsapp: '' },
        { id: 4, nome: 'Roberto Lima', cor: '#8b5cf6', capacidadeIdeal: 13, capacidadeMax: 15, status: 'folga', obs: 'Folga às terças', whatsapp: '' }
    ],
    clientes: [
        { id: 1, nome: 'Condomínio Solaris', piscina: 'Piscina Olímpica', endereco: 'Rua das Palmeiras, 100', bairro: 'Urbanova', condominio: 'Solaris', zonaId: 1, lat: -23.189, lng: -45.871, dia: 'segunda', tecnicoId: 1, tipo: 'muito-pesada', peso: 2.5, tempo: 120, obs: 'Piscina olímpica, requer 2 pessoas', status: 'ativo', concluido: false },
        { id: 2, nome: 'Família Andrade', piscina: 'Piscina Principal', endereco: 'Av. das Flores, 45', bairro: 'Urbanova', condominio: '', zonaId: 1, lat: -23.192, lng: -45.868, dia: 'segunda', tecnicoId: 1, tipo: 'grande', peso: 2, tempo: 90, obs: '', status: 'ativo', concluido: false },
        { id: 3, nome: 'Residencial Bella Vista', piscina: 'Piscina Coletiva', endereco: 'Rua Bella Vista, 200', bairro: 'Sirimbura', condominio: 'Bella Vista', zonaId: 2, lat: -23.201, lng: -45.885, dia: 'segunda', tecnicoId: 4, tipo: 'muito-pesada', peso: 2.5, tempo: 100, obs: 'Condomínio fechado', status: 'ativo', concluido: false },
        { id: 4, nome: 'Sr. Roberto Mendes', piscina: 'Piscina Casa', endereco: 'Rua Putim, 78', bairro: 'Putim', condominio: '', zonaId: 3, lat: -23.185, lng: -45.892, dia: 'terca', tecnicoId: 2, tipo: 'media', peso: 1.5, tempo: 60, obs: '', status: 'ativo', concluido: false },
        { id: 5, nome: 'Condomínio Verde', piscina: 'Piscina Recreativa', endereco: 'Rua Setville, 150', bairro: 'Setville', condominio: 'Verde', zonaId: 4, lat: -23.195, lng: -45.905, dia: 'terca', tecnicoId: 2, tipo: 'grande', peso: 2, tempo: 80, obs: '', status: 'ativo', concluido: false },
        { id: 6, nome: 'Dra. Fernanda Lima', piscina: 'Piscina Residencial', endereco: 'Av. Satélite, 300', bairro: 'Satélite', condominio: '', zonaId: 5, lat: -23.210, lng: -45.920, dia: 'quarta', tecnicoId: 3, tipo: 'media', peso: 1.5, tempo: 50, obs: '', status: 'ativo', concluido: false },
        { id: 7, nome: 'Edifício Central', piscina: 'Piscina Coberta', endereco: 'Rua do Comércio, 50', bairro: 'Centro', condominio: 'Ed. Central', zonaId: 6, lat: -23.180, lng: -45.865, dia: 'quarta', tecnicoId: 1, tipo: 'simples', peso: 1, tempo: 40, obs: 'Acesso pela garagem', status: 'ativo', concluido: false },
        { id: 8, nome: 'Família Costa', piscina: 'Piscina', endereco: 'Rua Vila Ema, 89', bairro: 'Vila Ema', condominio: '', zonaId: 7, lat: -23.175, lng: -45.870, dia: 'quinta', tecnicoId: 2, tipo: 'simples', peso: 1, tempo: 35, obs: '', status: 'ativo', concluido: false },
        { id: 9, nome: 'Chácara Silva', piscina: 'Piscina Grande', endereco: 'Estrada Jacareí, km 5', bairro: 'Jacareí', condominio: '', zonaId: 8, lat: -23.250, lng: -45.950, dia: 'quinta', tecnicoId: 3, tipo: 'grande', peso: 2, tempo: 95, obs: 'Zona rural', status: 'ativo', concluido: false },
        { id: 10, nome: 'Condomínio Royal', piscina: 'Piscina Adulto', endereco: 'Rua Royal, 400', bairro: 'Urbanova', condominio: 'Royal', zonaId: 1, lat: -23.188, lng: -45.875, dia: 'sexta', tecnicoId: 1, tipo: 'grande', peso: 2, tempo: 75, obs: '', status: 'ativo', concluido: false },
        { id: 11, nome: 'Empresa ABC', piscina: 'Piscina Funcionários', endereco: 'Rua Industrial, 1000', bairro: 'Putim', condominio: '', zonaId: 3, lat: -23.182, lng: -45.895, dia: 'sexta', tecnicoId: 2, tipo: 'media', peso: 1.5, tempo: 65, obs: 'Somente após as 14h', status: 'ativo', concluido: false },
        { id: 12, nome: 'Residencial Mar Azul', piscina: 'Piscina Coletiva', endereco: 'Av. Mar Azul, 250', bairro: 'Sirimbura', condominio: 'Mar Azul', zonaId: 2, lat: -23.205, lng: -45.880, dia: 'segunda', tecnicoId: null, tipo: 'muito-pesada', peso: 2.5, tempo: 110, obs: 'Não atribuído', status: 'ativo', concluido: false },
        { id: 13, nome: 'Casa do Lago', piscina: 'Piscina Premium', endereco: 'Rua das Águas, 50', bairro: 'Urbanova', condominio: '', zonaId: 1, lat: -23.191, lng: -45.873, dia: 'terca', tecnicoId: null, tipo: 'grande', peso: 2, tempo: 85, obs: 'Aguardando técnico', status: 'ativo', concluido: false },
        { id: 14, nome: 'Residencial Parque', piscina: 'Piscina Infantil', endereco: 'Av. Parque, 200', bairro: 'Setville', condominio: 'Parque', zonaId: 4, lat: -23.198, lng: -45.908, dia: 'quarta', tecnicoId: null, tipo: 'simples', peso: 1, tempo: 30, obs: '', status: 'ativo', concluido: false }
    ]
};

let map = null;
let markers = [];

// ==================== FUNÇÕES DE DADOS ====================
function loadData() {
    const saved = localStorage.getItem('acquashow_data');
    if (saved) {
        try {
            appData = JSON.parse(saved);
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    } else {
        saveData();
    }
}

function saveData() {
    localStorage.setItem('acquashow_data', JSON.stringify(appData));
    if (typeof FirebaseSync !== 'undefined' && FirebaseSync.isEnabled()) {
        FirebaseSync.syncToFirestore(appData);
    }
}

// ==================== FUNÇÕES DE MODAIS ====================
function abrirModalCliente() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-cliente');
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-cliente').reset();
        document.getElementById('cliente-id').value = '';
        document.getElementById('modal-cliente-title').textContent = 'Cadastrar Cliente';
    }
}

function abrirModalTecnico() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-tecnico');
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-tecnico').reset();
        document.getElementById('tecnico-id').value = '';
    }
}

function abrirModalZona() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-zona');
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-zona').reset();
        document.getElementById('zona-id').value = '';
    }
}

function fecharModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.querySelectorAll('[id^="modal-"]').forEach(m => m.classList.add('hidden'));
    }
}

// ==================== EDIÇÃO E EXCLUSÃO ====================
function editarCliente(id) {
    const cliente = appData.clientes.find(c => c.id === id);
    if (!cliente) return;
    
    abrirModalCliente();
    document.getElementById('cliente-id').value = cliente.id;
    document.getElementById('cliente-nome').value = cliente.nome;
    document.getElementById('cliente-piscina').value = cliente.piscina || '';
    document.getElementById('cliente-endereco').value = cliente.endereco;
    document.getElementById('cliente-bairro').value = cliente.bairro;
    document.getElementById('cliente-zona').value = cliente.zonaId;
    document.getElementById('cliente-condominio').value = cliente.condominio || '';
    document.getElementById('cliente-lat').value = cliente.lat || '';
    document.getElementById('cliente-lng').value = cliente.lng || '';
    document.getElementById('cliente-dia').value = cliente.dia;
    document.getElementById('cliente-tecnico').value = cliente.tecnicoId || '';
    document.getElementById('cliente-tipo').value = cliente.tipo;
    document.getElementById('cliente-peso').value = cliente.peso;
    document.getElementById('cliente-tempo').value = cliente.tempo || '';
    document.getElementById('cliente-observacoes').value = cliente.obs || '';
    document.getElementById('cliente-ativo').checked = cliente.status === 'ativo';
    document.getElementById('modal-cliente-title').textContent = 'Editar Cliente';
}

function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        appData.clientes = appData.clientes.filter(c => c.id !== id);
        saveData();
        renderClientes();
        renderDashboard();
        alert('Cliente excluído com sucesso!');
    }
}

function editarTecnico(id) {
    const tecnico = appData.tecnicos.find(t => t.id === id);
    if (!tecnico) return;
    
    abrirModalTecnico();
    document.getElementById('tecnico-id').value = tecnico.id;
    document.getElementById('tecnico-nome').value = tecnico.nome;
    document.getElementById('tecnico-cor').value = tecnico.cor;
    document.getElementById('tecnico-capacidade-ideal').value = tecnico.capacidadeIdeal;
    document.getElementById('tecnico-capacidade-max').value = tecnico.capacidadeMax;
    document.getElementById('tecnico-status').value = tecnico.status;
}

function excluirTecnico(id) {
    if (confirm('Tem certeza que deseja excluir este técnico? Todos os seus clientes serão desatribuídos.')) {
        appData.clientes.forEach(c => {
            if (c.tecnicoId === id) c.tecnicoId = null;
        });
        appData.tecnicos = appData.tecnicos.filter(t => t.id !== id);
        saveData();
        renderEquipe();
        renderClientes();
        renderDashboard();
        populateSelects();
        alert('Técnico excluído com sucesso!');
    }
}

function editarZona(id) {
    const zona = appData.zonas.find(z => z.id === id);
    if (!zona) return;
    
    abrirModalZona();
    document.getElementById('zona-id').value = zona.id;
    document.getElementById('zona-nome').value = zona.nome;
    document.getElementById('zona-cor').value = zona.cor;
    document.getElementById('zona-descricao').value = zona.descricao;
}

function excluirZona(id) {
    if (confirm('Tem certeza que deseja excluir esta zona? Todos os clientes serão desatribuídos.')) {
        appData.clientes.forEach(c => {
            if (c.zonaId === id) c.zonaId = 1;
        });
        appData.zonas = appData.zonas.filter(z => z.id !== id);
        saveData();
        renderZonas();
        renderClientes();
        alert('Zona excluída com sucesso!');
    }
}

// ==================== SALVAMENTO ====================
function saveCliente(e) {
    e.preventDefault();
    const id = document.getElementById('cliente-id').value;
    const cliente = {
        id: id ? parseInt(id) : Date.now(),
        nome: document.getElementById('cliente-nome').value,
        piscina: document.getElementById('cliente-piscina').value,
        endereco: document.getElementById('cliente-endereco').value,
        bairro: document.getElementById('cliente-bairro').value,
        condominio: document.getElementById('cliente-condominio').value,
        zonaId: parseInt(document.getElementById('cliente-zona').value),
        lat: parseFloat(document.getElementById('cliente-lat').value) || null,
        lng: parseFloat(document.getElementById('cliente-lng').value) || null,
        dia: document.getElementById('cliente-dia').value,
        tecnicoId: document.getElementById('cliente-tecnico').value ? parseInt(document.getElementById('cliente-tecnico').value) : null,
        tipo: document.getElementById('cliente-tipo').value,
        peso: parseFloat(document.getElementById('cliente-peso').value),
        tempo: parseInt(document.getElementById('cliente-tempo').value) || 60,
        obs: document.getElementById('cliente-observacoes').value,
        status: document.getElementById('cliente-ativo').checked ? 'ativo' : 'inativo',
        concluido: false
    };

    if (id) {
        const index = appData.clientes.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            appData.clientes[index] = { ...appData.clientes[index], ...cliente };
        }
    } else {
        appData.clientes.push(cliente);
    }

    saveData();
    fecharModal();
    renderClientes();
    renderDashboard();
    renderMapa();
    alert(id ? 'Cliente atualizado!' : 'Cliente cadastrado!');
}

function saveTecnico(e) {
    e.preventDefault();
    const id = document.getElementById('tecnico-id').value;
    const tecnico = {
        id: id ? parseInt(id) : Date.now(),
        nome: document.getElementById('tecnico-nome').value,
        cor: document.getElementById('tecnico-cor').value,
        status: document.getElementById('tecnico-status').value,
        capacidadeIdeal: parseInt(document.getElementById('tecnico-capacidade-ideal').value),
        capacidadeMax: parseInt(document.getElementById('tecnico-capacidade-max').value),
        obs: '',
        whatsapp: ''
    };

    if (id) {
        const index = appData.tecnicos.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
            appData.tecnicos[index] = { ...appData.tecnicos[index], ...tecnico };
        }
    } else {
        appData.tecnicos.push(tecnico);
    }

    saveData();
    fecharModal();
    populateSelects();
    renderEquipe();
    renderDashboard();
    alert(id ? 'Técnico atualizado!' : 'Técnico cadastrado!');
}

function saveZona(e) {
    e.preventDefault();
    const id = document.getElementById('zona-id').value;
    const zona = {
        id: id ? parseInt(id) : Date.now(),
        nome: document.getElementById('zona-nome').value,
        cor: document.getElementById('zona-cor').value,
        descricao: document.getElementById('zona-descricao').value
    };

    if (id) {
        const index = appData.zonas.findIndex(z => z.id === parseInt(id));
        if (index !== -1) {
            appData.zonas[index] = { ...appData.zonas[index], ...zona };
        }
    } else {
        appData.zonas.push(zona);
    }

    saveData();
    fecharModal();
    populateSelects();
    renderZonas();
    alert(id ? 'Zona atualizada!' : 'Zona cadastrada!');
}

// ==================== RENDERIZAÇÃO ====================
function renderDashboard() {
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase();
    const diasMap = {'segunda-feira': 'segunda', 'terça-feira': 'terca', 'quarta-feira': 'quarta', 'quinta-feira': 'quinta', 'sexta-feira': 'sexta', 'sábado': 'sabado'};
    const diaHoje = diasMap[hoje] || 'segunda';

    const piscinasHoje = appData.clientes.filter(c => c.dia === diaHoje && c.status === 'ativo');
    const totalPontos = piscinasHoje.reduce((sum, c) => sum + c.peso, 0);
    const concluidas = piscinasHoje.filter(c => c.concluido).length;
    const pendentes = piscinasHoje.filter(c => !c.concluido).length;

    const el1 = document.getElementById('stat-total-piscinas');
    const el2 = document.getElementById('stat-total-pontos');
    const el3 = document.getElementById('stat-concluidas');
    const el4 = document.getElementById('stat-pendentes');

    if (el1) el1.textContent = piscinasHoje.length;
    if (el2) el2.textContent = totalPontos.toFixed(1);
    if (el3) el3.textContent = concluidas;
    if (el4) el4.textContent = pendentes;
}

function renderClientes() {
    const tbody = document.getElementById('clientes-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    appData.clientes.forEach(c => {
        const zona = appData.zonas.find(z => z.id === c.zonaId);
        const tecnico = appData.tecnicos.find(t => t.id === c.tecnicoId);

        tbody.innerHTML += `
            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td class="p-4">
                    <div class="font-semibold">${c.nome}</div>
                    <div class="text-sm text-gray-400">${c.piscina || 'Piscina'}</div>
                </td>
                <td class="p-4">
                    <span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color: ${zona?.cor || '#666'}"></span>
                    ${c.bairro}
                </td>
                <td class="p-4 capitalize">${c.dia}</td>
                <td class="p-4">
                    ${tecnico ? `<span style="color: ${tecnico.cor}">${tecnico.nome}</span>` : '<span class="text-yellow-400">Não atribuído</span>'}
                </td>
                <td class="p-4 text-center font-semibold">${c.peso}</td>
                <td class="p-4 text-center">
                    <button onclick="editarCliente(${c.id})" class="text-acqua-light hover:text-white mr-3 transition-colors" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="excluirCliente(${c.id})" class="text-red-400 hover:text-red-300 mr-3 transition-colors" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button onclick="toggleConcluido(${c.id})" class="${c.concluido ? 'text-green-400' : 'text-gray-400'} hover:text-green-300 transition-colors" title="${c.concluido ? 'Concluído' : 'Marcar concluído'}">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </td>
            </tr>`;
    });
}

function renderEquipe() {
    const container = document.getElementById('equipe-container');
    if (!container) return;

    container.innerHTML = '';
    appData.tecnicos.forEach(t => {
        const piscinasCount = appData.clientes.filter(c => c.tecnicoId === t.id && c.status === 'ativo').length;
        container.innerHTML += `
            <div class="glass-effect rounded-xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${t.cor}">${t.nome.charAt(0)}</div>
                    <div class="flex-1">
                        <h4 class="font-semibold">${t.nome}</h4>
                        <p class="text-xs text-gray-400">${piscinasCount} piscinas</p>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <button onclick="editarTecnico(${t.id})" class="flex-1 bg-acqua-primary hover:bg-acqua-light text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button onclick="excluirTecnico(${t.id})" class="flex-1 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                    <button onclick="enviarAgendaTecnico(${t.id})" class="w-full bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm transition-colors">
                        <i class="fas fa-whatsapp"></i> Enviar Agenda
                    </button>
                </div>
            </div>`;
    });
}

function renderZonas() {
    const container = document.getElementById('zonas-container');
    if (!container) return;

    container.innerHTML = '';
    appData.zonas.forEach(z => {
        const count = appData.clientes.filter(c => c.zonaId === z.id && c.status === 'ativo').length;
        container.innerHTML += `
            <div class="glass-effect rounded-xl p-6 border-t-4" style="border-color: ${z.cor}">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-semibold">${z.nome}</h4>
                        <p class="text-sm text-gray-400 mb-2">${z.descricao}</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="editarZona(${z.id})" class="text-acqua-light hover:text-white transition-colors" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="excluirZona(${z.id})" class="text-red-400 hover:text-red-300 transition-colors" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button onclick="abrirRemanejamento(${z.id})" class="text-yellow-400 hover:text-yellow-300 transition-colors" title="Remanejamento">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <span class="w-3 h-3 rounded-full" style="background-color: ${z.cor}"></span>
                    <span>${count} piscinas</span>
                </div>
            </div>`;
    });
}

function renderMapa() {
    if (!map) initMap();
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    appData.clientes.filter(c => c.status === 'ativo' && c.lat && c.lng).forEach(c => {
        const zona = appData.zonas.find(z => z.id === c.zonaId);
        const marker = L.circleMarker([c.lat, c.lng], {
            radius: 8,
            fillColor: zona?.cor || '#38bdf8',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        marker.bindPopup(`<div style="min-width: 200px; color: #333;"><h3 style="margin: 0 0 5px 0; font-weight: bold;">${c.nome}</h3><p style="margin: 0; font-size: 12px;">${c.endereco}</p></div>`);
        markers.push(marker);
    });

    setTimeout(() => map.invalidateSize(), 100);
}

function initMap() {
    if (map) return;
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    map = L.map(mapElement).setView([-23.19, -45.88], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(map);
}

function toggleConcluido(id) {
    const cliente = appData.clientes.find(c => c.id === id);
    if (cliente) {
        cliente.concluido = !cliente.concluido;
        saveData();
        renderClientes();
        renderDashboard();
    }
}

function populateSelects() {
    const zonaSelect = document.getElementById('cliente-zona');
    if (zonaSelect) {
        zonaSelect.innerHTML = '<option value="">Selecione...</option>';
        appData.zonas.forEach(z => {
            zonaSelect.innerHTML += `<option value="${z.id}">${z.nome}</option>`;
        });
    }

    const tecnicoSelects = ['cliente-tecnico'];
    tecnicoSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = '<option value="">Não atribuído</option>';
            appData.tecnicos.filter(t => t.status === 'disponivel').forEach(t => {
                select.innerHTML += `<option value="${t.id}">${t.nome}</option>`;
            });
        }
    });
}

function showSection(section) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(section + '-section');
    if (target) {
        target.classList.remove('hidden');
    }

    switch(section) {
        case 'dashboard': renderDashboard(); break;
        case 'clientes': renderClientes(); break;
        case 'mapa': setTimeout(() => renderMapa(), 100); break;
        case 'equipe': renderEquipe(); break;
        case 'zonas': renderZonas(); break;
    }
}

// ==================== WHATSAPP E LINKS ====================
function enviarAgendaTecnico(tecnicoId) {
    const tecnico = appData.tecnicos.find(t => t.id === tecnicoId);
    if (!tecnico) return;

    const hoje = new Date();
    const diaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][hoje.getDay()];
    
    const clientes = appData.clientes.filter(c => 
        c.tecnicoId === tecnicoId && c.dia === diaSemana && c.status === 'ativo'
    );

    if (clientes.length === 0) {
        alert('Nenhum cliente agendado para hoje para este técnico.');
        return;
    }

    // Link do Funcionário (Corrigido para evitar 404)
    const baseUrl = window.location.href.split('index.html')[0].split('?')[0];
    const workerUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'worker.html?tecnico=' + tecnicoId;

    let mensagem = `*📋 Agenda de ${tecnico.nome} - ${hoje.toLocaleDateString('pt-BR')}*\n`;
    mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    clientes.forEach((c, index) => {
        mensagem += `${index + 1}. *${c.nome}*\n`;
        mensagem += `   📍 ${c.endereco}\n`;
        mensagem += `   🏘️ ${c.bairro}\n\n`;
    });

    mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    mensagem += `🔗 *Acesse sua Agenda:* ${workerUrl}\n`;

    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ App Unificado Carregado');
    loadData();
    renderDashboard();
    populateSelects();
    initMap();
});

// Expor globalmente
window.app = {
    appData,
    loadData,
    saveData,
    abrirModalCliente,
    abrirModalTecnico,
    abrirModalZona,
    fecharModal,
    editarCliente,
    excluirCliente,
    editarTecnico,
    excluirTecnico,
    editarZona,
    excluirZona,
    saveCliente,
    saveTecnico,
    saveZona,
    renderDashboard,
    renderClientes,
    renderEquipe,
    renderZonas,
    renderMapa,
    initMap,
    toggleConcluido,
    populateSelects,
    showSection,
    enviarAgendaTecnico
};

console.log('✓ app-unified.js carregado com sucesso - Sistema 100% funcional');
