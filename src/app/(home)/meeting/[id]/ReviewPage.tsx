import ReviewClient from './ReviewClient';
import { ReviewInitialData } from '@/types/paginationType';

export default async function ReviewPage({
	initialReviews,
}: {
	initialReviews: ReviewInitialData;
}) {
	return <ReviewClient initialReviews={initialReviews} />;
}
