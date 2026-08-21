document.addEventListener('DOMContentLoaded', () => {
    const btnAlternarTema = document.getElementById('btn-alternar-tema');
    const btnFonteDislexia = document.getElementById('btn-fonte-dislexia');
    const btnModoFoco = document.getElementById('btn-modo-foco');
    const btnAumentarTexto = document.getElementById('btn-aumentar-texto');
    const btnReduzirTexto = document.getElementById('btn-reduzir-texto');
    
    const campoBusca = document.getElementById('campo-busca');
    const filtroPerfil = document.getElementById('filtro-perfil');
    const cardsAula = document.querySelectorAll('.card-aula');
    const mensagemVazia = document.getElementById('mensagem-vazia');

    let tamanhoFonteAtual = 100; 

    // Alternar Tema Escuro/Claro
    btnAlternarTema.addEventListener('click', () => {
        const novoTema = document.documentElement.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
        document.documentElement.setAttribute('data-tema', novoTema);
        localStorage.setItem('pref-tema', novoTema);
    });

    // Fonte Dislexia
    btnFonteDislexia.addEventListener('click', () => {
        const ativo = document.documentElement.getAttribute('data-fonte') === 'dislexia';
        if (!ativo) {
            document.documentElement.setAttribute('data-fonte', 'dislexia');
            btnFonteDislexia.setAttribute('aria-pressed', 'true');
        } else {
            document.documentElement.removeAttribute('data-fonte');
            btnFonteDislexia.setAttribute('aria-pressed', 'false');
        }
    });

    // Modo Foco
    btnModoFoco.addEventListener('click', () => {
        const ativo = document.body.getAttribute('data-modo-foco') === 'ativo';
        if (!ativo) {
            document.body.setAttribute('data-modo-foco', 'ativo');
            btnModoFoco.setAttribute('aria-pressed', 'true');
        } else {
            document.body.removeAttribute('data-modo-foco');
            btnModoFoco.setAttribute('aria-pressed', 'false');
        }
    });

    // Fontes Tamanho
    btnAumentarTexto.addEventListener('click', () => {
        if (tamanhoFonteAtual < 140) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });
    btnReduzirTexto.addEventListener('click', () => {
        if (tamanhoFonteAtual > 90) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // Filtros e Mecanismo de Busca Dinâmica
    const filtrarAulas = () => {
        const termoBusca = campoBusca.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        const perfilSelecionado = filtroPerfil.value;
        let visiveis = 0;

        cardsAula.forEach(card => {
            const titulo = card.getAttribute('data-titulo');
            const perfisCard = card.getAttribute('data-perfis').split(' ');
            
            const bateBusca = titulo.includes(termoBusca);
            const batePerfil = perfilSelecionado === 'todos' || perfisCard.includes(perfilSelecionado);

            if (bateBusca && batePerfil) {
                card.style.display = 'flex';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visiveis === 0) {
            mensagemVazia.classList.remove('sr-only');
        } else {
            mensagemVazia.classList.add('sr-only');
        }
    };

    campoBusca.addEventListener('input', filtrarAulas);
    filtroPerfil.addEventListener('change', filtrarAulas);
});
