import React from 'react'

const ThemeContext = React.createContext('light')

interface ThemeProviderProps {
    theme: 'light' | 'dark'
    children: React.ReactNode
}

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)
