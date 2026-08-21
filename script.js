document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DOS ELEMENTOS ---
    const btnAlternarTema = document.getElementById('btn-alternar-tema');
    const btnFonteDislexia = document.getElementById('btn-fonte-dislexia');
    const btnModoFoco = document.getElementById('btn-modo-foco');
    const btnAumentarTexto = document.getElementById('btn-aumentar-texto');
    const btnReduzirTexto = document.getElementById('btn-reduzir-texto');
    
    const campoBusca = document.getElementById('campo-busca');
    const filtroPerfil = document.getElementById('filtro-perfil');
    const cardsAula = document.querySelectorAll('.card-aula');
    const mensagemVazia = document.getElementById('mensagem-vazia');

    // Escala de tamanho de fonte padrão
    let tamanhoFonteAtual = 100; 

    // --- 1. CONTROLE DE ALTERNÂNCIA DE TEMA (CLARO/ESCURO) ---
    const alternarTema = () => {
        const temaAtual = document.documentElement.getAttribute('data-tema');
        const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
        
        document.documentElement.setAttribute('data-tema', novoTema);
        localStorage.setItem('pref-tema', novoTema);
    };
    btnAlternarTema.addEventListener('click', alternarTema);

    // --- 2. FONTE ADAPTADA PARA DISLEXIA ---
    const alternarFonteDislexia = () => {
        const estadoAtual = document.documentElement.getAttribute('data-fonte') === 'dislexia';
        
        if (!estadoAtual) {
            document.documentElement.setAttribute('data-fonte', 'dislexia');
            btnFonteDislexia.setAttribute('aria-pressed', 'true');
            localStorage.setItem('pref-fonte-dislexia', 'ativo');
        } else {
            document.documentElement.removeAttribute('data-fonte');
            btnFonteDislexia.setAttribute('aria-pressed', 'false');
            localStorage.setItem('pref-fonte-dislexia', 'inativo');
        }
    };
    btnFonteDislexia.addEventListener('click', alternarFonteDislexia);

    // --- 3. MODO FOCO (TDAH E AUTISMO) ---
    const alternarModoFoco = () => {
        const focoAtivo = document.body.getAttribute('data-modo-foco') === 'ativo';
        
        if (!focoAtivo) {
            document.body.setAttribute('data-modo-foco', 'ativo');
            btnModoFoco.setAttribute('aria-pressed', 'true');
        } else {
            document.body.removeAttribute('data-modo-foco');
            btnModoFoco.setAttribute('aria-pressed', 'false');
        }
    };
    btnModoFoco.addEventListener('click', alternarModoFoco);

    // --- 4. REDIMENSIONAMENTO DE TEXTO SEGURO ---
    btnAumentarTexto.addEventListener('click', () => {
        if (tamanhoFonteAtual < 150) { // Limite máximo para não quebrar interface
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnReduzirTexto.addEventListener('click', () => {
        if (tamanhoFonteAtual > 90) { // Limite mínimo de legibilidade
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // --- 5. FILTROS E BUSCA ACESSÍVEIS ---
    const filtrarAulas = () => {
        const termoBusca = campoBusca.value.toLowerCase().trim();
        const perfilSelecionado = filtroPerfil.value;
        let cardsVisiveis = 0;

        cardsAula.forEach(card => {
            const titulo = card.getAttribute('data-titulo');
            const perfisCard = card.getAttribute('data-perfis').split(' ');
            
            const bateComBusca = titulo.includes(termoBusca);
            const bateComPerfil = perfilSelecionado === 'todos' || perfisCard.includes(perfilSelecionado);

            if (bateComBusca && bateComPerfil) {
                card.style.display = 'flex';
                cardsVisiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        // Alerta dinâmico para leitor de tela (Muda a classe utilitária de status)
        if (cardsVisiveis === 0) {
            mensagemVazia.classList.remove('sr-only');
        } else {
            mensagemVazia.classList.add('sr-only');
        }
    };

    campoBusca.addEventListener('input', filtrarAulas);
    filtroPerfil.addEventListener('change', filtrarAulas);

    // --- 6. RESGATAR PREFERÊNCIAS SALVAS DO USUÁRIO ---
    const carregarPreferenciasSalvas = () => {
        const temaSalvo = localStorage.getItem('pref-tema');
        const fonteSalva = localStorage.getItem('pref-fonte-dislexia');

        if (temaSalvo) {
            document.documentElement.setAttribute('data-tema', temaSalvo);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-tema', 'escuro'); // Respeita a preferência do sistema operacional
        }

        if (fonteSalva === 'ativo') {
            document.documentElement.setAttribute('data-fonte', 'dislexia');
            btnFonteDislexia.setAttribute('aria-pressed', 'true');
        }
    };

    carregarPreferenciasSalvas();
});
