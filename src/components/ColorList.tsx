import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

interface PropsTypes {
	colors: Array<string>;
}

const ColorList = ({ colors }: PropsTypes) => {
	return (
		<Container>
			<Row>
				{colors.map((item) => {
					return <ColorItem color={item} />;
				})}
			</Row>
		</Container>
	);
};

const ColorItem = ({ color }: { color: string }) => {
	return (
		<Col md={2} style={{ marginBottom: 16 }}>
			<span>{color}</span>
			<div style={{ backgroundColor: color, textAlign: 'center', padding: '12px 0', border: '1px solid black' }} />
		</Col>
	);
};

export default ColorList;
