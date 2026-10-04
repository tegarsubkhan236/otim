import { helloWorldService } from "./hello-world.service.impl";

export function getHelloWorld(request: Request): Response {
  const name = new URL(request.url).searchParams.get("name") ?? undefined;

  return Response.json(helloWorldService.getMessage(name));
}

export async function setHelloWorldName(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { name?: unknown };

    if (typeof body.name !== "string") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!body.name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    return Response.json(helloWorldService.setName(body.name));
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
