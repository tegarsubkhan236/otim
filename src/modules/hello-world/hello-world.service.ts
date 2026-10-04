import type {
  HelloWorldMessage,
} from "./hello-world.repository";

export interface HelloWorldService {
  getMessage(name?: string): HelloWorldMessage;
  setName(name: string): HelloWorldMessage;
}
