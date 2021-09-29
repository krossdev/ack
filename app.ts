// Copyright (c) 2021 Kross Ack Project.

/**
 * Application class
 */
export class Application extends Router {
  // server: Deno.Listener;

  proxy: boolean;

  constructor(proxy: boolean) {
    super();
    this.proxy = proxy ?? false;
  }

  listen(options: Deno.ListenOptions) {
    const server = Deno.listen(options)

    for await (const conn of server) {
      this.serveConn(conn);
    }
  }

  async serveConn(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
      const request = requestEvent.request;
      const body = request.headers.get('user-agent');
      requestEvent.respondWith(
        new Response(body, {
          status: 200,
        })
      );
    }
  }
}
