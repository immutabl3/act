import React from 'react';

export default function Header() {
	return (
		<header className="header">
			<h1 className="header__name">act</h1>
			<h2 className="header__description">A declarative React animation library</h2>
			<div className="header__links">
				<a href="https://github.com/immutabl3/act" target="_blank">
					View on GitHub
				</a>
				<a href="https://www.npmjs.com/package/@immutabl3/act" target="_blank">
					View on npm
				</a>
			</div>
		</header>
	);
};