/**
 * Check if an object has a specific key and narrow the type of the key
 */
export function objectHasKey(obj: unknown, key: unknown): key is keyof typeof obj {
    if (obj && typeof obj === 'object' && (typeof key === 'string' || typeof key === "number")) {
        return key in obj;
    }
    return false;
}
