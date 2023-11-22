const express = require('express');
const app = express();
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { PDFDocument: PDFLib, rgb } = require('pdf-lib');
const PORT = 3000;

// Création d'un dossier pour stocker les PDFs s'il n'existe pas déjà
const pdfsDir = './pdfs';
if (!fs.existsSync(pdfsDir)){
    fs.mkdirSync(pdfsDir);
}

// Route de base pour tester l'API
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion de PDFs!');
});

// Route pour générer un nouveau PDF avec du contenu enrichi
app.post('/pdf/generate', (req, res) => {
    let doc = new PDFDocument();
    let filename = `PDF-${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(`${pdfsDir}/${filename}`));

    doc.fontSize(18).fillColor('blue').text('Titre du Document', 100, 100);
    doc.fontSize(12).fillColor('black').text('Ceci est un paragraphe de texte normal.', 100, 150);
    doc.image('./images/chat.jpg', 100, 200, { width: 300 });
    doc.text('1. Premier élément de la liste', 100, 300);
    doc.text('2. Deuxième élément', 100, 320);
    doc.strokeColor('red').lineWidth(1).moveTo(100, 600).lineTo(200, 600).stroke();
    doc.strokeColor('green').circle(150, 650, 50).stroke();
    doc.fillColor('blue').text('Cliquez ici pour visiter Google', 100, 550, {
        link: 'http://www.google.com',
        underline: true
    });

    doc.end();
    res.send(`PDF généré avec succès : ${filename}`);
});

// Route pour modifier un PDF existant ainsi que des ajouts visuels
app.put('/pdf/modify', async (req, res) => {
    let existingPdfFilename = 'PDF-1700651485653.pdf'; // Remplacez par le nom réel du fichier généré 
    let modifiedPdfFilename = `Modified-${Date.now()}.pdf`;

    try {
        const existingPdfBytes = fs.readFileSync(`${pdfsDir}/${existingPdfFilename}`);
        const pdfDoc = await PDFLib.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawText('Texte ajouté sur la première page', {
            x: 50,
            y: 500,
            size: 15,
            color: rgb(0.95, 0.1, 0.1),
        });

        const newPage = pdfDoc.addPage();
        const jpgImageBytes = fs.readFileSync('./images/chat.jpg');
        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        newPage.drawImage(jpgImage, {
            x: newPage.getWidth() / 2 - jpgImage.width / 2,
            y: newPage.getHeight() / 2 - jpgImage.height / 2,
            width: jpgImage.width,
            height: jpgImage.height,
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(`${pdfsDir}/${modifiedPdfFilename}`, pdfBytes);

        res.send(`PDF modifié avec succès : ${modifiedPdfFilename}`);
    } catch (error) {
        console.error("Erreur lors de la modification du PDF:", error);
        res.status(500).send("Erreur lors de la modification du PDF");
    }
});

// Route pour télécharger un PDF
app.get('/pdf/download/:filename', (req, res) => {
    let filename = req.params.filename;
    res.download(`${pdfsDir}/${filename}`, filename);
});

// Route pour lister tous les PDFs
app.get('/pdf/list', (req, res) => {
    fs.readdir(pdfsDir, (err, files) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des fichiers');
        } else {
            res.json(files.filter(file => file.endsWith('.pdf')));
        }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
