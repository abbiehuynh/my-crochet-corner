// testing suite for ai chatbot component
// add it.only on line 10 to prevent calling open ai

describe('AI ChatBot Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
    });

    it.only('renders Open AIChat button', () => {
        cy.get('[data-test="ai-btn"]').should('be.visible')
          .and('contain', 'Open AIChat');
      });

    it('renders the AIChatBot modal when the button is clicked', () => {
        cy.get('[data-test="ai-btn"]').click();
        cy.get('[data-test="ai-chat-modal"]').should('be.visible');
    });

    it('allows user to send a message and recieve a response', () => {
        const userMessage = "3 ideas for cat plushie accessories?";

        // intercepts the request before clicking the submit button
        cy.intercept('POST', '/api/chatbot').as('postMessage');

        // opens the modal
        cy.get('[data-test="ai-btn"]').click();
        // types a message
        cy.get('[data-test="ai-input"]').type(userMessage);
        cy.get('[data-test="ai-submit-btn"]').click();
        // checks that the message appears in the chat history
        cy.get('[data-test="ai-chat-history"]').first().should('contain', `You: ${userMessage}`);
        // checks that the bot's response is visible in the chat history // can not wait on request, had to use timeout
        cy.get('[data-test="ai-chat-history"]', { timeout: 10000 }).last().should('not.be.empty');
    });
});