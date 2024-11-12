import React, { useState } from 'react';
import { Modal, Form, Button, Alert, ListGroup, Spinner } from 'react-bootstrap';
import { useAuth } from '../auth/AuthProvider';

const AIChatBot = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // creates initial states
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { axiosInstance } = useAuth();

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // add user message to chat history
        setChatHistory(prev => [...prev, { role: 'user', content: message }]);
        setLoading(true);

        try { 
            const response = await axiosInstance.post('/api/chatbot', { message });
            const botMessage = response.data.message;

            // DELETE LATER - testing, logs ai response
            console.log("Bot Message:", botMessage);

            const formattedMessage = botMessage.replace(/<br\s*\/?>/gi, '<br />').replace(/\n/g, '<br />');

            // add bot message to chat history
            setChatHistory(prev => [...prev, { role: 'bot', content: formattedMessage }]);
            setMessage('');
            setError(null);
        } catch (error) {
            setError(error.response?.data.error || 'An error with the AI Chatbot occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} data-test="ai-chat-modal">
            <Modal.Header closeButton>
                <Modal.Title>Hi, chat with me!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <ListGroup>
                        {chatHistory.map((chat, index) => (
                            <ListGroup.Item key={index} className={chat.role === 'bot' ? 'text-start' : 'text-end'} data-test="ai-chat-history">
                                <strong>{chat.role === 'bot' ? 'Bot' : 'You'}: </strong>
                                <span dangerouslySetInnerHTML={{ __html: chat.content }} />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        data-test="ai-input"
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="mb-2"
                    />
                    <Button type="submit" variant="primary" disabled={loading} data-test="ai-submit-btn">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Send'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AIChatBot;