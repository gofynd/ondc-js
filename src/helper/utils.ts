export function transformRequestOptions(params) {
  let options = "";
  for (const key in params) {
    if (typeof params[key] !== "object" && params[key]) {
      const encodeVal = encodeURIComponent(params[key]);
      options += `${key}=${encodeVal}&`;
    } else if (Array.isArray(params[key])) {
      options += params[key].reduce((acc, el) => {
        const encodeVal = encodeURIComponent(el);
        return `${acc}${key}=${encodeVal}&`;
      }, "");
    } else if (typeof params[key] === "object" && params[key]) {
      options += transformRequestOptions(params[key]);
    }
  }
  return options ? options.slice(0, -1) : options;
}

export function splitAuthHeader(authHeader: string): any {
  authHeader = authHeader.replace("Signature ", "");
  if (!authHeader) return {};
  const keyValuePairsRegex = /(\w+)=\\"([^\\"]+)\\"/g;
  const keyValuePairs = {};
  let match;

  while ((match = keyValuePairsRegex.exec(authHeader)) !== null) {
    const key = match[1];
    const value = match[2];
    keyValuePairs[key] = value;
  }

  return keyValuePairs;
}
