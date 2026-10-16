const fs = require('fs');
// base64 1x1 jpeg
const img = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwO/P2OAAAAAtJREFUGFdjYAACAAAFAAFiGxEBAAAAAElFTkSuQmCC";
const buf = Buffer.from(img, 'base64');
fs.writeFileSync('assets/media/vigneti.jpg', buf);
fs.writeFileSync('assets/media/cantina.jpg', buf);
fs.writeFileSync('assets/media/botti.jpg', buf);
fs.writeFileSync('assets/media/affinamento.jpg', buf);
