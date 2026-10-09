export function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server setting: ${name}`);
  return value;
}

export function requiredSecret(name: string) {
  const value = required(name);
  if (Buffer.byteLength(value) < 32)
    throw new Error(`Server setting ${name} must contain at least 32 bytes`);
  return value;
}
