import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import RouteList from "./pages/common/RouteList"

const App = () => {
  const client = new QueryClient();
  return (
    < >
      <QueryClientProvider client={client}>
        <RouteList />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  )
}

export default App
