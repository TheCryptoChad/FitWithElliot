import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '32MB',
			maxFileCount: 2,
		},
	})
		.middleware(async (req) => {
			if (req.req.headers.get('admin-password') !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized');

			return {};
		})
		.onUploadComplete(async () => {
			console.log('Image upload complete');
		}),

	videoUploader: f({
		video: {
			maxFileSize: '256MB',
			maxFileCount: 1,
		},
	})
		.middleware(async (req) => {
			if (req.req.headers.get('admin-password') !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized');

			return {};
		})
		.onUploadComplete(async () => {
			console.log('Video upload complete');
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
