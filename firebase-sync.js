/**
 * Firebase Sync Module
 * Sincroniza dados entre localStorage e Firestore
 */

const FirebaseSync = (function() {
    'use strict';

    // Configurações
    const COLLECTIONS = {
        clientes: 'clientes',
        tecnicos: 'tecnicos',
        zonas: 'zonas'
    };

    let syncEnabled = false;
    let userId = null;

    /**
     * Inicializar sincronização com Firebase
     */
    function init() {
        // Verificar se Firebase está disponível
        if (typeof firebase === 'undefined' || !firebase.firestore) {
            console.warn('⚠️ Firebase não está disponível. Usando apenas localStorage.');
            return false;
        }

        // Tentar autenticar anonimamente
        firebase.auth().signInAnonymously()
            .then(userCredential => {
                userId = userCredential.user.uid;
                syncEnabled = true;
                console.log('✅ Firebase Sync ativado para usuário:', userId);
                
                // Sincronizar dados ao inicializar
                syncFromFirestore();
            })
            .catch(error => {
                console.warn('⚠️ Erro ao autenticar com Firebase:', error.message);
                syncEnabled = false;
            });

        return true;
    }

    /**
     * Sincronizar dados do Firestore para localStorage
     */
    function syncFromFirestore() {
        if (!syncEnabled || !userId) return;

        const db = firebase.firestore();
        const userRef = db.collection('users').doc(userId);

        userRef.get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.appData) {
                        localStorage.setItem('acquashow_data', JSON.stringify(data.appData));
                        console.log('✅ Dados sincronizados do Firestore');
                        
                        // Recarregar a aplicação
                        if (window.app && window.app.init) {
                            window.app.init();
                        }
                    }
                }
            })
            .catch(error => console.warn('⚠️ Erro ao sincronizar do Firestore:', error));
    }

    /**
     * Sincronizar dados do localStorage para Firestore
     */
    function syncToFirestore(appData) {
        if (!syncEnabled || !userId) {
            console.log('ℹ️ Sync desativado. Dados salvos apenas em localStorage.');
            return Promise.resolve();
        }

        const db = firebase.firestore();
        const userRef = db.collection('users').doc(userId);

        return userRef.set({
            appData: appData,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: new Date().toISOString()
        }, { merge: true })
            .then(() => {
                console.log('✅ Dados sincronizados para Firestore');
            })
            .catch(error => {
                console.warn('⚠️ Erro ao sincronizar para Firestore:', error);
            });
    }

    /**
     * Exportar lista de técnicos para WhatsApp
     */
    function exportarParaWhatsApp(tecnicos) {
        if (!tecnicos || tecnicos.length === 0) {
            alert('Nenhum técnico para exportar');
            return;
        }

        let mensagem = '*Acquashow - Lista de Técnicos*\n\n';
        
        tecnicos.forEach((t, index) => {
            mensagem += `${index + 1}. *${t.nome}*\n`;
            mensagem += `   Status: ${t.status}\n`;
            mensagem += `   Capacidade: ${t.capacidadeIdeal} - ${t.capacidadeMax} pts\n\n`;
        });

        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Abrir WhatsApp Web ou App
        const whatsappUrl = `https://wa.me/?text=${mensagemCodificada}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Gerar link de compartilhamento para funcionários
     */
    function gerarLinkCompartilhamento() {
        if (!userId) {
            alert('Erro: Usuário não autenticado');
            return null;
        }

        // Criar URL com ID do usuário para acesso dos funcionários
        const baseUrl = window.location.origin;
        const linkCompartilhamento = `${baseUrl}?userId=${userId}&role=funcionario`;
        
        return linkCompartilhamento;
    }

    /**
     * Copiar link para clipboard
     */
    function copiarLinkParaClipboard() {
        const link = gerarLinkCompartilhamento();
        if (!link) return;

        navigator.clipboard.writeText(link)
            .then(() => {
                alert('Link copiado para clipboard!');
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                alert('Erro ao copiar link');
            });
    }

    // API Pública
    return {
        init,
        syncFromFirestore,
        syncToFirestore,
        exportarParaWhatsApp,
        gerarLinkCompartilhamento,
        copiarLinkParaClipboard,
        isEnabled: () => syncEnabled,
        getUserId: () => userId
    };

})();

// Inicializar sincronização quando Firebase estiver pronto
// DESABILITADO TEMPORARIAMENTE PARA EVITAR CONFLITOS COM APP.JS
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', FirebaseSync.init);
// } else {
//     FirebaseSync.init();
// }
