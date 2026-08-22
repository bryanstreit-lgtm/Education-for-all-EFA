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

    // Escala inicial de texto
    let escalaTexto = 100; 

    // Alternador de Tema
    if(btnAlternarTema) {
        btnAlternarTema.addEventListener('click', () => {
            const novoTema = document.documentElement.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
            document.documentElement.setAttribute('data-tema', novoTema);
        });
    }

    // Fonte Dislexia
    if(btnFonteDislexia) {
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
    }

    // Modo Foco
    if(btnModoFoco) {
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
    }

    // Aumentar Texto (Limite até 150%)
    if(btnAumentarTexto) {
        btnAumentarTexto.addEventListener('click', () => {
            if (escalaTexto < 150) {
                escalaTexto += 10;
                document.documentElement.style.fontSize = escalaTexto + '%';
            }
        });
    }

    // Diminuir Texto (Permite encolher a fonte até 80%)
    if(btnReduzirTexto) {
        btnReduzirTexto.addEventListener('click', () => {
            if (escalaTexto > 80) {
                escalaTexto -= 10;
                document.documentElement.style.fontSize = escalaTexto + '%';
            }
        });
    }

    // Filtros de busca
    const filtrarAulas = () => {
        const termoBusca = campoBusca.value.toLowerCase().trim();
        const perfilSelecionado = filtroPerfil.value;
        let visiveis = 0;

        cardsAula.forEach(card => {
            const titulo = card.getAttribute('data-titulo') || '';
            const perfisCard = (card.getAttribute('data-perfis') || '').split(' ');
            
            const bateBusca = termoBusca === '' || titulo.indexOf(termoBusca) !== -1;
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

    if(campoBusca) campoBusca.addEventListener('input', filtrarAulas);
    if(filtroPerfil) filtroPerfil.addEventListener('change', filtrarAulas);
});
