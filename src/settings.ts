const { REACT_APP_PORT, REACT_APP_PROTOCOL, REACT_APP_ENDPOINT } = process.env;

export const host = `${REACT_APP_PROTOCOL}://${REACT_APP_ENDPOINT}:${REACT_APP_PORT}`;

export const apiBase = `${host}/api/v1/electoral_votes`;
