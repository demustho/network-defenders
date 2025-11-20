export class SpriteProcessor {
    static async removeBackground(imageSrc, threshold = 200) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Needed if images are external, though here they are local
            img.src = imageSrc;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let pixelsChanged = 0;

                // Log first pixel color
                console.log(`SpriteProcessor: ${imageSrc} Pixel(0,0) = [${data[0]}, ${data[1]}, ${data[2]}, ${data[3]}]`);

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // Check if pixel is white (or close to white)
                    if (r > threshold && g > threshold && b > threshold) {
                        data[i + 3] = 0; // Set alpha to 0 (transparent)
                        pixelsChanged++;
                    }
                }

                console.log(`SpriteProcessor: Processed ${imageSrc}, changed ${pixelsChanged} pixels.`);

                ctx.putImageData(imageData, 0, 0);

                const processedImg = new Image();
                processedImg.src = canvas.toDataURL();
                processedImg.onload = () => resolve(processedImg);
            };

            img.onerror = (err) => reject(err);
        });
    }
}
