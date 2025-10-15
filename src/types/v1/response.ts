export type ApiResponse<T = unknown, E = unknown> =
	| { success: true; result: T }
	| { success: false; error: E };
