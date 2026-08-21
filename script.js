document.addEventListener('DOMContentLoaded', () => {
    
    // --- GERADOR DE LINKS E CAPAS DO YOUTUBE ---
    const linksVideo = document.querySelectorAll('.video-link-direto');
    
    linksVideo.forEach(link => {
        const videoId = link.getAttribute('data-youtube');
        
        if (videoId) {
            // Define o endereço exato do vídeo para abrir no YouTube
            link.href = `https://youtube.com{videoId}`;
            
            // Puxa automaticamente a imagem de capa de alta qualidade gerada pelo YouTube
            const urlImagemCapa = `https://youtube.com{videoId}/hqdefault.jpg`;
            
            // Injeta a imagem de fundo e o botão de play estilizado
            link.innerHTML = `
                <img src="${urlImagemCapa}" alt="Capa do vídeo do YouTube" class="capa-video">
                <div class="botao-play-visual" aria-hidden="true">▶</div>
            `;
        }
    });

    // --- SELETORES DOS BOTÕES ACESSÍVEIS ---
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

    // Alternar Tema
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

    // Tamanho do texto
    if(btnAumentarTexto && btnReduzirTexto) {
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
