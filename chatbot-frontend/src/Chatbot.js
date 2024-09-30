import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CopilotSidebar, useCopilotChat } from '@copilotkit/react';
import './Chatbot.css'; // Importing CSS file for styling

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [conversations, setConversations] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const [newPrompt, setNewPrompt] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPromptInput, setShowPromptInput] = useState(false); // State to toggle prompt input visibility
    const { addMessage } = useCopilotChat();

    useEffect(() => {
        // Load conversations and prompts from local storage on component mount
        const storedChats = JSON.parse(localStorage.getItem('chatHistory')) || [];
        const storedPrompts = JSON.parse(localStorage.getItem('prompts')) || [];
        setConversations(storedChats);
        setPrompts(storedPrompts);

        // Load the most recent conversation into chat history if available
        if (storedChats.length > 0) {
            setChatHistory(storedChats[storedChats.length - 1].history);
        }
    }, []);

    const handleSendMessage = async () => {
        const userMessage = { sender: 'User', text: message };
        const updatedChatHistory = [...chatHistory, userMessage];
        setChatHistory(updatedChatHistory);
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat', { message });
            const botMessage = { sender: 'Bot', text: response.data.response };
            updatedChatHistory.push(botMessage);
            setChatHistory(updatedChatHistory);

            // Add messages to Copilot
            addMessage(userMessage);
            addMessage(botMessage);

            // Save updated chat history to local storage
            localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handlePromptSelect = (prompt) => {
        setSelectedPrompt(prompt);
        setMessage(prompt);
    };

    const handleConversationClick = (conversation) => {
        setChatHistory(conversation.history);
    };

    const handleSaveConversation = () => {
        const title = prompt("Enter a title for this conversation:");
        if (title) {
            const newConversation = { title, history: chatHistory };
            const updatedConversations = [...conversations, newConversation];
            setConversations(updatedConversations);
            localStorage.setItem('chatHistory', JSON.stringify(updatedConversations));
        }
    };

    const handleAddPrompt = () => {
        if (newPrompt.trim()) {
            const updatedPrompts = [...prompts, newPrompt.trim()];
            setPrompts(updatedPrompts);
            localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
            setNewPrompt('');
            setShowPromptInput(false); // Hide the input after adding
        }
    };

    // Function to delete a conversation
    const handleDeleteConversation = (index) => {
        const updatedConversations = conversations.filter((_, i) => i !== index);
        setConversations(updatedConversations);
        localStorage.setItem('chatHistory', JSON.stringify(updatedConversations));
        
        // Optionally reset chat history if the deleted conversation was currently loaded
        if (chatHistory === conversations[index].history) {
            setChatHistory([]);
        }
    };

    // Filtered prompts based on search term
    const filteredPrompts = prompts.filter(prompt => 
        prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtered conversations based on search term
    const filteredConversations = conversations.filter(conversation =>
        conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chatbot-container">
            <CopilotSidebar title="Recent Conversations">
                <input 
                    type="text" 
                    placeholder="Search Conversations..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-input"
                />
                {filteredConversations.map((conversation, index) => (
                    <div key={index} className="conversation-title">
                        <span onClick={() => handleConversationClick(conversation)}>
                            {conversation.title}
                        </span>
                        <button className="delete-button" onClick={() => handleDeleteConversation(index)}>
                            🗑️ {/* Delete icon */}
                        </button>
                    </div>
                ))}
                <button onClick={handleSaveConversation} className="save-button">Save Conversation</button>
            </CopilotSidebar>
            <div className="chat-area">
                <h2>AI Chatbot</h2>
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`message ${chat.sender === 'User' ? 'user' : 'bot'}`}>
                            <strong>{chat.sender}:</strong> {chat.text}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <select 
                        value={selectedPrompt} 
                        onChange={(e) => handlePromptSelect(e.target.value)} 
                        className="prompt-select"
                    >
                        <option value="">Select a prompt...</option>
                        {filteredPrompts.map((prompt, index) => (
                            <option key={index} value={prompt}>{prompt}</option>
                        ))}
                    </select>
                    
                    {/* Button to toggle visibility of the new prompt input */}
                    <button onClick={() => setShowPromptInput(!showPromptInput)} className="toggle-prompt-button">
                        {showPromptInput ? "Hide Prompt Input" : "Add New Prompt"}
                    </button>

                    {/* New Prompt Input Field */}
                    {showPromptInput && (
                        <input 
                            type="text" 
                            value={newPrompt} 
                            onChange={(e) => setNewPrompt(e.target.value)} 
                            placeholder="Add a new prompt..." 
                            className="new-prompt-input"
                        />
                    )}
                    
                    {/* Button to add the new prompt */}
                    {showPromptInput && (
                        <button onClick={handleAddPrompt} className="add-prompt-button">Add Prompt</button>
                    )}

                    {/* Message Input Field */}
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Type your message..." 
                        className="message-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;