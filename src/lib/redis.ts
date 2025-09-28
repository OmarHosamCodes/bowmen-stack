import Redis from "ioredis";
import { env } from "@/env";

let redisInstance: Redis | null = null;

function createRedisInstance(): Redis {
	if (!redisInstance) {
		redisInstance = new Redis(env.REDIS_URL, {
			maxRetriesPerRequest: 3,
			lazyConnect: true,
		});

		redisInstance.on("error", (err) => {
			console.error("Redis connection error:", err);
		});

		redisInstance.on("connect", () => {
			console.log("Redis connected successfully");
		});
	}

	return redisInstance;
}

export const redis = createRedisInstance();

export async function disconnectRedis(): Promise<void> {
	if (redisInstance) {
		await redisInstance.disconnect();
		redisInstance = null;
	}
}

// Cache utilities
export const cache = {
	async get<T>(key: string): Promise<T | null> {
		try {
			const data = await redis.get(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Redis get error:", error);
			return null;
		}
	},

	async set(key: string, value: unknown, ttl?: number): Promise<void> {
		try {
			const serialized = JSON.stringify(value);
			if (ttl) {
				await redis.setex(key, ttl, serialized);
			} else {
				await redis.set(key, serialized);
			}
		} catch (error) {
			console.error("Redis set error:", error);
		}
	},

	async del(key: string): Promise<void> {
		try {
			await redis.del(key);
		} catch (error) {
			console.error("Redis delete error:", error);
		}
	},

	async exists(key: string): Promise<boolean> {
		try {
			const result = await redis.exists(key);
			return result === 1;
		} catch (error) {
			console.error("Redis exists error:", error);
			return false;
		}
	},

	// Session-specific cache utilities
	session: {
		key: (sessionId: string) => `session:${sessionId}`,

		async get(sessionId: string) {
			return await cache.get(cache.session.key(sessionId));
		},

		async set(sessionId: string, session: unknown, ttl = 3600) {
			await cache.set(cache.session.key(sessionId), session, ttl);
		},

		async delete(sessionId: string) {
			await cache.del(cache.session.key(sessionId));
		},
	},

	// User-specific cache utilities
	user: {
		key: (userId: string) => `user:${userId}`,

		async get(userId: string) {
			return await cache.get(cache.user.key(userId));
		},

		async set(userId: string, user: unknown, ttl = 1800) {
			await cache.set(cache.user.key(userId), user, ttl);
		},

		async delete(userId: string) {
			await cache.del(cache.user.key(userId));
		},
	},
};
