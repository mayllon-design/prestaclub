/**
 * Comprime una imagen en el lado del cliente usando el Canvas API.
 * Esto reduce el peso del archivo antes de subirlo al servidor.
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Redimensionar manteniendo la proporción
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('No se pudo obtener el contexto del canvas'));

        ctx.drawImage(img, 0, 0, width, height);

        // Convertir el canvas a un Blob/File con la calidad deseada (0.0 a 1.0)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Error al convertir canvas a blob'));
            
            // Re-vuelvo el blob como un nuevo objeto File
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg', // Forzamos formato JPEG para mejor compresión
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = (err) => reject(err);
    };
    
    reader.onerror = (err) => reject(err);
  });
}
