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
