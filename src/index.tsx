import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./modules/store";

// saga 에서 history를 사용해야 한다면 그때 Router로 교체..
// 우선 BrowserRouter로 근데 useNavigate로 충분히 되지 않을까...?

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
