'use server';

import { UTApi } from 'uploadthing/server';

export const fetchUTFiles = async (): Promise<UTFile[]> => {
	try {
		const response = await fetch('https://api.uploadthing.com/v6/listFiles?cache-bust=' + new Date().getTime(), {
			method: 'POST',
			cache: 'no-store',
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

export const convertImages = async (
	beforeUrl: string,
	afterUrl: string,
	beforeName: string,
	afterName: string,
	oldKeys: string[],
) => {
	try {
		const response = await fetch('https://api.cloudconvert.com/v2/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
			},
			body: JSON.stringify({
				tasks: {
					'import-1': {
						operation: 'import/url',
						url: beforeUrl,
						filename: beforeName,
					},
					'import-2': {
						operation: 'import/url',
						url: afterUrl,
						filename: afterName,
					},
					optimize: {
						operation: 'optimize',
						input: ['import-1', 'import-2'],
					},
					convert: {
						operation: 'convert',
						input: ['optimize'],
						output_format: 'webp',
					},
					export: {
						operation: 'export/url',
						input: ['convert'],
						inline: true,
						archive_multiple_files: false,
					},
				},
				tag: 'images',
			}),
		});

		const data = await response.json();

		let response2 = null;

		do {
			response2 = await fetch(data.data.links.self, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
				},
			});
		} while (response2.status !== 200);

		const data2 = await response2.json();

		const before = data2.data.tasks[0].result.files[0].url;
		const after = data2.data.tasks[1].result.files[0].url;

		const utApi = new UTApi();
		await utApi.uploadFilesFromUrl([before, after]);
		await utApi.deleteFiles(oldKeys);
	} catch (error) {
		console.log(error);
	}
};

export const convertVideo = async (url: string, name: string, oldKey: string[]) => {
	try {
		const response = await fetch('https://api.cloudconvert.com/v2/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
			},
			body: JSON.stringify({
				tasks: {
					import: {
						operation: 'import/url',
						url: url,
						filename: name,
					},
					convert: {
						operation: 'convert',
						input: ['import'],
						output_format: 'mp4',
					},
					export: {
						operation: 'export/url',
						input: ['convert'],
						inline: true,
						archive_multiple_files: false,
					},
				},
				tag: 'video',
			}),
		});

		const data = await response.json();

		let response2 = null;

		do {
			response2 = await fetch(data.data.links.self, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
				},
			});
		} while (response2.status !== 200);

		const data2 = await response2.json();

		const video = data2.data.tasks[0].result.files[0].url;

		const utApi = new UTApi();
		await utApi.uploadFilesFromUrl([video]);
		await utApi.deleteFiles(oldKey);
	} catch (error) {
		console.log(error);
	}
};
