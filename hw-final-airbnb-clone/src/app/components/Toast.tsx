'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react'

type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle
}

const colors = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500'
}

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const Icon = icons[type]

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-300px`}>
        <Icon className="h-5 w-5" />
        <div className="flex-1">{message}</div>
        <button 
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}