'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend con la API key proporcionada
const resend = new Resend('re_36f2VdXb_AF6qJyzuytoDNwym7ujZ2nsm');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone } = data;
    
    // Validación básica de datos
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Envío de correo utilizando Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Linktree Hugo <onboarding@resend.dev>',
      to: 'hugoherreracoach@gmail.com',
      subject: 'Nuevo lead del Mapa de Objeciones',
      html: `
        <h2>Nuevo lead del Mapa de Objeciones</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
      `,
    });

    if (error) {
      console.error('Error al enviar el correo:', error);
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      );
    }
    
    console.log('Correo enviado exitosamente:', emailData);
    
    return NextResponse.json({ 
      success: true,
      message: 'Correo enviado exitosamente',
      id: emailData?.id
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
