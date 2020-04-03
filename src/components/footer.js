import React from 'react';

import { Link } from 'react-router-dom';

function Footer() {
	return (
		<div id="policy">
			<div className="text-center footer">©{new Date().getFullYear()} Powder Hounds</div>{' '}
			<div className="text-center footer">
				<Link to="/policy" className="footer">Privacy Policy</Link>
			</div>
		</div>
	);
}

export default Footer;
