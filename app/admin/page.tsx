import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/FileUpload';
import { fetchUTFiles } from '@/lib/actions';

export default async function Home() {
	const utFiles: UTFile[] = await fetchUTFiles();

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
						utFiles={utFiles}
					/>
				</TabsContent>

				<TabsContent value='video'>
					<FileUpload
						type='videoUploader'
						utFiles={utFiles}
					/>
				</TabsContent>
			</Tabs>
		</main>
	);
}
