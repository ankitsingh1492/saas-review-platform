import { NextRequest } from "next/server";

export function parse(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const searchParams = url.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  return {
    path,
    fullPath,
    searchParamsString,
    searchParams: url.searchParams,
  };
}
