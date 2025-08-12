# Guía para trabajar con Deno

Este documento explica cómo instalar, configurar y ejecutar la app usando Deno, como alternativa a Node.js/npm.

## Requisitos
- Deno 1.40 o superior

## Instalación de Deno

Descarga e instala Deno desde la [página oficial](https://deno.com/manual/getting_started/installation).

## Pasos para iniciar la app

1. **Clona el repositorio**

```bash
git clone https://github.com/usuario/nombre-repo.git
cd nombre-repo
```

2. **Instala las dependencias**

```bash
deno task install
```

3. **Inicia la app en modo desarrollo**

```bash
deno task dev
```

4. **Abre la app en el navegador**

La app estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

## Comandos útiles
- `deno task install` — Instala dependencias npm necesarias para el frontend.
- `deno task dev` — Inicia el servidor de desarrollo Vite.
- `deno task build` — Compila la app para producción.

## Notas
- Puedes consultar el documento principal [`README.md`](./README.md) para más detalles sobre estructura, personalización y componentes.
- Si tienes problemas con dependencias, revisa la versión de Deno y los permisos requeridos.

## Recursos
- [Documentación oficial de Deno](https://deno.com/manual)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Vue 3](https://vuejs.org/)

---

¿Dudas o problemas? Abre un issue en GitHub o contacta al autor.
