import React from 'react';
import Card from './Card';

export default function CardList() {
	return (
		<div className="flex flex-col items-center gap-6">
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
}
