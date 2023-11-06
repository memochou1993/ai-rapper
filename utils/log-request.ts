import { NextRequest } from 'next/server';

const logRequest = async (req: NextRequest) => {
  const cloned = req.clone();

  let body;
  try {
    body = JSON.stringify(await cloned.clone().json());
  } catch (e) {
    body = await cloned.text();
  }

  console.log({
    method: req.method,
    url: req.nextUrl.href,
    body,
  });
};

export default logRequest;
