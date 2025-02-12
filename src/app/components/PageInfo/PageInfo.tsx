import Image from 'next/image';
import { PAGE_INFO } from '../../../../constants/index';

interface PageInfoProps {
	pageKey: string;
	isTitleLarge?: boolean;
}

const PageInfo = ({ pageKey, isTitleLarge = true }: PageInfoProps) => {
	const pageData = PAGE_INFO[pageKey];

	return (
		<div className="flex w-full p-4 items-center">
			<div className="pr-4">
				<Image src={pageData.src} alt={pageData.title} width={72} height={72} />
			</div>
			<div className="flex flex-col">
				<div
					className={`pb-2 ${isTitleLarge ? 'text-2xl font-semibold' : 'text-sm font-medium'}`}
				>
					{pageData.title}
				</div>
				<div
					className={`${isTitleLarge ? 'text-sm font-medium' : 'text-2xl font-semibold'}`}
				>
					{pageData.description}
				</div>
			</div>
		</div>
	);
};

export default PageInfo;
