const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ok: false, error: 'Method not allowed'}, 405);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return json({ok: false, error: 'Payload too large'}, 413);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ok: false, error: 'Invalid request'}, 400);
  }

  // Honeypot: bots commonly fill every field. Return success without forwarding it.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return json({ok: true});
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 256 || !emailPattern.test(email) || email.length > 256 || !message || message.length > 5000) {
    return json({ok: false, error: 'Invalid form data'}, 422);
  }

  if (!env.MAKE_WEBHOOK_URL) {
    console.error('Missing MAKE_WEBHOOK_URL secret');
    return json({ok: false, error: 'Form is not configured'}, 503);
  }

  try {
    const webhookUrl = new URL(env.MAKE_WEBHOOK_URL);
    if (webhookUrl.protocol !== 'https:') throw new Error('Webhook URL must use HTTPS');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        message,
        source: new URL(request.url).hostname,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`Make webhook returned ${response.status}`);
      return json({ok: false, error: 'Delivery failed'}, 502);
    }

    return json({ok: true});
  } catch (error) {
    console.error('Contact form delivery failed', error);
    return json({ok: false, error: 'Delivery failed'}, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
