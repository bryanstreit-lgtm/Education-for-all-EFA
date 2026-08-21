document.addEventListener('DOMContentLoaded', () => {
    // Elementos da Interface
    const btnTema = document.getElementById('btn-alternar-tema');
    const btnDislexia = document.getElementById('btn-fonte-dislexia');
    const btnFoco = document.getElementById('btn-modo-foco');
    const btnMais = document.getElementById('btn-aumentar-texto');
    const btnMenos = document.getElementById('btn-reduzir-texto');
    
    const campoBusca = document.getElementById('campo-busca');
    const filtroPerfil = document.getElementById('filtro-perfil');
    const cards = document.querySelectorAll('.card-aula');
    const msgVazia = document.getElementById('mensagem-vazia');

    let escalaTexto = 100;

    // 1. Alternador de Tema Base
    btnTema.addEventListener('click', () => {
        const tema = document.documentElement.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
        document.documentElement.setAttribute('data-tema', tema);
    });

    // 2. Fonte para Dislexia Base
    btnDislexia.addEventListener('click', () => {
        const ativo = document.documentElement.getAttribute('data-fonte') === 'dislexia';
        if (!ativo) {
            document.documentElement.setAttribute('data-fonte', 'dislexia');
            btnDislexia.setAttribute('aria-pressed', 'true');
        } else {
            document.documentElement.removeAttribute('data-fonte');
            btnDislexia.setAttribute('aria-pressed', 'false');
        }
    });

    // 3. Modo Foco Base
    btnFoco.addEventListener('click', () => {
        const ativo = document.body.getAttribute('data-modo-foco') === 'ativo';
        if (!ativo) {
            document.body.setAttribute('data-modo-foco', 'ativo');
            btnFoco.setAttribute('aria-pressed', 'true');
        } else {
            document.body.removeAttribute('data-modo-foco');
            btnFoco.setAttribute('aria-pressed', 'false');
        }
    });

    // 4. Redimensionamento de Texto Seguro
    btnMais.addEventListener('click', () => {
        if (escalaTexto < 130) {
            escalaTexto += 10;
            document.documentElement.style.fontSize = scaleTexto + '%';
        }
    });
    btnMenos.addEventListener('click', () => {
        if (escalaTexto > 90) {
            escalaTexto -= 10;
            document.documentElement.style.fontSize = scaleTexto + '%';
        }
    });

    // 5. Mecanismo de Busca Robusto e Direto (Tudo em Letras Minúsculas)
    const executarFiltro = () => {
        const busca = campoBusca.value.toLowerCase().trim();
        const perfil = filtroPerfil.value;
        let encontrados = 0;

        cards.forEach(card => {
            const tituloAttr = card.getAttribute('data-titulo') || '';
            const perfisAttr = card.getAttribute('data-perfis') || '';

            const correspondeBusca = busca === '' || tituloAttr.includes(busca);
            const correspondePerfil = perfil === 'todos' || perfisAttr.includes(perfil);

            if (correspondeBusca && correspondePerfil) {
                card.style.display = 'flex';
                encontrados++;
            } else {
                card.style.display = 'none';
            }
        });

        if (encontrados === 0) {
            msgVazia.className = 'mensagem-vazia'; // Mostra o aviso se nada for achado
        } else {
            msgVazia.className = 'sr-only'; // Esconde o aviso se houver conteúdo
        }
    };

    campoBusca.addEventListener('input', executarFiltro);
    filtroPerfil.addEventListener('change', executarFiltro);
});
