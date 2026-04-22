/**
 * GEOCODING - Sistema de Busca de Endereços
 * Integração com Nominatim (OpenStreetMap) para autocompletar endereços
 * e obter coordenadas (Latitude/Longitude) automaticamente
 */

class GeocodingService {
    constructor() {
        this.cache = {};
        this.debounceTimer = null;
    }

    /**
     * Busca endereços usando Nominatim (OpenStreetMap)
     * @param {string} query - Endereço ou bairro para buscar
     * @returns {Promise<Array>} Lista de resultados
     */
    async searchAddress(query) {
        if (!query || query.length < 3) return [];
        
        // Verificar cache
        if (this.cache[query]) {
            return this.cache[query];
        }

        try {
            // Usar Nominatim (OpenStreetMap) - Gratuito e sem API Key
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=br&limit=5`,
                {
                    headers: {
                        'User-Agent': 'Acquashow-App'
                    }
                }
            );

            if (!response.ok) throw new Error('Erro na busca');

            const results = await response.json();
            const formatted = results.map(r => ({
                display_name: r.display_name,
                lat: parseFloat(r.lat),
                lng: parseFloat(r.lon),
                address: r.address || {},
                type: r.type
            }));

            // Cachear resultado
            this.cache[query] = formatted;
            return formatted;
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            return [];
        }
    }

    /**
     * Busca reversa: obtém endereço a partir de coordenadas
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @returns {Promise<Object>} Informações do endereço
     */
    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
                {
                    headers: {
                        'User-Agent': 'Acquashow-App'
                    }
                }
            );

            if (!response.ok) throw new Error('Erro na busca reversa');

            const result = await response.json();
            return {
                address: result.address?.road || '',
                bairro: result.address?.neighbourhood || result.address?.suburb || '',
                cidade: result.address?.city || '',
                display_name: result.display_name
            };
        } catch (error) {
            console.error('Erro ao fazer busca reversa:', error);
            return null;
        }
    }

    /**
     * Extrai bairro do resultado da busca
     * @param {Object} result - Resultado do Nominatim
     * @returns {string} Nome do bairro
     */
    extractBairro(result) {
        if (result.address) {
            return result.address.neighbourhood || 
                   result.address.suburb || 
                   result.address.district || 
                   '';
        }
        return '';
    }

    /**
     * Extrai rua do resultado da busca
     * @param {Object} result - Resultado do Nominatim
     * @returns {string} Nome da rua
     */
    extractRua(result) {
        if (result.address) {
            return result.address.road || result.address.street || '';
        }
        return '';
    }
}

// Instância global
const geocoding = new GeocodingService();

/**
 * Inicializa o autocomplete no campo de endereço
 * @param {string} inputId - ID do input de endereço
 * @param {string} bairroInputId - ID do input de bairro
 * @param {string} latInputId - ID do input de latitude
 * @param {string} lngInputId - ID do input de longitude
 */
function initAddressAutocomplete(inputId, bairroInputId, latInputId, lngInputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    let suggestionsContainer = document.getElementById(inputId + '-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = inputId + '-suggestions';
        suggestionsContainer.className = 'absolute bg-slate-800 border border-acqua-light/30 rounded-lg mt-1 max-h-48 overflow-y-auto z-50 w-full';
        suggestionsContainer.style.display = 'none';
        input.parentElement.appendChild(suggestionsContainer);
    }

    input.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length < 3) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        // Debounce da busca
        clearTimeout(geocoding.debounceTimer);
        geocoding.debounceTimer = setTimeout(async () => {
            const results = await geocoding.searchAddress(query);
            
            if (results.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            suggestionsContainer.innerHTML = results.map((result, index) => `
                <div class="p-2 border-b border-white/10 cursor-pointer hover:bg-acqua-primary/20 text-white text-sm"
                     onclick="selectAddressSuggestion(${index}, '${inputId}', '${bairroInputId}', '${latInputId}', '${lngInputId}')">
                    <div class="font-semibold">${geocoding.extractRua(result) || result.display_name.split(',')[0]}</div>
                    <div class="text-xs text-gray-400">${geocoding.extractBairro(result) || result.display_name.split(',')[1] || ''}</div>
                </div>
            `).join('');

            suggestionsContainer.style.display = 'block';
        }, 300);
    });

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', function(e) {
        if (e.target !== input && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

/**
 * Seleciona uma sugestão de endereço
 * @param {number} index - Índice do resultado
 * @param {string} inputId - ID do input de endereço
 * @param {string} bairroInputId - ID do input de bairro
 * @param {string} latInputId - ID do input de latitude
 * @param {string} lngInputId - ID do input de longitude
 */
async function selectAddressSuggestion(index, inputId, bairroInputId, latInputId, lngInputId) {
    const input = document.getElementById(inputId);
    const bairroInput = document.getElementById(bairroInputId);
    const latInput = document.getElementById(latInputId);
    const lngInput = document.getElementById(lngInputId);

    // Buscar novamente para obter o resultado completo
    const query = input.value.trim();
    const results = await geocoding.searchAddress(query);
    
    if (results[index]) {
        const result = results[index];
        
        // Preencher campos
        input.value = geocoding.extractRua(result) || result.display_name.split(',')[0];
        if (bairroInput) bairroInput.value = geocoding.extractBairro(result);
        if (latInput) latInput.value = result.lat.toFixed(6);
        if (lngInput) lngInput.value = result.lng.toFixed(6);

        // Fechar sugestões
        const suggestionsContainer = document.getElementById(inputId + '-suggestions');
        if (suggestionsContainer) suggestionsContainer.style.display = 'none';

        console.log('✓ Endereço selecionado:', result);
    }
}

// Exportar para uso global
window.geocoding = geocoding;
window.initAddressAutocomplete = initAddressAutocomplete;
window.selectAddressSuggestion = selectAddressSuggestion;

console.log('✓ geocoding.js carregado - Sistema de busca de endereços ativo');
