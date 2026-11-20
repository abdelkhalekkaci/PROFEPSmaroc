import { runExpressHandler } from '../../cloudflare/adapter.js';

export async function onRequest(context) {
  return runExpressHandler(context, () => require('../../api/feedback.js'));
}
