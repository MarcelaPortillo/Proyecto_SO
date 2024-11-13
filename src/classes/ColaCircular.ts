import { toast } from "react-toastify";

export default class ColaCircular {
    private data: string[];
    private front: number;
    private rear: number;
    private size: number;

    constructor(size: number) {
        this.data = new Array(size).fill('');
        this.front = -1;
        this.rear = -1;
        this.size = size;
    }

    enqueue(item: string): void {
        if (this.isFull()) {
            toast.error('La cola está llena');
            throw new Error('La cola está llena');
        }
        if (this.isEmpty()) {
            this.front = 0;
        }
        this.rear = (this.rear + 1) % this.size;
        this.data[this.rear] = item;
    }

    dequeue(): string {
        if (this.isEmpty()) {
            toast.error('La cola está vacía');
            throw new Error('La cola está vacía');
        }
        const item = this.data[this.front];
        this.data[this.front] = '';
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }
        return item;
    }

    isEmpty(): boolean {
        return this.front === -1;
    }

    isFull(): boolean {
        return (this.rear + 1) % this.size === this.front;
    }

    getFront(): number {
        return this.front;
    }

    getRear(): number {
        return this.rear;
    }

    getContent(): string[] {
        return this.data;
    }
}
