// Inicializa as assinaturas
let signaturePad1;

function initSignaturePads() {
    const canvas1 = document.getElementById('signaturePad1');
    canvas1.width = canvas1.offsetWidth;
    canvas1.height = canvas1.offsetHeight;
    
    signaturePad1 = new SignaturePad(canvas1, {
        minWidth: 1,
        maxWidth: 2,
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)'
    });
}

// Limpar assinatura
function clearSignature(id) {
    if (id === 1) signaturePad1.clear();
}

// Gerar PDF
function gerarPDF() {
    if (signaturePad1.isEmpty()) {
        alert("Por favor, assine como Chefe de Máquina!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Adiciona texto
    doc.text("ACORDO DE SEGURANÇA", 105, 15, { align: 'center' });
    doc.text(`Embarcação: ${document.getElementById('embarcacao').value}`, 14, 30);
    
    // Adiciona assinatura
    const signatureImg = signaturePad1.toDataURL();
    doc.addImage(signatureImg, 'PNG', 14, 40, 60, 30);
    doc.text("Assinatura - Chefe de Máquina", 14, 80);
    
    // Salva o PDF
    doc.save('acordo_seguranca.pdf');
}

// Inicializa quando a página carrega
window.onload = function() {
    initSignaturePads();
    
    // Corrige redimensionamento em mobile
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('signaturePad1');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
};
