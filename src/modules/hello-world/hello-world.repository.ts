export type HelloWorldMessage = {
  message: string;
};

export interface HelloWorldRepository {
  findMessage(): HelloWorldMessage;
  findName(): string | undefined;
  saveName(name: string): void;
}
