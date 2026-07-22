# Krishna Bhatt Personal Portfolio

## How to Update

Steps to Update Personal Website
krishna-bhatt.com 

Push code to GitHub: https://github.com/blizzard-labs/portfolio-website

Open VM SSH: 
1. mv site/public/ old_v/
2. git clone https://github.com/blizzard-labs/portfolio-website.git
3. mv portfolio-website/dist/ site/public
4. rm -r portfolio-website/
5. cd site/
6. docker compose down
7. docker compose up -d
8. cd
9. rm -r old_v/

NOTE: Clear browser cache if still not updating

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
