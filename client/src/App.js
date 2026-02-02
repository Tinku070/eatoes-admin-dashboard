import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <MenuManagement />
      <hr style={{ margin: "40px 0" }} />
      <OrdersDashboard />
    </div>
  );
}

export default App;
