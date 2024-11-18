declare global {
	type UTFile = {
		id: string;
		key: string;
		name: string;
		customId: string | null;
		status: string;
	};
}

export {};
