import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, '../src/assets/projects');

const optimizeImages = async () => {
    try {
        const files = fs.readdirSync(projectsDir);

        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(projectsDir, file);
                const filename = path.parse(file).name;

                // Generate Large (800px)
                const largeOutputPath = path.join(projectsDir, `${filename}-large.webp`);
                console.log(`Generating ${filename}-large.webp...`);
                await sharp(inputPath)
                    .resize(800, 800, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 })
                    .toFile(largeOutputPath);

                // Generate Small (400px)
                const smallOutputPath = path.join(projectsDir, `${filename}-small.webp`);
                console.log(`Generating ${filename}-small.webp...`);
                await sharp(inputPath)
                    .resize(400, 400, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 })
                    .toFile(smallOutputPath);
            }
        }
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
};

optimizeImages();
