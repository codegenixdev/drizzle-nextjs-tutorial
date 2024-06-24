import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

const envSchema = z.object({
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
