const payload = {
  tipoProyecto: "SI",
  ubicacion: "Av. de prueba 123",
  fase: "Preventa",
  unidades: "10",
  monto: "100000",
  razonSocial: "Test Inmobiliaria",
  campana: "Organico"
};

async function testSheet() {
  console.log("Enviando POST a Google Sheets...");
  try {
    const res = await fetch("https://script.google.com/a/macros/prestaclub.com/s/AKfycbzj1St6pPB2bbswQS_kwJrWPmN1gi2b8783AzCqKbZDJ2NjyxYhbd8wLXDT9fhhiJLm0g/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload)
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch(e) {
    console.error("Error:", e);
  }
}

testSheet();
