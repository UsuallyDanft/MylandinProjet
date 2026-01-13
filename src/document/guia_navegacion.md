# Guía de Implementación de Navegación en React
**Tecnología:** React Router DOM v6+  
**Objetivo:** Entender la navegación SPA (Single Page Application) implementada actualmente en el proyecto.

---

## 1. Estructura de Archivos Actual
El proyecto sigue una estructura organizada donde el Layout se trata como un componente:

```text
src/
├── components/
│   ├── Header/
│   │   └── Header.jsx       <-- Menú de navegación con <Link>
│   ├── Layout/
│   │   └── layout.jsx       <-- Componente "marco" (Header + Outlet + Footer)
│   └── Footer/
│       └── Footer.jsx
├── pages/
│   ├── HomePage.jsx         <-- Página de Inicio
│   └── About.jsx            <-- Página "Acerca de"
└── App.jsx                  <-- Configuración Central de Rutas
```

---

## 2. Componentes Clave

### A. El Layout (`src/components/Layout/layout.jsx`)
Este componente define la estructura base que se repite en todas las páginas. Utiliza `<Outlet />` como un "placeholder" o hueco donde se renderizará el contenido de cada página específica.

```javascript
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

function Layout () {
    return (
        <div className={styles.container}>
            <Header/>
            <main className={styles.mainContent}>
                {/* Aquí se carga HomePage, About, etc. según la URL */}
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};
```

### B. El Enrutador (`src/App.jsx`)
Aquí se define el árbol de navegación. En este proyecto, `App.jsx` contiene el `BrowserRouter` y define que todas las rutas hijas usen el `Layout`.

```javascript
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/layout'
import HomePage from './pages/HomePage';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* RUTA PADRE: Renderiza el Layout */}
            <Route path='/' element={<Layout />}>
                
                {/* RUTAS HIJAS: Se renderizan DENTRO del Outlet del Layout */}
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<About />} />
                
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
```

### C. Los Enlaces (`src/components/Header/Header.jsx`)
Para navegar sin recargar la página (comportamiento SPA), se usa el componente `<Link>` en lugar de etiquetas `<a>` tradicionales.

```javascript
import { Link } from 'react-router-dom';

// ... dentro del JSX
<ul className="nav-links">
    <li><Link to="/">Inicio</Link></li>
    <li><Link to="/about">Acerca de</Link></li>
    <li><Link to="/services">Servicios</Link></li>
    <li><Link to="/contact">Contacto</Link></li>
</ul>
```
*(Nota: Actualmente las rutas `/services` y `/contact` están en el menú pero aun no tienen componentes asignados en `App.jsx`)*

---

## 3. Resumen del Flujo de Datos

1.  **Usuario hace clic** en "Acerca de" (`Header.jsx`).
2.  **React Router** detecta el cambio de URL a `/about`.
3.  **App.jsx** busca qué ruta coincide. Encuentra que `/about` está dentro de `Layout`.
4.  **React** mantiene el `Header` y `Footer` visibles (porque son parte del Layout).
5.  **Outlet** (en `Layout.jsx`) se reemplaza por el contenido de `About.jsx`.
