import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { AppRouter } from "./AppRouter";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import {Grid} from 'react-loader-spinner'
import { Toaster } from "./components/ui/toaster";

function AppHookContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
        // <ProgressBar
        // visible={true}
        // height="80"
        // width="80"
        // // color="#4fa94d"
        // ariaLabel="progress-bar-loading"
        // wrapperStyle={{}}
        // wrapperClass=""
        // />
        <Grid
          visible={true}
          height="80"
          width="80"
          color="black"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      }>
        <Provider store={store}>
          <App>
            <AppRouter />
          </App>
          <Toaster />
          <ReactQueryDevtools />
        </Provider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default AppHookContainer;
