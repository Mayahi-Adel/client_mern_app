import UserContext from "./context/appContext";
import AppRouter from "./Routers";
import useAuthListener from "./hooks/use-auth-listener";

function App() {
  const uid = useAuthListener();

  return (
    <UserContext.Provider value={uid}>
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
