import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

const envSchema = z.object({
	DB_HOST: z.string().min(1),
	DB_USER: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_NAME: z.string().min(1),
	DB_PORT: z.coerce.number().min(1),
	DATABASE_URL: z.string().min(1),
	AUTH_SECRET: z.string().min(1),
	AUTH_TRUST_HOST: z.string().min(1),
});

expand(config());

try {
	envSchema.parse(process.env);
} catch (e) {
	if (e instanceof ZodError) {
		console.error("Environment validation error:", e.errors);
	}
}

export default envSchema.parse(process.env);
