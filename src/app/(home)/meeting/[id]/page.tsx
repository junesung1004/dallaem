export default async function DetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// console.log("id : ", id);
	return <div>{id}테스트</div>;
}
