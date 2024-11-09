describe('Kiểm thử giao diện lưu tên và tính chỉ số BMI', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    
    it('hiển thị lời chào sau khi gửi tên', () => {
        cy.get('#name').type('John');
        cy.get('button').contains('Gửi tên').click();
        cy.get('#nameResponse').should('contain', 'Xin chào, John!');
    });

    it('tính và hiển thị chỉ số BMI', () => {
        cy.get('#weight').type('60');
        cy.get('#height').type('165');
        cy.get('button').contains('Tính BMI').click();
        cy.get('#bmiResult').should('contain', 'Bình thường');
    });
});
