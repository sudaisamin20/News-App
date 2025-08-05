import { createContext, useState, useContext } from "react";

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light")
    }
    // eslint-disable-next-line
    const [location, setLocation] = useState("US")

    const updateLocation = (data) => {
        setLocation(data)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, updateLocation, location }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}

export function useLocation() {
    return useContext(ThemeContext)
}