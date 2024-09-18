import { Provider } from "react-redux";
import { store } from "./redux/Store";
import RouteList from "./pages/common/NavBar/RouteList";

const App = () => {
  return (
    <>
      <Provider store={store} >
        <RouteList />
      </Provider>
    </>
  )
}

export default App
