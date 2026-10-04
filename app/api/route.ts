import {
  getHelloWorld,
  setHelloWorldName,
} from "@/src/modules/hello-world";

export function GET(request: Request) {
  return getHelloWorld(request);
}

export function POST(request: Request) {
  return setHelloWorldName(request);
}
