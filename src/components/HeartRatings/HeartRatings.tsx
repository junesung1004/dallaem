import dynamic from 'next/dynamic';
import HeartList from './HeartList';

/** dynamic import 로 SSR 방지
 * @history 2024-02-11 {ssr: !!false} 를 한 이유는 NextJS 15 버전부터 {ssr: false} 속성 지정 시 빌드 오류 발생(참조: https://github.com/vercel/next.js/discussions/72236)
 */
const HeartRatingsInteractive = dynamic(
	() => import('./HeartRatingsInteractive'),
	{
		ssr: !!false,
		loading: () => <HeartList rating={0} maxHearts={5} />, // 로딩 중에 보여줄 정적 UI
	},
);

interface HeartRatingsProps {
	rating: number;
	maxHearts: number;
	// isInteractive?: boolean; // 클라이언트인지 서버 컴포넌트인지 결정하는 prop
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HeartRatings({
	rating,
	maxHearts,
	handleChange,
}: HeartRatingsProps) {
	if (!handleChange) {
		// 서버에서는 정적 평점 UI만 렌더링
		return <HeartList rating={rating} maxHearts={maxHearts} />;
	}

	// 클라이언트에서는 동적으로 평점 인터랙티브 UI 렌더링
	return (
		<HeartRatingsInteractive
			rating={0}
			maxHearts={maxHearts}
			handleChange={handleChange}
		/>
	);
}
