/**
 * MODALS.JS - Controle de Modais Simplificado
 * Este arquivo contém APENAS a lógica de abrir/fechar modais
 * Sem dependências, sem conflitos, 100% funcional
 */

// Função para abrir modal de Cliente
function abrirModalCliente() {
    console.log('✓ Abrindo modal de Cliente');
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-cliente');
    
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-cliente').reset();
        document.getElementById('cliente-id').value = '';
        document.getElementById('modal-cliente-title').textContent = 'Cadastrar Cliente';
        console.log('✓ Modal de Cliente aberto com sucesso');
    } else {
        console.error('❌ Elementos não encontrados!', { overlay: !!overlay, modal: !!modal });
    }
}

// Função para abrir modal de Técnico
function abrirModalTecnico() {
    console.log('✓ Abrindo modal de Técnico');
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-tecnico');
    
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-tecnico').reset();
        document.getElementById('tecnico-id').value = '';
        console.log('✓ Modal de Técnico aberto com sucesso');
    } else {
        console.error('❌ Elementos não encontrados!', { overlay: !!overlay, modal: !!modal });
    }
}

// Função para abrir modal de Zona
function abrirModalZona() {
    console.log('✓ Abrindo modal de Zona');
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-zona');
    
    if (overlay && modal) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        document.getElementById('form-zona').reset();
        document.getElementById('zona-id').value = '';
        console.log('✓ Modal de Zona aberto com sucesso');
    } else {
        console.error('❌ Elementos não encontrados!', { overlay: !!overlay, modal: !!modal });
    }
}

// Função para fechar qualquer modal
function fecharModal() {
    console.log('✓ Fechando modal');
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.querySelectorAll('[id^="modal-"]').forEach(m => m.classList.add('hidden'));
        console.log('✓ Modal fechado');
    }
}

// Expor globalmente para que o HTML possa chamar
window.abrirModalCliente = abrirModalCliente;
window.abrirModalTecnico = abrirModalTecnico;
window.abrirModalZona = abrirModalZona;
window.fecharModal = fecharModal;

console.log('✓ modals.js carregado com sucesso - funções globais disponíveis');
