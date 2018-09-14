let fs = require('fs'),
    _ = require('lodash');

export class App {

    // Read file from the local directory
    public static readFile = (req: any, res: any) => {

        fs.readFile('./data/hello.txt', (error: Error, data: Buffer) => {
            if (!error) {
                res.json({ data: data.toString() });
            }
            else {
                res.json({ error: { message: JSON.stringify(error) } });
            }
        })

    }

    // Takes two parameters and produces product
    public static generateProduct = (req: any, res: any) => {
        if (!_.get(req, 'params.a')) return res.status(400).json({ error: { message: 'Missing a in req.params' } });
        if (!_.get(req, 'params.b')) return res.status(400).json({ error: { message: 'Missing b in req.params' } });

        let { params: { a, b } } = req;

        a = parseInt(a);
        b = parseInt(b);

        if (_.isNaN(a)) {
            res.json({ error: { message: 'a is not a number' } });
        }
        else if (_.isNaN(b)) {
            res.json({ error: { message: 'b is not a number' } });
        }
        else {
            res.json({ product: a * b });
        }
    }

    // Get file content in req.body and write a file in the local directory.
    public static createFile = (req: any, res: any) => {
        if (!_.get(req, 'body.data')) return res.status(400).json({ error: { message: 'Missing data in req.body' } });

        let { body: { data } } = req;

        fs.writeFile('./data/content.txt', data, (error: Error) => {
            if (!error) {
                res.json({ data: {message: 'Data has been saved to the file' }});
            }
            else {
                res.json({ error: { message: JSON.stringify(error) } });
            }
        })
    }

}