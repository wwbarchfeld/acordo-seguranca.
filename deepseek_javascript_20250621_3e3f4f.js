// Inicializa as 3 áreas de assinatura
const signaturePads = [
    new SignaturePad(document.getElementById('signaturePad1')),
    new SignaturePad(document.getElementById('signaturePad2')),
    new SignaturePad(document.getElementById('signaturePad3'))
];

// Configuração das assinaturas
signaturePads.forEach(pad => {
    pad.minWidth = 1;
    pad.maxWidth = 2;
    pad.penColor = "black";
});

// Limpar assinatura específica
function clearSignature(index) {
    signaturePads[index - 1].clear();
}

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

// Gerar PDF
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(16);
    doc.text('ACORDO DE SEGURANÇA PARA LIBERAÇÃO DE SERVIÇO', 105, 15, null, null, 'center');

    // Dados do formulário
    doc.setFontSize(12);
    doc.text(`Embarcação: ${document.getElementById('embarcacao').value}`, 14, 30);
    doc.text(`Tanque(s): ${document.getElementById('tanque').value}`, 14, 40);

    // Adiciona as 3 assinaturas
    const roles = ['Chefe de Máquina', 'Encarregado de Serviço', 'Coordenador Navship'];
    signaturePads.forEach((pad, index) => {
        if (!pad.isEmpty()) {
            const signatureData = pad.toDataURL();
            doc.addImage(signatureData, 'PNG', 14, 80 + (index * 30), 60, 20);
            doc.text(roles[index], 14, 75 + (index * 30));
        }
    });

    // Adiciona foto do cadeado (se existir)
    const fotoInput = document.getElementById('fotoCadeado');
    if (fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            doc.addImage(e.target.result, 'JPEG', 14, 180, 60, 40);
            doc.text('Foto do Cadeado:', 14, 175);
            doc.save('acordo_seguranca.pdf');
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        doc.save('acordo_seguranca.pdf');
    }
}
