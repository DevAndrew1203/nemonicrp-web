/**
 * NemonicRP - Sistema de Autenticação Discord (Implicit Grant Flow)
 */

const CONFIG = {
    clientId: '1490827213879115786', // ID oficial do seu projeto Discord
    redirectUri: window.location.origin + '/loja.html',
    scope: 'identify',
};

const Auth = {
    // Inicia o processo de redirecionamento para o Discord em uma nova guia
    login() {
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CONFIG.clientId}&redirect_uri=${encodeURIComponent(CONFIG.redirectUri)}&response_type=token&scope=${CONFIG.scope}`;
        window.open(authUrl, '_blank');
    },

    // Desloga o usuário
    logout() {
        localStorage.removeItem('discord_user');
        localStorage.removeItem('discord_token');
        window.location.href = 'loja.html';
    },

    // Verifica se há um token na URL (retorno do Discord) ou no LocalStorage
    init() {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = fragment.get('access_token');

        if (accessToken) {
            // Limpa o hash da URL para ficar limpo
            window.history.replaceState({}, document.title, window.location.pathname);
            this.handleToken(accessToken);
        } else {
            this.updateUI();
        }
    },

    // Busca dados do usuário na API do Discord
    async handleToken(token) {
        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await response.json();

            if (userData.id) {
                localStorage.setItem('discord_user', JSON.stringify(userData));
                localStorage.setItem('discord_token', token);
                this.updateUI();
            }
        } catch (error) {
            console.error('Erro ao buscar dados do Discord:', error);
        }
    },

    // Atualiza a interface da página baseado no estado de login
    updateUI() {
        const user = JSON.parse(localStorage.getItem('discord_user'));
        const loginContainer = document.getElementById('auth-status');
        const buyButtons = document.querySelectorAll('.btn-buy');

        if (user && loginContainer) {
            loginContainer.innerHTML = `
                <div class="user-profile">
                    <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="${user.username}" class="user-avatar">
                    <span class="user-name">${user.username}</span>
                    <button onclick="Auth.logout()" class="btn-logout" title="Sair">✖</button>
                </div>
            `;
            
            // Ativa os botões de compra
            buyButtons.forEach(btn => {
                btn.disabled = false;
                btn.innerText = 'Solicitar via Ticket';
                btn.classList.remove('btn-locked');
            });
        } else if (loginContainer) {
            loginContainer.innerHTML = `
                <button onclick="Auth.login()" class="btn btn-outline-gold btn-sm">Login Discord</button>
            `;

            // Tranca os botões de compra
            buyButtons.forEach(btn => {
                btn.disabled = true;
                btn.innerText = 'Login Necessário';
                btn.classList.add('btn-locked');
            });
        }
    },

    // Simulação de login para testes sem ClientID
    simulateTest() {
        const mockUser = {
            id: '000000',
            username: 'Viajante de Teste',
            avatar: 'mock'
        };
        localStorage.setItem('discord_user', JSON.stringify(mockUser));
        this.updateUI();
        alert('Modo Simulado Ativado: Você está logado como "Viajante de Teste"');
    }
};

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => {
    Auth.init();
    
    // Sincroniza o login entre abas abertas
    window.addEventListener('storage', (event) => {
        if (event.key === 'discord_user') {
            Auth.updateUI();
        }
    });
});
