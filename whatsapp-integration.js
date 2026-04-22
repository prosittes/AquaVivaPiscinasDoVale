/**
 * WhatsApp Integration Module
 * Gerencia compartilhamento de dados via WhatsApp
 */

const WhatsAppIntegration = (function() {
    'use strict';

    /**
     * Gerar mensagem formatada com lista de técnicos
     */
    function gerarMensagemTecnicos(tecnicos) {
        if (!tecnicos || tecnicos.length === 0) {
            return 'Nenhum técnico disponível';
        }

        let mensagem = '*🏊 Acquashow - Lista de Técnicos*\n';
        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        tecnicos.forEach((t, index) => {
            const statusEmoji = t.status === 'disponivel' ? '✅' : '⏸️';
            mensagem += `${index + 1}. *${t.nome}* ${statusEmoji}\n`;
            mensagem += `   📊 Capacidade: ${t.capacidadeIdeal} - ${t.capacidadeMax} pts\n`;
            mensagem += `   Status: ${t.status}\n`;
            if (t.obs) {
                mensagem += `   📝 ${t.obs}\n`;
            }
            mensagem += '\n';
        });

        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        mensagem += '_Enviado via Acquashow Piscinas_';

        return mensagem;
    }

    /**
     * Gerar mensagem formatada com agenda do dia
     */
    function gerarMensagemAgenda(clientes, tecnico, dia) {
        if (!clientes || clientes.length === 0) {
            return `Nenhum cliente agendado para ${dia}`;
        }

        let mensagem = `*🗓️ Agenda de ${tecnico.nome} - ${dia.toUpperCase()}*\n`;
        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        let totalPontos = 0;
        let totalTempo = 0;

        clientes.forEach((c, index) => {
            const statusEmoji = c.concluido ? '✅' : '⏳';
            mensagem += `${index + 1}. *${c.nome}* ${statusEmoji}\n`;
            mensagem += `   📍 ${c.endereco}\n`;
            mensagem += `   🏘️ ${c.bairro}\n`;
            mensagem += `   ⚖️ Peso: ${c.peso} pts | ⏱️ Tempo: ${c.tempo} min\n`;
            if (c.obs) {
                mensagem += `   📝 ${c.obs}\n`;
            }
            mensagem += '\n';

            totalPontos += c.peso;
            totalTempo += c.tempo;
        });

        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        mensagem += `*Resumo:*\n`;
        mensagem += `📊 Total: ${clientes.length} piscinas\n`;
        mensagem += `⚖️ Pontos: ${totalPontos.toFixed(1)} pts\n`;
        mensagem += `⏱️ Tempo total: ${totalTempo} min\n`;
        mensagem += '_Enviado via Acquashow Piscinas_';

        return mensagem;
    }

    /**
     * Gerar mensagem com link de acesso para funcionário
     */
    function gerarMensagemAcesso(tecnico, link) {
        let mensagem = `*🔐 Acesso Acquashow - ${tecnico.nome}*\n`;
        mensagem += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        mensagem += 'Olá! 👋\n\n';
        mensagem += 'Você foi adicionado ao sistema Acquashow Piscinas.\n\n';
        mensagem += 'Clique no link abaixo para acessar sua agenda:\n\n';
        mensagem += `🔗 ${link}\n\n`;
        mensagem += 'Você poderá visualizar:\n';
        mensagem += '✅ Sua agenda semanal\n';
        mensagem += '✅ Mapa de rotas\n';
        mensagem += '✅ Detalhes de cada cliente\n';
        mensagem += '✅ Pontos e tempo estimado\n\n';
        mensagem += 'Qualquer dúvida, entre em contato!\n\n';
        mensagem += '_Acquashow Piscinas_';

        return mensagem;
    }

    /**
     * Compartilhar via WhatsApp Web
     */
    function compartilharWhatsApp(mensagem, numeroWhatsApp = null) {
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        let url;
        if (numeroWhatsApp) {
            // Compartilhar com número específico
            url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
        } else {
            // Abrir WhatsApp Web sem número específico
            url = `https://wa.me/?text=${mensagemCodificada}`;
        }

        window.open(url, '_blank', 'width=800,height=600');
    }

    /**
     * Copiar mensagem para clipboard
     */
    function copiarParaClipboard(mensagem) {
        navigator.clipboard.writeText(mensagem)
            .then(() => {
                alert('✅ Mensagem copiada para clipboard!');
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                alert('❌ Erro ao copiar mensagem');
            });
    }

    /**
     * Compartilhar lista de técnicos
     */
    function compartilharTecnicos(tecnicos, numeroWhatsApp = null) {
        const mensagem = gerarMensagemTecnicos(tecnicos);
        compartilharWhatsApp(mensagem, numeroWhatsApp);
    }

    /**
     * Compartilhar agenda de um técnico
     */
    function compartilharAgenda(clientes, tecnico, dia, numeroWhatsApp = null) {
        const mensagem = gerarMensagemAgenda(clientes, tecnico, dia);
        compartilharWhatsApp(mensagem, numeroWhatsApp);
    }

    /**
     * Compartilhar link de acesso
     */
    function compartilharAcesso(tecnico, link, numeroWhatsApp = null) {
        const mensagem = gerarMensagemAcesso(tecnico, link);
        compartilharWhatsApp(mensagem, numeroWhatsApp);
    }

    /**
     * Gerar QR Code para link de acesso (usando API externa)
     */
    function gerarQRCode(link) {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
        return qrCodeUrl;
    }

    /**
     * Enviar para múltiplos números
     */
    function enviarParaMultiplos(mensagem, numeros) {
        if (!numeros || numeros.length === 0) {
            alert('Nenhum número fornecido');
            return;
        }

        numeros.forEach((numero, index) => {
            setTimeout(() => {
                compartilharWhatsApp(mensagem, numero);
            }, index * 500); // Delay entre envios
        });
    }

    // API Pública
    return {
        gerarMensagemTecnicos,
        gerarMensagemAgenda,
        gerarMensagemAcesso,
        compartilharWhatsApp,
        copiarParaClipboard,
        compartilharTecnicos,
        compartilharAgenda,
        compartilharAcesso,
        gerarQRCode,
        enviarParaMultiplos
    };

})();
