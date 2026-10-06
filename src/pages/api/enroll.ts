import { createLeadHandler } from '@lib/api';

// This route must run on the server at request time - it writes to Neon.
export const prerender = false;

/** POST /api/enroll - the 3-step enrolment form on /enroll/. */
export const POST = createLeadHandler('enroll');
