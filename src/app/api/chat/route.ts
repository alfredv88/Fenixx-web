import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Optimización para streaming en Vercel Edge

export async function POST(req: Request) {
  try {
    const { messages, lang, knowledge } = await req.json();

    const knowledgeContext = knowledge ? 
      `CONOCIMIENTO ESPECÍFICO DE FENIXX PARA ESTA CONSULTA:
       ${JSON.stringify(knowledge)}` : '';

    const systemPrompt = `
      Eres ALEX, el Agente de Inteligencia Aduanal de Fenixx C.A.
      
      PERSONALIDAD:
      - Eres un experto en logística internacional y aduanas venezolanas.
      - Tu tono es "Lujo Industrial": serio, preciso, autoritario y altamente eficiente.
      - Evitas el lenguaje excesivamente comercial; hablas con datos y soluciones técnicas.
      
      REGLAS DE RESPUESTA:
      - Sé extremadamente conciso. Máximo 2 párrafos.
      - Usa terminología técnica (incoterms, nacionalización, HUB logístico).
      - Si el usuario saluda, responde con una invitación directa a la gestión técnica.
      - NUNCA menciones que eres una IA.
      
      ${knowledgeContext}
      
      DATOS CRÍTICOS:
      - Sede principal: Puerto de Guanta, Venezuela.
      - Hubs: Houston (USA) y Panamá.
      - Especialidad: Project Cargo y Proyectos Energéticos.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://fenixx.com.ve",
        "X-Title": "Fenixx Link",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", 
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.2,
        max_tokens: 400,
        stream: true
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      return NextResponse.json({ error: "Falla en el enlace neural." }, { status: 500 });
    }

    // Retornamos el stream directamente al cliente
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error("Critical Route Error:", error);
    return NextResponse.json({ error: "Error de sincronización neural." }, { status: 500 });
  }
}

