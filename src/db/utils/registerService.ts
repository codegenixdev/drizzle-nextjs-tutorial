export const registerService = <T>(name: string, initFn: () => T): T => {
	if (process.env.NODE_ENV === "development") {
		if (!(name in global)) {
			// @ts-ignore
			global[name] = initFn();
		}
		// @ts-ignore
		return global[name] as T;
	}
	return initFn();
};
