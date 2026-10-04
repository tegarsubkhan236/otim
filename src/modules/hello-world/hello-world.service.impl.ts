import type {
  HelloWorldMessage,
  HelloWorldRepository,
} from "./hello-world.repository";
import type { HelloWorldService } from "./hello-world.service";
import { HelloWorldRepositoryImpl } from "./hello-world.repository.impl";

export class HelloWorldServiceImpl implements HelloWorldService {
  constructor(private readonly repository: HelloWorldRepository) {}

  getMessage(name?: string): HelloWorldMessage {
    const greeting = this.repository.findMessage();
    const normalizedName = name?.trim() || this.repository.findName();

    return {
      message: normalizedName
        ? greeting.message.replace("World", normalizedName)
        : greeting.message,
    };
  }

  setName(name: string): HelloWorldMessage {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new Error("Name is required");
    }

    this.repository.saveName(normalizedName);

    return this.getMessage();
  }
}

export const helloWorldService = new HelloWorldServiceImpl(
  new HelloWorldRepositoryImpl(),
);
