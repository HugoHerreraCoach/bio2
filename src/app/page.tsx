'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBook, FaWhatsapp, FaMusic } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 modal-overlay" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="modal-content w-full max-w-md transform p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-5">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6"
                  >
                    Descarga el Mapa de Objeciones
                  </Dialog.Title>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  {errors.submit && <p className="text-red-400 text-sm mb-4">{errors.submit}</p>}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Enviando...' : 'Descargar ahora'}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Componente para los enlaces
const LinkCard = ({ 
  icon, 
  title,
  subtitle,
  href, 
  onClick, 
  newTab = true,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string;
  subtitle: string;
  href: string; 
  onClick?: (e: React.MouseEvent) => void; 
  newTab?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + (delay * 0.1) }}
    >
      <a
        href={href}
        onClick={onClick}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : ""}
        className="link-card w-full flex items-center p-4"
      >
        <div className="icon-container mr-4 text-white">
          {icon}
        </div>
        <div>
          <div className="font-medium text-base">{title}</div>
          <div className="text-sm text-gray-400">{subtitle}</div>
        </div>
      </a>
    </motion.div>
  );
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="profile-container flex flex-col items-center mb-6">
          <div className="profile-image-container">
            <Image
              src="/images/hugo-400x400.jpg"
              alt="Hugo Herrera"
              fill
              className="profile-image rounded-full object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-1">
            Hugo Herrera
          </h1>
          <p className="text-base text-gray-300 text-center">
            Coach en Ventas y Creador de Estrategias Comerciales
          </p>
        </div>

        <div className="quote-container">
          <p className="text-center text-gray-300 italic">
            &ldquo;Transformando vendedores en cerradores expertos y líderes en resultados&rdquo;
          </p>
        </div>

        <div className="w-full space-y-3 my-6">
          <LinkCard 
            icon={<FaMapMarkerAlt size={20} />}
            title="Descarga el Mapa de Objeciones" 
            subtitle="Guía gratuita para cerrar más ventas"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            newTab={false}
            delay={0}
          />
          
          <LinkCard 
            icon={<FaBook size={20} />}
            title="Libro Cerrador Experto" 
            subtitle="Domina las técnicas de cierre"
            href="https://cerradorexperto.hugoherreracoach.com/"
            delay={1}
          />
          
          <LinkCard 
            icon={<IoDocumentText size={20} />}
            title="Libro Líder Experto" 
            subtitle="Desarrolla tu liderazgo comercial"
            href="https://liderexperto.hugoherreracoach.com/"
            delay={2}
          />
          
          <LinkCard 
            icon={<FaWhatsapp size={20} />}
            title="WhatsApp Directo" 
            subtitle="Conversemos sobre tus objetivos"
            href="https://api.whatsapp.com/send?phone=51900239201&text=¡Hola Hugo! 😃 Mi nombre es..."
            newTab={false}
            delay={3}
          />
          
          <LinkCard 
            icon={<FaMusic size={20} />}
            title="TikTok" 
            subtitle="@hugoherreracoach"
            href="https://www.tiktok.com/@hugoherreracoach"
            delay={4}
          />
          
          <LinkCard 
            icon={<BsInstagram size={20} />}
            title="Instagram" 
            subtitle="@hugoherreracoach"
            href="https://www.instagram.com/hugoherreracoach"
            delay={5}
          />
          
          <LinkCard 
            icon={<BsFacebook size={20} />}
            title="Facebook" 
            subtitle="@hugoherreracoach"
            href="https://www.facebook.com/hugoherreracoach"
            delay={6}
          />
        </div>
      </div>

      <LeadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleLeadSubmit} 
      />
    </main>
  );
}
