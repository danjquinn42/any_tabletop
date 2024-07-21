const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'your_password'));
const session = driver.session();

async function runQuery() {
    try {
        const result = await session.run(
            'MATCH (n:Person) RETURN n'
        );

        result.records.forEach(record => {
            console.log(record.get('n').properties);
        });
    } finally {
        await session.close();
    }

    // Close the driver
    await driver.close();
}

runQuery().catch(error => {
    console.error('Error:', error);
});