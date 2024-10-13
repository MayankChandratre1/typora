'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

const ThemeButton = () => {
    const {theme, setTheme} = useTheme();
  return (
    <Button variant={'default'} onClick={()=>{
        setTheme(theme == 'dark' ? 'light':'dark')
    }}>
        {theme == 'dark' ? 'Light':'Dark'}
    </Button>
  )
}

export default ThemeButton