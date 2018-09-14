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
            res.json({ data: { product: a * b } });
        }
    }

    // Get the first non-repeating character
    public static getNonRepeatingCharacter = (req: any, res: any) => {
        if (!_.get(req, 'params.name')) return res.status(400).json({ error: { message: 'Missing name in req.params' } });

        let { params: { name } } = req;

        let countArr: number[] = [];

        for (let i = 0; i < name.length; i++) {
            let cnt: number = 0;
            for (let j = 0; j < name.length; j++) {
                if (name[i] === name[j])
                    cnt++;
            }
            countArr[i] = cnt;
        }

        if (countArr.indexOf(1) > -1) {
            res.json({ data: { message: `First non-repeating character in ${name} is ${name[countArr.indexOf(1)]}` } });
        }
        else {
            res.json({ error: { message: `There is no non-repeating character present in ${name}` } });
        }
    }

    // Get file content in req.body and write a file in the local directory.
    public static createFile = (req: any, res: any) => {
        if (!_.get(req, 'body.data')) return res.status(400).json({ error: { message: 'Missing data in req.body' } });

        let { body: { data } } = req;

        fs.writeFile('./data/content.txt', data, (error: Error) => {
            if (!error) {
                res.json({ data: { message: 'Data has been saved to the file' } });
            }
            else {
                res.json({ error: { message: JSON.stringify(error) } });
            }
        })
    }

}