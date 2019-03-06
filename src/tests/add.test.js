const add = (a, b) => a + b;
const generateGreeting = (name) => `Hello ${name}!`;

test('should print hello', () => {
    const result = generateGreeting('joy');
    expect(result).toBe('Hello joy!');
});