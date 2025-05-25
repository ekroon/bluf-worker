export interface Env {}

interface Entry {
  timestamp: string;
  bluf: string;
}

export class UserLog {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/add' && request.method === 'POST') {
      const { bluf } = await request.json();
      const entries: Entry[] = (await this.state.storage.get<Entry[]>('entries')) || [];
      const entry = { timestamp: new Date().toISOString(), bluf } as Entry;
      entries.push(entry);
      if (entries.length > 100) entries.shift();
      await this.state.storage.put('entries', entries);
      return new Response(JSON.stringify(entry), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    if (url.pathname === '/list' && request.method === 'GET') {
      const entries: Entry[] = (await this.state.storage.get<Entry[]>('entries')) || [];
      return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Not Found', { status: 404 });
  }
}
