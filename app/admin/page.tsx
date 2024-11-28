import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/FileUpload';
import { fetchUTFiles } from '@/lib/actions';

export default async function Home() {
	const utFiles: UTFile[] = await fetchUTFiles();

	const convertForm = await fetch('https://sync.api.cloudconvert.com/v2/jobs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
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

	const data = await convertForm.json();

	console.log(data);

	return (
		<main className='flex h-[100vh] items-center justify-center bg-black'>
			<Tabs
				defaultValue='image'
				className='h-1/2 w-1/3'
			>
				<TabsList className='flex justify-center'>
					<TabsTrigger value='image'>Image Upload</TabsTrigger>

					<TabsTrigger value='video'>Video Upload</TabsTrigger>
				</TabsList>

				<TabsContent value='image'>
					<FileUpload
						type='imageUploader'
					/>
				</TabsContent>

				<TabsContent value='video'>
					<FileUpload
						type='videoUploader'
					/>
				</TabsContent>
			</Tabs>
		</main>
	);
}
