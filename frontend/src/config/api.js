const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value) => value.startsWith('/') ? value : `/${value}`;

const defaultBackendOrigin = 'http://localhost:5000';
const defaultLinksOrigin = 'http://localhost:8080';

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || defaultBackendOrigin
);

export const LINKS_API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_LINKS_API_BASE_URL || defaultLinksOrigin
);

export const backendUrl = (path = '') => `${API_BASE_URL}${ensureLeadingSlash(path)}`;

export const linksBackendUrl = (path = '') => `${LINKS_API_BASE_URL}${ensureLeadingSlash(path)}`;
