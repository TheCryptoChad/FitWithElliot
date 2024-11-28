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

export const convertImages = async (files: UTFile[]): Promise<void> => {
	try {
		await fetch('https://api.cloudconvert.com/v2/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				tasks: {
					'import-1': {
						operation: 'import/upload',
					},
					'import-2': {
						operation: 'import/upload',
					},
					optimize: {
						operation: 'optimize',
						input: ['import-1', 'import-2'],
					},
					convert: {
						operation: 'convert',
						output_format: 'webp',
						input: ['optimize'],
					},
					export: {
						operation: 'export/url',
						input: ['convert'],
						inline: false,
						archive_multiple_files: false,
					},
				},
				tag: 'jobbuilder',
			}),
		});
	} catch (error) {
		console.log(error);
	}
};
