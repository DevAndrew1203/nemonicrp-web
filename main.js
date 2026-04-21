document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Sticky
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Elements
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 3. Accordion Logic (Regras)
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            const content = header.nextElementSibling;

            // Close all others
            document.querySelectorAll('.accordion, .accordion-premium').forEach(item => {
                if (item !== accordion) {
                    item.classList.remove('active');
                    const contentToClose = item.querySelector('.accordion-content');
                    if (contentToClose) contentToClose.style.maxHeight = null;
                }
            });

            // Toggle current
            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Toggle Progression Social
    const progBtn = document.getElementById('toggle-progression-btn');
    const progContent = document.getElementById('progression-hidden-content');
    if (progBtn && progContent) {
        progBtn.addEventListener('click', () => {
            if (progContent.style.display === 'none') {
                progContent.style.display = 'block';
                progBtn.textContent = 'Ocultar Caminhos de Ascensão';
            } else {
                progContent.style.display = 'none';
                progBtn.textContent = 'Explorar Caminhos de Ascensão';
            }
        });
    }

    // 6. Tabs Regiões Baris
    const regionBtns = document.querySelectorAll('.region-tab-btn');
    const regionDetails = document.querySelectorAll('.region-detail');

    if (regionBtns.length > 0) {
        regionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active style from all buttons
                regionBtns.forEach(b => {
                    b.classList.remove('btn-primary', 'btn-glow');
                    b.classList.add('btn-outline-gold');
                });
                // Add active style to clicked
                btn.classList.add('btn-primary', 'btn-glow');
                btn.classList.remove('btn-outline-gold');

                // Hide all details
                regionDetails.forEach(detail => detail.style.display = 'none');

                // Show target
                const targetId = 'region-' + btn.getAttribute('data-region');
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.style.display = 'block';
            });
        });
    }

    // 7. Tabs Lore A Chegada
    const loreBtns = document.querySelectorAll('.lore-tab-btn');
    const loreDetails = document.querySelectorAll('.lore-detail');

    if (loreBtns.length > 0) {
        loreBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                loreBtns.forEach(b => {
                    b.classList.remove('btn-primary', 'btn-glow');
                    b.classList.add('btn-outline-gold');
                });
                btn.classList.add('btn-primary', 'btn-glow');
                btn.classList.remove('btn-outline-gold');

                loreDetails.forEach(detail => detail.style.display = 'none');

                const targetId = 'lore-' + btn.getAttribute('data-lore');
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.style.display = 'block';
            });
        });
    }

    // 8. Mapa Interativo Modal
    const mapPins = document.querySelectorAll('.map-pin');
    const mapModalOverlay = document.getElementById('map-modal-overlay');
    const mapModalBody = document.getElementById('map-modal-body');
    const closeMapModalBtn = document.getElementById('close-map-modal');

    if (mapPins.length > 0 && mapModalOverlay) {
        mapPins.forEach(pin => {
            pin.addEventListener('click', () => {
                const targetId = pin.getAttribute('data-region-target');
                const targetEl = document.getElementById(targetId);
                
                if (targetEl) {
                    const contentHtml = targetEl.querySelector('.region-detail-content').innerHTML;
                    mapModalBody.innerHTML = contentHtml;
                    mapModalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const fecharModal = () => {
            mapModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeMapModalBtn.addEventListener('click', fecharModal);

        mapModalOverlay.addEventListener('click', (e) => {
            if (e.target === mapModalOverlay) {
                fecharModal();
            }
        });
    }

    // 8.5 Detalhes das Classes (Modal)
    const classBtns = document.querySelectorAll('.class-detail-btn');
    const classModalOverlay = document.getElementById('class-modal-overlay');
    const classModalBody = document.getElementById('class-modal-body');
    const closeClassModalBtn = document.getElementById('close-class-modal');

    const classDetailedData = {
        alquimista: {
            name: "Alquimista",
            quote: "A vida e a morte estão a apenas uma gota de distância. A diferença entre um remédio milagroso e um veneno letal é apenas a intenção de quem o prepara.",
            description: "Mestres das misturas e da manipulação vital. O Alquimista utiliza o conhecimento arcano para curar aliados ou devastar inimigos com toxinas letais.",
            style: "Suporte Mágico / Controle de Grupo",
            attributes: [
                { label: "Bônus de Dano Mágico", val: "+15%" },
                { label: "Redução de Recarga", val: "+10%" },
                { label: "Reserva de Mana", val: "Alta" }
            ],
            skills: [
                { name: "Poison", lv: 1, desc: "Lança um projétil que causa 12 de dano mágico e aplica Veneno II por 8 segundos.", cd: "10s", mana: "12" },
                { name: "Slow", lv: 1, desc: "Lança um projétil que causa 10 de dano mágico e aplica Lentidão III por 5 segundos.", cd: "12s", mana: "10" },
                { name: "Weaken", lv: 1, desc: "(Passiva) Seus ataques aplicam Fraqueza I + Wither I por 3s no alvo. Wither retira vida ao longo do tempo.", cd: "-", mana: "-" },
                { name: "Blind", lv: 15, desc: "Projétil que causa 14 de dano mágico, Cegueira por 5s e Náusea por 3s. Inutiliza o alvo completamente.", cd: "20s", mana: "18" },
                { name: "Heal", lv: 25, desc: "Cura o Alquimista e aliados próximos (raio 5) em 12 pontos de vida.", cd: "15s", mana: "20" },
                { name: "Transmutação Arcana", lv: 35, desc: "Lança um projétil arcano que causa 25 de dano mágico, aplica Brilho e Fraqueza II no alvo atingido.", cd: "25s", mana: "35" },
                { name: "Miasma", lv: 40, desc: "Lança um projétil de névoa tóxica. Causa 35 de dano mágico e aplica: Wither II, Veneno II, Náusea e Lentidão. A skill mais poderosa do Alquimista.", cd: "35s", mana: "45" },
                { name: "Cura Aprimorada", lv: 50, desc: "Cura o Alquimista e aliados (raio 7) em 20 pontos de vida e concede Velocidade I por 3s para reposicionar.", cd: "20s", mana: "30" },
                { name: "Grand Heal", lv: 60, desc: "Cura massiva em área (raio 9). Cura 30 pontos de vida e concede Resistência I por 5s a todos os aliados. Skill de salvamento em boss fights.", cd: "50s", mana: "55" }
            ]
        },
        mercador: {
            name: "Mercador",
            quote: "Ouro não compra a imortalidade, mas compra o navio mais rápido para fugir de quem tenta te matar.",
            description: "O motor que faz a economia do mundo girar. O Mercador não é um combatente — é um sobrevivente. Suas habilidades focam em mobilidade extrema, evasão tática e maximização de loot.",
            warning: "O Mercador é a classe mais frágil em combate direto. Evite confrontos prolongados.",
            style: "Mobilidade / Economia / Evasão",
            attributes: [
                { label: "Velocidade de Movimento", val: "+0.115" },
                { label: "Sorte", val: "+8" },
                { label: "Redução de Recarga", val: "Aumentada" },
                { label: "Armadura", val: "-1" }
            ],
            skills: [
                { name: "Swiftness", lv: 1, desc: "Ativa rotas conhecidas do Mercador. Concede Velocidade III por 5s e Resistência I por 3s.", cd: "12s", mana: "10" },
                { name: "Evade", lv: 1, desc: "Absorve o próximo golpe com imunidade de 1.5s e faz um impulso breve para reposicionar. Essencial em zonas de risco.", cd: "8s", mana: "8" },
                { name: "Lucky Strike", lv: 1, desc: "Aguça os instintos do Mercador. Luck +15 por 5s e Visão Noturna. Use antes de matar mobs ou abrir baús para maximizar o loot.", cd: "20s", mana: "5" },
                { name: "Blink", lv: 20, desc: "Dash instantâneo na direção que olha. Impulso rápido na direção do olhar. Ideal para cruzar distâncias rápido.", cd: "15s", mana: "20" },
                { name: "Shadow Veil", lv: 20, desc: "O Mercador some nas sombras. Invisibilidade por 5s — mobs param de atacar imediatamente. Visão Noturna incluída para navegar em rotas escuras sem se revelar. Não funciona contra players.", cd: "30s", mana: "25" },
                { name: "Warp", lv: 40, desc: "Abre o mapa de rotas comerciais. Viaje para qualquer waypoint que você já desbloqueou. O custo de viagem é Stellium. Waypoints desbloqueados nos levels 1, 20 e conforme missões.", cd: "5s", mana: "50" },
                { name: "Confuse", lv: 40, desc: "Lança um projétil de desorientação. Aplica Náusea II, Lentidão II e Fraqueza I no alvo atingido. Fuga de última instância para o Mercador que não deveria ter lutado.", cd: "25s", mana: "30" }
            ]
        },
        ferreiro: {
            name: "Ferreiro",
            quote: "A carne falha, a magia oscila, mas o aço... o aço sempre cumpre o que promete.",
            description: "O mestre das forjas e do aço. O Ferreiro é o pilar de sustentação da linha de frente, protegendo seus aliados com escudos humanos e terrestres, enquanto sua força bruta dita o ritmo da batalha.",
            style: "Tank / Suporte de Linha de Frente / Dano Físico",
            attributes: [
                { label: "Vida Máxima", val: "+20" },
                { label: "Armadura", val: "+3" },
                { label: "Resistência a Knockback", val: "+10%" },
                { label: "Reserva de Mana", val: "Baixa" }
            ],
            skills: [
                { name: "Empowered Attack", lv: 1, desc: "O Ferreiro canaliza força na próxima investida. Concede +8 de Dano de Ataque por 4 segundos. Use antes de atacar um mob forte.", cd: "12s", mana: "10" },
                { name: "Human Shield", lv: 1, desc: "O Ferreiro se posiciona como escudo. Concede Resistência I por 5s ao caster e a todos os aliados em raio 5 ao redor. Essencial no craft coletivo de Tier 3.", cd: "20s", mana: "15" },
                { name: "Corrosion", lv: 1, desc: "(Passiva) Cada golpe do Ferreiro aplica Fraqueza I por 4s no alvo, reduzindo seu dano de ataque. Torna inimigos menos perigosos para o grupo inteiro.", cd: "-", mana: "-" },
                { name: "Stun", lv: 20, desc: "Dispara um projétil de martelo que causa 6 de dano e aplica: Lentidão V, Cegueira e Náusea. Interrompe ataques de boss em momento crítico.", cd: "18s", mana: "20" },
                { name: "Magical Shield", lv: 20, desc: "3s de imunidade total ao dano seguidos de Resistência II por 5s. Use em momento de crise para garantir a sobrevivência.", cd: "25s", mana: "25" },
                { name: "Earthquake", lv: 40, desc: "Golpeia o chão criando uma explosão em área (raio 5). Causa 15 de dano e aplica Lentidão III por 4s em todos. Perfeito para proteger aliados durante craft coletivo.", cd: "25s", mana: "35" },
                { name: "Shockwave", lv: 40, desc: "Onda de choque em cone (raio 6, 90°) que causa 12 de dano com knockback e aplica Lentidão II por 3s. Cria espaço seguro durante raids.", cd: "20s", mana: "30" }
            ]
        },
        guerreiro: {
            name: "Guerreiro",
            quote: "A linha entre a vitória e a derrota é traçada por quem aguenta mais tempo de pé.",
            description: "O Guerreiro é a força bruta do grupo. Tanque e linha de frente, capaz de engajar múltiplos inimigos ao mesmo tempo, sustentar dano prolongado e proteger os aliados com skills de controle e mobilidade.",
            style: "Tank / Dano Físico / Controle",
            attributes: [
                { label: "Vida Máxima", val: "+4" },
                { label: "Dano de Ataque", val: "+2" },
                { label: "Armadura", val: "+2" },
                { label: "Resistência a Knockback", val: "+15%" },
                { label: "Velocidade de Ataque", val: "+5%" }
            ],
            skills: [
                { name: "Circular Slash", lv: 1, desc: "Golpe giratório que acerta todos os inimigos ao redor (raio 4). Causa 12 de dano físico em AoE 360°. Ideal para controle de grupos de mobs.", cd: "8s", mana: "20" },
                { name: "Heavy Charge", lv: 1, desc: "Avança em velocidade alta contra um alvo. Ao chegar: 10 de dano em cone com knockback e Lentidão II por 2s. Bom para iniciar combate e escapar.", cd: "10s", mana: "18" },
                { name: "Vampirism", lv: 1, desc: "(Passiva) Cada golpe do Guerreiro recupera 3 de vida do próprio caster. Sustain essencial em combate prolongado contra bosses.", cd: "-", mana: "-" },
                { name: "Leap", lv: 20, desc: "Salta em direção a um alvo distante. Ao aterrissar: 18 de dano em área (raio 4) com knockback e Lentidão II por 3s. Excelente para engajar ou reposicionar.", cd: "15s", mana: "25" },
                { name: "Deep Wound", lv: 20, desc: "Golpe profundo que aplica sangramento. Causa 8 de dano imediato mais Wither II por 8s (bypassa armadura). Não cancela com poção de cura.", cd: "12s", mana: "20" },
                { name: "Bloodbath", lv: 40, desc: "Entra em estado berserk por 6s: Dano de Ataque +10 temporário, Strength II e Regeneração II. Cura ao matar inimigos durante o estado. Decisivo contra bosses.", cd: "30s", mana: "35" },
                { name: "Shockwave", lv: 40, desc: "Libera uma onda de choque à frente em cone (raio 7, 90°). Causa 14 de dano com knockback e Lentidão II por 3s. Usado para controlar grupos.", cd: "15s", mana: "30" },
                { name: "Stun", lv: 40, desc: "(Passiva) Chance de atordoar o inimigo em cada golpe. Aplica Lentidão V e Cegueira brevíssimos. Em bosses, abre janela para o grupo causar dano extra.", cd: "-", mana: "-" }
            ]
        }
    };

    if (classBtns.length > 0 && classModalOverlay) {
        classBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const classKey = btn.getAttribute('data-class');
                const data = classDetailedData[classKey];

                if (data) {
                    let html = `
                        <div class="modal-class-header">
                            <h2>${data.name}</h2>
                            <p class="modal-class-quote">"${data.quote}"</p>
                            <p style="margin-top:10px; color:var(--gold); font-family:var(--font-heading); font-size:0.9rem;">Caminho: ${data.style}</p>
                        </div>

                        ${data.description ? `
                            <div class="modal-class-desc-box" style="margin-bottom:30px; text-align:center;">
                                <p style="color:var(--text-muted); line-height:1.6; font-size:1rem;">${data.description}</p>
                            </div>
                        ` : ''}

                        ${data.warning ? `
                            <div class="death-warning" style="margin-bottom:30px; border-left: 4px solid var(--gold); background: rgba(210, 204, 161, 0.05);">
                                <h4 style="color:var(--gold); margin-bottom:5px;">⚠️ Aviso de Sobrevivência</h4>
                                <p style="color:#ddd; font-style:italic;">${data.warning}</p>
                            </div>
                        ` : ''}
                        
                        <div class="modal-section-title">📊 Atributos de Base</div>
                        <div class="modal-attr-grid">
                            ${data.attributes.length > 0 ? 
                                data.attributes.map(attr => `
                                    <div class="attr-item">
                                        <span class="attr-label">${attr.label}</span>
                                        <span class="attr-val">${attr.val}</span>
                                    </div>
                                `).join('') : '<p style="color:var(--text-muted);">Informações em breve.</p>'
                            }
                        </div>

                        <div class="modal-section-title">⚔️ Árvore de Habilidades</div>
                        <div class="skills-container">
                            ${data.skills.length > 0 ? 
                                data.skills.map(skill => `
                                    <div class="skill-card">
                                        <div class="skill-header">
                                            <span class="skill-name">${skill.name}</span>
                                            <span class="skill-lv">LV. ${skill.lv}</span>
                                        </div>
                                        <div class="skill-meta">
                                            <span>⏱️ Cooldown: <strong>${skill.cd}</strong></span>
                                            <span>✨ Mana: <strong>${skill.mana}</strong></span>
                                        </div>
                                        <p class="skill-desc">${skill.desc}</p>
                                    </div>
                                `).join('') : '<p style="color:var(--text-muted);">As habilidades desta classe serão reveladas em breve.</p>'
                            }
                        </div>
                    `;
                    classModalBody.innerHTML = html;
                    classModalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const fecharClassModal = () => {
            classModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeClassModalBtn.addEventListener('click', fecharClassModal);
        classModalOverlay.addEventListener('click', (e) => {
            if (e.target === classModalOverlay) fecharClassModal();
        });
        
        // Fechar no ESC
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && classModalOverlay.classList.contains('active')) {
                fecharClassModal();
            }
        });
    }

    // 8.6 Detalhes da Hierarquia (Modal)
    const hierarchyBtns = document.querySelectorAll('.hierarchy-detail-btn');
    const hierarchyModalOverlay = document.getElementById('hierarchy-modal-overlay');
    const hierarchyModalBody = document.getElementById('hierarchy-modal-body');
    const closeHierarchyModalBtn = document.getElementById('close-hierarchy-modal');

    const hierarchyDetailedData = {
        realeza: {
            icon: "👑",
            name: "Realeza",
            role: "A Soberania Máxima",
            desc: "Os donos do mundo, ditando os rumos do reino, as guerras e as leis.",
            topics: [
                { title: "A Casa Real", text: "O Rei, a Rainha e os herdeiros diretos do trono." }
            ],
            color: "var(--gold)"
        },
        nobreza: {
            icon: "🏰",
            name: "Nobreza",
            role: "Os Senhores das Terras",
            desc: "Abaixo apenas da coroa, são os responsáveis por administrar os territórios, cobrar os impostos e manter a ordem local.",
            topics: [
                { title: "Duques e Lordes", text: "Governam grandes extensões de terra e exercem autoridade militar e econômica sobre suas províncias." },
                { title: "Nobres Decadentes", text: "Aqueles que ainda ostentam o título de sangue azul, mas que perderam sua riqueza, poder ou influência política. Vivem de aparências e alianças duvidosas." }
            ],
            color: "var(--gold)"
        },
        clero: {
            icon: "⛪",
            name: "O Clero",
            role: "A Voz do Divino",
            desc: "A autoridade religiosa e espiritual. Eles não apenas cuidam das almas, mas também controlam os segredos do mundo (incluindo o uso legal do conhecimento arcano/Redstone).",
            topics: [
                { title: "Papa", text: "O líder máximo da fé. A única figura que, em certas circunstâncias, ousa questionar a Coroa." },
                { title: "Inquisidores", text: "A espada da igreja. Cavaleiros sagrados encarregados de caçar hereges, purgar a magia profana e manter a pureza da fé (são eles que mandam para a fogueira quem usa magia sem permissão)." },
                { title: "Alquimistas", text: "Praticantes de conhecimentos arcanos tolerados e rigidamente supervisionados pela Igreja." },
                { title: "Sacerdotes / Padres", text: "Conduzem os rituais, ouvem confissões e cuidam do rebanho nas vilas e cidades." },
                { title: "Seguidores", text: "Os fiéis e membros devotos que compõem a força da religião." }
            ],
            color: "var(--gold)"
        },
        cavaleiros: {
            icon: "⚔️",
            name: "Os Cavaleiros",
            role: "O Braço Armado",
            desc: "A elite militar de Velmora. Vivem pela espada, responsáveis por travar as guerras, proteger as fronteiras e manter a ordem civil.",
            topics: [
                { title: "Guarda Real", text: "A elite implacável e altamente treinada que protege o Rei e a corte de qualquer ameaça." },
                { title: "Cavaleiros Juramentados", text: "Guerreiros de elite que servem a Lordes específicos e seguem um rígido código de honra." },
                { title: "Escudeiros", text: "Os aprendizes em treinamento, que limpam armaduras e cuidam dos cavalos na esperança de um dia receberem as esporas de cavaleiro." }
            ],
            color: "var(--gold)"
        },
        burguesia: {
            icon: "💰",
            name: "A Burguesia",
            role: "O Motor do Mundo",
            desc: "Aqueles que não têm sangue azul, mas possuem algo igualmente poderoso: o dinheiro. São eles que fazem a economia girar.",
            topics: [
                { title: "Guilda dos Mercadores", text: "Comerciantes astutos que controlam rotas, compram barato, vendem caro e monopolizam as trocas de longa distância." },
                { title: "Mestres Artesãos", text: "Profissionais altamente especializados (como Ferreiros lendários, carpinteiros e engenheiros) que produzem os melhores equipamentos do reino." },
                { title: "Navegadores", text: "Especialistas no mar, conhecedores de mapas, rotas ocultas e exploração." }
            ],
            color: "var(--gold)"
        },
        camponeses: {
            icon: "🌾",
            name: "Os Camponeses",
            role: "A Base da Pirâmide",
            desc: "O sustento silencioso de Velmora. Eles são a maioria absoluta da população e a força de trabalho do mundo.",
            topics: [
                { title: "Trabalhadores", text: "Agricultores, lenhadores, pecuaristas e mineiros que sujam as mãos de terra e fuligem para que o reino não morra de fome ou frio." }
            ],
            color: "var(--gold)"
        },
        marginalizados: {
            icon: "🌑",
            name: "Os Marginalizados",
            role: "As Sombras da Sociedade",
            desc: "Indivíduos que vivem fora da ordem estabelecida. Não possuem a proteção da lei, mas dominam o submundo.",
            topics: [
                { title: "Bandidos", text: "Criminosos que sobrevivem de roubos, assaltos nas estradas e extorsão." },
                { title: "Contrabandistas", text: "Os donos do mercado negro. Se você quer algo ilegal ou sem pagar impostos, é com eles que você fala." },
                { title: "Mercenários", text: "Espadas de aluguel. Lutam guerras e compram brigas por quem pagar mais, sem juramentos de lealdade." },
                { title: "Bruxos Clandestinos", text: "Praticantes de artes arcanas obscuras que agem fora da lei da Igreja. Vivem sempre a um passo da fogueira da Inquisição." }
            ],
            color: "#d04646" // Red thematic color
        }
    };

    if (hierarchyBtns.length > 0 && hierarchyModalOverlay) {
        hierarchyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tierKey = btn.getAttribute('data-tier');
                const data = hierarchyDetailedData[tierKey];

                if (data) {
                    let html = `
                        <div class="modal-class-header" style="border-bottom-color: ${data.color};">
                            <h2><span style="font-size: 1.5em; vertical-align: middle;">${data.icon}</span> ${data.name}</h2>
                            <p style="margin-top:10px; color:${data.color}; font-family:var(--font-heading); font-size:1.1rem; text-transform: uppercase;">${data.role}</p>
                        </div>

                        <div class="modal-class-desc-box" style="margin-bottom:30px; text-align:center;">
                            <p style="color:var(--text-muted); line-height:1.6; font-size:1.05rem; font-style: italic;">"${data.desc}"</p>
                        </div>
                        
                        <div class="skills-container">
                            ${data.topics.map(topic => `
                                <div class="skill-card" style="border-left: 3px solid ${data.color};">
                                    <div class="skill-header">
                                        <span class="skill-name" style="color: ${data.color};">${topic.title}</span>
                                    </div>
                                    <p class="skill-desc" style="margin-top: 10px;">${topic.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    hierarchyModalBody.innerHTML = html;
                    hierarchyModalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const fecharHierarchyModal = () => {
            hierarchyModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeHierarchyModalBtn.addEventListener('click', fecharHierarchyModal);
        hierarchyModalOverlay.addEventListener('click', (e) => {
            if (e.target === hierarchyModalOverlay) fecharHierarchyModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && hierarchyModalOverlay.classList.contains('active')) {
                fecharHierarchyModal();
            }
        });
    }


    // 9. Música de Fundo
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false; 
    let lastVolume = 0.5; // Memória do último volume tocado antes do mute

    if (musicBtn && bgMusic) {
        
        if(volumeSlider) {
            bgMusic.volume = volumeSlider.value;
            volumeSlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                bgMusic.volume = val;
                
                if(val > 0) {
                    lastVolume = val; // Grava a posição de uso
                }

                if(val === 0) {
                    musicIcon.textContent = '🔇';
                    musicBtn.classList.remove('btn-glow');
                } else {
                    musicIcon.textContent = '🔊';
                    musicBtn.classList.add('btn-glow');
                }
            });
        } else {
            bgMusic.volume = 0.3;
        }

        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                // Navegador exige um play inicial em interação do usuário
                bgMusic.play().then(() => {
                    isPlaying = true;
                    
                    if(bgMusic.volume === 0) {
                        bgMusic.volume = lastVolume;
                        if(volumeSlider) volumeSlider.value = lastVolume;
                    }

                    musicIcon.textContent = '🔊';
                    musicBtn.classList.add('btn-glow');
                    musicBtn.title = "Mutar Música Ambiente";
                }).catch(error => {
                    console.error("Autoplay bloqueado pelo navegador", error);
                });
            } else {
                // Manipulação espelhada entre Ícone e Slider Físico!
                if (bgMusic.volume > 0) {
                    // Clicou para Mudar: Leva o slider pra 0
                    bgMusic.volume = 0;
                    if(volumeSlider) volumeSlider.value = 0;
                    
                    musicIcon.textContent = '🔇';
                    musicBtn.classList.remove('btn-glow');
                    musicBtn.title = "Desmutar Música Ambiente";
                } else {
                    // Clicou para Desmutar: Leva o slider de volta pra o que era antes
                    bgMusic.volume = lastVolume || 0.5;
                    if(volumeSlider) volumeSlider.value = lastVolume || 0.5;
                    
                    musicIcon.textContent = '🔊';
                    musicBtn.classList.add('btn-glow');
                    musicBtn.title = "Mutar Música Ambiente";
                }
            }
        });
    }

    // =========================================================================
    // 10. AVATAR CREATOR LORE-FRIENDLY (2D LAYER SYSTEM)
    // =========================================================================

    const cultureData = {
        kazaar: {
            name: 'Kazaar',
            bg: 'url("assets/kazaar_bg.png")',
            desc: 'Deserto noturno de vidro. Fuga do sol mortal, luxo escondido sob túnicas pesadas.',
            colors: ['#D2CCA1', '#d4a373', '#8b5a2b', '#6A1A1A', '#1f2937', '#111827'],
            skin: ['Polida Fria', 'Escura Dourada', 'Areia Pálida'],
            face: ['Rosto Estreito', 'Maquiagem de Khol', 'Cicatriz de Sol'],
            hair: ['Escondido', 'Corte Curto e Prático', 'Tranças Luxuosas (Nobre)'],
            bottom: ['Calças Largas de Seda', 'Saiote Resistente'],
            top: ['Túnica Longa (Obrigatória)', 'Túnica Ornamentada (Nobre)'],
            acc: ['Colar de Ouro Mestiço', 'Cinto Largo com Bolsos Ocultos', 'Manto Aberto', 'nenhum'],
            paint: ['Pintura Dourada Cerimonial', 'nenhum'],
            head: ['Turbante Clássico', 'Véu Kazaari Dourado', 'nenhum']
        },
        thalassia: {
            name: 'Thalassia',
            bg: 'url("assets/thalassia_bg.png")',
            desc: 'Arquipélago de tempestades esmeraldas. Roupas que priorizam mobilidade na água.',
            colors: ['#4ade80', '#14b8a6', '#0f766e', '#fcd34d', '#fb923c', '#d97706'],
            skin: ['Bronzeada de Sal', 'Parda Queimada', 'Morena Escura', 'Translúcida (Raro)'],
            face: ['Rosto Largo', 'Traços Suaves', 'Olhos Amarelados'],
            hair: ['Curtíssimo', 'Longo Ondulado Dourado', 'Cacheado Solto'],
            bottom: ['Saiote Curto', 'Calças Ajustadas de Lona', 'Tiras de Couro'],
            top: ['Túnica Curta Aberta', 'Peito Nu (Comum)', 'Top de Fibras Marinhas'],
            acc: ['Colar de Conchas', 'Espaldeira Leve de Tartaruga', 'Cintos de Cipó', 'nenhum'],
            paint: ['Pintura Corporal de Caça', 'Marcas Tribais Turquesa', 'nenhum'],
            head: ['Coroa de Flores Silvestres', 'Cordão de Algodão', 'nenhum']
        },
        oros: {
            name: 'Oros',
            bg: 'url("assets/oros_bg.png")',
            desc: 'O domínio da nevasca mortal. Sobreviventes vestidos em camadas extremas.',
            colors: ['#ffffff', '#e2e8f0', '#94a3b8', '#475569', '#3b0764', '#451a03'],
            skin: ['Pálida como a Neve', 'Branca com Rubor Frio', 'Acinzentada de Frio'],
            face: ['Expressão Rígida', 'Bochechas Rosadas', 'Olhos Cinza-Tempestade', 'Cicatriz de Frio'],
            hair: ['Branco Espesso', 'Loiro Platinado', 'Gelo Azul (Raro)'],
            bottom: ['Calças de Lã Dupla', 'Couro Grosso Inferior'],
            top: ['Túnica de Couro Espesso', 'Sobretudo de Urso (Nobre)'],
            acc: ['Botas com Cravos', 'Correia com Lâminas', 'nenhum'],
            paint: ['Marcas de Sobrevivência (Sangue antigo)', 'nenhum'],
            head: ['Capa Pesada de Pele', 'Capuz Fundo Isolante']
        },
        valis: {
            name: 'Valis',
            bg: 'url("assets/valis_bg.png")',
            desc: 'O celeiro do mundo. Miscigenação pacífica. Todos e ninguem.',
            colors: ['#d6d3d1', '#a8a29e', '#78716c', '#4b5563', '#273f2b', '#5c4033'],
            skin: ['Pele Clara', 'Pele Parda', 'Pele Oliva Sardenta', 'Pele Escura Simples'],
            face: ['Rosto Comum', 'Sardas Abundantes', 'Expressão Amigável'],
            hair: ['Castanho Comum', 'Ruivo Despenteado', 'Corvo Negro', 'Cabelo Amarrado'],
            bottom: ['Calças de Algodão Básicas', 'Calça de Trabalho'],
            top: ['Camisa Simples de Botões', 'Túnica Gasta', 'Colete Solto'],
            acc: ['Mochila de Viagem', 'Cachecol de Lã', 'Cinto Utilidade', 'nenhum'],
            paint: ['Sujeira de Fazenda', 'nenhum'],
            head: ['Chapéu de Mercador', 'Turbante Gasto', 'nenhum']
        }
    };

    const steps = ['origem', 'aparencia', 'vestimenta', 'detalhes'];
    let currentStepIndex = 0;
    let selectedCulture = null;

    // DOM Elements - Navigation
    const tabBtns = document.querySelectorAll('.avatar-tab-btn');
    const stepContents = document.querySelectorAll('.avatar-step-content');
    const btnNext = document.getElementById('btn-next-step');
    const btnPrev = document.getElementById('btn-prev-step');

    // DOM Elements - Origin
    const originCards = document.querySelectorAll('.origin-card-btn');
    const infoBox = document.getElementById('origin-info-box');
    const infoTitle = document.getElementById('origin-info-title');
    const infoDesc = document.getElementById('origin-info-desc');

    // DOM Elements - Selects
    const selects = {
        skin: document.getElementById('sel-skin'),
        face: document.getElementById('sel-face'),
        hair: document.getElementById('sel-hair'),
        bottom: document.getElementById('sel-bottom'),
        top: document.getElementById('sel-top'),
        acc: document.getElementById('sel-acc'),
        paint: document.getElementById('sel-paint'),
        head: document.getElementById('sel-head')
    };

    // DOM Elements - Visuals & Layers
    const avatarBg = document.getElementById('avatar-bg');
    const paletteBody = document.getElementById('color-palette-body');
    const paletteClothes = document.getElementById('color-palette-clothes');
    const fullSummary = document.getElementById('full-summary-text');
    const btnCopyFull = document.getElementById('btn-copy-full');

    let selections = { color: '', ...Object.keys(selects).reduce((a,v) => ({...a, [v]:''}), {}) };

    // Initialization
    function updateStepVisibility() {
        stepContents.forEach(el => el.style.display = 'none');
        document.getElementById('step-' + steps[currentStepIndex]).style.display = 'block';

        tabBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentStepIndex);
        });

        // Visibility of Prev/Next
        btnPrev.style.display = currentStepIndex > 0 ? 'inline-block' : 'none';
        btnNext.style.display = (currentStepIndex > 0 && currentStepIndex < steps.length - 1) ? 'inline-block' : 'none';
        
        if(currentStepIndex === 0 && selectedCulture) {
            btnNext.style.display = 'inline-block';
        }
    }

    // Handlers para Navegação Avançar/Voltar
    if(btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            if (currentStepIndex < steps.length - 1) {
                currentStepIndex++;
                updateStepVisibility();
            }
        });
        btnPrev.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateStepVisibility();
            }
        });
    }

    // Handlers Abas Click (se habilitadas)
    tabBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if(!btn.disabled) {
                currentStepIndex = idx;
                updateStepVisibility();
            }
        });
    });

    function renderOptions(selElement, arr) {
        if(!selElement) return;
        selElement.innerHTML = '';
        if(arr.length === 0) {
            const opt = document.createElement('option');
            opt.value = "nenhum"; opt.textContent = "Indisponível";
            selElement.appendChild(opt);
            return;
        }
        
        arr.forEach((item, i) => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            selElement.appendChild(opt);
        });
        
        // Trigger initial value text in layout
        const key = Object.keys(selects).find(k => selects[k] === selElement);
        if(key) updateLayerText(key, arr[0]);
    }

    function renderPalettes(colors) {
        if(!paletteBody || !paletteClothes) return;
        paletteBody.innerHTML = '';
        paletteClothes.innerHTML = '';

        colors.forEach((c, idx) => {
            // Corpo
            const bSwatch = document.createElement('div');
            bSwatch.className = 'color-swatch' + (idx===0?' selected':'');
            bSwatch.style.backgroundColor = c;
            bSwatch.addEventListener('click', () => {
                paletteBody.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));
                bSwatch.classList.add('selected');
                selections.color = c;
                generateFicha();
            });
            paletteBody.appendChild(bSwatch);
            
            // Roupa
            const cSwatch = document.createElement('div');
            cSwatch.className = 'color-swatch' + (idx===0?' selected':'');
            cSwatch.style.backgroundColor = c;
            cSwatch.addEventListener('click', () => {
                paletteClothes.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));
                cSwatch.classList.add('selected');
            });
            paletteClothes.appendChild(cSwatch);

            if(idx===0) selections.color = c; // Select default
        });
    }

    function updateLayerText(layerKey, text) {
        const layerEl = document.getElementById('layer-' + layerKey);
        if(!layerEl) return;
        const placeHolder = layerEl.querySelector('.avatar-placeholder');
        if(placeHolder) {
            placeHolder.textContent = text;
            selections[layerKey] = text;
        }
        generateFicha();
    }

    // Origin Click
    originCards.forEach(card => {
        card.addEventListener('click', () => {
            originCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            selectedCulture = card.getAttribute('data-origin');
            const data = cultureData[selectedCulture];

            // Ativa abas
            tabBtns.forEach(btn => btn.disabled = false);
            btnNext.style.display = 'inline-block';

            // Preenche infos
            infoTitle.textContent = data.name;
            infoDesc.textContent = data.desc;
            infoBox.style.display = 'block';

            // Altera Background do Canvas
            if(avatarBg) avatarBg.style.backgroundImage = data.bg;

            // Preenche selects
            renderOptions(selects.skin, data.skin);
            renderOptions(selects.face, data.face);
            renderOptions(selects.hair, data.hair);
            renderOptions(selects.bottom, data.bottom);
            renderOptions(selects.top, data.top);
            renderOptions(selects.acc, data.acc);
            renderOptions(selects.paint, data.paint);
            renderOptions(selects.head, data.head);

            renderPalettes(data.colors);
            generateFicha();
        });
    });

    // Eventos de alteração dos Dropdowns para atualizar placeholder/layer preview
    Object.keys(selects).forEach(key => {
        const sel = selects[key];
        if(sel) {
            sel.addEventListener('change', (e) => {
                updateLayerText(key, e.target.value);
            });
        }
    });

    function generateFicha() {
        if(!selectedCulture) return;
        const data = cultureData[selectedCulture];

        // Se Kazaar foi selecionado, e player tem peito nu e Kazaar restrinje (não listado), etc.
        // O select em si já se baseia na lista restritiva do 'cultureData'.

        const summaryHTML = `
            <strong>Origem Declarada:</strong> ${data.name}<br>
            <span style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">"${data.desc}"</span><br><br>
            
            <strong>— Fisionomia —</strong><br>
            Corpo Típico de Pele ${selections.skin || '...'} com rosto de ${selections.face || '...'}. O cabelo está ${selections.hair || '...'}.
            <br><br>
            
            <strong>— Indumentária e Cultura —</strong><br>
            Vestindo ${selections.top || '...'} e ${selections.bottom || '...'}. <br>
            Como marca visual da cultura: ${selections.head !== 'nenhum' ? selections.head : 'Apenas os cabelos'}.<br>
            Detalhes marcantes: ${(selections.paint !== 'nenhum' ? selections.paint : '')} ${(selections.acc !== 'nenhum' ? ', portando ' + selections.acc : '')}.
        `;
        if(fullSummary) {
            fullSummary.innerHTML = summaryHTML;
        }
    }

    if(btnCopyFull) {
        btnCopyFull.addEventListener('click', () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = fullSummary.innerHTML.replace(/<br>/g, "\n").replace(/<[^>]+>/g, '');
            navigator.clipboard.writeText(tempDiv.innerText || tempDiv.textContent).then(() => {
                const originalText = btnCopyFull.textContent;
                btnCopyFull.textContent = 'Ficha Copiada com Sucesso!';
                setTimeout(() => btnCopyFull.textContent = originalText, 2000);
            });
        });
    }

});
