document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores do Painel de Acessibilidade ---
    const btnReduzirTexto = document.getElementById('btn-reduzir-texto');
    const btnAumentarTexto = document.getElementById('btn-aumentar-texto');
    const btnFonteDislexia = document.getElementById('btn-fonte-dislexia');
    const btnModoFoco = document.getElementById('btn-modo-foco');
    const btnAlternarTema = document.getElementById('btn-alternar-tema');

    // --- Seletores de Busca e Grid ---
    const campoBusca = document.getElementById('campo-busca');
    const filtroPerfil = document.getElementById('filtro-perfil');
    const cardsAulas = document.querySelectorAll('.card-aula');
    const mensagemVazia = document.getElementById('mensagem-vazia');

    // --- 1. CONTROLE DE TAMANHO DE FONTE ---
    let tamanhoAtual = 16; 
    const TAMANHO_MIN = 12;
    const TAMANHO_MAX = 24;

    btnAumentarTexto.addEventListener('click', () => {
        if (tamanhoAtual < TAMANHO_MAX) {
            tamanhoAtual += 2;
            document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtual}px`);
        }
    });

    btnReduzirTexto.addEventListener('click', () => {
        if (tamanhoAtual > TAMANHO_MIN) {
            tamanhoAtual -= 2;
            document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtual}px`);
        }
    });

    // --- 2. CONTROLE DA FONTE PARA DISLEXIA ---
    btnFonteDislexia.addEventListener('click', () => {
        const estaAtivo = document.body.classList.toggle('fonte-dislexia');
        btnFonteDislexia.setAttribute('aria-pressed', estaAtivo);
    });
    

    // --- 4. ALTERNAR TEMA (CLARO/ESCURO) ---
    btnAlternarTema.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        if (temaAtual === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    // --- 5. SISTEMA FILTRAGEM COMBINADA (BUSCA + PERFIL) ---
    function ejecutarFiltros() {
        const termoBusca = campoBusca.value.toLowerCase().trim();
        const perfilSelecionado = filtroPerfil.value;
        const modoFocoAtivo = document.body.classList.contains('modo-foco-ativo');
        let cardsVisiveis = 0;

        cardsAulas.forEach(card => {
            const tituloCard = card.getAttribute('data-titulo').toLowerCase();
            const perfisCard = card.getAttribute('data-perfis').split(' ');

            const correspondeTexto = tituloCard.includes(termoBusca);
            const correspondePerfil = (perfilSelecionado === 'todos') || perfisCard.includes(perfilSelecionado);

            if (correspondeTexto && correspondePerfil) {
                cardsVisiveis++;
                card.style.display = 'flex';
                if (modoFocoAtivo) {
                    card.classList.add('foco-visivel');
                } else {
                    card.classList.remove('foco-visivel');
                }
            } else {
                if (modoFocoAtivo) {
                    card.classList.remove('foco-visivel');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('foco-visivel');
                }
            }
        });

        if (cardsVisiveis === 0 && !modoFocoAtivo) {
            mensagemVazia.classList.remove('sr-only');
            mensagemVazia.style.display = 'block';
        } else {
            mensagemVazia.classList.add('sr-only');
            mensagemVazia.style.display = 'none';
        }
    }

    campoBusca.addEventListener('input', ejecutarFiltros);
    filtroPerfil.addEventListener('change', ejecutarFiltros);
});
