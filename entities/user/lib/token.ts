import Cookies from "js-cookie";

export const ACCESS_TOKEN = "accessToken";

const DEFAULT_COOKIE_OPTIONS: Cookies.CookieAttributes = {
  secure: false,
  sameSite: "strict",
  path: "/",
};

interface SaveTokenOptions {
  expiresInSeconds?: number;
}

export function saveAccessToken(
  accessToken: string,
  options: SaveTokenOptions = {}
): void {
  const cookieOptions = { ...DEFAULT_COOKIE_OPTIONS };

  if (options.expiresInSeconds) {
    cookieOptions.expires = options.expiresInSeconds / (60 * 60 * 24);
  } else {
    cookieOptions.expires = 1 / 24;
  }

  Cookies.set(ACCESS_TOKEN, accessToken, cookieOptions);
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN);
}

export function removeAccessTokenCookieClient(): void {
  Cookies.remove(ACCESS_TOKEN, {
    path: DEFAULT_COOKIE_OPTIONS.path,
  });
}
