export async function to<T>(p: Promise<T>): Promise<
	{ success: true, data: T } |
	{ success: false, error: Error }
> {
	return p
		.then<{ success: true, data: T }>((d) => {
			return { success: true, data: d }
		})
		.catch<{ success: false, error: Error }>((err: unknown) => {
			if (err instanceof Error) {
				return { success: false, error: err }
			}
			return { success: false, error: Error(String(err)) }
		}
		);
}
