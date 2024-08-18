const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get("/api/:date?", (req,res) => {
    const givenDate = req.params.date;
    let date;

    if(!givenDate){
        date = new Date();
    }else{
        const checkDate = givenDate * 1;
        date = isNaN(checkDate) ? new Date(givenDate) : new Date(checkDate);
    }

    if (date == "Invalid Date") {
        res.json({ error: "Invalid Date" });
    } else {
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({ unix, utc });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});