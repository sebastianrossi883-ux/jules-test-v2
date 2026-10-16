const fs = require('fs');

// Simple 1x1 black image in base64:
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const buffer = Buffer.from(base64Image, 'base64');

['vigneti.jpg', 'cantina.jpg', 'botti.jpg', 'affinamento.jpg'].forEach(name => {
  fs.writeFileSync('assets/media/' + name, buffer);
});
