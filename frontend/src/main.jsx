import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
      theme={{
        primaryColor: "orange",
        colors: {
          orange: [
          "#fff4e6",
          "#ffe8cc",
          "#ffd8a8",
          "#ffc078",
          "#ffa94d",
          "#ff922b",
          "#fd7e14",
          "#f76707",
          "#e8590c",
          "#d9480f",
          ],
        },
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);