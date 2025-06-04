'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebookF, FaDownload, FaBook, FaBookOpen } from 'react-icons/fa';
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
              <Dialog.Panel className="modal-content w-full max-w-md transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
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
                    className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaDownload className="mr-2" />
                        Descargar ahora
                      </span>
                    )}
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
  href, 
  onClick, 
  newTab = true,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  href: string; 
  onClick?: (e: React.MouseEvent) => void; 
  newTab?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + (delay * 0.1) }}
    >
      <a
        href={href}
        onClick={onClick}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : ""}
        className="link-card w-full flex items-center p-4 mb-4"
      >
        <div className="icon-container mr-4">
          {icon}
        </div>
        <span className="font-medium text-lg">{title}</span>
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
    <main className="flex flex-col items-center justify-center min-h-screen py-6 px-4 md:py-0">
      <div className="w-full md:desktop-container">
        <motion.div 
          className="profile-container flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-32 h-32 md:w-36 md:h-36 mb-5">
            <Image
              src="/images/hugo-400x400.jpg"
              alt="Hugo Herrera"
              fill
              className="profile-image rounded-full object-cover"
              priority
            />
          </div>
          <motion.h1 
            className="text-2xl font-bold text-center mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hugo Herrera
          </motion.h1>
          <motion.p 
            className="text-base text-gray-300 text-center max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Coach en Ventas y Creador de Estrategias Comerciales
          </motion.p>
        </motion.div>

        <div className="w-full max-w-md mx-auto space-y-4 mb-8">
          <LinkCard 
            icon={<FaDownload size={20} className="text-white" />}
            title="Descarga el Mapa de Objeciones" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            newTab={false}
            delay={0}
          />
          
          <LinkCard 
            icon={<FaBook size={20} className="text-white" />}
            title="Libro Cerrador Experto" 
            href="https://cerradorexperto.hugoherreracoach.com/"
            delay={1}
          />
          
          <LinkCard 
            icon={<FaBookOpen size={20} className="text-white" />}
            title="Libro Líder Experto" 
            href="https://liderexperto.hugoherreracoach.com/"
            delay={2}
          />
          
          <LinkCard 
            icon={<FaWhatsapp size={20} className="text-white" />}
            title="WhatsApp Directo" 
            href="https://api.whatsapp.com/send?phone=51900239201&text=¡Hola Hugo! 😃 Mi nombre es..."
            newTab={false}
            delay={3}
          />
          
          <LinkCard 
            icon={<FaTiktok size={20} className="text-white" />}
            title="TikTok" 
            href="https://www.tiktok.com/@hugoherreracoach"
            delay={4}
          />
          
          <LinkCard 
            icon={<FaInstagram size={20} className="text-white" />}
            title="Instagram" 
            href="https://www.instagram.com/hugoherreracoach"
            delay={5}
          />
          
          <LinkCard 
            icon={<FaFacebookF size={20} className="text-white" />}
            title="Facebook" 
            href="https://www.facebook.com/hugoherreracoach"
            delay={6}
          />
        </div>

        <motion.footer 
          className="mt-10 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          © {new Date().getFullYear()} Hugo Herrera Coach
        </motion.footer>
      </div>

      <LeadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleLeadSubmit} 
      />
    </main>
  );
}
