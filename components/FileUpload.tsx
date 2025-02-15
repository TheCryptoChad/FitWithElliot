'use client';

import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';

import type { OurFileRouter } from '../app/api/uploadthing/core';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Fragment, useRef } from 'react';
import { convertImages, convertVideo } from '@/lib/actions';
import { error } from 'console';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

type Props = {
	type: 'imageUploader' | 'videoUploader';
	utFiles: UTFile[];
};

export default function FileUpload(props: Props) {
	const passwordRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const weightBeforeRef = useRef<HTMLInputElement>(null);
	const weightAfterRef = useRef<HTMLInputElement>(null);

	return (
		<div className='grid h-96 grid-cols-3 items-center gap-x-2 gap-y-5 text-nowrap rounded-lg border bg-slate-200 p-5 text-end text-lg text-black'>
			<Label htmlFor='password'>Admin Password:</Label>
			<Input
				className='col-span-2'
				id='password'
				placeholder='12345'
				ref={passwordRef}
				type='text'
			/>

			<Label htmlFor='name'>Client Name:</Label>
			<Input
				className='col-span-2'
				id='name'
				placeholder='Elliot'
				ref={nameRef}
				type='text'
			/>

			{props.type === 'imageUploader' && (
				<Fragment>
					<Label htmlFor='before'>Weight Before:</Label>
					<Input
						className='col-span-2'
						id='before'
						placeholder='100lbs'
						ref={weightBeforeRef}
						type='number'
					/>

					<Label htmlFor='after'>Weight After:</Label>
					<Input
						className='col-span-2'
						id='after'
						placeholder='120lbs'
						ref={weightAfterRef}
						type='number'
					/>
				</Fragment>
			)}

			{props.type === 'imageUploader' ? (
				<UploadButton
					className='col-span-3'
					endpoint={props.type}
					headers={async () => {
						if (passwordRef.current) return new Headers({ 'admin-password': passwordRef.current!.value });
						return {};
					}}
					onClientUploadComplete={async (res) => {
						if (nameRef.current && weightBeforeRef.current && weightAfterRef.current) {
							const baseName: string = nameRef.current!.value.toLowerCase();
							const uniqueNames: Set<string> = new Set<string>();

							props.utFiles.forEach((file) => {
								const match = file.name.match(new RegExp(`^(${baseName}-\\d+)-(before|after)-\\d+\\.webp$`));
								if (match) uniqueNames.add(match[1]);
							});

							const repeatedNameCount: number = uniqueNames.size + 1;

							await convertImages(
								res[1].url,
								res[0].url,
								`${baseName}-${repeatedNameCount}-before-${weightBeforeRef.current!.value}.jpg`,
								`${baseName}-${repeatedNameCount}-after-${weightAfterRef.current!.value}.jpg`,
								res.map((file) => file.key),
							);
						}
					}}
				/>
			) : (
				<UploadButton
					className='col-span-3'
					endpoint={props.type}
					headers={async () => {
						if (passwordRef.current) return new Headers({ 'admin-password': passwordRef.current!.value });
						return {};
					}}
					onClientUploadComplete={async (res) => {
						if (nameRef.current) {
							const baseName: string = nameRef.current!.value.toLowerCase();
							let repeatedNameCount: number = 1;

							props.utFiles.forEach((file) => {
								const match = file.name.startsWith(baseName) && file.name.endsWith('.mp4');
								if (match) repeatedNameCount++;
							});

							await convertVideo(
								res[0].url,
								`${baseName}-${repeatedNameCount}.mov`,
								res.map((file) => file.key),
							);
						}
					}}
				/>
			)}
		</div>
	);
}
