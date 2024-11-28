import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '32MB',
			maxFileCount: 2,
		},
	}).onUploadComplete(async () => {
		console.log('Image upload complete');
	}),

	videoUploader: f({
		video: {
			maxFileSize: '256MB',
			maxFileCount: 1,
		},
	}).onUploadComplete(async () => {
		console.log('Video upload complete');
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
