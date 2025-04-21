# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## Processo de Upload de Vídeo com URL Pré-assinada do S3

### Fluxo de Comunicação

O upload de vídeos utiliza o mecanismo de URL pré-assinada do Amazon S3 para garantir uploads eficientes e seguros. O fluxo funciona da seguinte forma:

1. **Usuário seleciona o vídeo** no formulário de upload e define o número de frames a serem extraídos
2. **Frontend solicita URL pré-assinada** ao backend enviando metadados do arquivo (nome, tipo, etc.)
3. **Backend gera URL pré-assinada** no S3 e retorna para o frontend junto com o ID do vídeo
4. **Frontend faz upload direto para o S3** utilizando a URL pré-assinada (sem passar pelo backend)
5. **Frontend notifica o backend** que o upload foi concluído
6. **Backend processa o vídeo** para extrair frames e realizar outras operações
7. **Usuário é redirecionado** para a página de resultados para acompanhar o processamento

### Visualizando Vídeos

Para acessar os vídeos posteriormente:

1. O frontend solicita uma lista de vídeos do backend
2. O usuário pode visualizar ou baixar os vídeos concluídos
3. Ao clicar em "Visualizar", o frontend solicita uma URL temporária de visualização ao backend
4. O backend gera uma URL pré-assinada temporária do S3 para o vídeo
5. O frontend carrega o vídeo diretamente do S3 usando a URL temporária

### Vantagens dessa Abordagem

- **Eficiência**: Upload direto para o S3 sem sobrecarregar o backend
- **Segurança**: URLs pré-assinadas com tempo de expiração e permissões específicas
- **Escalabilidade**: Suporte a arquivos grandes sem limitações do servidor web
- **Desempenho**: Uploads mais rápidos utilizando a infraestrutura da AWS

### Estrutura de Código

- `videoService.ts` - Serviço que gerencia a comunicação com o backend
- `VideoUpload.tsx` - Componente para upload de vídeos com barra de progresso
- `ProcessingResults.tsx` - Componente para listar e visualizar vídeos processados

### Diagrama de Sequência

```
┌──────────┐          ┌───────────┐          ┌────────┐
│ Frontend │          │  Backend  │          │   S3   │
└────┬─────┘          └─────┬─────┘          └────┬───┘
     │    1. Solicita URL    │                    │
     │─────────────────────>│                    │
     │                       │  2. Gera URL       │
     │                       │─ ─ ─ ─ ─ ─ ─ ─ ─ ─>│
     │                       │                    │
     │   3. Retorna URL      │                    │
     │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │
     │                       │                    │
     │       4. Upload direto para S3            │
     │───────────────────────────────────────────>
     │                       │                    │
     │ 5. Confirma upload    │                    │
     │─────────────────────>│                    │
     │                       │ 6. Processa vídeo  │
     │                       │<─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
     │                       │                    │
     │ 7. Solicita listagem  │                    │
     │─────────────────────>│                    │
     │                       │                    │
     │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │
     │  8. Mostra vídeos     │                    │
```
