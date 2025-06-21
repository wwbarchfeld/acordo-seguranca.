// Configuração robusta para mobile
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os 3 pads de assinatura
    const pads = [
        new SignaturePad(document.getElementById('signaturePad1'), {
            minWidth: 1,
            maxWidth: 3,
            penColor: '#000',
            onBegin: () => disableScroll()
        }),
        new SignaturePad(document.getElementById('signaturePad2'), {
            minWidth: 1,
            maxWidth: 3,
            penColor: '#000',
            onBegin: () => disableScroll()
        }),
        new SignaturePad(document.getElementById('signaturePad3'), {
            minWidth: 1,
            maxWidth: 3,
            penColor: '#000',
            onBegin: () => disableScroll()
        })
    ];

    // Impede que a página role ao assinar
    function disableScroll() {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 500);
    }

    // Função para limpar assinaturas
    window.clearSignature = (index) => {
        pads[index - 1].clear();
    };

    // Ajusta o tamanho dos canvases
    function resizeCanvases() {
        pads.forEach(pad => {
            const canvas = pad._canvas;
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d').scale(ratio, ratio);
            pad.clear(); // Redesenha após redimensionamento
        });
    }

    // Configurações responsivas
    window.addEventListener('resize', resizeCanvases);
    resizeCanvases();
});
