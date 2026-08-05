import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

// The handler is created lazily so production builds don't require the
// KEYSTATIC_GITHUB_* env vars at build time — they're only needed when
// the admin UI is actually used.
type Handlers = ReturnType<typeof makeRouteHandler>;
let handlers: Handlers | undefined;

function getHandlers(): Handlers {
  handlers ??= makeRouteHandler({ config });
  return handlers;
}

export function GET(...args: Parameters<Handlers['GET']>) {
  return getHandlers().GET(...args);
}

export function POST(...args: Parameters<Handlers['POST']>) {
  return getHandlers().POST(...args);
}
