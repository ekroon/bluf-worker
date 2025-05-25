export interface Env {
  USER_LOG: DurableObjectNamespace;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/' || !url.pathname.startsWith('/add') && !url.pathname.startsWith('/list')) {
      // Serve static assets
      return env.ASSETS.fetch(request);
    }

    const email = request.headers.get('cf-access-authenticated-user-email');
    if (!email) {
      return new Response('Unauthorized', { status: 403 });
    }

    const id = env.USER_LOG.idFromName(email);
    const stub = env.USER_LOG.get(id);

    if (url.pathname === '/add' && request.method === 'POST') {
      return stub.fetch(new Request('https://userlog/add', {
        method: 'POST',
        headers: request.headers,
        body: request.body,
      }));
    }
    if (url.pathname === '/list' && request.method === 'GET') {
      return stub.fetch(new Request('https://userlog/list'));
    }

    return new Response('Not Found', { status: 404 });
  }
};
