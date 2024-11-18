'use server';

export const fetchUTFiles = async (): Promise<UTFile[]> => {
	try {
		const response = await fetch('https://api.uploadthing.com/v6/listFiles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(process.env.UPLOADTHING_API_KEY && { 'x-uploadthing-api-key': process.env.UPLOADTHING_API_KEY }),
			},
			body: JSON.stringify({}),
		});
		const data: { hasMore: boolean; files: UTFile[] } = await response.json();
		return data.files;
	} catch (error) {
		console.log(error);
		return [];
	}
};
