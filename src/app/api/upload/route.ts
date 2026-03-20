import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    // Convertir el archivo a un Buffer para Supabase
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar un nombre único para evitar colisiones
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Subir a Supabase Storage (en el bucket 'articulos')
    const { data, error } = await supabase.storage
      .from('articulos')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Error subiendo a Supabase:", error);
      return NextResponse.json({ 
        error: "Error al subir a la nube", 
        details: error.message 
      }, { status: 500 });
    }

    // Retornamos la URL relativa que será accesible bajo TU DOMINIO gracias al rewrite
    // de next.config.ts (ej: prestaclub.com/uploads/articulos/filename.jpg)
    return NextResponse.json({ 
      url: `/uploads/articulos/${fileName}`,
      success: true 
    });

  } catch (error: any) {
    console.error("Error en la subida:", error);
    return NextResponse.json({ 
      error: "Error interno al procesar el archivo",
      details: error.message 
    }, { status: 500 });
  }
}
