import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import flechaABajo from "./assets/flecha-hacia-abajo.png";
import flechaArriba from "./assets/flecha-hacia-arriba.png";
import iconoReiniciar from "./assets/recargar.png";
import ColaCircular from "./classes/ColaCircular";

const TAMANO_COLA = 8;
function App() {
  const [cola, setCola] = useState(new ColaCircular(TAMANO_COLA));
  const [contenido, setContenido] = useState<string[]>([]);
  const [indiceInicio, setIndiceInicio] = useState(0);
  const [indiceFinal, setIndiceFinal] = useState(0);
  const [actualizadoEn, setActualizadoEn] = useState(new Date().getTime());
  const [contadorProceso, setContadorProceso] = useState(1);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [anchoContenedor, setAnchoContenedor] = useState(0);
  const [anchoElemento, setAnchoElemento] = useState(0);

  const actualizarEstados = () => {
    setContenido(cola.getContent());
    setIndiceInicio(cola.getFront());
    setIndiceFinal(cola.getRear());
  };

  const calcularAnchoElemento = () => {
    setAnchoElemento(anchoContenedor / (cola.getContent().length ?? 1));
  };

  const agregar = () => {
    cola.enqueue(`${contadorProceso}`);
    setContadorProceso(contadorProceso + 1);
    setActualizadoEn(new Date().getTime());
  };

  const eliminar = () => {
    cola.dequeue();
    setActualizadoEn(new Date().getTime());
  };

  const reiniciar = () => {
    setCola(new ColaCircular(TAMANO_COLA));
    setContadorProceso(1);
    toast.info("Se ha reiniciado la cola");
  };

  useEffect(() => {
    actualizarEstados();
  }, [actualizadoEn, cola]);

  useEffect(() => {
    const actualizarAncho = () => {
      if (contenedorRef.current) {
        setAnchoContenedor(contenedorRef.current.offsetWidth);
      }
    };

    actualizarAncho();
    window.addEventListener("resize", actualizarAncho);
    return () => {
      window.removeEventListener("resize", actualizarAncho);
    };
  }, []);

  useEffect(() => {
    calcularAnchoElemento();
  }, [anchoContenedor]);

  return (
    <>
      <ToastContainer />
      <button
        onClick={reiniciar}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "9999px",
          minWidth: "60px",
          minHeight: "60px",
        }}
      >
        <motion.img
          style={{ width: "24px", height: "24px" }}
          src={iconoReiniciar}
          alt="reiniciar cola"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      </button>
      <div ref={contenedorRef}>
        <h1>Algoritmo Cola Circular</h1>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <motion.img
            src={flechaABajo}
            alt="flecha hacia abajo"
            style={{ width: "40px", height: "50px" }}
            animate={{
              x:
                Math.floor(indiceInicio * anchoElemento) +
                (anchoElemento / 2 - 20),
            }}
          />
        </div>
        <div style={{ display: "flex", marginBlock: "24px" }}>
          {contenido.map((valor, index) => (
            <div
              key={index}
              style={{
                width: anchoElemento,
                maxWidth: anchoElemento,
                boxSizing: "content-box",
                minHeight: "50px",
                border: "1px solid white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ marginBlock: "auto !important" }}>{!!valor ? "Proceso" : ""}</p>
              <span>{valor}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <motion.img
            src={flechaArriba}
            alt="flecha hacia arriba"
            style={{ width: "40px", height: "50px" }}
            animate={{
              x:
                Math.floor(indiceFinal * anchoElemento) +
                (anchoElemento / 2 - 20),
            }}
          />
        </div>
        <div>
          <p>{`Proceso siguiente es: ${contadorProceso}`} </p>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <button onClick={agregar}>Añadir</button>
            <button onClick={eliminar}>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
