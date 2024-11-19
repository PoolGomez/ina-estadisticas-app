import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { AppRouter } from "./AppRouter";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

function AppHookContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <App>
            <AppRouter />
          </App>
          <ReactQueryDevtools />
        </Provider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default AppHookContainer;
