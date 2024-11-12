import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { queryClient } from './api/react-query.ts'
import AppRouter from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools />
    </QueryClientProvider>
    {/* <App /> */}
  </StrictMode>,
)
