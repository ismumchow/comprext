import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// this function is used to check if the request method is allowed or not
// if not allowed, it will return a 405 error

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !methods.includes(req.method)) {
      res.setHeader("Allow", methods);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    return handler(req, res);
  };
}
