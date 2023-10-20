import { uberduck } from '@/services';
import { UberduckFreestyle } from '@/structures/uberduck';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log('Received payload from client', payload);
  const res = await uberduck.generateFreestyle(payload);
  let data;
  try {
    // Handle JSON parsing failure
    data = await res.json();
  } catch {
    return Response.json({ error: res.statusText }, { status: res.status });
  }
  if (!res.ok) {
    return Response.json({ error: data }, { status: res.status });
  }
  const item = new UberduckFreestyle(data);
  return Response.json(item);
}
