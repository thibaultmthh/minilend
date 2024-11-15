const fs = require('fs');

const coverage = JSON.parse(fs.readFileSync('./coverage.json', 'utf8'));

let markdown = '## Test Coverage\n\n';
markdown += '|              File           | % Stmts | % Funcs | % Lines |\n';
markdown += '|-----------------------------|---------|---------|--------|\n';


Object.entries(coverage).forEach(([file, data]) => {
    if(file.includes('interfaces')) return;
    if(file.includes('mocks')) return;
    //add space to the end of the file name and before the file name
    let pad = 27
    markdown += `| ${file.padEnd(pad,' ')} | ${calculatePercentage(data.s)}% | ${calculatePercentage(data.f)}% | ${calculatePercentage(data.l)}% |\n`;
});

function calculatePercentage(obj) {
    const total = Object.keys(obj).length;
    const covered = Object.values(obj).filter(v => v > 0).length;
    return ((covered / total) * 100).toFixed(2);
}

console.log(markdown);

// Optionally, write to a file:
// fs.writeFileSync('COVERAGE.md', markdown);