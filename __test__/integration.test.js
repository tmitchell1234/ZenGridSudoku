const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(600000);
beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false, 
        slowMo: 50 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); 
});

afterAll(async () => {
    await browser.close();
});

describe('Sudoku Website Integration Test', () => {

    it('should load the Sudoku website', async () => {
        const title = await page.title();
        expect(title).toBe('Sudoku App'); 
    });

    it('should display a Sudoku board', async () => {
        const sudokuBoard = await page.$('.SudokuBoard');
        expect(sudokuBoard).toBeTruthy();
    });

    it('should allow user to enter numbers', async () => {
        await page.click('.cell'); 
        await page.click('[class = "number 2"]'); 

        const cellValue = await page.$eval('.cell', cell => cell.textContent); 
        expect(cellValue).toBe('2');
    });

    it('should allow user to delete numbers', async () => {
       
        await page.click('[class = "number 1"]'); 
        const cellValue = await page.$eval('.cell', cell => cell.value); 
        expect(cellValue).toBeFalsy();
    });



});

