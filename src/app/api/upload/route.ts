import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Definir la carpeta de destino: public/uploads/articulos
    // process.cwd() nos da la raíz del proyecto
    const uploadDir = join(process.cwd(), "public", "uploads", "articulos");
    
    // Crear la carpeta si no existe
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (err) {
        // Carpeta ya existe o error de permisos
    }

    // Generar un nombre único para evitar colisiones
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = join(uploadDir, fileName);

    // Escribir el archivo en el disco del servidor
    await writeFile(filePath, buffer);

    // Retornamos la URL relativa que será accesible públicamente
    // y es la que se guardará en el campo image_url de MySQL
    return NextResponse.json({ 
      url: `/uploads/articulos/${fileName}`,
      success: true 
    });

  } catch (error: any) {
    console.error("Error en la subida local:", error);
    return NextResponse.json({ 
      error: "Error interno al subir el archivo",
      details: error.message 
    }, { status: 500 });
  }
}
