export class MockFile {
  buffer: Buffer;
  name: string;
  size: number;

  constructor(buffer: Buffer, name: string) {
    this.buffer = buffer;
    this.name = name;
    this.size = buffer.length;

  }

  async arrayBuffer() {
    return this.buffer;
  }
}
