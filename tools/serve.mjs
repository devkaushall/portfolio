/**
 * LOCAL PREVIEW SERVER
 * ---------------------------------------------------------------------------
 * A dependency-free static file server for the built site. Bind to 0.0.0.0 so
 * the preview works inside containers and remote sandboxes.
 *
 *   npm run build && npm run serve      → http://localhost:4173
 *
 * Production hosting does not need this: /public is plain static output.
 */

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('../public', import.meta.url)));
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let filePath = path.join(ROOT, decodeURIComponent(url.pathname));

  // Keep requests inside the build directory.
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    let stat = await fs.stat(filePath).catch(() => null);
    if (stat?.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stat = await fs.stat(filePath).catch(() => null);
    }
    if (!stat) {
      // Bare URLs resolve to their .html file, mirroring static hosts.
      const withHtml = `${filePath}.html`;
      stat = await fs.stat(withHtml).catch(() => null);
      if (stat) filePath = withHtml;
    }
    if (!stat) {
      const body = await fs.readFile(path.join(ROOT, '404.html'));
      res.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(body);
      return;
    }

    const body = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end(`Server error: ${error.message}`);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`\n  DEV.K command centre → http://localhost:${PORT}`);
  console.log(`  serving ${path.relative(process.cwd(), ROOT)}/ (${HOST}:${PORT})\n`);
});
