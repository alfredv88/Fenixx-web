import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, lang, knowledge } = await req.json();

    const systemPrompt = `
      Eres Alex, Agente Táctico de Fenixx C.A.
      
      ESTILO DE RESPUESTA:
      - Súper conciso. Máximo 2 párrafos cortos.
      - NUNCA digas "Hola! Soy Alex..." si la conversación ya empezó.
      - Prohibido repetir el horario o la flota si el usuario no lo pide específicamente.
      - Eres un profesional eficiente. No eres un bot de marketing.
      - SE PRECISO CONSIZO. no te extiendas en las respuestas. ahorra tokens
      
      REPUESAS A GREETINGS:
      - Si te dicen "hola", solo responde: "Hola de nuevo, ¿en que puedo ayudarle, necesita alguna gestion de envio?" o similar.
      
      BASE DE DATOS FENIXX:
      - Sede: Guanta, Anzoátegui.
      - Servicios: Aduana, Transporte Pesado, Proyectos Petroleros.
      - Flota: Propia con GPS.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Fenixx Tactic Chat",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Sigue siendo el mejor, bajamos los tokens
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.3,
        max_tokens: 500, // Limite para no agotar tu saldo y que la API acepte la petición
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return NextResponse.json({ error: data.error.message || "Error de la API" }, { status: 500 });
    }

    const botReply = data.choices[0]?.message?.content || "No pude generar una respuesta.";

    return NextResponse.json({ reply: botReply });
  } catch (error: any) {
    console.error("Critical Route Error:", error);
    return NextResponse.json({ error: error.message || "Error en la conexión neural" }, { status: 500 });
  }
}
