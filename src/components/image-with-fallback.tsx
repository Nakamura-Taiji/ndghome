'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackText: string
  className?: string
  isHorrorTheme?: boolean
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackText, 
  className = "", 
  isHorrorTheme = false 
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={cn(
      "aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative",
      isHorrorTheme && "bg-red-900/20",
      className
    )}>
      {!imageError && (
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
      <span className={cn(
        "absolute inset-0 flex items-center justify-center text-sm font-medium",
        isHorrorTheme ? "text-red-400" : "text-gray-500",
        !imageError && "opacity-0"
      )}>
        {fallbackText}
      </span>
    </div>
  )
}