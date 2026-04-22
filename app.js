/**
 * Acquashow Piscinas - Sistema de Rotas e Gestão de Equipes
 * Versão: 2.0 (Corrigida e Profissional)
 */

const AcquashowApp = (function() {
    'use strict';

    // ==================== DADOS ====================
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

    // ==================== INICIALIZAÇÃO ====================
    function init() {
        loadData();
        updateDate();
        showSection('dashboard');
        initMap();
        populateSelects();
    }

    // ==================== DADOS ====================
    function loadData() {
        const saved = localStorage.getItem('acquashow_data');
        if (saved) {
            appData = JSON.parse(saved);
        } else {
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem('acquashow_data', JSON.stringify(appData));
        if (typeof FirebaseSync !== 'undefined') {
            FirebaseSync.syncToFirestore(appData);
        }
    }

    function updateDate() {
        const hoje = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = hoje.toLocaleDateString('pt-BR', options);
        }
    }

    // ==================== NAVEGAÇÃO ====================
    function showSection(section) {
        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
        const target = document.getElementById(section + '-section');
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('slide-in');
        }

        const titles = {
            'dashboard': 'Dashboard',
            'clientes': 'Clientes',
            'mapa': 'Mapa de Rotas',
            'agenda': 'Agenda',
            'nao-atribuidos': 'Não Atribuídos',
            'equipe': 'Equipe',
            'zonas': 'Zonas',
            'relatorios': 'Relatórios'
        };
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = titles[section] || section;
        }

        switch(section) {
            case 'dashboard': renderDashboard(); break;
            case 'clientes': renderClientes(); break;
            case 'mapa': renderMapa(); break;
            case 'agenda': renderAgenda(); break;
            case 'nao-atribuidos': renderNaoAtribuidos(); break;
            case 'equipe': renderEquipe(); break;
            case 'zonas': renderZonas(); break;
            case 'relatorios': renderRelatorios(); break;
        }

        if (window.innerWidth < 768) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.add('-translate-x-full');
        }
    }

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('-translate-x-full');
        }
    }

    // ==================== MODAIS ====================
    function openModal(tipo, id = null) {
        const overlay = document.getElementById('modal-overlay');
        if (!overlay) return;

        overlay.classList.remove('hidden');
        document.querySelectorAll('[id^="modal-"]').forEach(m => m.classList.add('hidden'));

        if (tipo === 'cliente') {
            const modal = document.getElementById('modal-cliente');
            const title = document.getElementById('modal-cliente-title');
            if (modal) modal.classList.remove('hidden');
            
            if (id) {
                if (title) title.textContent = 'Editar Cliente';
                const c = appData.clientes.find(cl => cl.id === id);
                if (c) {
                    document.getElementById('cliente-id').value = c.id;
                    document.getElementById('cliente-nome').value = c.nome;
                    document.getElementById('cliente-piscina').value = c.piscina || '';
                    document.getElementById('cliente-endereco').value = c.endereco;
                    document.getElementById('cliente-bairro').value = c.bairro;
                    document.getElementById('cliente-zona').value = c.zonaId;
                    document.getElementById('cliente-condominio').value = c.condominio || '';
                    document.getElementById('cliente-lat').value = c.lat || '';
                    document.getElementById('cliente-lng').value = c.lng || '';
                    document.getElementById('cliente-dia').value = c.dia;
                    document.getElementById('cliente-tecnico').value = c.tecnicoId || '';
                    document.getElementById('cliente-tipo').value = c.tipo;
                    document.getElementById('cliente-peso').value = c.peso;
                    document.getElementById('cliente-tempo').value = c.tempo || '';
                    document.getElementById('cliente-observacoes').value = c.obs || '';
                    document.getElementById('cliente-ativo').checked = c.status === 'ativo';
                }
            } else {
                if (title) title.textContent = 'Cadastrar Cliente';
                document.getElementById('form-cliente').reset();
                document.getElementById('cliente-id').value = '';
                document.getElementById('cliente-peso').value = '1';
            }
        } else if (tipo === 'tecnico') {
            const modal = document.getElementById('modal-tecnico');
            if (modal) {
                modal.classList.remove('hidden');
                document.getElementById('form-tecnico').reset();
                document.getElementById('tecnico-id').value = '';
            }
        } else if (tipo === 'zona') {
            const modal = document.getElementById('modal-zona');
            if (modal) {
                modal.classList.remove('hidden');
                document.getElementById('form-zona').reset();
                document.getElementById('zona-id').value = '';
            }
        }
    }

    function closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            document.querySelectorAll('[id^="modal-"]').forEach(m => m.classList.add('hidden'));
        }
    }

    // ==================== FORMULÁRIOS ====================
    function updatePeso() {
        const tipo = document.getElementById('cliente-tipo').value;
        const pesos = { 'simples': 1, 'media': 1.5, 'grande': 2, 'muito-pesada': 2.5 };
        document.getElementById('cliente-peso').value = pesos[tipo] || 1;
    }

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
        closeModal();
        showToast(id ? 'Cliente atualizado!' : 'Cliente cadastrado!', 'success');
        renderClientes();
        renderDashboard();
    }

    function saveTecnico(e) {
        e.preventDefault();
        const tecnico = {
            id: Date.now(),
            nome: document.getElementById('tecnico-nome').value,
            cor: document.getElementById('tecnico-cor').value,
            status: document.getElementById('tecnico-status').value,
            capacidadeIdeal: parseInt(document.getElementById('tecnico-capacidade-ideal').value),
            capacidadeMax: parseInt(document.getElementById('tecnico-capacidade-max').value),
            obs: '',
            whatsapp: ''
        };
        appData.tecnicos.push(tecnico);
        saveData();
        closeModal();
        populateSelects();
        showToast('Técnico cadastrado!', 'success');
        renderEquipe();
        renderDashboard();
    }

    function saveZona(e) {
        e.preventDefault();
        const zona = {
            id: Date.now(),
            nome: document.getElementById('zona-nome').value,
            cor: document.getElementById('zona-cor').value,
            descricao: document.getElementById('zona-descricao').value
        };
        appData.zonas.push(zona);
        saveData();
        closeModal();
        populateSelects();
        showToast('Zona cadastrada!', 'success');
        renderZonas();
    }

    function editCliente(id) {
        openModal('cliente', id);
    }

    function openReagendar(clienteId) {
        const cliente = appData.clientes.find(c => c.id === clienteId);
        if (!cliente) return;

        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById('modal-reagendar');
        if (overlay && modal) {
            overlay.classList.remove('hidden');
            modal.classList.remove('hidden');
            document.getElementById('reagendar-cliente-id').value = clienteId;
            document.getElementById('reagendar-cliente-nome').textContent = cliente.nome;

            const select = document.getElementById('reagendar-tecnico');
            select.innerHTML = '<option value="">Não atribuído</option>';
            appData.tecnicos.filter(t => t.status === 'disponivel').forEach(t => {
                select.innerHTML += `<option value="${t.id}">${t.nome}</option>`;
            });
        }
    }

    function saveReagendamento(e) {
        e.preventDefault();
        const clienteId = parseInt(document.getElementById('reagendar-cliente-id').value);
        const cliente = appData.clientes.find(c => c.id === clienteId);
        if (cliente) {
            cliente.dia = document.getElementById('reagendar-dia').value;
            const novoTecnico = document.getElementById('reagendar-tecnico').value;
            cliente.tecnicoId = novoTecnico ? parseInt(novoTecnico) : null;
            saveData();
            closeModal();
            showToast('Serviço reagendado!', 'success');
            renderClientes();
            renderDashboard();
        }
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

    // ==================== RENDERIZAÇÃO ====================
    function renderDashboard() {
        const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase();
        const diasMap = {'segunda-feira': 'segunda', 'terça-feira': 'terca', 'quarta-feira': 'quarta', 'quinta-feira': 'quinta', 'sexta-feira': 'sexta', 'sábado': 'sabado'};
        const diaHoje = diasMap[hoje] || 'segunda';

        const piscinasHoje = appData.clientes.filter(c => c.dia === diaHoje && c.status === 'ativo');
        const totalPontos = piscinasHoje.reduce((sum, c) => sum + c.peso, 0);
        const concluidas = piscinasHoje.filter(c => c.concluido).length;
        const pendentes = piscinasHoje.filter(c => !c.concluido).length;

        document.getElementById('stat-total-piscinas').textContent = piscinasHoje.length;
        document.getElementById('stat-total-pontos').textContent = totalPontos.toFixed(1);
        document.getElementById('stat-concluidas').textContent = concluidas;
        document.getElementById('stat-pendentes').textContent = pendentes;

        const alertsContainer = document.getElementById('alerts-container');
        if (alertsContainer) {
            alertsContainer.innerHTML = '';
            appData.tecnicos.forEach(t => {
                if (t.status !== 'disponivel') return;
                const piscinasTec = piscinasHoje.filter(c => c.tecnicoId === t.id);
                const pontosTec = piscinasTec.reduce((sum, c) => sum + c.peso, 0);

                if (pontosTec > t.capacidadeMax) {
                    alertsContainer.innerHTML += `<div class="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3 pulse-alert"><i class="fas fa-exclamation-triangle text-red-400 text-xl"></i><div><p class="font-semibold text-red-400">Sobrecarga: ${t.nome}</p><p class="text-sm text-gray-300">${pontosTec} pontos (limite: ${t.capacidadeMax})</p></div></div>`;
                } else if (pontosTec > t.capacidadeIdeal) {
                    alertsContainer.innerHTML += `<div class="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 flex items-center gap-3"><i class="fas fa-exclamation-circle text-yellow-400 text-xl"></i><div><p class="font-semibold text-yellow-400">Carga Elevada: ${t.nome}</p><p class="text-sm text-gray-300">${pontosTec}/${t.capacidadeMax} pts</p></div></div>`;
                }
            });
        }

        const teamContainer = document.getElementById('team-load-container');
        if (teamContainer) {
            teamContainer.innerHTML = '';
            appData.tecnicos.forEach(t => {
                const piscinasTec = piscinasHoje.filter(c => c.tecnicoId === t.id);
                const pontosTec = piscinasTec.reduce((sum, c) => sum + c.peso, 0);
                const percentual = Math.min((pontosTec / t.capacidadeMax) * 100, 100);
                let corBarra = 'bg-green-500';
                if (pontosTec > t.capacidadeIdeal) corBarra = 'bg-yellow-500';
                if (pontosTec > t.capacidadeMax) corBarra = 'bg-red-500';

                teamContainer.innerHTML += `<div class="glass-effect rounded-lg p-4"><div class="flex justify-between items-center mb-2"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full" style="background-color: ${t.cor}"></div><span class="font-semibold">${t.nome}</span></div><span class="text-sm ${pontosTec > t.capacidadeMax ? 'text-red-400' : 'text-gray-400'}">${pontosTec}/${t.capacidadeMax} pts</span></div><div class="w-full bg-white/10 rounded-full h-2"><div class="${corBarra} h-2 rounded-full transition-all" style="width: ${percentual}%"></div></div><p class="text-xs text-gray-400 mt-2">${piscinasTec.length} piscinas</p></div>`;
            });
        }

        const naoAtribuidos = appData.clientes.filter(c => c.tecnicoId === null && c.status === 'ativo').length;
        const countElement = document.getElementById('count-nao-atribuidos');
        if (countElement) {
            countElement.textContent = naoAtribuidos + ' piscinas pendentes';
        }
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
                        <button onclick="app.editCliente(${c.id})" class="text-acqua-light hover:text-white mr-3 transition-colors" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.openReagendar(${c.id})" class="text-yellow-400 hover:text-yellow-300 mr-3 transition-colors" title="Reagendar">
                            <i class="fas fa-calendar-alt"></i>
                        </button>
                        <button onclick="app.toggleConcluido(${c.id})" class="${c.concluido ? 'text-green-400' : 'text-gray-400'} hover:text-green-300 transition-colors" title="${c.concluido ? 'Concluído' : 'Marcar concluído'}">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </td>
                </tr>`;
        });
    }

    function searchClientes() {
        const termo = document.getElementById('search-clientes').value.toLowerCase();
        document.querySelectorAll('#clientes-table-body tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(termo) ? '' : 'none';
        });
    }

    function initMap() {
        if (map) return;
        const mapElement = document.getElementById('map-preview') || document.getElementById('map');
        if (!mapElement) return;
        map = L.map(mapElement).setView([-23.19, -45.88], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    }

    function renderMapa() {
        if (!map) initMap();
        markers.forEach(m => map.removeLayer(m));
        markers = [];

        appData.clientes.filter(c => c.status === 'ativo' && c.lat && c.lng).forEach(c => {
            const zona = appData.zonas.find(z => z.id === c.zonaId);
            const tecnico = appData.tecnicos.find(t => t.id === c.tecnicoId);

            const marker = L.circleMarker([c.lat, c.lng], {
                radius: 8, fillColor: zona?.cor || '#38bdf8', color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`<div style="min-width: 200px; color: #333;"><h3 style="margin: 0 0 5px 0; font-weight: bold;">${c.nome}</h3><p style="margin: 0; font-size: 12px;">${c.endereco}</p><p style="margin: 5px 0; font-size: 12px;"><span style="display: inline-block; width: 10px; height: 10px; background: ${zona?.cor}; border-radius: 50%; margin-right: 5px;"></span>${zona?.nome || 'Sem zona'}</p><p style="margin: 0; font-size: 12px;">Técnico: ${tecnico?.nome || 'Não atribuído'}</p><p style="margin: 0; font-size: 12px;">Peso: ${c.peso} pts • ${c.dia}</p></div>`);
            markers.push(marker);
        });

        setTimeout(() => map.invalidateSize(), 100);
    }

    function renderAgenda() {
        const diaSelecionado = document.getElementById('agenda-day-select').value;
        const container = document.getElementById('agenda-container');
        if (!container) return;

        let html = '<div class="space-y-4">';

        appData.tecnicos.filter(t => t.status === 'disponivel').forEach(t => {
            const piscinas = appData.clientes.filter(c => c.tecnicoId === t.id && c.dia === diaSelecionado && c.status === 'ativo');
            const pontos = piscinas.reduce((sum, c) => sum + c.peso, 0);

            html += `<div class="border border-white/10 rounded-lg p-4"><div class="flex justify-between items-center mb-3"><div class="flex items-center gap-2"><div class="w-4 h-4 rounded-full" style="background-color: ${t.cor}"></div><span class="font-semibold">${t.nome}</span><span class="text-sm text-gray-400">(${pontos} pts)</span></div><span class="text-sm ${pontos > t.capacidadeMax ? 'text-red-400' : pontos > t.capacidadeIdeal ? 'text-yellow-400' : 'text-green-400'}">${piscinas.length} piscinas</span></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">${piscinas.map(c => `<div class="bg-white/5 rounded p-2 text-sm border-l-4" style="border-color: ${appData.zonas.find(z => z.id === c.zonaId)?.cor || '#666'}"><div class="font-semibold">${c.nome}</div><div class="text-gray-400 text-xs">${c.bairro} • ${c.peso} pts</div></div>`).join('')}</div></div>`;
        });

        const naoAtribuidos = appData.clientes.filter(c => c.tecnicoId === null && c.dia === diaSelecionado && c.status === 'ativo');
        if (naoAtribuidos.length > 0) {
            html += `<div class="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-4"><div class="flex justify-between items-center mb-3"><span class="font-semibold text-yellow-400"><i class="fas fa-exclamation-triangle mr-2"></i>Não Atribuídos</span><span class="text-sm text-yellow-400">${naoAtribuidos.length} piscinas</span></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">${naoAtribuidos.map(c => `<div class="bg-white/5 rounded p-2 text-sm border-l-4 border-yellow-500"><div class="font-semibold">${c.nome}</div><div class="text-gray-400 text-xs">${c.bairro} • ${c.peso} pts</div></div>`).join('')}</div></div>`;
        }

        html += '</div>';
        container.innerHTML = html;
    }

    function renderNaoAtribuidos() {
        const container = document.getElementById('fila-nao-atribuidos');
        if (!container) return;

        const naoAtribuidos = appData.clientes.filter(c => c.tecnicoId === null && c.status === 'ativo');

        if (naoAtribuidos.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12"><i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i><p class="text-gray-400">Todas as piscinas estão atribuídas!</p></div>`;
            return;
        }

        container.innerHTML = '';
        naoAtribuidos.forEach(c => {
            const zona = appData.zonas.find(z => z.id === c.zonaId);
            container.innerHTML += `<div class="glass-effect rounded-xl p-4 border border-yellow-500/30 card-hover"><div class="flex justify-between items-start mb-2"><h4 class="font-semibold truncate">${c.nome}</h4><span class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">${c.peso} pts</span></div><p class="text-sm text-gray-400 mb-1">${c.bairro}</p><p class="text-sm text-gray-400 mb-3 capitalize">${c.dia}</p><div class="flex gap-2"><select onchange="app.atribuirTecnico(${c.id}, this.value)" class="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white outline-none focus:border-acqua-light"><option value="">Atribuir técnico...</option>${appData.tecnicos.filter(t => t.status === 'disponivel').map(t => `<option value="${t.id}">${t.nome}</option>`).join('')}</select><button onclick="app.openReagendar(${c.id})" class="text-acqua-light hover:text-white px-2"><i class="fas fa-calendar"></i></button></div></div>`;
        });
    }

    function atribuirTecnico(clienteId, tecnicoId) {
        if (!tecnicoId) return;
        const cliente = appData.clientes.find(c => c.id === clienteId);
        if (cliente) {
            cliente.tecnicoId = parseInt(tecnicoId);
            saveData();
            renderNaoAtribuidos();
            renderDashboard();
            showToast('Cliente atribuído!', 'success');
        }
    }

    function distribuirInteligente() {
        const naoAtribuidos = appData.clientes.filter(c => c.tecnicoId === null && c.status === 'ativo');
        const tecnicos = appData.tecnicos.filter(t => t.status === 'disponivel');

        naoAtribuidos.forEach(c => {
            let melhorTecnico = null;
            let menorCarga = Infinity;

            tecnicos.forEach(t => {
                const cargaAtual = appData.clientes.filter(cl => cl.tecnicoId === t.id && cl.dia === c.dia && cl.status === 'ativo').reduce((sum, cl) => sum + cl.peso, 0);
                if (cargaAtual < menorCarga && cargaAtual + c.peso <= t.capacidadeMax) {
                    menorCarga = cargaAtual;
                    melhorTecnico = t;
                }
            });

            if (melhorTecnico) c.tecnicoId = melhorTecnico.id;
        });

        saveData();
        renderNaoAtribuidos();
        renderDashboard();
        showToast('Distribuição inteligente concluída!', 'success');
    }

    function renderEquipe() {
        const container = document.getElementById('equipe-container');
        if (!container) return;

        container.innerHTML = '';
        appData.tecnicos.forEach(t => {
            const piscinasCount = appData.clientes.filter(c => c.tecnicoId === t.id && c.status === 'ativo').length;
            container.innerHTML += `<div class="glass-effect rounded-xl p-6 card-hover"><div class="flex justify-between items-start mb-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${t.cor}">${t.nome.charAt(0)}</div><div><h4 class="font-semibold">${t.nome}</h4><span class="text-xs px-2 py-1 rounded-full ${t.status === 'disponivel' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">${t.status}</span></div></div></div><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-400">Capacidade:</span><span>${t.capacidadeIdeal} - ${t.capacidadeMax} pts</span></div><div class="flex justify-between"><span class="text-gray-400">Piscinas:</span><span>${piscinasCount}</span></div></div><button onclick="app.enviarAgendaTecnico(${t.id})" class="w-full mt-4 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"><i class="fas fa-whatsapp"></i> Enviar Agenda</button></div>`;
        });
    }

    function renderZonas() {
        const container = document.getElementById('zonas-container');
        if (!container) return;

        container.innerHTML = '';
        appData.zonas.forEach(z => {
            const count = appData.clientes.filter(c => c.zonaId === z.id && c.status === 'ativo').length;
            container.innerHTML += `<div class="glass-effect rounded-xl p-6 card-hover border-t-4" style="border-color: ${z.cor}"><div class="flex justify-between items-start mb-2"><h4 class="font-semibold">${z.nome}</h4></div><p class="text-sm text-gray-400 mb-3">${z.descricao}</p><div class="flex items-center gap-2 text-sm"><span class="w-3 h-3 rounded-full" style="background-color: ${z.cor}"></span><span>${count} piscinas</span></div></div>`;
        });
    }

    function renderRelatorios() {
        const zonasContainer = document.getElementById('relatorio-zonas');
        if (zonasContainer) {
            zonasContainer.innerHTML = '';
            appData.zonas.forEach(z => {
                const clientes = appData.clientes.filter(c => c.zonaId === z.id && c.status === 'ativo');
                const totalPontos = clientes.reduce((sum, c) => sum + c.peso, 0);
                zonasContainer.innerHTML += `<div class="flex justify-between items-center p-3 bg-white/5 rounded-lg"><div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full" style="background-color: ${z.cor}"></span><span>${z.nome}</span></div><div class="text-right"><div class="font-semibold">${clientes.length} piscinas</div><div class="text-sm text-gray-400">${totalPontos.toFixed(1)} pts</div></div></div>`;
            });
        }

        const tecnicosContainer = document.getElementById('relatorio-tecnicos');
        if (tecnicosContainer) {
            tecnicosContainer.innerHTML = '';
            appData.tecnicos.forEach(t => {
                const clientes = appData.clientes.filter(c => c.tecnicoId === t.id && c.status === 'ativo');
                const totalPontos = clientes.reduce((sum, c) => sum + c.peso, 0);
                const concluidos = clientes.filter(c => c.concluido).length;
                tecnicosContainer.innerHTML += `<div class="flex justify-between items-center p-3 bg-white/5 rounded-lg"><div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full" style="background-color: ${t.cor}"></span><span>${t.nome}</span></div><div class="text-right"><div class="font-semibold">${clientes.length} piscinas</div><div class="text-sm text-gray-400">${concluidos}/${clientes.length} concluídas • ${totalPontos.toFixed(1)} pts</div></div></div>`;
            });
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

        const tecnicoSelects = ['cliente-tecnico', 'reagendar-tecnico'];
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

    // ==================== EXPORTAÇÃO ====================
    function exportarRelatorio() {
        let csv = 'Cliente,Piscina,Endereco,Bairro,Zona,Dia,Tecnico,Peso,Status\n';
        appData.clientes.filter(c => c.status === 'ativo').forEach(c => {
            const zona = appData.zonas.find(z => z.id === c.zonaId)?.nome || '';
            const tecnico = appData.tecnicos.find(t => t.id === c.tecnicoId)?.nome || 'Não atribuído';
            csv += `"${c.nome}","${c.piscina || ''}","${c.endereco}","${c.bairro}","${zona}","${c.dia}","${tecnico}",${c.peso},"${c.concluido ? 'Concluído' : 'Pendente'}"\n`;
        });
        downloadFile(csv, 'relatorio_acquashow.csv', 'text/csv');
    }

    function exportarJSON() {
        downloadFile(JSON.stringify(appData, null, 2), 'dados_acquashow.json', 'application/json');
    }

    function downloadFile(content, filename, type) {
        const blob = new Blob([content], { type: type + ';charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    // ==================== WHATSAPP ====================
    function enviarAgendaTecnico(tecnicoId) {
        const tecnico = appData.tecnicos.find(t => t.id === tecnicoId);
        if (!tecnico) return;

        const hoje = new Date();
        const diaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][hoje.getDay()];
        
        const clientes = appData.clientes.filter(c => 
            c.tecnicoId === tecnicoId && c.dia === diaSemana && c.status === 'ativo'
        );

        if (clientes.length === 0) {
            showToast('Nenhum cliente agendado para hoje', 'info');
            return;
        }

        let mensagem = `*📋 Agenda de ${tecnico.nome} - ${hoje.toLocaleDateString('pt-BR')}*\n`;
        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        let totalPontos = 0;
        let totalTempo = 0;

        clientes.forEach((c, index) => {
            mensagem += `${index + 1}. *${c.nome}*\n`;
            mensagem += `   📍 ${c.endereco}\n`;
            mensagem += `   🏘️ ${c.bairro}\n`;
            mensagem += `   ⚖️ Peso: ${c.peso} pts | ⏱️ Tempo: ${c.tempo} min\n`;
            if (c.obs) mensagem += `   📝 ${c.obs}\n`;
            mensagem += '\n';

            totalPontos += c.peso;
            totalTempo += c.tempo;
        });

        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        mensagem += `*Resumo:*\n`;
        mensagem += `📊 Total: ${clientes.length} piscinas\n`;
        mensagem += `⚖️ Pontos: ${totalPontos.toFixed(1)} pts\n`;
        mensagem += `⏱️ Tempo total: ${totalTempo} min\n\n`;
        mensagem += `🔗 Acesse sua agenda: ${window.location.origin}/worker.html?tecnico=${tecnicoId}\n`;
        mensagem += '_Acquashow Piscinas_';

        if (typeof WhatsAppIntegration !== 'undefined') {
            WhatsAppIntegration.compartilharWhatsApp(mensagem);
        } else {
            alert('Módulo WhatsApp não disponível');
        }
    }

    function exportarTecnicosWhatsApp() {
        if (typeof WhatsAppIntegration !== 'undefined') {
            WhatsAppIntegration.compartilharTecnicos(appData.tecnicos);
        } else {
            showToast('Erro ao compartilhar', 'error');
        }
    }

    // ==================== UTILITÁRIOS ====================
    function showToast(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Você pode implementar um toast visual aqui se desejar
    }

    function syncData() {
        showToast('Sincronizando dados...', 'info');
        saveData();
        setTimeout(() => {
            showToast('Dados sincronizados!', 'success');
        }, 1000);
    }

    // ==================== API PÚBLICA ====================
    return {
        init,
        showSection,
        toggleSidebar,
        openModal,
        closeModal,
        updatePeso,
        saveCliente,
        saveTecnico,
        saveZona,
        editCliente,
        openReagendar,
        saveReagendamento,
        toggleConcluido,
        searchClientes,
        atribuirTecnico,
        distribuirInteligente,
        exportarRelatorio,
        exportarJSON,
        syncData,
        renderAgenda,
        renderMapa,
        renderClientes,
        renderEquipe,
        renderZonas,
        renderDashboard,
        renderNaoAtribuidos,
        enviarAgendaTecnico,
        exportarTecnicosWhatsApp,
        populateSelects
    };

})();

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', AcquashowApp.init);

// Expor globalmente
window.app = AcquashowApp;
