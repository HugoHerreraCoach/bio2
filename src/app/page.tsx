'use client';

import { useState } from 'react';
import Image from 'next/image';

// Componente para el modal de captura de leads
const LeadModal = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: { name: string; email: string; phone: string }) => void 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrors({ submit: 'Error al enviar el formulario. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in">
      <div className="modal-content rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Descarga el Mapa de Objeciones</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 rounded-md"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-200 disabled:opacity-70"
          >
            {isSubmitting ? 'Enviando...' : 'Descargar ahora'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente para los enlaces
const LinkCard = ({ 
  icon, 
  title, 
  href, 
  onClick, 
  newTab = true 
}: { 
  icon: string; 
  title: string; 
  href: string; 
  onClick?: (e: React.MouseEvent) => void; 
  newTab?: boolean;
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : ""}
      className="link-card w-full flex items-center p-4 mb-4"
    >
      <div className="mr-3 text-xl">{icon}</div>
      <span className="font-medium">{title}</span>
    </a>
  );
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLeadSubmit = async (data: { name: string; email: string; phone: string }) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      
      // Redirigir después de enviar exitosamente
      window.open('https://drive.google.com/drive/folders/1RxOOaWt7x_h7VoBdRY7_hUF0eRYb3a-D?usp=drive_link', '_blank');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mb-8 animate-fade-in">
        <div className="relative w-28 h-28 mb-4">
          <Image
            src="/images/hugo-400x400.jpg"
            alt="Hugo Herrera"
            fill
            className="profile-image rounded-full object-cover"
            priority
          />
        </div>
        <h1 className="text-xl font-bold text-center mb-1">Hugo Herrera</h1>
        <p className="text-sm text-gray-300 text-center">Coach en Ventas y Creador de Estrategias Comerciales</p>
      </div>

      <div className="w-full max-w-sm space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <LinkCard 
          icon="📌" 
          title="Descarga el Mapa de Objeciones" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }}
          newTab={false}
        />
        
        <LinkCard 
          icon="📘" 
          title="Libro Cerrador Experto" 
          href="https://cerradorexperto.hugoherreracoach.com/"
        />
        
        <LinkCard 
          icon="📗" 
          title="Libro Líder Experto" 
          href="https://liderexperto.hugoherreracoach.com/"
        />
        
        <LinkCard 
          icon="🟢" 
          title="WhatsApp Directo" 
          href="https://api.whatsapp.com/send?phone=51900239201&text=¡Hola Hugo! 😃 Mi nombre es..."
          newTab={false}
        />
        
        <LinkCard 
          icon="📱" 
          title="TikTok" 
          href="https://www.tiktok.com/@hugoherreracoach"
        />
        
        <LinkCard 
          icon="📸" 
          title="Instagram" 
          href="https://www.instagram.com/hugoherreracoach"
        />
        
        <LinkCard 
          icon="📘" 
          title="Facebook" 
          href="https://www.facebook.com/hugoherreracoach"
        />
      </div>

      <footer className="mt-12 text-center text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        © {new Date().getFullYear()} Hugo Herrera Coach
      </footer>

      <LeadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleLeadSubmit} 
      />
    </main>
  );
}
