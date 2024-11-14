import { toast } from "react-toastify";
import Proceso from "./Proceso";

export default class ColaCircular {
  private data: (Proceso | null)[];
  private front: number;
  private rear: number;
  private size: number;
  private quantum: number;

  constructor(size: number, quantum: number) {
    this.data = new Array(size).fill("");
    this.front = -1;
    this.rear = -1;
    this.size = size;
    this.quantum = quantum;
  }

  encolar(proceso: Proceso): void {
    if (this.estaLlena()) {
      toast.error("La cola está llena");
      throw new Error("La cola está llena");
    }
    if (this.estaVacia()) {
      this.front = 0;
    }
    this.moverRear();
    this.data[this.rear] = proceso;
  }

  desencolar(): Proceso | null {
    if (this.estaVacia()) {
      toast.error("La cola está vacía");
      throw new Error("La cola está vacía");
    }

    const item = this.data[this.front];
    item!.tiempo -= this.quantum;
    const seDebeMantenerEnCola = item!.tiempo > 0;

    if (this.estaLlena() && seDebeMantenerEnCola) {
      this.data[this.front] = item;
      this.moverRear();
      this.moverFront();
      return item;
    }

    this.data[this.front] = null;
    if (seDebeMantenerEnCola) {
      this.encolar(item!);
    }

    if (this.front === this.rear) {
      this.reiniciarPunteros();
    } else {
      this.moverFront();
    }
    return item;
  }

  estaVacia(): boolean {
    return this.front === -1;
  }

  estaLlena(): boolean {
    return (this.rear + 1) % this.size === this.front;
  }

  getFront(): number {
    return this.front;
  }

  getRear(): number {
    return this.rear;
  }

  obtenerContenido(): (Proceso | null)[] {
    return this.data;
  }

  private moverFront() {
    this.front = (this.front + 1) % this.size;
  }

  private moverRear() {
    this.rear = (this.rear + 1) % this.size;
  }

  private reiniciarPunteros() {
    this.front = -1;
    this.rear = -1;
  }
}
