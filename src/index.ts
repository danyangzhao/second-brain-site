interface Env {
  ASSETS: Fetcher;
}

const REDIRECT_PREFIXES = ["/spikers", "/second-brain"];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    for (const prefix of REDIRECT_PREFIXES) {
      if (url.pathname === prefix || url.pathname.startsWith(prefix + "/")) {
        const target = "https://sagebearapps.com" + url.pathname + url.search;
        return Response.redirect(target, 301);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
