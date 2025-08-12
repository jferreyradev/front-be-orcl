# Vue 3 + Vite

Este proyecto es una interfaz moderna para consultar APIs y visualizar resultados usando Vue 3, Vite, Pinia y Tailwind/DaisyUI.

## Tecnologías usadas

- **Vue 3** — Framework principal para la interfaz de usuario
- **Vite** — Bundler y servidor de desarrollo rápido
- **Pinia** — State management (almacenamiento global)
- **Vue Router** — Navegación entre vistas
- **Tailwind CSS** — Utilidades CSS para estilos rápidos
- **DaisyUI** — Componentes UI sobre Tailwind
- **Deno** — Alternativa para gestión de dependencias y scripts
- **Node.js / npm** — Alternativa tradicional para dependencias y scripts

> ¿Prefieres trabajar con Deno? Consulta la guía exclusiva en [DENO.md](./DENO.md)

## Instalación y puesta en marcha

### Opción 1: Usando Node.js y npm

1. **Clonar el repositorio**

```bash
# Usando HTTPS
git clone https://github.com/usuario/nombre-repo.git
# Usando SSH
git clone git@github.com:usuario/nombre-repo.git
```

2. **Entrar a la carpeta del proyecto**

```bash
cd nombre-repo
```

3. **Instalar dependencias**

```bash
npm install
```

4. **Iniciar la app en modo desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

La app estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

### Opción 2: Usando Deno

1. **Clonar el repositorio** (igual que arriba)
2. **Entrar a la carpeta del proyecto**
3. **Instalar dependencias con Deno**

```bash
deno task install
```

4. **Iniciar la app en modo desarrollo con Deno**

```bash
deno task dev
```

5. **Abrir en el navegador**

La app estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

## Requisitos
- Node.js 18+ y npm 9+ (para opción 1)
- Deno 1.40+ (para opción 2)

## Personalización
- Edita `src/views/ConsultasView.vue` para adaptar la lógica de consulta.
- Configura el endpoint de la API en el formulario o en el código según tu backend.

## Estructura principal
- `src/components/` — Componentes reutilizables (ApiQuery, DataTable, JsonResult, etc.)
- `src/views/` — Vistas principales de la app
- `src/stores/` — Stores Pinia para estado global
- `src/composables/` — Composables reutilizables (fetch, clipboard, etc.)
- `src/utils/` — Utilidades para formateo y normalización

## ¿Dudas o problemas?
Abre un issue en GitHub o contacta al autor.
