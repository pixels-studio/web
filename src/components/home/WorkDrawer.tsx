import { useState, useEffect, useCallback } from 'react';
import { Drawer } from 'vaul';

interface Props {
	works: { id: string; title: string }[];
}

function resolveImageSrc(workId: string): string {
	const el = document.querySelector<HTMLElement>(`[data-work-id="${workId}"]`);
	const img = el?.querySelector('img');
	return img?.getAttribute('src') || '';
}

function updateUrl(workId: string | null) {
	const url = new URL(window.location.href);
	if (workId) {
		url.searchParams.set('work', workId);
	} else {
		url.searchParams.delete('work');
	}
	window.history.replaceState({}, '', url.toString());
}

export default function WorkDrawer({ works }: Props) {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [coverSrc, setCoverSrc] = useState('');

	const activeWork = works[activeIndex] ?? null;

	function goTo(index: number) {
		const wrapped = (index + works.length) % works.length;
		setActiveIndex(wrapped);
		setCoverSrc(resolveImageSrc(works[wrapped].id));
		updateUrl(works[wrapped].id);
	}

	const handleOpenChange = useCallback((isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) updateUrl(null);
	}, []);

	useEffect(() => {
		function handleOpen(e: Event) {
			const detail = (e as CustomEvent<{ id: string; coverSrc: string }>).detail;
			const index = works.findIndex((w) => w.id === detail.id);
			if (index === -1) return;

			setActiveIndex(index);
			setCoverSrc(detail.coverSrc);
			setOpen(true);
			updateUrl(detail.id);
		}

		window.addEventListener('open-work-drawer', handleOpen);
		return () => window.removeEventListener('open-work-drawer', handleOpen);
	}, [works]);

	useEffect(() => {
		if (!open) return;

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
			else if (e.key === 'ArrowRight') goTo(activeIndex + 1);
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, [open, activeIndex, works]);

	return (
		<Drawer.Root open={open} onOpenChange={handleOpenChange} shouldScaleBackground>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-40 bg-black/60" />
				<Drawer.Content
					className="fixed inset-x-0 bottom-0 z-50 flex h-[95dvh] flex-col rounded-t-2xl bg-base-0 outline-none"
				>
					<div className="flex flex-1 items-center justify-center px-4">
						{activeWork && (
							<div className="w-full max-w-[1080px]">
								<div className="aspect-video overflow-hidden bg-black/4">
									<img
										src={coverSrc}
										alt={activeWork.title}
										loading="lazy"
										className="h-full w-full object-cover rounded-lg"
									/>
								</div>
								<div className="mt-4 flex items-center justify-between">
									<h2 className="text-lg font-medium text-black">
										{activeWork.title}
									</h2>
									<div className="hidden gap-8 md:flex">
										<button
											onClick={() => goTo(activeIndex - 1)}
											className="cursor-pointer text-lg font-medium text-base-5 transition-colors duration-200 hover:text-black"
										>
											Previous
										</button>
										<button
											onClick={() => goTo(activeIndex + 1)}
											className="cursor-pointer text-lg font-medium text-base-5 transition-colors duration-200 hover:text-black"
										>
											Next
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
