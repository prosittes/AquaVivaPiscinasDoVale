/**
 * ZONAS-MANAGER.JS - Gerenciamento de Zonas e Remanejamento
 * Funções para editar zonas e remanejamento de piscinas/funcionários
 */

// Variável global para armazenar a zona em edição
let zonaEmEdicao = null;

// Função para abrir modal de edição de zona
function editarZona(zonaId) {
    console.log('✓ Abrindo edição de zona:', zonaId);
    const zona = window.app.appData.zonas.find(z => z.id === zonaId);
    
    if (!zona) {
        console.error('❌ Zona não encontrada!');
        return;
    }
    
    zonaEmEdicao = zona;
    
    // Preencher formulário com dados da zona
    document.getElementById('zona-id').value = zona.id;
    document.getElementById('zona-nome').value = zona.nome;
    document.getElementById('zona-cor').value = zona.cor;
    document.getElementById('zona-descricao').value = zona.descricao;
    
    // Atualizar título do modal
    const title = document.querySelector('#modal-zona h3');
    if (title) title.textContent = 'Editar Zona';
    
    // Abrir modal
    abrirModalZona();
}

// Função para abrir interface de remanejamento
function abrirRemanejamento(zonaId) {
    console.log('✓ Abrindo remanejamento para zona:', zonaId);
    const zona = window.app.appData.zonas.find(z => z.id === zonaId);
    
    if (!zona) {
        console.error('❌ Zona não encontrada!');
        return;
    }
    
    // Criar overlay
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) {
        console.error('❌ Modal overlay não encontrado!');
        return;
    }
    
    // Remover modal anterior se existir
    let remanejamentoModal = document.getElementById('modal-remanejamento');
    if (remanejamentoModal) {
        remanejamentoModal.remove();
    }
    
    // Pegar piscinas da zona
    const piscinasZona = window.app.appData.clientes.filter(c => c.zonaId === zonaId && c.status === 'ativo');
    
    if (piscinasZona.length === 0) {
        alert('Nenhuma piscina nesta zona!');
        return;
    }
    
    // Criar HTML do modal de remanejamento
    let html = `
        <div id="modal-remanejamento" class="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto hidden border border-white/10">
            <div class="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 class="text-xl font-semibold">Remanejamento - ${zona.nome}</h3>
                <button onclick="fecharRemanejamento()" class="text-gray-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
            </div>
            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Piscinas da Zona -->
                    <div>
                        <h4 class="font-semibold mb-3">Piscinas em ${zona.nome}</h4>
                        <div id="piscinas-zona" class="space-y-2 max-h-96 overflow-y-auto">
    `;
    
    piscinasZona.forEach(piscina => {
        const tecnico = window.app.appData.tecnicos.find(t => t.id === piscina.tecnicoId);
        const tecnicoNome = tecnico ? tecnico.nome : 'Não atribuído';
        
        html += `
            <div class="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-start">
                <div class="flex-1">
                    <p class="font-sm font-semibold">${piscina.nome}</p>
                    <p class="text-xs text-gray-400">${piscina.endereco}</p>
                    <p class="text-xs text-gray-500">Técnico: ${tecnicoNome}</p>
                </div>
                <button onclick="abrirTrocaTecnico(${piscina.id})" class="text-yellow-400 hover:text-yellow-300 transition-colors" title="Trocar técnico">
                    <i class="fas fa-exchange-alt"></i>
                </button>
            </div>
        `;
    });
    
    html += `
                        </div>
                    </div>
                    
                    <!-- Opções de Remanejamento -->
                    <div>
                        <h4 class="font-semibold mb-3">Ações</h4>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm text-gray-300 mb-2">Atribuir todas as piscinas a:</label>
                                <select id="tecnico-remanejamento" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-acqua-light text-white">
                                    <option value="">Selecione um técnico</option>
    `;
    
    window.app.appData.tecnicos.filter(t => t.status === 'disponivel').forEach(t => {
        html += `<option value="${t.id}">${t.nome}</option>`;
    });
    
    html += `
                                </select>
                            </div>
                            <button onclick="remanejamentoPorTecnico(${zonaId})" class="w-full bg-acqua-primary hover:bg-acqua-light text-white px-4 py-2 rounded-lg transition-colors">
                                Atribuir Todas
                            </button>
                            
                            <hr class="border-white/10 my-4">
                            
                            <div>
                                <label class="block text-sm text-gray-300 mb-2">Dividir para múltiplos técnicos:</label>
                                <button onclick="dividirZonaEquitativamente(${zonaId})" class="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors">
                                    Distribuição Inteligente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao overlay
    overlay.insertAdjacentHTML('beforeend', html);
    
    // Mostrar overlay e modal
    overlay.classList.remove('hidden');
    const remanejamentoModalElement = document.getElementById('modal-remanejamento');
    if (remanejamentoModalElement) {
        remanejamentoModalElement.classList.remove('hidden');
    }
}

// Função para fechar modal de remanejamento
function fecharRemanejamento() {
    const modal = document.getElementById('modal-remanejamento');
    if (modal) {
        modal.remove();
    }
    
    // Verificar se ainda há outros modais abertos
    const overlay = document.getElementById('modal-overlay');
    const modaisAbertos = overlay.querySelectorAll('div:not(.hidden)[id^="modal-"]').length;
    if (modaisAbertos === 0) {
        overlay.classList.add('hidden');
    }
}

// Função para abrir seleção de técnico para uma piscina específica
function abrirTrocaTecnico(piscinaId) {
    const piscina = window.app.appData.clientes.find(c => c.id === piscinaId);
    if (!piscina) return;
    
    const tecnicoAtual = window.app.appData.tecnicos.find(t => t.id === piscina.tecnicoId);
    
    let html = `
        <div id="modal-troca-tecnico" class="bg-slate-800 rounded-xl max-w-md w-full hidden border border-white/10">
            <div class="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 class="text-xl font-semibold">Trocar Técnico</h3>
                <button onclick="document.getElementById('modal-troca-tecnico').remove()" class="text-gray-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <p class="text-sm text-gray-400 mb-2">Piscina: <strong>${piscina.nome}</strong></p>
                    <p class="text-sm text-gray-400 mb-4">Técnico atual: <strong>${tecnicoAtual ? tecnicoAtual.nome : 'Não atribuído'}</strong></p>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-2">Novo Técnico:</label>
                    <select id="novo-tecnico-select" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-acqua-light text-white">
                        <option value="">Não atribuído</option>
    `;
    
    window.app.appData.tecnicos.filter(t => t.status === 'disponivel').forEach(t => {
        html += `<option value="${t.id}" ${t.id === piscina.tecnicoId ? 'selected' : ''}>${t.nome}</option>`;
    });
    
    html += `
                    </select>
                </div>
                <div class="flex gap-2">
                    <button onclick="document.getElementById('modal-troca-tecnico').remove()" class="flex-1 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">Cancelar</button>
                    <button onclick="confirmarTrocaTecnico(${piscinaId})" class="flex-1 px-4 py-2 rounded-lg bg-acqua-primary hover:bg-acqua-light text-white">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    
    const overlay = document.getElementById('modal-overlay');
    overlay.insertAdjacentHTML('beforeend', html);
    overlay.classList.remove('hidden');
    document.getElementById('modal-troca-tecnico').classList.remove('hidden');
}

// Função para confirmar troca de técnico
function confirmarTrocaTecnico(piscinaId) {
    const novoTecnicoId = document.getElementById('novo-tecnico-select').value;
    const piscina = window.app.appData.clientes.find(c => c.id === piscinaId);
    
    if (piscina) {
        piscina.tecnicoId = novoTecnicoId ? parseInt(novoTecnicoId) : null;
        window.app.saveData();
        
        // Fechar modal e atualizar
        document.getElementById('modal-troca-tecnico').remove();
        abrirRemanejamento(piscina.zonaId);
        
        console.log('✓ Técnico alterado com sucesso');
    }
}

// Função para remanejamento por técnico (atribuir todas as piscinas da zona a um técnico)
function remanejamentoPorTecnico(zonaId) {
    const tecnicoId = document.getElementById('tecnico-remanejamento').value;
    
    if (!tecnicoId) {
        alert('Selecione um técnico!');
        return;
    }
    
    const piscinasZona = window.app.appData.clientes.filter(c => c.zonaId === zonaId && c.status === 'ativo');
    
    piscinasZona.forEach(piscina => {
        piscina.tecnicoId = parseInt(tecnicoId);
    });
    
    window.app.saveData();
    window.app.renderDashboard();
    window.app.renderClientes();
    
    alert(`${piscinasZona.length} piscinas atribuídas com sucesso!`);
    fecharRemanejamento();
    window.app.renderZonas();
    
    console.log('✓ Remanejamento concluído');
}

// Função para distribuição inteligente (dividir piscinas entre múltiplos técnicos)
function dividirZonaEquitativamente(zonaId) {
    const piscinasZona = window.app.appData.clientes.filter(c => c.zonaId === zonaId && c.status === 'ativo');
    const tecnicos = window.app.appData.tecnicos.filter(t => t.status === 'disponivel');
    
    if (tecnicos.length === 0) {
        alert('Nenhum técnico disponível!');
        return;
    }
    
    if (piscinasZona.length === 0) {
        alert('Nenhuma piscina nesta zona!');
        return;
    }
    
    // Distribuir piscinas equitativamente
    let tecnicoIndex = 0;
    piscinasZona.forEach((piscina, index) => {
        piscina.tecnicoId = tecnicos[tecnicoIndex % tecnicos.length].id;
        tecnicoIndex++;
    });
    
    window.app.saveData();
    window.app.renderDashboard();
    window.app.renderClientes();
    
    alert(`Piscinas distribuídas entre ${tecnicos.length} técnicos!`);
    fecharRemanejamento();
    window.app.renderZonas();
    
    console.log('✓ Distribuição inteligente concluída');
}

console.log('✓ zonas-manager.js carregado com sucesso');
