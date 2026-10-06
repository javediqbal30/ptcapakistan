import { createLeadHandler } from '@lib/api';

// This route must run on the server at request time - it writes to Neon.
export const prerender = false;

/** POST /api/contact - the enquiry form on /contact/. */
export const POST = createLeadHandler('contact');
