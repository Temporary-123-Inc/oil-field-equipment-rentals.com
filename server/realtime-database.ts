export interface RealtimeSnapshot<T> {
  key: string | null;
  val(): T | null;
  forEach(action: (child: RealtimeSnapshot<unknown>) => boolean | void): boolean;
  numChildren(): number;
}

export interface RealtimeTransactionResult<T> {
  committed: boolean;
  snapshot: RealtimeSnapshot<T>;
}

export interface RealtimeQuery<T> {
  orderByChild(path: string): RealtimeQuery<T>;
  orderByKey(): RealtimeQuery<T>;
  equalTo(value: unknown): RealtimeQuery<T>;
  endAt(value: unknown): RealtimeQuery<T>;
  limitToFirst(limit: number): RealtimeQuery<T>;
  limitToLast(limit: number): RealtimeQuery<T>;
  get(): Promise<RealtimeSnapshot<T>>;
}

export interface RealtimeReference<T> extends RealtimeQuery<T> {
  transaction(
    update: (current: T | null) => T | null | undefined,
  ): Promise<RealtimeTransactionResult<T>>;
  set(value: unknown): Promise<void>;
  update(values: Record<string, unknown>): Promise<void>;
}

/**
 * Narrow surface used from the Firebase Admin Realtime Database service.
 * Keeping this structural avoids Vercel's serverless type pass resolving the
 * Admin Database export as the modular client type, which has no instance ref().
 */
export interface AdminRealtimeDatabase {
  ref<T extends object = Record<string, unknown>>(
    path: string,
  ): RealtimeReference<T>;
}

export function asAdminRealtimeDatabase(
  database: unknown,
): AdminRealtimeDatabase {
  return database as AdminRealtimeDatabase;
}
