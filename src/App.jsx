import PieChart from "./PieChart";
import Chart from "./Chart";
import Navbar from "./components/general/Navbar";
import VariableSetter from "./components/dashboard/VariableSetter";
import formatPieData from "./utils/formatPieData";
import data from "./data/db";
import { useState } from "react";
import BarChart from "./components/charts/BarChart";
import Sidebar from "./components/general/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getCorrectChart } from "./services/ai_assist";

function App() {
  const [current, setCurrent] = useState("dashboard");
  const [variable, setVariable] = useState("technology");
  const [request, setRequest] = useState("");

  const { data, status, isLoading, refetch } = useQuery({
    queryKey: ["correct_chart"],
    queryFn: () => getCorrectChart(request),
    enabled: false,
  });

  const handleVariableChange = (value) => {
    setVariable(value);
  };

  const handleRequest = () => {
    refetch();
  };

  const sidebarOptions = [
    {
      name: "dashboard",
      icon: "home",
      onClick: () => setCurrent("dashboard"),
    },
    {
      name: "database",
      icon: "database",
      onClick: () => setCurrent("database"),
    },
    {
      name: "Item 3",
      icon: "database",
      onClick: () => setCurrent("item3"),
    },
  ];

  return (
    <div className="overflow-hidden">
      <div className="flex w-screen flex-col">
        <Navbar />
        <div className="flex  ">
          <Sidebar current={current} sidebarOptions={sidebarOptions} />
          <div className="flex flex-col w-screen">
            <div className="flex items-center">
              <VariableSetter setVariable={handleVariableChange} />
              {/* <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                open modal
              </button> */}
            </div>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Asistencia IA para componentes
                </h3>
                <p className="py-4">¿Qué deseas visualizar?</p>
                <input
                  type="text"
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="Deseo visualizar..."
                  className="input input-bordered input-lg w-full max-w-xs"
                />
                <button
                  className="btn btn-primary block mt-5"
                  onClick={() => handleRequest()}
                >
                  Solicitar
                </button>
                {isLoading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                {status === "success" && (
                  <div>
                    <h3 className="font-bold text-lg">
                      Se recomienda añadir un gráfico de tipo:{" "}
                    </h3>
                    <p>{data}</p>
                  </div>
                )}
                <p></p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div className="w-full grid grid-cols-2 gap-5 px-7">
              <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body h-96">
                  <h2 className="card-title">Sunburst de data</h2>
                  <Chart />
                </div>
              </div>
              <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body h-96">
                  <h2 className="card-title">Sunburst de data</h2>
                  {
                    "Aquí están los resultados del análisis:\n\n- **Velocidad de bajada:**\n  - Media: \\(86.19 \\, \\text{Mbps}\\)\n  - Desviación estándar: \\(106.45 \\, \\text{Mbps}\\)\n\n- **Velocidad de subida:**\n  - Media: \\(60.82 \\, \\text{Mbps}\\)\n  - Desviación estándar: \\(113.48 \\, \\text{Mbps}\\)\n\n- **Prueba t:**\n  - Estadístico t: \\(1.15\\)\n  - Valor p: \\(0.25\\)\n\n### Interpretación:\n1. **Medias:** La velocidad de bajada es, en promedio, mayor que la velocidad de subida.\n2. **Desviaciones estándar:** Ambas velocidades tienen una alta variabilidad, lo que indica que hay una amplia gama de velocidades en los datos.\n3. **Prueba t:** El valor p de \\(0.25\\) es mayor que el nivel de significancia común de \\(0.05\\), lo que sugiere que no hay diferencias estadísticamente significativas entre las velocidades de subida y bajada en este conjunto de datos.\n\nEn resumen, aunque la velocidad de bajada es mayor en promedio, no se puede concluir que haya una diferencia significativa entre las velocidades de subida y bajada basándose en este análisis. Si necesitas más información o un análisis adicional, házmelo saber."
                  }
                </div>
              </div>
              {/* <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body h-96">
              <h2 className="card-title">Sunburst de data</h2>
              <Chart />
            </div>
          </div> */}
              <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body h-96">
                  <h2 className="card-title">Sunburst de data</h2>
                  {/* <BarChart variable={variable} /> */}
                  {/* <PieChart data={formatPieData(data, variable)} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
