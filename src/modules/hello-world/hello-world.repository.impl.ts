import type {
  HelloWorldMessage,
  HelloWorldRepository,
} from "./hello-world.repository";

export class HelloWorldRepositoryImpl implements HelloWorldRepository {
  private name?: string;

  findMessage(): HelloWorldMessage {
    return {
      message: "Hello, World!",
    };
  }

  findName(): string | undefined {
    return this.name;
  }

  saveName(name: string): void {
    this.name = name;
  }
}
