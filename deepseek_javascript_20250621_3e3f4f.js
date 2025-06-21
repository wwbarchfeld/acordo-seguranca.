// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Configuração das 3 áreas de assinatura
    const signaturePads = [
        new SignaturePad(document.getElementById('signaturePad1'), {
            minWidth: 1,
            maxWidth: 2.5,
            penColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
        }),
        new SignaturePad(document.getElementById('signaturePad2'), {
            minWidth: 1,
            maxWidth: 2.5,
            penColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
        }),
        new SignaturePad(document.getElementById('signaturePad3'), {
            minWidth: 1,
            maxWidth: 2.5,
            penColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
        })
    ];

    // Ajusta o tamanho dos canvases para mobile
    function resizeCanvas(canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
    }

    // Aplica o redimensionamento
    signaturePads.forEach(pad => {
        resizeCanvas(pad._canvas);
        pad.on(); // Ativa o signature pad
    });

    // Preview da foto do cadeado
    document.getElementById('fotoCadeado').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.getElementById('photoPreview');
                img.src = event.target.result;
                img.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Função global para limpar assinaturas
    window.clearSignature = (index) => {
        signaturePads[index - 1].clear();
    };

    // Função para gerar PDF
    window.gerarPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações do PDF
        doc.setFont('helvetica');
        doc.setFontSize(14);
        
        // Cabeçalho
        doc.setTextColor(26, 115, 232);
        doc.text('ACORDO DE SEGURANÇA PARA LIBERAÇÃO DE SERVIÇO', 105, 15, null, null, 'center');
        
        // Dados do formulário
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Embarcação: ${document.getElementById('embarcacao').value}`, 14, 30);
        doc.text(`Tanque(s): ${document.getElementById('tanque').value}`, 14, 40);
        
        // Adiciona as assinaturas
        const roles = ['Chefe de Máquina', 'Encarregado de Serviço', 'Coordenador Navship'];
        signaturePads.forEach((pad, index) => {
            if (!pad.isEmpty()) {
                const signatureData = pad.toDataURL();
                doc.addImage(signatureData, 'PNG', 14, 60 + (index * 30), 60, 20);
                doc.text(`${roles[index]}:`, 14, 55 + (index * 30));
            }
        });
        
        // Adiciona foto do cadeado se existir
        const fotoInput = document.getElementById('fotoCadeado');
        if (fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                doc.addImage(e.target.result, 'JPEG', 14, 160, 60, 40);
                doc.text('Foto do Cadeado:', 14, 155);
                doc.save('acordo_seguranca.pdf');
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            doc.save('acordo_seguranca.pdf');
        }
    };
});
