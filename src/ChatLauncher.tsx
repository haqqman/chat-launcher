'use client'
import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiChevronDown } from 'react-icons/fi'
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa6'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

import { ChatLauncherConfig, CONFIG } from './types'

const ChatLauncherContext = createContext<ChatLauncherConfig>(CONFIG);

export const ChatLauncherProvider: React.FC<{ config?: ChatLauncherConfig; children: React.ReactNode }> = ({ 
  config, 
  children 
}) => {
  const mergedConfig = { ...CONFIG, ...config };
  return (
    <ChatLauncherContext.Provider value={mergedConfig}>
      {children}
    </ChatLauncherContext.Provider>
  );
};

export const useChatLauncher = () => useContext(ChatLauncherContext);

export interface ChatLauncherProps extends ChatLauncherConfig {}

export const ChatLauncher: React.FC<ChatLauncherProps> = (props) => {
  const globalConfig = useChatLauncher();
  
  // Merge global config with local props
  const config = {
    ...globalConfig,
    ...props,
    labels: { ...globalConfig.labels, ...props.labels },
    placeholders: { ...globalConfig.placeholders, ...props.placeholders },
  };

  const {
    brandName,
    brandSubtitle,
    logoUrl,
    showHaqqmanBranding,
    whatsappNumber,
    messengerUsername,
    primaryColor,
    secondaryColor,
    accentColor,
    options,
    labels,
    placeholders
  } = config;

  const [isWidgetOpen, setIsWidgetOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const chatWidgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        chatWidgetRef.current &&
        !chatWidgetRef.current.contains(event.target as Node)
      ) {
        setIsWidgetOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'email':
        setEmail(value.toLowerCase().replace(/\s+/g, ''))
        break
      case 'subject':
        setSubject(value)
        break
    }
  }

  const isFormValid = firstName.trim() !== '' && email.trim() !== '' && subject !== '';

  const handleWhatsAppClick = () => {
    if (!isFormValid) return;
    const message = `Hello, my name is ${firstName}. My email is ${email}. I would like to chat about ${subject}.`
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    )
  }

  const handleMessengerClick = () => {
    if (!isFormValid) return;
    const message = `Hello, my name is ${firstName}. My email is ${email}. I would like to chat about ${subject}.`
    window.open(`https://m.me/${messengerUsername}?ref=${encodeURIComponent(message)}`)
  }

  const toggleWidget = () => setIsWidgetOpen(!isWidgetOpen)
  const searchParams = useSearchParams()
  
  // Return null if pdfCapture search param is present
  if (searchParams?.get('pdfCapture')) {
    return null;
  }

  const cssVars = {
    '--cl-primary': primaryColor,
    '--cl-secondary': secondaryColor,
    '--cl-accent': accentColor,
  } as React.CSSProperties;

  return (
    <div ref={chatWidgetRef} className='fixed bottom-6 right-6 z-50' style={cssVars}>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWidget}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300`}
        style={{ backgroundColor: isWidgetOpen ? '#ef4444' : 'var(--cl-secondary)' }}
      >
        {isWidgetOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className='absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100'
          >
            {/* Header */}
            <div 
              className='p-5 flex items-center gap-4'
              style={{ background: `linear-gradient(135deg, var(--cl-primary) 0%, #1e293b 100%)` }}
            >
              <div className='bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-inner'>
                <Image
                  src={logoUrl!}
                  alt={`${brandName} Logo`}
                  width={32}
                  height={32}
                  className='drop-shadow-sm'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <h4 className='font-bold text-white text-base truncate'>{brandName}</h4>
                <p className='text-[10px] uppercase tracking-wider font-medium text-white/70 truncate'>
                  {brandSubtitle}
                </p>
              </div>
              <button
                onClick={toggleWidget}
                className='text-white/50 hover:text-white transition-colors p-1'
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Form */}
            <div className='p-5 space-y-4'>
              <div className='space-y-1.5'>
                <label className='block text-xs font-bold uppercase tracking-tight' style={{ color: 'var(--cl-primary)' }}>
                  {labels?.name}
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={firstName}
                  onChange={handleFormInputChange}
                  placeholder={placeholders?.name}
                  className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400'
                  style={{ '--tw-ring-color': 'var(--cl-accent)' } as any}
                />
              </div>

              <div className='space-y-1.5'>
                <label className='block text-xs font-bold uppercase tracking-tight' style={{ color: 'var(--cl-primary)' }}>
                  {labels?.email}
                </label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleFormInputChange}
                  placeholder={placeholders?.email}
                  className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400'
                  style={{ '--tw-ring-color': 'var(--cl-accent)' } as any}
                />
              </div>

              <div className='space-y-1.5'>
                <label className='block text-xs font-bold uppercase tracking-tight' style={{ color: 'var(--cl-primary)' }}>
                  {labels?.subject}
                </label>
                <div className='relative'>
                  <select
                    name='subject'
                    value={subject}
                    onChange={handleFormInputChange}
                    className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer'
                    style={{ '--tw-ring-color': 'var(--cl-accent)' } as any}
                  >
                    <option value=''>{placeholders?.subject}</option>
                    {options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <FiChevronDown
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={16}
                  />
                </div>
              </div>

              <div className='pt-2 grid grid-cols-1 gap-2.5'>
                <button
                  onClick={handleWhatsAppClick}
                  disabled={!isFormValid}
                  className='group relative flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] disabled:bg-gray-200 disabled:grayscale text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-sm'
                >
                  <FaWhatsapp className='w-5 h-5 transition-transform group-hover:scale-110' />
                  <span>{labels?.whatsappButton}</span>
                </button>

                <button
                  onClick={handleMessengerClick}
                  disabled={!isFormValid}
                  className='group relative flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:grayscale text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-sm'
                  style={{ backgroundColor: isFormValid ? 'var(--cl-secondary)' : undefined }}
                >
                  <FaFacebookMessenger className='w-5 h-5 transition-transform group-hover:scale-110' />
                  <span>{labels?.messengerButton}</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className='bg-gray-50/50 p-3 text-center text-[10px] font-medium text-gray-400 border-t border-gray-100'>
              Chat Launcher {showHaqqmanBranding && 'by Haqqman'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


