import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.balldontlie.io/v1/"
const API_KEY = "2f83e405-8652-4cbb-9ba0-f29d61e13312"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//To render the home page
app.get("/", (req, res) => {
    res.render("index.ejs");
});


// To fetch the data based on the choice of the user
app.post("/", async (req, res) => {

    // Get what the user has chosen
    const type = req.body.type;

    switch (type){
        case "teams":
            var random = Math.floor(Math.random() * 39) + 1;
            try {
                console.log(req.body);
                
                const response = await axios.get(API_URL + type, {
                    headers: {
                        Authorization: API_KEY,
                    },
                });

                const result = response.data;
                res.render("index.ejs", { data: result.data[random]})
                console.log(result.data[random]);
     
            } catch (error) {
                console.error("Failed to make request:", error.message);
            }
            break;

        case "players":
            var random = Math.floor(Math.random() * 24) + 1;
            try {
                console.log(req.body);

                const response = await axios.get(API_URL + type, {
                    headers: {
                        Authorization: API_KEY,
                    },
                });

                const result = response.data;
                res.render("index.ejs", { player_data: result.data[random]});
                console.log(result.data[random]);

            } catch (error) {
                console.error("Failed to make request:", error.message);
            }
            break;

        case "stats":
            var random = Math.floor(Math.random() * 100) + 1;
            try {
                console.log(req.body);

                const response = await axios.get(API_URL + type,{
                    headers: {
                        Authorization: API_KEY,
                    },
                    params: {
                        "seasons[]": "2023",
                        "postseason": "true",
                        "per_page": "100",
                    }
                });

                const result = response.data;
                res.render("index.ejs", {stats: result.data[random]});
                console.log(result.data[random]);
            } catch (error) {
                console.error("Failed to make request:", error.message);
                console.log(API_URL+"players/"+type);
            }
            break;
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });