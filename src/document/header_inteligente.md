# Header Inteligente: Cómo funciona la lógica de ocultamiento al hacer scroll

Este documento explica cómo implementamos un "Header Inteligente" que se oculta automáticamente cuando el usuario hace scroll hacia abajo (para dar más espacio al contenido) y se muestra de nuevo cuando hace scroll hacia arriba (para facilitar la navegación).

## 1. El Componente Visual (Header.jsx)

La "magia" visual ocurre gracias al cambio dinámico de clases CSS. En lugar de usar estilos en línea complicados, simplemente alternamos una clase CSS basándonos en un valor booleano.

```javascript
className={`header-container ${showHeader ? '' : 'header-hidden'}`}
```

### ¿Cómo funciona esta línea?
Utiliza **Template Literals** y un **Operador Ternario**:
- **`showHeader` es `true`**: El usuario está subiendo o en el tope. La clase resultante es `header-container`. El header se ve normal.
- **`showHeader` es `false`**: El usuario está bajando. La clase resultante es `header-container header-hidden`.

En el CSS, la clase `.header-hidden` generalmente aplica una transformación (como `transform: translateY(-100%)`) para mover el header fuera de la vista suavemente.

---

## 2. La Lógica: El Hook `useScrollHide`

Toda la lógica de detección está encapsulada en un Custom Hook llamado `useScrollHide`. Este hook no maneja UI, solo devuelve `true` o `false`.

### Estructura del Hook

1.  **Estados (`useState`)**:
    *   `isVisible`: Determina si el header debe verse. Inicia en `true`.
    *   `lastScrollY`: Guarda la última posición conocida del scroll para poder comparar.

2.  **La Función de Control (`controlHeader`)**:
    Esta función se ejecuta constantemente mientras haces scroll:
    ```javascript
    const controlHeader = () => {
        const currentScrollY = window.scrollY; // Posición actual

        if (currentScrollY > lastScrollY) {
            // Si la posición actual es MAYOR a la anterior: ESTAMOS BAJANDO
            setIsVisible(false); // Ocultar header
        } else {
            // Si es MENOR: ESTAMOS SUBIENDO
            setIsVisible(true);  // Mostrar header
        }
        setLastScrollY(currentScrollY); // Actualizar referencia para la próxima vez
    };
    ```

3.  **El Efecto (`useEffect`)**:
    Conecta nuestra lógica con el navegador.
    ```javascript
    useEffect(() => {
        window.addEventListener('scroll', controlHeader); // Escuchar el scroll

        // Limpieza: muy importante para evitar que se acumulen eventos
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]); // Array de dependencias
    ```

### ¿Por qué `[lastScrollY]` en las dependencias?
Es crucial incluir `lastScrollY` en el array de dependencias. Debido a cómo funcionan las **clausuras (closures)** en JavaScript:
- Si el array estuviera vacío `[]`, la función `controlHeader` se crearía una sola vez y recordaría para siempre el valor inicial de `lastScrollY` (que es `0`).
- Al poner `[lastScrollY]`, le decimos a React: *"Cada vez que `lastScrollY` cambie, reinicia el escuchador de eventos"*. Esto asegura que la función de comparación siempre tenga el valor más reciente de la posición anterior.

---

## Resumen
El sistema funciona separando responsabilidades:
1.  **`useScrollHide`**: Es el cerebro. Calcula matemáticas de scroll y decide "Ver" o "No ver".
2.  **`Header`**: Es la cara. Recibe esa decisión y simplemente quita o pone una clase CSS.
