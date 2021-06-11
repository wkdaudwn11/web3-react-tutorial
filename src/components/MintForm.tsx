import React, { useRef, FormEvent } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

interface PropTypes {
	inputColor: string;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MintForm = ({ inputColor, handleSubmit, handleChange }: PropTypes) => {
	const input = useRef<HTMLInputElement>(null);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="input-color">
					<Form.Label>Color 입력</Form.Label>
					<Row>
						<Col>
							<Form.Control type="text" placeholder="#FFFFFF" value={inputColor} ref={input} onChange={handleChange} />
						</Col>
						<Col>
							<Button variant="primary" type="submit">
								Mint
							</Button>
						</Col>
					</Row>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default MintForm;
