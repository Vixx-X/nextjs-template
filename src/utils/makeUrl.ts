import { interpolateAs } from 'next/dist/shared/lib/router/router';

export const makeUrl = (
  baseUrl: string,
  query: { [key: string]: string | number } = {}
) => {
  // generate url with query params
  if (!query) return baseUrl;
  const { params, result } = interpolateAs(
    baseUrl,
    baseUrl,
    query as { [key: string]: string }
  );

  const queryString = Object.keys(query)
    .reduce((carry: string[], key: string) => {
      if (!params.includes(key))
        carry.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        );
      return carry;
    }, [])
    .join('&');

  return !queryString ? result : `${result}?${queryString}`;
};
